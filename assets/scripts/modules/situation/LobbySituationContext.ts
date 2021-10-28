import SituationContext from "../../../libs/common/scripts/modules/situation/SituationContext";
import SituationServer from "../../../libs/common/scripts/modules/situation/servers/SituationServer";
import LobbySituationServer from "./servers/LobbySituationServer";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export default class LobbySituationContext extends SituationContext {
    bindInjections() {
        super.bindInjections();
        this.injectionBinder.bind(SituationServer).to(LobbySituationServer);
    }
}
