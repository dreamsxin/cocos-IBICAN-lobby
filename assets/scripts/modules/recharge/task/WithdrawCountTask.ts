import ProtocolTask from "../../../../libs/common/scripts/utils/ProtocolTask";
import CommandCodes from "../../../protocol/CommandCodes";
import NetworkServer from "../../../../libs/common/scripts/modules/network/servers/NetworkServer";
import { WithdrawCountRespSignal } from "../../../protocol/signals/signals";
import { WithdrawCountReq, WithdrawCountResp } from "../../../protocol/protocols/protocols";

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
export default class WithdrawCountTask extends ProtocolTask<WithdrawCountResp> {
    // @riggerIOC.inject(NetworkServer)
    // private networkServer: NetworkServer;

    @riggerIOC.inject(WithdrawCountRespSignal)
    private withdrawCountRespSignal: WithdrawCountRespSignal;

    constructor() {
        super(CommandCodes.PPWithdrawCountReq);
    }

    onTaskStart() {
        let req: WithdrawCountReq = new WithdrawCountReq();
        this.networkServer.sendDefault(CommandCodes.PPWithdrawCountReq, req);
        this.withdrawCountRespSignal.on(this, this.onWithdrawCountResp);
    }

    onTaskCancel() {
        this.withdrawCountRespSignal.off(this, this.onWithdrawCountResp);
    }

    private onWithdrawCountResp(resp: WithdrawCountResp) {
        this.setComplete(resp);
        this.withdrawCountRespSignal.off(this, this.onWithdrawCountResp);
    }
}
