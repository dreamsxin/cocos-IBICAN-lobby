import LoginServer from "../../../../libs/common/scripts/modules/login/servers/LoginServer";
import { LoginRespSignal } from "../../../protocol/signals/signals";
import RegisterRequest from "../../../../libs/common/scripts/modules/login/models/RegisterRequest";
import Task from "../../../../libs/common/scripts/utils/Task";
import XMLHttpRequestTask from "../../../../libs/common/scripts/utils/XMLHttpRequestTask";
import LoginRequest from "../../../../libs/common/scripts/modules/login/models/LoginRequest";
import { Token } from "../../../../libs/common/scripts/modules/login/models/LoginDefinitions";
import { LoginResp, KickUserPush, LoginReq } from "../../../protocol/protocols/protocols";
import LobbyUserModel from "../../user/model/LobbyUserModel";
import OnLoginSuccessSignal from "../../../../libs/common/scripts/modules/login/signals/OnLoginSuccessSignal";
import GetUpdateNoticeTask from "../tasks/GetUpdateNoticeTask";
import BaseAlertInfo, { BaseAlertStyle, BaseAlertResult } from "../../../../libs/common/scripts/modules/tips/models/BaseAlertInfo";
import BaseAlertPanel from "../../../../libs/common/scripts/modules/tips/views/BaseAlertPanel";
import ExitLoginSignal from "../signals/ExitLoginSignal";
import GetMaintanceNoticeTask from "../tasks/GetMaintenceNoticeTask";
import Constants from "../../../../libs/common/scripts/Constants";
import LobbyConstants from "../../../LobbyConstants";
import ProtocolTask from "../../../../libs/common/scripts/utils/ProtocolTask";
import CommandCodes from "../../../protocol/CommandCodes";
import NativeUtils, { ShareCode } from "../../../../libs/native/NativeUtils";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class LobbyLoginServer extends LoginServer {

    @riggerIOC.inject(LoginRespSignal)
    private loginRespSignal: LoginRespSignal;

    @riggerIOC.inject(ExitLoginSignal)
    private exitLoginSignal: ExitLoginSignal;

    @riggerIOC.inject(Constants)
    protected constants: LobbyConstants;

    public loginPassPortTask: XMLHttpRequestTask;

    @riggerIOC.inject(ProtocolTask)
    public loginLobbyTask: ProtocolTask<LoginResp>;


    constructor() {
        super();
        this.loginLobbyTask.init(CommandCodes.PPLoginReq, LoginRespSignal)
        this.loginRespSignal.on(this, this.onLoginResp);
        this.kickUserPushSignal.on(this, this.onKickUser, null, true);

    }

    dispose(): void {
        this.loginRespSignal.off(this, this.onLoginResp);
        this.kickUserPushSignal.off(this, this.onKickUser);
        super.dispose();
    }

    async onKickUser(resp: KickUserPush) {
        cc.log(resp.code);
        if(resp.code != 4) {
            let tips: string = '';
            switch(resp.code) {
                case 3:
                    tips = '????????????????????????????????????';
                    break;
                case 7:
                    // tips = '??????????????????,??????????????????';
                    this.networkServer.closeDefault(); //?????????????????????,?????????????????????????????????,????????????
                    return;
                case 11:
                    tips = '?????????????????????';
                    break;
                case 12:
                    tips = '??????IP????????????';
                    break;
                case 13:
                    tips = '??????ID????????????';
                    break;
                default :
                    tips = '???????????????,???????????????';
                    break;
            }
            this.networkServer.closeDefault();
            let info: BaseAlertInfo = new BaseAlertInfo();
            info.content = tips;
            info.style = BaseAlertStyle.YES;
            let ret: BaseAlertResult = await BaseAlertPanel.show(info).wait();
            if(ret){
                this.exitLoginSignal.dispatch();
            }
        }
    }

    requestRegister(requestData: RegisterRequest): Task {
        let task: XMLHttpRequestTask = new XMLHttpRequestTask();
        task.timeout = 5000;
        task.url = `${this.constants.jpApiUrl}passport/user/mobileRegister`;
        // task.url = "http://10.0.0.106:8081/passport/user/register";

        // ????????????
        task.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .setParams("mobile", requestData.account)
            .setParams("password", requestData.password)
            // .setParams("confirmPassword", requestData.password)
            .setParams("nickname", requestData.nickName)
            .setParams("verifyCode", requestData.verifyCode);

        task.start();
        return task;
    }

    /**
     * ???????????????????????????
     * @param account 
     * @param password
     */
    requestLoginPassport(request: LoginRequest): Task {
        // if (!this.loginPassPortTask) this.loginPassPortTask = new XMLHttpRequestTask();
        // let task: XMLHttpRequestTask = this.loginPassPortTask;
        let task: XMLHttpRequestTask = new XMLHttpRequestTask();

        if (task.isWaitting()) return task;
        task.reset();
        task.timeout = 5000;
        let url: string = '';
        let paramsKey: string = '';
        let paramsValue: string = '';
        if(request.platform == 3) {
            //????????????
            url = `${this.constants.jpApiUrl}lobby/user/deviceLogin`;
            paramsKey = 'deviceNo';
            paramsValue = request.deviceId;
            cc.log(`login passport, deviceId:${request.deviceId}`);
        }
        else if(request.token) {
            //token??????
            url = `${this.constants.jpApiUrl}passport/user/tokenLogin`;
            paramsKey = 'token';
            paramsValue = request.token;
            paramsValue = paramsValue.replace(/\+/g, "%2B");
            paramsValue = paramsValue.replace(/\&/g, "%26");
            cc.log(`login passport, account:${request.account}, token:${request.token}`);
        }
        else if(request.authCode && request.authCode.length > 0) {
            //???????????????
            url = `${this.constants.jpApiUrl}passport/user/mobileVerifyCodeLogin`;
            paramsKey = 'verifyCode';
            paramsValue = request.authCode;
            cc.log(`login passport, account:${request.account}, verifyCode:${request.authCode}`)
        }
        else if(request.password && request.password.length > 0) {
            //??????????????????
            url = `${this.constants.jpApiUrl}passport/user/mobileLogin`;
            paramsKey = 'password';
            paramsValue = request.password;
            cc.log(`login passport, account:${request.account}, password:${request.password}`)
        }

        // TODO
        // let url: string = "http://10.0.0.45:8080/passport/user/mobileLogin";
        // // let url: string = "http://10.0.0.106:8081/passport/user/mobileLogin";
        cc.log(`APIurl:${this.constants.jpApiUrl}`);
        task.url = url;
        // ????????????
        task.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            .setParams(paramsKey, paramsValue);
        if(!request.token && request.platform == 1) task.setParams("mobile", request.account);

        //?????????????????????
        let shareCode = NativeUtils.getShareCode();
        task.setParams('referrerId', shareCode.referrerId);
        task.setParams('referrerChannel', shareCode.referrerChannel ? shareCode.referrerChannel : '');
        task.setParams('gameId', shareCode.gameId);
        return task.start();
    }

    /**
     * ????????????????????? register-??????????????? login-??????????????? reset-?????????????????????
     * @param type register login reset
     * @param phone 
     */
    requestPhoneAuthCode(type: phoneAuthCodeType , phone: string): XMLHttpRequestTask {
        let url: string;
        switch(type) {
            case phoneAuthCodeType.register:
                url = `${this.constants.jpApiUrl}passport/verifyCode/sendMobileRegisterVerifyCode`;
                break;
            case phoneAuthCodeType.login:
            cc.log(`login authCode `)
                url = `${this.constants.jpApiUrl}passport/verifyCode/sendMobileLoginVerifyCode`;
                break;
            case phoneAuthCodeType.reset:
                url = `${this.constants.jpApiUrl}passport/verifyCode/sendMobileResetPasswordVerifyCode`;
                break;
            default:
                cc.log(`authCode Type is not exist`);
                break;
        }

        let task = new XMLHttpRequestTask();
        task.url = url;
        task.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        .setParams("mobile", phone);
        return task.start() as XMLHttpRequestTask;
    }

    /**
     * ????????????
     * @param account 
     * @param password 
     * @param verifyCode 
     */
    requestResetPwd(account: string, password: string, verifyCode: string): Task {
        let task = new XMLHttpRequestTask();
        task.url = `${this.constants.jpApiUrl}passport/user/resetPassword`;
        task.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        .setParams('mobile', account)
        .setParams('password', password)
        .setParams('verifyCode', verifyCode);
        return task.start();
    }

    @riggerIOC.inject(GetUpdateNoticeTask)
    protected getUpdateNoticeTask: GetUpdateNoticeTask;
    requestUpdateNotice(version: string): GetUpdateNoticeTask {
        // cc.log(`this.getUpdateNoticeTask.isWaitting(): ${this.getUpdateNoticeTask.isWaitting()}`);
        if(this.getUpdateNoticeTask.isWaitting()) return this.getUpdateNoticeTask;
        this.getUpdateNoticeTask.prepare();
        this.getUpdateNoticeTask.timeout = 5000;
        return this.getUpdateNoticeTask.start(version);

        // let task: GetUpdateNoticeTask = new GetUpdateNoticeTask();
        // return task.start(version);
    }

    /**?????????,?????????????????? */
    requestMaintanceNotice(): GetMaintanceNoticeTask {
        let task: GetMaintanceNoticeTask = new GetMaintanceNoticeTask();
        return task.start();
    }

    /**
     * ??????????????????/?????????
     * @param token 
     */
    requestLogin(token: Token, platform: number = 1, deviceId?: string, shareCode?: ShareCode): ProtocolTask<LoginResp> {
        // if (!this.loginLobbyTask) this.loginLobbyTask = new LoginLobbyTask();
        if (this.loginLobbyTask.isWaitting()) return this.loginLobbyTask;
        this.loginLobbyTask.reset();
        this.loginLobbyTask.timeout = 5000;
        let req: LoginReq = new LoginReq();
        req.token = token;
        req.platform = platform;
        if(deviceId) {
            req.deviceNo = deviceId;
        }
        if(shareCode) {
            req.referrerId = shareCode.referrerId;
            req.referrerChannel = shareCode.referrerChannel ? shareCode.referrerChannel : '';
            req.gameId = shareCode.gameId;
        }
        this.loginLobbyTask.start(req);
        return this.loginLobbyTask;
    }

    @riggerIOC.inject(OnLoginSuccessSignal)
    protected onLoginSuccessSignal: OnLoginSuccessSignal;

    public onLoginResp(resp: LoginResp): void {
        cc.log(`login resp:${resp}`);

        this.loginModel.isLogined = true;
        this.onLoginSuccessSignal.dispatch();
        (<LobbyUserModel>this.userModel).updateUserInfo(resp.userInfo);
    }
}

/**
 * ?????????????????????
 */
export enum phoneAuthCodeType {
    register = 1, //???????????????
    login, //???????????????
    reset //?????????????????????
}

/**
 * ????????????
 */
export enum loginType {
    pwdLogin = 1, //????????????
    authCodeLogin //?????????????????????
}
