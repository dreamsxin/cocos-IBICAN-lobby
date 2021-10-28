import Constants from "../libs/common/scripts/Constants";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * SIT 
 */
export default class LobbyConstants extends Constants {
    public readonly defaultChannelName:string = "lobby";
    public readonly situationId:string | number = "lobby";

    // 服务器相关设置
    // 各种API的地址
    public readonly jpApiUrl:string = "http://sit.jinpin.com:8080/";

    // 客户端（web）地址
    public readonly jpClientUrl:string = "http://sit.jinpin.com:9090/"

    public readonly jpLobbyServerUrl:string = `ws://sit.jinpin.com:8080/lobby/myWebSocket`;

    // 更新服务器路径
    public readonly updatingServerUrl:string = `${this.jpClientUrl}Public/items/`;

    // 当前环境
    public readonly env: string = "sit";
}
