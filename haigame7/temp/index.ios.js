/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator,
  Dimensions
} from 'react-native';

import App from './app/view/common/app';
// var Header = require('./app/view/common/Header'); // 主屏
let _navigator;
var BaseLeftToRightGesture = {

  // If the gesture can end and restart during one continuous touch
  isDetachable: false,

  // How far the swipe must drag to start transitioning
  gestureDetectMovement: 2,

  // Amplitude of release velocity that is considered still
  notMoving: 0.3,

  // Fraction of directional move required.
  directionRatio: 0.66,

  // Velocity to transition with when the gesture release was "not moving"
  snapVelocity: 2,

  // Region that can trigger swipe. iOS default is 30px from the left edge
  edgeHitWidth: 30,

  // Ratio of gesture completion when non-velocity release will cause action
  stillCompletionRatio: 3 / 5,

  fullDistance: Dimensions.get('window').width,

  direction: 'left-to-right',

};
var BaseOverswipeConfig = {
  frictionConstant: 1,
  frictionByDistance: 1.5,
};
class haigame7 extends Component {
  componentWillMount() {
      if (Platform.OS === 'android') {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
      }
    }
    componentWillUnmount() {
      if (Platform.OS === 'android') {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
      }
    }
    onBackAndroid(){
      const nav = _navigator;
      const routers = nav.getCurrentRoutes();
      var lastBackPressed = Date.now();
      if (routers.length > 1) {
        nav.pop();
        return true;
      }else {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          //最近2秒内按过back键，可以退出应用。
          return false;
        }
        lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
      }
    }

  render() {
      var defaultName = 'AppComponent';
      var defaultComponent = App;
      return (
        <Navigator
          initialRoute={{ name: defaultName,component: defaultComponent }}
          configureScene={(route,_navigator) => {
            let config = route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJump;
            if(_navigator.length == 1) {
              config.gestures.jumpForward.overswipe = null;
              config.gestures.jumpBack.overswipe = null;
            }
            return config;
          }}
          renderScene={(route, navigator) => {
            // console.log(navigator.getCurrentRoutes().length);
            let config = route.sceneConfig
            if (config != undefined) {
              console.log(navigator.getCurrentRoutes().length);
              if(navigator.getCurrentRoutes().length == 1){
                config.gestures.jumpBack = {
                  ...BaseLeftToRightGesture,
                  overswipe: BaseOverswipeConfig,
                  edgeHitWidth: null,
                  isDetachable: true,
                }
              } else {
                console.log('设置回退为空');
                config.gestures.jumpBack.overswipe = null;
              }
            }

            let Component  = route.component;
            _navigator = navigator //android 设置返回按键导航
            return <Component {...route.params} navigator={navigator} />
          }}/>
      );
    }
}


AppRegistry.registerComponent('haigame7', () => haigame7);
