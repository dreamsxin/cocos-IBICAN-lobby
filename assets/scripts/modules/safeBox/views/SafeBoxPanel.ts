import Panel from "../../../../libs/common/scripts/utils/Panel";
import JPSprite from "../../../../libs/common/scripts/utils/JPSprite";
import UIManager from "../../../../libs/common/scripts/utils/UIManager";
import InputPwdPanel from "./InputPwdPanel";
import LayerManager from "../../../../libs/common/scripts/utils/LayerManager";
import SafeBoxServer from "../servers/SafeBoxServer";
import PushTipsQueueSignal from "../../../../libs/common/scripts/modules/tips/signals/PushTipsQueueSignal";
import { ErrResp } from "../../../protocol/protocols/protocols";
import ChangePwdPanelTips from "../../../common/structurals/ChangePwdPanelTips";
import ShowChangePwdPanelSignal from "../../../common/signals/ShowChangePwdPanelSignal";
import SafeBoxDetailsView from "./SafeBoxDetailsView";
import BaseWaitingPanel from "../../../../libs/common/scripts/modules/tips/views/BaseWaitingPanel";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SafeBoxPanel extends Panel {
    @property(cc.Toggle)
    public getMoneyToggle: cc.Toggle = null;

    @property(cc.Toggle)
    public saveMoneyToggle: cc.Toggle = null;

    @property(cc.Toggle)
    public detailsToggle: cc.Toggle = null;

    @property(cc.Label)
    public currentCoinLabel: cc.Label = null;

    @property(cc.Label)
    public safeBoxCoinLabel: cc.Label = null;

    @property(cc.Button)
    public moneyInputClearBtn: cc.Button = null;

    @property(cc.EditBox)
    public moneyInputTxt: cc.EditBox = null;

    @property(cc.Sprite)
    public moneyInputTips: cc.Sprite = null;

    @property({type: [cc.SpriteFrame]})
    public inputTipsUiArr:cc.SpriteFrame[] = [];

    @property(cc.Slider)
    public moneySlider: cc.Slider = null;

    @property(cc.Sprite)
    public moneySliderBar: cc.Sprite = null;

    @property(cc.Button)
    public maxBtn: cc.Button = null;

    @property(cc.EditBox)
    public valueLabel: cc.EditBox = null;

    @property(cc.Button)
    public closeBtn: cc.Button = null;

    @property(cc.Button)
    public confirmBtn: cc.Button = null;

    @property(cc.Node)
    private moneyNode: cc.Node = null;

    @property(cc.Node)
    private detailsNode: cc.Node = null;

    @property({type: [cc.SpriteFrame]})
    public confirmBtnUiArr:cc.SpriteFrame[] = [];

    @property(cc.Button)
    public changePwdBtn: cc.Button = null;

    @riggerIOC.inject(SafeBoxServer)
    private safeBoxServer: SafeBoxServer;

    @riggerIOC.inject(PushTipsQueueSignal)
    private pushTipsQueueSignal: PushTipsQueueSignal;

    /**???????????????????????? */
    @riggerIOC.inject(ShowChangePwdPanelSignal)
    private showChangePwdPanelSignal: ShowChangePwdPanelSignal;

    constructor() {
        super();
    }

    onInit() {
        super.onInit();
    }

    onExtra(arg: any) {
    }

    onShow() {
        super.onShow();
        this.addEventListener();
        cc.log(`safeBoxPanel onShow`);
    }

    onHide() {
        super.onHide();
        this.removeEventListener();
        cc.log(`safeBoxPanel onHide`);
    }

    onDispose() {
        super.onDispose();
    }

    addEventListener() {
        this.closeBtn.node.on('click', this.onCloseBtnClick, this);
        this.saveMoneyToggle.node.on('toggle', this.onToggleChanged, this);
        this.getMoneyToggle.node.on('toggle', this.onToggleChanged, this);
        this.detailsToggle.node.on('toggle', this.onToggleChanged, this);
        this.maxBtn.node.on('click', this.onMaxBtnClick, this);
        this.moneyInputTxt.node.on('editing-did-ended', this.onMoneyInputEnd, this);
        this.moneySlider.node.on('slide', this.onMoneySliderChanged, this);
        this.moneyInputClearBtn.node.on('click', this.onClearMoneyInput, this);
        this.confirmBtn.node.on('click', this.onConfirmBtnClick, this);
        this.changePwdBtn.node.on('click', this.onChangePwdBtnClick, this);
    }

    removeEventListener() {
        this.closeBtn.node.off('click', this.onCloseBtnClick, this);
        this.saveMoneyToggle.node.off('toggle', this.onToggleChanged, this);
        this.getMoneyToggle.node.off('toggle', this.onToggleChanged, this);
        this.detailsToggle.node.off('toggle', this.onToggleChanged, this);
        this.maxBtn.node.off('click', this.onMaxBtnClick, this);
        this.moneyInputTxt.node.off('editing-did-ended', this.onMoneyInputEnd, this);
        this.moneySlider.node.off('slide', this.onMoneySliderChanged, this);
        this.moneyInputClearBtn.node.off('click', this.onClearMoneyInput, this);
        this.confirmBtn.node.off('click', this.onConfirmBtnClick, this);
        this.changePwdBtn.node.off('click', this.onChangePwdBtnClick, this);
    }

    closeWindow() {
        UIManager.instance.hidePanel(this);
    }

    /**
     * ????????????
     * @param currenCoin ????????????
     * @param safeBoxCoin ???????????????
     */
    updateInfo(currenCoin: number, safeBoxCoin: number) {
        this.currentCoinLabel.string = `${currenCoin}`;
        this.safeBoxCoinLabel.string = `${safeBoxCoin}`;
    }

    /**??????safeBoxPanel */
    private onCloseBtnClick() {
        this.closeWindow();
    }

    /**??????????????? */
    get currentPage(): pageState {
        return this._currentPage;
    }
    set currentPage(s: pageState) {
        this._currentPage = s;
    }
    private _currentPage: pageState = null;
    /**
     * ???????????????toggle????????????
     * @param toggle ????????????toggle
     */
    private onToggleChanged(toggle: cc.Toggle) {
        let confirmBtnBg: cc.Node;
        this.moneyNode.active = false;
        this.detailsNode.active = false;
        switch (toggle.node.name) {
            case 'saveMoney':
                this.moneyNode.active = true;
                this._currentPage = pageState.saveMoney;
                this.moneyInputTips.spriteFrame = this.inputTipsUiArr[pageState.saveMoney];
                confirmBtnBg = cc.find('Background', this.confirmBtn.node);
                confirmBtnBg.getComponent(cc.Sprite).spriteFrame = this.confirmBtnUiArr[pageState.saveMoney];
                this.setMoneySliderValue(0);
                break;
            case 'getMoney':
                this.moneyNode.active = true;
                this._currentPage = pageState.getMoney;
                this.moneyInputTips.spriteFrame = this.inputTipsUiArr[pageState.getMoney];
                confirmBtnBg = cc.find('Background', this.confirmBtn.node);
                confirmBtnBg.getComponent(cc.Sprite).spriteFrame = this.confirmBtnUiArr[pageState.getMoney];
                this.setMoneySliderValue(0);
                break;
            case 'details':
                this._currentPage = pageState.details;
                this.detailsNode.active = true;
                (this.detailsNode.getComponent(SafeBoxDetailsView) as SafeBoxDetailsView).refresh();
                break;
            default:
                break;
        }
        this.moneySlider.node.emit('slide', this.moneySlider);
    }

    /**
     * ????????????????????????
     */
    private onClearMoneyInput() {
        this.moneyInputTxt.string = '';
        this.setMoneySliderValue(0);
    }

    /**?????????????????????????????? */
    private onMoneyInputEnd(input: cc.EditBox) {
        let number = Number(input.string);
        if(number > 0){
            let MaxLimtCoin: number = this._currentPage == pageState.saveMoney ? Number(this.currentCoinLabel.string) : Number(this.safeBoxCoinLabel.string);
            if(number >= MaxLimtCoin) number = MaxLimtCoin;
            number = Math.floor(number); //????????????
            let sliderValue = MaxLimtCoin <= 0 ? 0 : number / MaxLimtCoin;
            this.setMoneySliderValue(sliderValue);
        }
        else {
            cc.log('The input amount is not a number')
            input.string = '';
            this.setMoneySliderValue(0);
        }
    }

    /**
     * ???????????????????????????
     * @param slider 
     */
    private onMoneySliderChanged(slider: cc.Slider) {
        this.moneySliderBar.node.width = slider.progress * slider.node.width;
        this.setMoneyInputTxt(slider.progress);
    }

    /**
     * moneySlider ???????????????????????????
     */
    private onMaxBtnClick() {
        this.setMoneySliderValue(1);
    }

    /**
     * ????????????????????????????????????
     */
    async onConfirmBtnClick() {
        let coin: number = Number(this.moneyInputTxt.string);
        switch(this._currentPage) {
            case pageState.getMoney:
                if(Number(this.moneyInputTxt.string) <= 0) {
                    this.pushTipsQueueSignal.dispatch('?????????????????????0');
                    return;
                }
                //????????????????????????
                let panel = UIManager.instance.showPanel(InputPwdPanel, LayerManager.uiLayerName, false, [coin]) as InputPwdPanel;
                let r = await panel.wait();
                if(r) {
                    this.pushTipsQueueSignal.dispatch('????????????!');
                    this.setMoneySliderValue(0);
                }
                break;
            case pageState.saveMoney:
                if(Number(this.moneyInputTxt.string) <= 0) {
                    this.pushTipsQueueSignal.dispatch('?????????????????????0');
                    return;
                }
                BaseWaitingPanel.show("????????????");
                let saveMoneyTask = this.safeBoxServer.saveMoneyReq(Number(this.moneyInputTxt.string));
                let result =  await saveMoneyTask.wait();
                if(BaseWaitingPanel.waittingPanel) UIManager.instance.hidePanel(BaseWaitingPanel.waittingPanel);
                
                if(result.isOk) {
                    this.pushTipsQueueSignal.dispatch('????????????');
                    this.setMoneySliderValue(0);
                }
                else {
                    let reason = result.reason;
                    cc.log(`safeBox saveMoney Failed. reason: ${reason}`);
                    if(reason instanceof ErrResp) {
                        this.pushTipsQueueSignal.dispatch(`${reason.errMsg}`);
                    }
                }
                break;
            default:
                break;
        }
    }

    /**
     * ????????????????????????
     */
    private onChangePwdBtnClick() {
        // UIManager.instance.showPanel(ChangePwdPanel, LayerManager.uiLayerName, false);
        let tips: ChangePwdPanelTips = new ChangePwdPanelTips();
        tips.oldPwdInputTips = '???????????????????????????';
        tips.newPwdInputTips = '??????????????????????????????';
        tips.newPwdInputAgainTips = '????????????????????????????????????';
        let task = this.safeBoxServer.modifySavePwdReq();
        this.showChangePwdPanelSignal.dispatch([tips, task]);
    }

    /**
     * ???????????????????????????
     * @param v 
     */
    private setMoneySliderValue(v: number) {
        this.moneySlider.progress = v;
        this.moneySlider.node.emit('slide', this.moneySlider);
        this.setMoneyInputTxt(v);
    }

    /**
     * ?????????????????????????????????
     * @param v 
     */
    private setMoneyInputTxt(v: number) {
        let coin: number = 0;
        switch(this._currentPage) {
            case pageState.getMoney:
                coin = Math.floor(Number(this.safeBoxCoinLabel.string) * v);
                break;
            case pageState.saveMoney:
                coin = Math.floor(Number(this.currentCoinLabel.string) * v);
                break;
            default:
                break;
        }        
        this.moneyInputTxt.string = `${coin}`;
    }
}

export enum pageState {
    saveMoney = 0,
    getMoney,
    details 
}
