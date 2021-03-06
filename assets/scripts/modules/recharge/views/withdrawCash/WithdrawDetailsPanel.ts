import Panel from "../../../../../libs/common/scripts/utils/Panel";
import UIManager from "../../../../../libs/common/scripts/utils/UIManager";
import ServicePanel from "../../../service/ServicePanel";
import LayerManager from "../../../../../libs/common/scripts/utils/LayerManager";
import { WithdrawMosaicResp, WithdrawOrder, ErrResp } from "../../../../protocol/protocols/protocols";
import WithdrawCashPanel from "./WithdrawCashPanel";
import UserModel from "../../../../../libs/common/scripts/modules/user/models/UserModel";
import LobbyUserModel from "../../../user/model/LobbyUserModel";
import LobbyUserInfo from "../../../user/model/LobbyUserInfo";
import RechargeServer from "../../servers/RechargeServer";
import BaseAlertInfo, { BaseAlertStyle, BaseAlertResult } from "../../../../../libs/common/scripts/modules/tips/models/BaseAlertInfo";
import BaseAlertPanel from "../../../../../libs/common/scripts/modules/tips/views/BaseAlertPanel";
import PushTipsQueueSignal from "../../../../../libs/common/scripts/modules/tips/signals/PushTipsQueueSignal";
import BaseWaitingPanel from "../../../../../libs/common/scripts/modules/tips/views/BaseWaitingPanel";
import { WithdrawType } from "../../models/RechargeModel";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class WithdrawDetailsPanel extends Panel {
    @property(cc.Button)
    private closeBtn: cc.Button = null;

    @property(cc.Button)
    private connectServericeBtn: cc.Button = null;

    @property(cc.Button)
    private continueBtn: cc.Button = null;

    @property(cc.Button)
    private cancelBtn: cc.Button = null;

    @property([cc.Vec2])
    private pos: cc.Vec2[] = [];

    @property(cc.Node)
    private mainContent: cc.Node = null;

    @property([cc.SpriteFrame])
    private statusSignSpriteFrames: cc.SpriteFrame[] = [];

    @property(cc.Node)
    private statusView: cc.Node = null;

    @property(cc.Sprite)
    private statusSign: cc.Sprite = null;

    @property(cc.Label)
    private statusTxt: cc.Label = null;

    @property(cc.Label)
    private failedTipsTxt: cc.Label = null;

    @property(cc.Label)
    private withdrawCoinTxt: cc.Label = null;

    @property(cc.RichText)
    private rechargeStreamCodeTxt: cc.RichText = null;

    @property(cc.RichText)
    private favorableStreamCodeTxt: cc.RichText = null;

    @property(cc.RichText)
    private handlingChargeTxt: cc.RichText = null;

    @property(cc.Label)
    private actualCoinTxt: cc.Label = null;

    @property(cc.Label)
    private withdrawTimeTxt: cc.Label = null;

    @riggerIOC.inject(UserModel)
    private lobbyUserModel: LobbyUserModel;

    @riggerIOC.inject(RechargeServer)
    private rechargeServer: RechargeServer;

    constructor() {
        super();
    }

    onShow() {
        this.addEventListener();
    }
    
    onHide() {
        this.removeEventListener();
    }

    closeWindow() {
        UIManager.instance.hidePanel(this);
    }

    private currenPage: number;
    /**
     * ???????????? 
     * @param index 1-???????????? ???????????? 2-???????????? ???????????? 
     */
    viewChange(index: number) {
        this.currenPage = index;
        switch(index) {
            case withdrawDetailsPanelType.withdrawRecordDetailsPanel:
                this.statusView.active = true;
                this.connectServericeBtn.node.active = true;
                this.continueBtn.node.active = false;
                this.cancelBtn.node.active = false;
                this.mainContent.setPosition(this.pos[1]);
                break;
            case withdrawDetailsPanelType.withdrawReqDetailsPanel:
                this.statusView.active = false;
                this.connectServericeBtn.node.active = false;
                this.continueBtn.node.active = true;
                this.cancelBtn.node.active = true;
                this.mainContent.setPosition(this.pos[0]);
                break;
            default :
                break;
        }
    }

    /**
     * ????????????
     * @param result 
     */
    updateView(result: WithdrawMosaicResp | WithdrawOrder) {
        if(result instanceof WithdrawMosaicResp) {
            this.updateLabel(result.amount, result.totalRechargeMosaic, result.totalGiftMosaic, result.withdrawWay, result.manageFeeRadix, result.totalRechargeMosaicFee, result.serviceFeeRadix, result.serviceFee, result.realAmount, result.time);
            this.withdrawCoin = result.amount;
            this.actualWithdrawCoin = result.realAmount;
            this.withdrawWay = result.withdrawWay;
        }

        if(result instanceof WithdrawOrder) {
            this.updateLabel(result.amount, result.rechargeMosaic, result.giftMosaicFee, result.withdrawWay, result.manageFeeRadix, result.rechargeMosaicFee, result.serviceFeeRadix, result.serviceFee, result.realAmount, result.createTime);
            this.updateStatusView(result.status);
        }
    }

    /**
     * ??????????????????
     * @param withdrawCoin ????????????
     * @param rechargeMosaicCoin ??????????????????
     * @param giftAmount ??????????????????
     * @param withdrawWay ????????????
     * @param serviceFeeRadix ???????????????
     * @param serviceFee ?????????
     * @param realAmount ??????????????????
     * @param time ????????????
     */
    updateLabel(withdrawCoin: number, rechargeMosaicCoin: number, giftAmount: number, withdrawWay: number, rechargeMosaicCoefficient: number, totalRechargeMosaicFee: number, serviceFeeRadix: number, serviceFee: number, realAmount: number, time: string) {
        //????????????
        this.withdrawCoinTxt.string = withdrawCoin / 100 + '';

        //??????????????????
        if(rechargeMosaicCoin <= 0) {
            this.rechargeStreamCodeTxt.string = '<color=#ffffff>??????????????????,?????????????????????!</color>';
        }
        else {
            this.rechargeStreamCodeTxt.string = `<color=#ffffff>${rechargeMosaicCoin / 100}</color> <color=#ffffff>???????????????,?????????${rechargeMosaicCoefficient}%?????????:</color><color=#FF782E>${totalRechargeMosaicFee / 100}</color>`;
        }
 
        //??????????????????
        if(giftAmount <= 0) {
            this.favorableStreamCodeTxt.string = '<color=#ffffff>??????????????????,????????????????????????!</color>';
        }
        else {
            this.favorableStreamCodeTxt.string = `<color=#ffffff>${giftAmount / 100}</coloc> <color=#ffffff>???????????????,?????????????????????:</color><color=#FF782E>${giftAmount / 100}</color>`;
        }

        //?????????
        if(withdrawWay == WithdrawType.alipay) {
            this.handlingChargeTxt.string = `<color=#ffffff>?????????????????????,?????????${serviceFeeRadix}%?????????:</color><color=#FF782E>${serviceFee / 100}</color>`
        }
        else if(withdrawWay == WithdrawType.bank) {
            this.handlingChargeTxt.string = `<color=#ffffff>?????????????????????,?????????${serviceFeeRadix}%?????????:</color><color=#FF782E>${serviceFee / 100}</color>`
        }
        else if(withdrawWay == WithdrawType.weixin) {
            this.handlingChargeTxt.string = `<color=#ffffff>??????????????????,?????????${serviceFeeRadix}%?????????:</color><color=#FF782E>${serviceFee / 100}</color>`
        }

        //??????????????????
        this.actualCoinTxt.string = realAmount / 100 + '';

        //????????????
        this.withdrawTimeTxt.string = time.replace(/-/g, '/');
    }

    /**?????????????????? */
    updateStatusView(status: number) {
        let str: string;
        let color: cc.Color;
        let spriteFrame: cc.SpriteFrame = this.statusSignSpriteFrames[status - 1];;
        this.failedTipsTxt.node.active = false;
        switch(status) {
            case withdrawStatusType.wait:
                str = '?????????';
                color = new cc.Color(236, 106, 0);
                break;
            case withdrawStatusType.succeed:
                str = '????????????';
                color = new cc.Color(1, 158, 97);
                break;
            case withdrawStatusType.failed:
                str = '????????????';
                color = new cc.Color(231, 0, 0);
                this.failedTipsTxt.node.active = true;
                break;
            default :
                break;
        }
        this.statusSign.spriteFrame = spriteFrame;
        this.statusTxt.string = str;
        this.statusTxt.node.color = color;
    }

    addEventListener() {
        this.closeBtn.node.on('click', this.onCloseBtnClick, this);
        this.connectServericeBtn.node.on('click', this.onConnectServericeClick, this);
        this.continueBtn.node.on('click', this.onContinueBtnClick, this);
        this.cancelBtn.node.on('click', this.onCancelBtnClick, this);
    }

    removeEventListener() {
        this.closeBtn.node.off('click', this.onCloseBtnClick, this);
        this.connectServericeBtn.node.off('click', this.onConnectServericeClick, this);
        this.continueBtn.node.off('click', this.onContinueBtnClick, this);
        this.cancelBtn.node.off('click', this.onCancelBtnClick, this);
    }

    private onCloseBtnClick() {
        this.closeWindow();
    }

    private rechargeMosaiCoefficient = 0.5; //????????????????????????
    /**
     * ?????????????????? ??????????????????
     * @param rechargeCoin 
     */
    private countTotalRechargeMosaic(rechargeCoin: number): number {
        if(rechargeCoin <= 0) return 0;
        return rechargeCoin * 0.5;
    }

    /**???????????? */
    private onConnectServericeClick() {
        UIManager.instance.showPanel(ServicePanel, LayerManager.uiLayerName, true);
    }

    private withdrawCoin: number;
    private actualWithdrawCoin: number;
    private withdrawWay: number;

    @riggerIOC.inject(PushTipsQueueSignal)
    private pushTipsQueueSignal: PushTipsQueueSignal;

    /**?????? */
    private async onContinueBtnClick() {
        if(this.actualWithdrawCoin <= 0) this.pushTipsQueueSignal.dispatch('??????????????????');
        let account: string;
        if(this.withdrawWay == WithdrawType.alipay) {
            account = (this.lobbyUserModel.self as LobbyUserInfo).bindAlipay.alipayAccount;
        }
        if(this.withdrawWay == WithdrawType.bank) {
            account = (this.lobbyUserModel.self as LobbyUserInfo).bindBanks.bankCard;
        }
        
        BaseWaitingPanel.show("????????????");
        let task = this.rechargeServer.withdraw(this.withdrawCoin, this.withdrawWay, account);
        let result = await task.wait();
        if(BaseWaitingPanel.waittingPanel) UIManager.instance.hidePanel(BaseWaitingPanel.waittingPanel);
        if(result.isOk) {
            let info: BaseAlertInfo = new BaseAlertInfo();
            info.content = `?????????????????????!<br/>???????????????????????????????????????24?????????????????????<br/>???????????????????????????????????????!`;
            info.style = BaseAlertStyle.YES;
            let Panel: BaseAlertPanel = BaseAlertPanel.show(info);
        }
        else {
            let reason = result.reason;
            if(reason instanceof ErrResp) {
                this.pushTipsQueueSignal.dispatch(reason.errMsg);
            }
            else {
                cc.log(reason);
            }
        }
        // let choice: BaseAlertResult = await Panel.wait();
        // if(choice == BaseAlertResult.YES) {

        // }
    }

    /**?????? */
    private onCancelBtnClick() {
        // this.closeWindow();
        UIManager.instance.showPanel(WithdrawCashPanel, LayerManager.uiLayerName, true);
    }
}

export enum withdrawDetailsPanelType {
    /**???????????? ???????????? */
    withdrawReqDetailsPanel = 1,

    /**???????????? ???????????? */
    withdrawRecordDetailsPanel
}

export enum withdrawStatusType {
    /**???????????? */
    wait = 1,

    /**???????????? */
    succeed,

    /**???????????? */
    failed
}
