import Panel from "../../../../libs/common/scripts/utils/Panel";
import UIManager from "../../../../libs/common/scripts/utils/UIManager";
import BaseAlertInfo, { BaseAlertStyle, BaseAlertResult } from "../../../../libs/common/scripts/modules/tips/models/BaseAlertInfo";
import BaseAlertPanel from "../../../../libs/common/scripts/modules/tips/views/BaseAlertPanel";
import LayerManager from "../../../../libs/common/scripts/utils/LayerManager";
import PushTipsQueueSignal from "../../../../libs/common/scripts/modules/tips/signals/PushTipsQueueSignal";
import LoginModel from "../../../../libs/common/scripts/modules/login/models/LoginModel";
import ExitLoginSignal from "../../login/signals/ExitLoginSignal";
import SetMusicVolumeSignal from "../../../../libs/common/scripts/modules/sound/signals/SetMusicVolumeSignal";
import SetEffectVolumeSignal from "../../../../libs/common/scripts/modules/sound/signals/SetEffectVolumeSignal";
import SetMusicSwitchSignal from "../../../../libs/common/scripts/modules/sound/signals/SetMusicSwitchSignal";
import SetEffectSwitchSignal from "../../../../libs/common/scripts/modules/sound/signals/SetEffectSwitchSignal";
import AssetsModel from "../../../../libs/common/scripts/modules/assets/models/AssetsModel";
import Constants from "../../../../libs/common/scripts/Constants";
import LobbyConstants from "../../../LobbyConstants";
import SoundModel from "../../../../libs/common/scripts/modules/sound/models/SoundModel";

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
export default class SettingPanel extends Panel {
    @property(cc.Button)
    public closeBtn: cc.Button = null;

    @property(cc.Button)
    public loginOutBtn: cc.Button = null;

    @property(cc.Button)
    public switchAccountBtn: cc.Button = null;

    @property(cc.Toggle)
    public musicToggle: cc.Toggle = null;

    @property(cc.Toggle)
    public soundToggle: cc.Toggle = null;

    @property(cc.Slider)
    public musicSlider: cc.Slider = null;

    @property(cc.Slider)
    public soundSlider: cc.Slider = null;

    @property(cc.Mask)
    public musicBarMask: cc.Mask = null;

    @property(cc.Mask)
    public soundBarMask: cc.Mask = null;

    @property(cc.Label)
    public currentAccountTxt: cc.Label = null;

    @property(cc.Label)
    public versionTxt: cc.Label = null;

    @riggerIOC.inject(PushTipsQueueSignal)
    private pushTipsQueueSignal: PushTipsQueueSignal;

    @riggerIOC.inject(LoginModel)
    private loginModel: LoginModel;

    @riggerIOC.inject(ExitLoginSignal)
    private exitLoginSignal: ExitLoginSignal;

    @riggerIOC.inject(SetMusicVolumeSignal)
    private setMusicVolumeSignal: SetMusicVolumeSignal;

    @riggerIOC.inject(SetEffectVolumeSignal)
    private setEffectVolumeSignal: SetEffectVolumeSignal;

    @riggerIOC.inject(SetMusicSwitchSignal)
    private setMusicSwitchSignal: SetMusicSwitchSignal;

    @riggerIOC.inject(SetEffectSwitchSignal)
    private setEffectSwitchSignal: SetEffectSwitchSignal;

    @riggerIOC.inject(AssetsModel)
    private assetsModel: AssetsModel;

    @riggerIOC.inject(Constants)
    private lobbyConstants: LobbyConstants;

    @riggerIOC.inject(SoundModel)
    private soundModel: SoundModel;

    constructor() {
        super();
    }

    onInit() {
        super.onInit();
    }

    onShow() {
        super.onShow();
        this.addEventListener();
        let version: string = this.assetsModel.version;
        // cc.log(`local version:${version}`);
        let envStr: string = this.lobbyConstants.env == "" ? "" : `${this.lobbyConstants.env}-`;
        this.versionTxt.string = `${envStr}v${version}`;
    }

    onHide() {
        super.onHide();
        this.removeEventListener();
    }

    onDispose() {
        super.onDispose();
    }

    closeWindow() {
        UIManager.instance.hidePanel(this);
    }

    addEventListener() {
        this.closeBtn.node.on('click', this.onCloseBtnClick, this);
        this.musicSlider.node.on('slide', this.onSliderChange, this);
        this.soundSlider.node.on('slide', this.onSliderChange, this);
        this.musicToggle.node.on('toggle', this.onToggleChange, this);
        this.soundToggle.node.on('toggle', this.onToggleChange, this);
        this.loginOutBtn.node.on('click', this.onLoginOutBtnClick, this);
        this.switchAccountBtn.node.on('click', this.onSwitchAccountBtnClick, this);
    }

    removeEventListener() {
        this.closeBtn.node.off('click', this.onCloseBtnClick, this);
        this.musicSlider.node.off('slide', this.onSliderChange, this);
        this.soundSlider.node.off('slide', this.onSliderChange, this);
        this.musicToggle.node.off('toggle', this.onToggleChange, this);
        this.soundToggle.node.off('toggle', this.onToggleChange, this);
        this.loginOutBtn.node.off('click', this.onLoginOutBtnClick, this);
        this.switchAccountBtn.node.on('click', this.onSwitchAccountBtnClick, this);
    }

