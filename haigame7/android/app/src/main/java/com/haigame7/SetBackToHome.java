package com.haigame7;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by mrc on 2016/5/16.
 */
public class SetBackToHome extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;
    public SetBackToHome(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SetBackToHome";
    }
    @ReactMethod
    public void setBackToHome(){
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Intent i=  new Intent(Intent.ACTION_MAIN);
                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                i.addCategory(Intent.CATEGORY_HOME);
                reactContext.startActivity(i);
                Log.i("SetBackToHome","hui homele");
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "Could not open the activity : " + e.getMessage());
        }
//        Toast.makeText(reactContext,activityName,Toast.LENGTH_SHORT).show();

    }

}
