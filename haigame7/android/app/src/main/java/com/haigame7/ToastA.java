package com.haigame7;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by aran.hu on 2016/5/13.
 */
public class ToastA extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;
    public ToastA(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ToastA";
    }

    @ReactMethod
    public  void show(String detail){
        Toast.makeText(reactContext,detail, Toast.LENGTH_SHORT).show();
    }
}
