package com.jp.utils;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.pm.ActivityInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.ParseException;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.os.Environment;
import android.os.Looper;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Base64;
import android.util.Log;

import org.cocos2dx.javascript.SDKWrapper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.Channels;
import java.text.SimpleDateFormat;
import java.util.Date;

import static android.content.Context.CLIPBOARD_SERVICE;
/**
 * Created by Administrator on 2019/4/3.
 */

public class Utils {


    public static boolean copy(String text){
        final String str = text;
        try {
            new Thread() {
                public void run() {
                    Looper.prepare();
                    ClipboardManager myclipboard;
                    myclipboard = (ClipboardManager) SDKWrapper.getInstance().getContext().getSystemService(CLIPBOARD_SERVICE);
                    ClipData myClip;
                    myClip = ClipData.newPlainText("text", str);
                    myclipboard.setPrimaryClip(myClip);
                    Looper.loop();
                }
            }.start();
            return true;
        } catch (Exception e) {
            return  false;
        }
    }

    public static String getDeviceId() {
        String m_szAndroidID = Settings.Secure.getString(SDKWrapper.getInstance().getContext().getContentResolver(),
                Settings.Secure.ANDROID_ID);
        return m_szAndroidID;
    }

    public static void setOrientation(int orientation) {
        final Activity activity = (Activity) SDKWrapper.getInstance().getContext();
        if(orientation == 1) {
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        } else if (orientation == 2) {
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        } else if (orientation == 3) {
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
        }
    }

    /** ?????????????????????*/
    public static boolean saveImageToAlbum(String fullPath) {
        return SaveImageToAlbumUtil.saveImageToAlbum(fullPath);
    }

    /** ?????????????????? */
    public static int getReferrerId(){
        return  OpenInstallUtils.getReferrerId() ;
    }

    public static String getReferrerChannel(){
        return OpenInstallUtils.getReferrerChannel();
    }

    public static int getGameId(){
        return OpenInstallUtils.getGameId();
    }

    /**
     * ??????App  id 1-Weichat 2-QQ 3-Alipay
     */
    public static boolean jumpApp(int appId){
        final Activity activity = (Activity) SDKWrapper.getInstance().getContext();
        String appPackageName = "";
        String appClassName = "";
        switch (appId) {
            case 1: //weichat
                appPackageName = "com.tencent.mm";
                appClassName = "com.tencent.mm.ui.LauncherUI";
                break;
            case 2: //qq
                appPackageName = "com.tencent.mobileqq";
                appClassName = "com.tencent.mobileqq.activity.SplashActivity";
                break;
            case 3: //alipay
                appPackageName = "com.eg.android.AlipayGphone";
                appClassName = "com.alipay.mobile.quinox.splash.ShareDispenseActivity";
                break;
            default:
                break;
        }
        try {
            Intent intent = new Intent(Intent.ACTION_MAIN);
            ComponentName cmp = new ComponentName(appPackageName,appClassName);
            intent.addCategory(Intent.CATEGORY_LAUNCHER);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.setComponent(cmp);
            activity.startActivity(intent);
            return true;
        } catch (ActivityNotFoundException e) {
            // TODO: handle exception
            return false;
        }
    }

    /**
     * ??????????????????
     */
    public static boolean isInstallWx() {
        return  WXApiUtils.getInstance().getApi().isWXAppInstalled();
    }

    /**
     * ?????????????????????
     * imgName ??????base64???????????????
     * type: 0-?????? 1-????????? 2-??????
     */
    public static void shareImgToWX(String imgBase64Data, int type) {
        byte[] bytes = Base64.decode(imgBase64Data, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
        WXApiUtils.getInstance().shareImgToWx(bmp, type);
    }

    /**
     * ?????????????????????
     * @param url ??????
     * @param title ??????
     * @param description ??????
     * @param imgBase64Data ????????????base64???????????????
     * @param type 0-???????????? 1-?????????
     */
    public static void shareWebpageToWX(String url, String title, String description, String imgBase64Data, int type) {
        byte[] bytes = Base64.decode(imgBase64Data, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
        WXApiUtils.getInstance().shareWebPageToWx(url, title, description, bmp, type);
    }
}