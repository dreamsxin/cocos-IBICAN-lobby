import AssetsConfig from "../../../libs/common/scripts/modules/assets/AssetsConfig";
// import AssetsUtils from "../../../libs/common/scripts/utils/AssetsUtils";
import LoadingPanel from "./views/LoadingPanel";
import LoginPanel from "../login/views/LoginPanel";
import RegisterPanel from "../login/views/RegisterPanel";
import BaseAlertPanel from "../../../libs/common/scripts/modules/tips/views/BaseAlertPanel";
import SafeBoxPanel from "../safeBox/views/SafeBoxPanel";
import InputPwdPanel from "../safeBox/views/InputPwdPanel";
import ChangePwdPanel from "../../common/views/ChangePwdPanel";
import PersonalCenterPanel from "../user/views/PersonalCenterPanel";
import ChangeNicknamePanel from "../user/views/ChangeNicknamePanel";
import SettingPanel from "../setting/views/SettingPanel";
import ActivityPanel from "../activity/views/ActivityPanel";
import HotUpdatePanel from "./views/HotUpdatePanel";
import RetrievePwdPanel from "../login/views/RetrievePwdPanel";
import ResetPwdPanel from "../login/views/ResetPwdPanel";
import RechargePanel from "../recharge/views/RechargePanel";
import WithdrawCashPanel from "../recharge/views/withdrawCash/WithdrawCashPanel";

import MaintenancePanel from "../activity/views/MaintenancePanel";
import ServicePanel from "../service/ServicePanel";
import FirstChargePanel from "../giftBox/view/FirstChargePanel";
import BindPhonePanel from "../giftBox/view/BindPhonePanel";
import RegisterSendGoldPanel from "../giftBox/view/RegisterSendGoldPanel";
import CompactPanel from "../login/views/CompactPanel";
import LobbyTipsPanel from "../tips/views/LobbyTipsPanel";
import DisconnectPanel from "../login/views/DisconnectPanel";
import BindBankPanel from "../recharge/views/BingBankPanel";
import BindAlipayPanel from "../recharge/views/BindAlipayPanel";
import RechargeDetailsPanel from "../recharge/views/RechargeDetailsPanel";
import WithdrawDetailsPanel from "../recharge/views/withdrawCash/WithdrawDetailsPanel";
import AssetsUtils from "../../../libs/common/scripts/utils/AssetsUtils";

import PopularizePanel from "../popularize/views/PopularizePanel";
import PopularizeHelpPanel from "../popularize/views/PopularizeHelpPanel";
import PopularizeReceiveRecordsPanel from "../popularize/views/PopularizeReceiveRecordsPanel";
import PopularizeWithdrawalCommissionPanel from "../popularize/views/PopularizeWithdrawalCommissionPanel";
import PopularizeRebateListPanel from "../popularize/views/PopularizeRebateListPanel";
import PopularizeCodeImagePanel from "../popularize/views/PopularizeCodeImagePanel";
import RankPanel from "../rank/views/RankPanel";
import LobbyMarqueePanel from "../marquee/views/LobbyMarqueePanel";
import LobbyMailPanel from "../mail/views/LobbyMailPanel";
import LobbyMailAwardsPanel from "../mail/views/LobbyMailAwardsPanel";
import ActivityDailyShare from "../activity/views/ActivityDailyShare";
import ActivityDailyDraw from "../activity/views/ActivityDailyDraw";
import GoldGainPanel from "../activity/views/GoldGainPanel";
import DrawHelpPanel from "../activity/views/DrawHelpPanel";
import ContactAgencyPanel from "../recharge/views/ContactAgencyPanel";


// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export default class LobbyAssetsConfig extends AssetsConfig {
    public static readonly PKG_SAFEBOX:string = "safeBox";
    public static readonly PKG_CHANGEPWD:string = "changePwd";
    public static readonly PKG_PERSONALCENTER:string = "personalCenter";
    public static readonly PKG_SETTING:string = "setting";
    public static readonly PKG_ACTIVITY:string = "activity";
    public static readonly PKG_RECHARGE:string = "recharge";
    public static readonly PKG_WITHDRAW_CASH:string = "withdrawCash";
    public static readonly PKG_FIRST_CHARGE:string = "firstCharge";
    public static readonly PKG_BINDING_PHONE:string = "bindingPhone";
    public static readonly PKG_REGISTER_SEND_GOLD_PANEL:string = "registerSendGold";    
    public static readonly PKG_NOTICE:string = "notice";

    public static readonly PKG_POPULARIZE: string = "popularize";
    public static readonly PKG_RANK: string = "rank";
    public static readonly PKG_MAIL: string = "mail";
    
    //???????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_NOTICE, LobbyTipsPanel, true)
    public static readonly NOTICE_TIP_PANEL = "ui/lobbyTipPanel/lobbyTipPanel";

    @AssetsUtils.panel(AssetsConfig.GROUP_INIT, AssetsConfig.PKG_LOADING, LoadingPanel, true)
    public static readonly LOADING_PANEL = "ui/assets/loadingPanel";

    // ????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, AssetsConfig.PKG_LOGIN, LoginPanel, true)
    public static readonly LOGIN_PANEL = "ui/login/loginPanel";

    // ????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, AssetsConfig.PKG_LOGIN, RegisterPanel, true)
    public static readonly REGISTER_PANEL = "ui/login/registerPanel";

    // ????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, AssetsConfig.PKG_TIPS, BaseAlertPanel, true)
    public static readonly ALERT_PANEL = "ui/tips/alertPanel"

    //???????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_SAFEBOX, SafeBoxPanel, true)
    public static readonly SAFEBOX_PANEL = "ui/safeBox/safeBoxPanel";

    //?????????????????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_SAFEBOX, InputPwdPanel, true)
    public static readonly INPUTPWD_PANEL = "ui/safeBox/inputPwdPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_CHANGEPWD, ChangePwdPanel, true)
    public static readonly CHANGEPWD_PANEL = "ui/safeBox/changePwdPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_PERSONALCENTER, PersonalCenterPanel, true)
    public static readonly PERSONALCENTER_PANEL = "ui/personalCenter/personalCenterPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_PERSONALCENTER, ChangeNicknamePanel, true)
    public static readonly CHANGENICKNAME_PANEL = "ui/personalCenter/ChangeNicknamePanel";
    
    //????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_SETTING, SettingPanel, true)
    public static readonly SETTING_PANEL = "ui/setting/settingPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_ACTIVITY, ActivityPanel, true)
    public static readonly ACTIVITY_PANEL = "ui/activity/activityPanel";

    //????????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_ACTIVITY, ActivityDailyShare, true)
    public static readonly ACTIVITYDAILYSHARE_PANEL = "ui/activity/activityDailyShare";

    //???????????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_ACTIVITY, ActivityDailyDraw, true)
    public static readonly ACTIVITYDAILYDRAW_PANEL = "ui/activity/activityDailyDraw";

    //?????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_ACTIVITY, DrawHelpPanel, true)
    public static readonly DRAW_HELP_PANEL = "ui/activity/drawHelp";

    //?????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_ACTIVITY, GoldGainPanel, true)
    public static readonly GOLDGAINSPINE_PANEL = "ui/activity/gainGoldPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, AssetsConfig.PKG_LOGIN, RetrievePwdPanel, true)
    public static readonly RETRIEVE_PANEL = "ui/login/retrievePwdPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, AssetsConfig.PKG_LOGIN, ResetPwdPanel, true)
    public static readonly RESET_PANEL = "ui/login/resetPwdPanel";

    // ????????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_LOGIN, HotUpdatePanel, true)
    public static readonly HOT_UPDATE_PANEL = "ui/assets/hotUpdatePanel";

     //??????
     @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RECHARGE, RechargePanel, true)
     public static readonly RECHARGE_PANEL = "ui/recharge/rechargePanel";
 
     //??????
     @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_WITHDRAW_CASH, WithdrawCashPanel, true)
     public static readonly WITHDRAW_CASH_PANEL = "ui/recharge/withdrawCashPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_FIRST_CHARGE, FirstChargePanel, true)
    public static readonly FIRST_CHARGE_PANEL = "ui/giftBox/firstChargePanel";

    //????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_BINDING_PHONE, BindPhonePanel, true)
    public static readonly BINDING_PHONE = "ui/giftBox/bindPhonePanel";

    //????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_REGISTER_SEND_GOLD_PANEL, RegisterSendGoldPanel, true)
    public static readonly REGISTER_SEND_GOLD_PANEL = "ui/giftBox/registerSendGoldPanel";

    //????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_ACTIVITY, MaintenancePanel, true)
    public static readonly MAINTENANCE_PANEL = "ui/activity/maintenancePanel";

    //??????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_WITHDRAW_CASH, ServicePanel, true)
    public static readonly SERVICE_PANEL = "ui/service/servicePanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_LOGIN, CompactPanel, true)
    public static readonly COMPACT_PANEL = "ui/login/compactPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_LOGIN, DisconnectPanel, true)
    public static readonly DISCONNECT_PANEL = "ui/login/disconnectPanel";

    //?????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RECHARGE, BindBankPanel, true)
    public static readonly BIND_BANK_PANEL = "ui/recharge/bindBankPanel";

    //?????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RECHARGE, BindAlipayPanel, true)
    public static readonly BIND_ALIPAY_PANEL = "ui/recharge/bindAlipayPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RECHARGE, RechargeDetailsPanel, true)
    public static readonly RECHARGE_DETAILS_PANEL = "ui/recharge/rechargeDetailsPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RECHARGE, WithdrawDetailsPanel, true)
    public static readonly WITHDRAW_DETAILS_PANEL = "ui/recharge/withdrawDetailsPanel";

    //????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_POPULARIZE, PopularizePanel, true)
    public static readonly POPULARIZE_PANEL = "ui/popularize/popularizePanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_POPULARIZE, PopularizeHelpPanel, true)
    public static readonly POPULARIZE_HELP_PANEL = "ui/popularize/popularizeHelpPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_POPULARIZE, PopularizeReceiveRecordsPanel, true)
    public static readonly POPULARIZE_RECEIVE_RECORDS_PANEL = "ui/popularize/popularizeReceiveRecordsPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_POPULARIZE, PopularizeWithdrawalCommissionPanel, true)
    public static readonly POPULARIZE_WITHDRAWAL_PANEL = "ui/popularize/popularizeWithdrawalCommissionPanel";

    //????????????????????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_POPULARIZE, PopularizeRebateListPanel, true)
    public static readonly POPULARIZE_REBATE_LIST_PANEL = "ui/popularize/popularizeRebateListPanel";

    //????????????????????????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_POPULARIZE, PopularizeCodeImagePanel, true)
    public static readonly POPULARIZE_CODE_IMAGE_PANEL = "ui/popularize/popularizeCodeImagePanel";
    
    //???????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RANK, RankPanel, true)
    public static readonly RANK_PANEL = "ui/rank/rankPanel";

    //?????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_COMMON, LobbyMarqueePanel, true)
    public static readonly MARQUEE_PANEL = "ui/lobbyMarquee/lobbyMarqueePanel";

    //????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_MAIL, LobbyMailPanel, true)
    public static readonly LOBBY_MAIL_PANEL = "ui/mail/lobbyMailPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_MAIL, LobbyMailAwardsPanel, true)
    public static readonly LOBBY_MAIL_AWARDS_PANEL = "ui/mail/lobbyMailAwardsPanel";

    //??????????????????
    @AssetsUtils.panel(AssetsConfig.GROUP_PRELOADING, LobbyAssetsConfig.PKG_RECHARGE, ContactAgencyPanel, true)
    public static readonly CONNECT_AGENCY_PANEL = "ui/recharge/contactAgencyPanel";

}
