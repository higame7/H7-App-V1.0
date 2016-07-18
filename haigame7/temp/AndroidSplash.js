
'use strict';

/**
 * [APP入口]
 * @author aran.hu
 */
var React = require('react-native');
var {
  Text,
  View,
  Navigator,
  BackAndroid,
  AppRegistry,
  Component
} = React;

var IndexStyle = require('./app/styles/IndexStyle'); // 样式
var TimerMixin = require('react-timer-mixin'); // RN的计时器
var SplashScreen = require('./app/view/common/SplashScreen'); // 飞屏
var MainScreen = require('./app/view/common/MainScreen'); // 主屏
var _navigator; // 页面管理器

// 后退按钮 Android
// BackAndroid.addEventListener('hardwareBackPress', function () {
//   if (_navigator && _navigator.getCurrentRoutes().length > 1) {
//     _navigator.pop();
//     return true;
//   }
//   return false;
// });


var haigame7 = React.createClass({
   //mixins: [TimerMixin], // 延迟器 可以不用这个了 官网可以改成es6的方式
  //  // 初始化状态
   getInitialState: function () {
     return {
       splashed: true
     };
   },
   // 页面加载
  componentDidMount: function () {
    //mixin fun
    this.timer = setTimeout(
      ()=> {
        this.setState({splashed: false});
        console.log('生效啦');
      }, 2000);
    },

    // 线路映射
    /**
     * [routeMapper description]
     * @param  {[type]} route:     Map           [router parameter]
     * @param  {[type]} navigator: Navigator     [navigator compoent]
     * @return {[type]}            [description]
     * http://www.cnblogs.com/flyingzl/articles/4913693.html 后面按照这个改就行
     */
    routeMapper: function (route: Map, navigator: Navigator) {
      _navigator = navigator;
      if (route.name === 'home') {
        return (
          <View style={IndexStyle.container}>
            <MainScreen/>
          </View>
        );
      }
    },

    render: function () {
        if (!this.state.splashed) {
          // 初始路径
          var initialRoute = {name: 'home'};
          return (
            <Navigator
            style={IndexStyle.container}
            initialRoute={initialRoute}
            configureScene={() => Navigator.SceneConfigs.FadeAndroid}
            renderScene={this.routeMapper}/>
          );
        } else {
          return (
            <SplashScreen/> /*飞屏*/
          );
        }
      }
});

AppRegistry.registerComponent('haigame7', () => haigame7);
