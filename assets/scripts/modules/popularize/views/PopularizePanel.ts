import Panel from "../../../../libs/common/scripts/utils/Panel";
import UIManager from "../../../../libs/common/scripts/utils/UIManager";
import LobbyMarqueeServer from "../../marquee/server/LobbyMarqueeServer";
import UIUtils from "../../../../libs/common/scripts/utils/UIUtils";


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
export default class PopularizePanel extends Panel {

    @property(cc.Button)
    public closeBtn: cc.Button = null;


    @property([cc.Prefab])
    public content: cc.Prefab[] = [];

    @property(cc.ToggleContainer)
    private controlBtnToggleContainer: cc.ToggleContainer;

    // @property(cc.Button)
    // public popularizeDetailBtn: cc.Button = null;

    // @property(cc.Button)
    // public popularizeRecordsBtn: cc.Button = null;

    // @property(cc.Button)
    // public popularizeTutorialBtn: cc.Button = null;

    // @property(cc.Sprite)
    // public ButtonTexts: cc.Sprite[] = [];

    // @property(cc.SpriteFrame)
    // private buttonBgNormal: cc.SpriteFrame = null;

    // @property(cc.SpriteFrame)
    // private buttonBgSelect: cc.SpriteFrame = null;

    // @property(cc.SpriteFrame)
    // private buttonNormalTexts: cc.SpriteFrame[] = [];

    // @property(cc.SpriteFrame)
    // private buttonSelcetTexts: cc.SpriteFrame[] = [];

    public currentView: cc.Node;
    public currentIndex: number = null;
    readonly contentType: any = { Detail: 0, Records: 1, Tutorial: 2 };
    private readonly toggleGroup: any = { popularizeDetailBtn: 0, popularizeRecordsBtn: 1, popularizeTutorialBtn: 2 };
    private readonly toggleGroupKey: string[] = ["popularizeDetailBtn", "popularizeRecordsBtn", "popularizeTutorialBtn"];

    constructor() {
        super();
    }

    onInit() {
        super.onInit();
    }

    onShow() {
        super.onShow();
        this.initToggle();
        this.addEventListener();
    }

    onHide() {
        super.onHide();
        this.removeEventListener();
    }

    onDispose() {
        super.onDispose();
    }

    addEventListener() {
        this.closeBtn.node.on('click', this.onCloseBtnClick, this);
        this.controlBtnToggleContainer.node.children.forEach((toggle, idx) => {
            toggle.on('toggle', this.onToggleChanged, this);
        });
    }

    removeEventListener() {
        this.closeBtn.node.off('click', this.onCloseBtnClick);
        this.controlBtnToggleContainer.node.children.forEach((toggle, idx) => {
            toggle.off('toggle', this.onToggleChanged, this);
        });
    }

    private changeView(index: number = 0) {
        if (this.currentIndex == index) return;
        this.currentIndex = index;
        if (this.currentView) {
            this.currentView.destroy()
            this.currentView = null;
        };
        this.currentView = UIUtils.instantiate(this.content[this.currentIndex]);
        if (this.currentView) this.node.addChild(this.currentView);
    }


    initToggle() {
        this.controlBtnToggleContainer.toggleItems[this.contentType.Detail].check();
        this.changeView(this.contentType.Detail);
    }

    closeWindow() {
        UIManager.instance.hidePanel(this);
    }


    private onToggleChanged(toggle: cc.Toggle) {
        let name = toggle.node.name;
        if (!name) return;
        this.changeView(this.toggleGroup[name]);
    }


    /**关闭按钮 */
    private onCloseBtnClick() {
        this.closeWindow();
    }

    public onDisable(){

    }

}