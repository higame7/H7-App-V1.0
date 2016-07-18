'use strict'

var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var Util = require('../common/util');
var dismissKeyboard = require('dismissKeyboard')
var {
  View,
  Component,
  Text,
  TextArea,
  TextInput,
  Image,
  Navigator,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  ToastAndroid
} = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import AssertService from '../../network/assertservice';
import Toast from '@remobile/react-native-toast';
import WeChatAndroid from 'react-native-wechat-android';
import WeChatIOS from 'react-native-wechat-ios';
import Spinner from 'react-native-loading-spinner-overlay';
let appId = 'wxb0cb6c44afd49f5a';
let outTradeno = "";
var subscription = ""; //接收支付时间推送

function show(title, msg) {
    Toast.show(title+': '+ msg);
}
export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: {
        money:'',
        certifyid:'000000',
      },
      content:undefined,
      messages: [],
      loading: false,
      registerWechat: false,
      isWXAppInstalled: true,
      isWXAppSupportApi: true,
      loaded: false
    }
  }
  componentWillMount() {
    let _this = this
    if (Platform.OS == 'android') {
      WeChatAndroid.registerApp(appId,(err,registerOK) => {
          // Toast.show(registerOK + '',Toast.SHORT);
          if(registerOK) {
            this.setState({registerWechat: true})
          } else {
            Toast.showShortCenter('支付功能异常' + '',Toast.SHORT);
          }
      });
      //  处理支付回调结果
      DeviceEventEmitter.addListener('finishedPay',function(res){
       var success = res.success;
       if(success){
        // 在此发起网络请求由服务器验证是否真正支付成功，然后做出相应的处理

       }else{
         if(res.errCode == 0) {
           ToastAndroid.show('充值成功' + '',Toast.SHORT);
           _this.props._userAssetCallback('TotalAssertAndRank',1)
         } else if(res.errCode == -1) {
           ToastAndroid.show('支付失败,请稍后尝试' + '',Toast.SHORT);
           _this._rechargeFail()
         } else if(res.errCode == -2) {
          //  Toast.show('支付取消' + '',Toast.SHORT);
          // 这里不能用Toast不显示，如果要用需要额外写个方法，
           ToastAndroid.show('支付取消', ToastAndroid.SHORT)
           _this._rechargeFail()
         }
       }
      });
    } else {
      WeChatIOS.registerApp(appId, (res) => {
        if(res) {
          // Toast.show(res.toString())
          this.setState({registerWechat: true})
        } else {
          Toast.showShortCenter('支付功能异常' + '',Toast.SHORT);
        }
      });
      subscription = NativeAppEventEmitter.addListener(
        'finishedPay',
        (res) => {
          // console.log('回调的支付结果');

          // console.log(res.length)
          // console.log(res.errCode);
          if(res.errCode == 0) {
            Toast.showShortCenter('充值成功' + '',Toast.SHORT);
            _this.props._userAssetCallback('TotalAssertAndRank',{'startPage':1})
          } else if(res.errCode == -1) {
            Toast.showShortCenter('支付失败,请稍后尝试' + '',Toast.SHORT);
            this._rechargeFail()
          } else if(res.errCode == -2) {
            console.log("充值取消");
            Toast.showShortCenter('支付取消' + '',Toast.SHORT);
            this._rechargeFail()
          }
        }
      );
    }
  }

  componentDidMount() {
    this.isWXAppInstalled()
  }
  componentWillUnmount() {
    if (Platform.OS == 'ios') {
      if(subscription != undefined) {
        // console.log("卸载subscription");
        subscription.remove();
      }
    }
  }
  isWXAppInstalled() {
    if (Platform.OS == 'android') {
      WeChatAndroid.isWXAppInstalled(
       (err,isInstalled) => {
         if(!isInstalled) {
           this.setState({
             isWXAppInstalled: false
           })
           Toast.show("未安装微信应用，无法使用微信充值功能")
         } else {
           this.isWXAppSupportApi()
         }
       }
      );
    } else {
      WeChatIOS.isWXAppInstalled((res) => {
        // show('isWXAppInstalled: '+res); // true or false
        if(!res) {
          this.setState({
            isWXAppInstalled: false
          })
          Toast.show("未安装微信应用，无法使用微信充值功能")
        } else {
          this.isWXAppSupportApi()
        }
      });
    }
  }
  isWXAppSupportApi() {
    if (Platform.OS == 'android') {
      WeChatAndroid.isWXAppSupportAPI(
       (err,isSupport) => {
         if(!isSupport) {
           this.setState({
             isWXAppSupportApi: false
           })
           Toast.show("微信版本过低，无法使用微信充值功能")
         }
       }
      );
    } else {
      WeChatIOS.isWXAppSupportApi((res) => {
          // show('isWXAppSupportApi', res);
          if(!res) {
            this.setState({
              isWXAppSupportApi: false
            })
            Toast.show("微信版本过低，无法使用微信充值功能")
          }
      });
    }
  }





  renderMessages() {
    if (this.state.messages.length > 0) {
      let messages = this.state.messages.map((val, key) => {
        if (val.message) return <Text style={styles.message} key={key}>{val.message}</Text>;
      });
      return messages;
    }
  }

  _selectRecharge(money){
    this.setState({
      data:{money:money},
    });
    // console.log(this.state.data.money);
    return;
  }

  _rechargeFail() {
    // console.log("outTradeno==" + outTradeno);
    if(outTradeno != "") {
      AssertService.deleteAssetRecord(outTradeno,(response) => {
        // console.log(response[0].MessageCode);
        if (response[0].MessageCode == '0') {
          console.log("订单删除成功");
        } else {
          console.log('deleteAssetRecord 请求错误' + response[0].Message);
        }
      })
    } else {
      console.log("本页订单号错误,无法删除");
    }
  }
  _gotoRecharge(money,argument) {
    dismissKeyboard()
    let _money
    let temp
    if (money === "" || money == null || money == undefined) {
      temp = this.state.data.money;
    } else {
      temp = money;
    }
    if (temp === "" || temp == null || temp == undefined) {
      Toast.show("请选择或填写充值氦气数量");
      return
    }
    _money = temp.toString()
    let type = /^[0-9]*[1-9][0-9]*$/;
    let re = new RegExp(type);
    if (_money.match(re) == null) {
      Toast.show("请填写大于1的整数氦气数量");
      return
    }
    let url = 'http://wx.haigame7.com/Weixin/JsApiPay?'+ "PhoneNum=" + this.props.userData.PhoneNumber + "&TotalFee=" + _money + "&tradeType=APP";
    let payOptions = {
      appId: '',
      nonceStr: '',
      packageValue: '',
      partnerId: '',
      prepayId: '',
      timeStamp: '',
      sign: '',
    };
    fetch(url).then(function(res) {
      // res instanceof Response == true.
      if (res.ok) {
        res.json().then(function(_data) {
          // console.log("服务器传回参数");
          // console.log(_data);
          payOptions['appId'] = _data.appid
          payOptions['nonceStr'] = _data.noncestr
          payOptions['partnerId'] = _data.partnerid
          payOptions['prepayId'] = _data.prepayid
          payOptions['packageValue'] = _data.package
          payOptions['timeStamp'] = _data.timestamp
          payOptions['sign'] = _data.sign
          outTradeno = _data.out_trade_no
          // console.log("发起支付请求，参数:");
          // console.log(payOptions);
          if (Platform.OS == 'android') {
            WeChatAndroid.weChatPay(payOptions,(err,sendReqOK) => {
              // console.log('发起支付');
              // console.log(sendReqOK);
            });
          } else {
            WeChatIOS.weChatPay(payOptions,(res) => {
              // console.log(res);
              if(res) {

              } else {
                Toast.show("请求支付错误,请稍后重试!")
              }
            })
          }
        });
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });

    return;
  }


  render(){
    let fields = [{ref: 'money', placeholder: '请输入充值氦气数量', keyboardType: 'numeric', underlineColorAndroid: 'rgba(0, 0, 0, 0)', maxLength: 10,placeholderTextColor: '#484848', message: '充值金额不能为空', style: [styles.logininputfont]},]
    let btn;
    // console.log(this.state.registerWechat);
    if(this.state.registerWechat && this.state.isWXAppInstalled && this.state.isWXAppSupportApi){
      btn = (
       <TouchableHighlight style={styles.btn} underlayColor={'#FF0000'} onPress={() => this._gotoRecharge(this.state.data.money,fields)}>
         <Text style={styles.btnfont} >{'确认充值'}</Text>
       </TouchableHighlight>
     )
    } else {
      btn = (
        <View></View>
      )
    }

    return (
      <View >
        <Header screenTitle='充值' isPop={true}  navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View key={'messages'}>{this.renderMessages()}</View>
          <View style={[styles.loginlabel, commonstyle.viewcenter]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize14]}>{'氦气充值: '} <Text style={[commonstyle.yellow, commonstyle.fontsize14]}>{'1元 = 10氦气'}</Text></Text>
          </View>
          <View key={'money'} style={styles.logininput}>
            <TextInput {...fields[0]} onChangeText={(text) => this.state.data.money = text} defaultValue={this.state.data.money.toString()} />
          </View>

          <View style={[styles.loginlabel, styles.blockbottom]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize14]}>{'其他金额'}</Text>
          </View>
          <View style={[commonstyle.row, styles.rechargeview]}>
            <TouchableHighlight onPress={() => this._selectRecharge(50)} style={[this.state.data.money==50?commonstyle.btnborderred:commonstyle.btnbordergray, commonstyle.col1, styles.recharge]} >
              <Text style={this.state.data.money==50?commonstyle.red:commonstyle.gray} >{'50氦气'}</Text>
            </TouchableHighlight>
            <View style={styles.rechargeline}></View>
            <TouchableHighlight onPress={() => this._selectRecharge(100)} style={[this.state.data.money==100?commonstyle.btnborderred:commonstyle.btnbordergray, commonstyle.col1, styles.recharge]}>
              <Text style={this.state.data.money==100?commonstyle.red:commonstyle.gray}>{'100氦气'}</Text>
            </TouchableHighlight>
            <View style={styles.rechargeline}></View>
            <TouchableHighlight onPress={() => this._selectRecharge(200)} style={[this.state.data.money==200?commonstyle.btnborderred:commonstyle.btnbordergray, commonstyle.col1, styles.recharge]} >
              <Text style={this.state.data.money==200?commonstyle.red:commonstyle.gray} >{'200氦气'}</Text>
            </TouchableHighlight>
          </View>
          <View style={[commonstyle.row, styles.rechargeview]}>
            <TouchableHighlight onPress={() => this._selectRecharge(500)} style={[this.state.data.money==500?commonstyle.btnborderred:commonstyle.btnbordergray, commonstyle.col1, styles.recharge]} >
              <Text style={this.state.data.money==500?commonstyle.red:commonstyle.gray}>{'500氦气'}</Text>
            </TouchableHighlight>
            <View style={styles.rechargeline}></View>
            <TouchableHighlight onPress={() => this._selectRecharge(1000)} style={[this.state.data.money==1000?commonstyle.btnborderred:commonstyle.btnbordergray, commonstyle.col1, styles.recharge]} >
              <Text style={this.state.data.money==1000?commonstyle.red:commonstyle.gray} >{'1000氦气'}</Text>
            </TouchableHighlight>
            <View style={styles.rechargeline}></View>
            <TouchableHighlight onPress={() => this._selectRecharge(5000)} style={[this.state.data.money==5000?commonstyle.btnborderred:commonstyle.btnbordergray, commonstyle.col1, styles.recharge]} >
              <Text style={this.state.data.money==5000?commonstyle.red:commonstyle.gray} >{'5000氦气'}</Text>
            </TouchableHighlight>
          </View>
          {btn}
        </View>
        <Spinner visible={this.state.loaded} />
      </View>
    );
  }
 }
