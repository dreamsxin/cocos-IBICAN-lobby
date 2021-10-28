import UIManager from "../../../../libs/common/scripts/utils/UIManager";
import ActivityPanel, { page } from "../views/ActivityPanel";
import LayerManager from "../../../../libs/common/scripts/utils/LayerManager";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export default class ShowActivityPanelCommand extends riggerIOC.Command {
    constructor() {
        super();
    }

    async execute(page: page, logined: boolean) {
        if(logined) {
            UIManager.instance.showPanel(ActivityPanel, LayerManager.uiLayerName, true, page);
        }
    }
}