    /**
     * ?????????????????????
     * @param musicValue 
     * @param soundValue 
     */
    updateSlider(musicValue: number, soundValue: number) {
        if(this.musicToggle.isChecked) {
            this.musicSlider.enabled = true;
            this.musicSlider.progress = musicValue;
        }
        if(this.soundToggle.isChecked) {
            this.soundSlider.enabled = true;
            this.soundSlider.progress = soundValue;
        }
        this.musicSlider.node.emit('slide', this.musicSlider);
    }

    updateToggle(musicCheck: boolean, soundCheck: boolean): void {
        // this.musicToggle.isChecked = musicCheck;
        // this.soundToggle.isChecked = soundCheck;
        musicCheck ? this.musicToggle.check() : this.musicToggle.uncheck();
        soundCheck ? this.soundToggle.check() : this.soundToggle.uncheck();
    }

    /**
     * ????????????????????????
     * @param account 
     */
    setAccount(account: string) {
        this.currentAccountTxt.string = account;
    }

    /**???????????? */
    private onCloseBtnClick() {
        this.closeWindow();
    }

    /**
     * ???????????????
     * @param slider 
     */
    private onSliderChange(slider: cc.Slider) {
        let name = slider.node.name;
        switch (name) {
            case 'musicSlider':
            case 'soundSlider':
                this.musicBarMask.node.width = this.musicSlider.node.width * this.musicSlider.progress;
                this.soundBarMask.node.width = this.soundSlider.node.width * this.soundSlider.progress;
                let progress: number = name == 'musicSlider' ? this.musicSlider.progress : this.soundSlider.progress;
                if(this[name.replace('Slider', 'Toggle')].isChecked) {
                    cc.sys.localStorage.setItem(name, progress);
                    name == "musicSlider" ? this.setMusicVolumeSignal.dispatch(progress) : this.setEffectVolumeSignal.dispatch(progress)
                }
                break;
            default:
                break;
        }

    }

    /**
     * ??????????????????
     * @param toggle 
     */
    private onToggleChange(toggle: cc.Toggle) {
        let name = toggle.node.name;
        switch (name) {
            case 'musicToggle':
                this.setMusicSwitchSignal.dispatch(toggle.isChecked);
                if(!this.musicToggle.isChecked) {
                    this.musicSlider.enabled = false;
                    this.musicSlider.progress = 0;
                }
                else {
                    this.musicSlider.enabled = true;
                    this.musicSlider.progress = this.soundModel.musicVolume;
                }
                break;
            case 'soundToggle':
                this.setEffectSwitchSignal.dispatch(toggle.isChecked);
                if(!this.soundToggle.isChecked) {
                    this.soundSlider.enabled = false;
                    this.soundSlider.progress = 0;
                }
                else {
                    this.soundSlider.enabled = true;
                    this.soundSlider.progress = this.soundModel.effectVolume;
                }
                break;
            default:
                break;
        }
        this.musicSlider.node.emit('slide', this.musicSlider);
        cc.sys.localStorage.setItem(name, toggle.isChecked);
    }

    /**
     * ????????????
     */
    async onLoginOutBtnClick() {
        if (!this.loginModel.isLogined) {
            this.pushTipsQueueSignal.dispatch("??????????????????");
            return;
        }
        let info: BaseAlertInfo = new BaseAlertInfo();
        info.content = "????????????????????????";
        info.style = BaseAlertStyle.YES_NO;
        let panel: BaseAlertPanel = BaseAlertPanel.show(info);
        let choice: BaseAlertResult = await panel.wait();
        BaseAlertPanel.hide(panel);
        if (BaseAlertResult.YES == choice) {
            //????????????,?????????
            this.exitLoginSignal.dispatch();
            // this.pushTipsQueueSignal.dispatch("?????????????????????");
        }
        else {
            UIManager.instance.showPanel(SettingPanel, LayerManager.uiLayerName, false);
        }
    }

    /**
     * ????????????
     */
    async onSwitchAccountBtnClick() {
        if (!this.loginModel.isLogined) {
            this.pushTipsQueueSignal.dispatch("??????????????????");
            return;
        }
        let info: BaseAlertInfo = new BaseAlertInfo();
        info.content = "????????????????????????";
        info.style = BaseAlertStyle.YES_NO;
        let panel: BaseAlertPanel = BaseAlertPanel.show(info);
        let choice: BaseAlertResult = await panel.wait();
        BaseAlertPanel.hide(panel);
        if (BaseAlertResult.YES == choice) {
            //1.??????????????? 2.??????????????????
            this.exitLoginSignal.dispatch();
            // this.pushTipsQueueSignal.dispatch("?????????????????????");
            // this.showLoginPanelSignal.dispatch();
        }
        else {
            UIManager.instance.showPanel(SettingPanel, LayerManager.uiLayerName, false);
        }
    }
}
