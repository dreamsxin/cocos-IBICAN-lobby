import BaseRefreshListTask from "../../../../libs/common/scripts/utils/refreshList/task/BaseRefreshListTask";
import { TransferRecord, TransferRecordListResp } from "../../../protocol/protocols/protocols";
import RunningWaterListTask from "../../recharge/task/RunningWaterListTask";
import BaseWaitingPanel from "../../../../libs/common/scripts/modules/tips/views/BaseWaitingPanel";
import { type } from "os";
import UIManager from "../../../../libs/common/scripts/utils/UIManager";
import RechargeServer from "../../recharge/servers/RechargeServer";

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
export default class RefreshRunningWaterListTask extends BaseRefreshListTask<TransferRecordListResp> {
    @riggerIOC.inject(RechargeServer)
    private rechargeServer: RechargeServer;

    constructor() {
        super();
    }

    async onTaskStart([time, types]: [string, number[]]) {
        // BaseWaitingPanel.show("正在登录");
        let task: RunningWaterListTask = this.rechargeServer.requestRunninWater(time, types);
        let result = await task.wait();
        // if(BaseWaitingPanel.waittingPanel) UIManager.instance.hidePanel(BaseWaitingPanel.waittingPanel);
        if(result.isOk) {
            this.setComplete(result.result);
        } 
        else {
            this.setError(result.reason);
        }
    }
}
