'use strict'

import React,{
  Platform,
  DeviceEventEmitter,
  NativeAppEventEmitter
} from 'react-native'
import WeChatAndroid from 'react-native-wechat-android';
import WeChatIOS from 'react-native-wechat-ios';

let appId = 'wxb0cb6c44afd49f5a';
var subscription = ""; //ios接收支付时间推送,以便卸载NativeAppEventEmitter


/**
 * 暂时没用到
 */
export default class WeChatSDK extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      registerWechat: false
    }
  }
  componentWillMount() {
    if (Platform.OS == 'android') {
      WeChatAndroid.registerApp(appId,(err,registerOK) => {
          // Toast.show(registerOK + '',Toast.SHORT);
          if(registerOK) {
            this.setState({registerWechat: true})
          } else {
            Toast.show('WeChatSDK 注册失败' + '',Toast.SHORT);
          }
      }
    } else if (Platform.OS == 'ios') {
      WeChatIOS.registerApp(appId, (res) => {
        if(res) {
          Toast.show(res.toString())
          this.setState({registerWechat: true})
        } else {
          Toast.show('WeChatSDK 注册失败' + '',Toast.SHORT);
        }
      });
      subscription = NativeAppEventEmitter.addListener(
        'finishedPay',
        (res) => {
          console.log('回调的支付结果');
          console.log(res)
        }
      );
    }
    else {
      console.log("WeChatSDK 未知系统");
    }
  }

  componentWillUnmount() {
    if (Platform.OS == 'ios') {
      if(subscription != undefined) {
        // console.log("卸载subscription");
        subscription.remove();
      }
    }
  }

  _weChatPay() {
    if (Platform.OS == 'android') {
      WeChatAndroid.weChatPay(payOptions,(err,sendReqOK) => {
        console.log('发起支付');
        console.log(sendReqOK);
      });
    } else if(Platform.OS == 'ios') {
      WeChatIOS.weChatPay(payOptions,(res) => {
        console.log(res);
        if(res) {

        } else {
          Toast.show("请求支付错误,请稍后重试!")
        }
      })
    } else {
      console.log("WeChatSDK 未知系统");
    }
  }
  _weChatShareText() {

  }
  _weChatShareImageAndText() {

  }



  isWXAppInstalled() {

  }
  isWXAppSupportAPI() {

  }
}
