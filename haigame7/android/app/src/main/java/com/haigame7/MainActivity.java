package com.haigame7;

import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import cn.reactnative.modules.update.UpdatePackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.heng.wechat.WeChatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.remobile.datetimepicker.*;
import com.imagepicker.ImagePickerPackage;
import com.remobile.toast.RCTToastPackage;

import cn.reactnative.httpcache.HttpCachePackage;
import java.util.Arrays;
import java.util.List;

import cn.reactnative.modules.update.UpdateContext;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "haigame7";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new UpdatePackage(),
        new RCTSplashScreenPackage(MainActivity.this),
        new WeChatPackage(),
        new RCTDateTimePickerPackage(MainActivity.this),
        new VectorIconsPackage(),
        new ImagePickerPackage(),
        new RCTToastPackage(),
        new HttpCachePackage(),
           new    MyPacket()
      );
    }

    /*热更新*/
    @Override
    protected String getJSBundleFile() {
        return UpdateContext.getBundleUrl(this);
    }
}
