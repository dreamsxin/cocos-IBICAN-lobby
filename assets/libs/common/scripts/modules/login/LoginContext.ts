import LoginModel from "./models/LoginModel";
import LoginServer from "./servers/LoginServer";
import OnClickLoginSignal from "./signals/OnClickLoginSignal";
import BaseLoginMediator from "./views/BaseLoginMediator";
import ShowLoginPanelSignal from "./signals/ShowLoginPanelSignal";
import ShowLoginPanelCommand from "./commands/ShowLoginPanelCommand";
import BaseLoginPanel from "./views/BaseLoginPanel";
import RequestLoginSignal from "./signals/RequestLoginSignal";
import RequestLoginPassportCommand from "./commands/RequestLoginPassportCommand";
import RequestLoginGameCommand from "./commands/RequestLoginGameCommand";
import BaseRegisterPanel from "./views/BaseRegisterPanel";
import BaseRegisterMediator from "./views/BaseRegisterMediator";
import OnClickRegisterSignal from "./signals/OnClickRegisterSignal";
import ShowRegisterPanelSignal from "./signals/ShowRegisterPanelSignal";
import ShowRegisterPanelCommand from "./commands/ShowRegisterPanelCommand";
import RequestVerifyCodeSignal from "./signals/RequestVerifyCodeSignal";
import RequestVerifyCodeCommand from "./commands/RequestVerifyCodeCommand";
import RequestRegisterSignal from "./signals/RequestRegisterSignal";
import RequestRegisterCommand from "./commands/RequestRegisterCommand";
import OnLoginSuccessSignal from "./signals/OnLoginSuccessSignal";
import PrepareLoginSpecCommand from "./commands/PrepareLoginSpecCommand";
import OnLoginFailedSignal from "./signals/OnLoginFailedSignal";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class LoginContext extends riggerIOC.ModuleContext {
    /**
     * ????????????
     */
    bindInjections(): void {
        this.injectionBinder.bind(LoginModel).toSingleton();
        this.injectionBinder.bind(LoginServer).toSingleton();
        this.injectionBinder.bind(OnClickLoginSignal).toSingleton();
        this.injectionBinder.bind(OnClickRegisterSignal).toSingleton();
        this.injectionBinder.bind(OnLoginSuccessSignal).toSingleton();
        this.injectionBinder.bind(OnLoginFailedSignal).toSingleton();
    }

    /**
     * ????????????
     */
    bindCommands(): void {
        // ??????????????????
        this.commandBinder.bind(ShowLoginPanelSignal).to(ShowLoginPanelCommand);
        // ??????????????????
        this.commandBinder.bind(ShowRegisterPanelSignal).to(ShowRegisterPanelCommand);

        // ????????????
        this.commandBinder.bind(RequestLoginSignal)
        .inSequence()
        .to(PrepareLoginSpecCommand)
        .to(RequestLoginPassportCommand)
        .to(RequestLoginGameCommand);

        // ?????????????????????
        this.commandBinder.bind(RequestVerifyCodeSignal).to(RequestVerifyCodeCommand);
        // ????????????
        this.commandBinder.bind(RequestRegisterSignal).to(RequestRegisterCommand);
    }

    /**
     * ???????????????Mediator
     */
    bindMediators(): void {
        this.mediationBinder.bind(BaseLoginPanel).to(BaseLoginMediator);
        this.mediationBinder.bind(BaseRegisterPanel).to(BaseRegisterMediator);
    }

    /**
     * ????????????????????????
     */
    protected onStart(): void {
        cc.log(`start login context`)
        this.done();
    }
}
