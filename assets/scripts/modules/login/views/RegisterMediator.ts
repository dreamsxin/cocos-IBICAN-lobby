import BaseRegisterMediator from "../../../../libs/common/scripts/modules/login/views/BaseRegisterMediator";
import RegisterRequest from "../../../../libs/common/scripts/modules/login/models/RegisterRequest";
import LoginModel from "../../../../libs/common/scripts/modules/login/models/LoginModel";
import PushTipsQueueSignal from "../../../../libs/common/scripts/modules/tips/signals/PushTipsQueueSignal";
import LobbyLoginServer, { phoneAuthCodeType } from "../servers/LobbyLoginServer";
import BaseRegisterPanel from "../../../../libs/common/scripts/modules/login/views/BaseRegisterPanel";
import RegisterPanel from "./RegisterPanel";
import CountDownTxtView from "./CountDownTxtView";
import LoginServer from "../../../../libs/common/scripts/modules/login/servers/LoginServer";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
export default class RegisterMediator extends BaseRegisterMediator {
    @riggerIOC.inject(BaseRegisterPanel)
    protected view: RegisterPanel;

    @riggerIOC.inject(LoginServer)
    private lobbyLoginServer: LobbyLoginServer;

    onShow(): void {
        this.addEventListener();
        this.view.confirmPolicyToggle.check();
    }

    onHide(): void {
        this.removeEventListener();
    }

    private addEventListener(): void {
        this.view.onClickRegisterBtnSignal.on(this, this.onClickRegister);
        this.view.onClickGetVerifyCodeSignal.on(this, this.onClickGetVerifyCode);
    }

    private removeEventListener(): void {
        this.view.onClickRegisterBtnSignal.off(this, this.onClickRegister);
        this.view.onClickGetVerifyCodeSignal.off(this, this.onClickGetVerifyCode);
    }

    @riggerIOC.inject(LoginModel)
    private model: LoginModel;

    @riggerIOC.inject(PushTipsQueueSignal)
    private sig:PushTipsQueueSignal
    onClickRegister(req: RegisterRequest): void {
        // ??????
        cc.log(`register:${req}`)
        if(!this.model.isPhoneNumValid(req.account)){
            this.sig.dispatch(`????????????????????????????????????`);
            return;
        }

        if(!this.model.isVaildPwd(req.password)){
            this.sig.dispatch("???????????????6-12???????????????????????????")
            return;
        }

        if(!this.model.isVerifCodeValid(req.verifyCode)){
            this.sig.dispatch("??????????????????")
            return;
        }

        if(!this.model.isValidNickname(req.nickName)) {
            this.sig.dispatch("????????????????????????! ?????????2-6?????????6-12???????????????");
            return;
        }

        this.requestRegisterSignal.dispatch(req);
    }

    async onClickGetVerifyCode(phone: string) {
        if (!this.model.isPhoneNumValid(phone)) {
            this.sig.dispatch('????????????????????????????????????');
            cc.error(`it's not a valid phone num:${phone}`)
            return;// ??????????????????
        }
        cc.log(`get verify code:${phone}`);

        let task = this.lobbyLoginServer.requestPhoneAuthCode(phoneAuthCodeType.register, phone);
        let ret = await task.wait();
        // cc.log(result);
        let result = JSON.parse(ret.result);
        if(result) {
            if(result.ret) {
                this.sig.dispatch('??????????????????,???????????????');
                this.view.getVerifyCodeBtn.interactable = false;
                cc.find('sign', this.view.getVerifyCodeBtn.node).active = false;
                let cb: riggerIOC.Handler = riggerIOC.Handler.create(this, () => {
                    this.view.getVerifyCodeBtn.interactable = true;
                    this.view.countDownTxt.node.active = false;
                    cc.find('sign', this.view.getVerifyCodeBtn.node).active = true;
                })
                this.view.countDownTxt.getComponent(CountDownTxtView).play(60, cb);
                this.view.countDownTxt.node.active = true;
            }
            else {
                if(result.code == -1) this.sig.dispatch(`${result.msg}`);
            }
        }

        // this.requestVerifyCodeSignal.dispatch(phone);
    }
}