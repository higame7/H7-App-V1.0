/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import WeChat from 'react-native-wechat-ios';

let {
    View, Text, StyleSheet, ScrollView,
    AlertIOS, TouchableHighlight,
    NativeAppEventEmitter
} = React;

let appid = 'wxb0cb6c44afd49f5a';

function show(title, msg) {
    AlertIOS.alert(title+'', msg+'');
}

export default class Example extends React.Component {
    componentDidMount() {
        // this.registerApp();

        NativeAppEventEmitter.addListener(
          'didRecvAuthResponse',
          (response) => AlertIOS.alert(JSON.stringify(response))
        );

        NativeAppEventEmitter.addListener(
            'didRecvMessageResponse',
            (response) => {
                if (parseInt(response.errCode) === 0) {
                    alert('分享成功');
                } else {
                    alert('分享失败');
                }
            }
        );
    }

    registerApp() {
        WeChat.registerApp(appid, (res) => {
            show('registerApp', res);
        });
    }
    wechatPay() {
      let url = 'http://wx.haigame7.com/Weixin/JsApiPay?PhoneNum=15101075738&TotalFee=1&tradeType=APP';
      let payOptions = {
        appId: '',
        nonceStr: '',
        package: '',
        partnerId: '',
        prepayId: '',
        timeStamp: '',
        sign: '',
      };
      fetch(url).then(function(res) {
        // res instanceof Response == true.
        if (res.ok) {
          res.json().then(function(_data) {
            console.log("服务器传回参数");
            console.log(_data);
            payOptions['appId'] = _data.appid
            payOptions['nonceStr'] = _data.noncestr
            payOptions['partnerId'] = _data.partnerid
            payOptions['prepayId'] = _data.prepayid
            payOptions['package'] = _data.package
            payOptions['timeStamp'] = _data.timestamp
            payOptions['sign'] = _data.sign
            console.log("发起支付请求，参数:");
            console.log(payOptions);
            WeChat.weChatPay(payOptions, (res) => {
                show('wechatPay', res);
            });
          });
        } else {
          console.log("Looks like the response wasn't perfect, got status", res.status);
        }
      }, function(e) {
        console.log("Fetch failed!", e);
      });
    }
    registerAppWithDesc() {
        let appdesc = '测试';
        WeChat.registerApp(appid, appdesc, (res) => {
            show('registerAppWithDesc', res);
        });
    }

    isWXAppInstalled() {
        WeChat.isWXAppInstalled((res) => {
            show('isWXAppInstalled', res);
        });
    }

    getWXAppInstallUrl() {
        WeChat.getWXAppInstallUrl((res) => {
            show('getWXAppInstallUrl', res);
        });
    }

    isWXAppSupportApi() {
        WeChat.isWXAppSupportApi((res) => {
            show('isWXAppSupportApi', res);
        });
    }

    getApiVersion() {
        WeChat.getApiVersion((res) => {
            show('getApiVersion', res);
        });
    }

    openWXApp() {
        WeChat.openWXApp((res) => {
            show('openWXApp', res);
        });
    }

    sendAuthReq() {
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_test';
        WeChat.sendAuthReq(scope, state, (res) => {
            show('sendAuthReq', res);
        });
    }

    sendLinkURL() {
        WeChat.sendLinkURL({
            link: 'https://www.qianlonglaile.com/web/activity/share?uid=d1NrTmtrdVNFNzVmelVCQitpaEZxZz09&date=1449818774&from=groupmessage&isappinstalled=0#!/',
            tagName: '钱隆',
            title: '哈哈哈哈哈哈',
            desc: '噢噢噢噢哦哦哦哦哦哦',
            thumbImage: 'https://dn-qianlonglaile.qbox.me/static/pcQianlong/images/buy_8e82463510d2c7988f6b16877c9a9e39.png',
            scene: 0
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.wrapper}>

                <Text style={styles.pageTitle}>WeChat SDK for React Native (iOS)</Text>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.registerApp}>
                    <Text style={styles.buttonTitle}>registerApp</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.wechatPay}>
                    <Text style={styles.buttonTitle}>wechatPay</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.sendLinkURL}>
                    <Text style={styles.buttonTitle}>sendLinkURL</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.registerAppWithDesc}>
                    <Text style={styles.buttonTitle}>registerAppWithDesc</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.isWXAppInstalled}>
                    <Text style={styles.buttonTitle}>isWXAppInstalled</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.isWXAppSupportApi}>
                    <Text style={styles.buttonTitle}>isWXAppSupportApi</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.getApiVersion}>
                    <Text style={styles.buttonTitle}>getApiVersion</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.getWXAppInstallUrl}>
                    <Text style={styles.buttonTitle}>getWXAppInstallUrl</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.openWXApp}>
                    <Text style={styles.buttonTitle}>openWXApp</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button} underlayColor="#f38"
                    onPress={this.sendAuthReq}>
                    <Text style={styles.buttonTitle}>sendAuthReq</Text>
                </TouchableHighlight>




            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    wrapper: {
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center',
    },
    pageTitle: {
        paddingBottom: 40
    },
    button: {
        width: 200,
        height: 40,
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#f38',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 16,
        color: '#fff'
    }
});
