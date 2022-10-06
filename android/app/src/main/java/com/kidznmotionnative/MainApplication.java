package com.kidznmotionnative;

// // expo-modules https://docs.expo.dev/bare/installing-expo-modules/?redirected
// import android.content.res.Configuration;
// import expo.modules.ApplicationLifecycleDispatcher;
// import expo.modules.ReactNativeHostWrapper;
// //

import android.app.Application;
import android.content.Context;

import android.content.res.Configuration; // expo https://github.com/expo/fyi/blob/main/expo-modules-migration.md
import androidx.annotation.NonNull;       // expo https://github.com/expo/fyi/blob/main/expo-modules-migration.md

import expo.modules.ApplicationLifecycleDispatcher; // expo https://github.com/expo/fyi/blob/main/expo-modules-migration.md
import expo.modules.ReactNativeHostWrapper;         // expo https://github.com/expo/fyi/blob/main/expo-modules-migration.md


import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.kidznmotionnative.newarchitecture.MainApplicationReactNativeHost;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      // new ReactNativeHostWrapper(this, new ReactNativeHost(this) {  // expo-modules https://docs.expo.dev/bare/installing-expo-modules/?redirected
      private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper( // expo https://github.com/expo/fyi/blob/main/expo-modules-migration.md
        this,
        new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      }); // https://docs.expo.dev/bare/installing-expo-modules/?redirected

  private final ReactNativeHost mNewArchitectureNativeHost =
      new ReactNativeHostWrapper(this, new MainApplicationReactNativeHost(this)); // https://docs.expo.dev/bare/installing-expo-modules/?redirected

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    ApplicationLifecycleDispatcher.onApplicationCreate(this); // https://docs.expo.dev/bare/installing-expo-modules/?redirected
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.kidznmotionnative.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  // expo https://github.com/expo/fyi/blob/main/expo-modules-migration.md
  //      AND 
  // expo-modules https://docs.expo.dev/bare/installing-expo-modules/?redirected
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }
  //
}
