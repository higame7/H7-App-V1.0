'use strict'

var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var {
  View,
  Component,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Navigator,
  Switch,
  AsyncStorage,
  ScrollView,
  Platform,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  } = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import ReSetPwd from './reset_pwd_screen';
import About from './about_screen';
import Share from './share_screen';
import GlobalVariable from '../../constants/globalvariable'
import Toast from '@remobile/react-native-toast';

import * as httpCache from '../../components/common/cache'
import PrivacyAgreement from './privacy_agreement'

import WeChatAndroid from 'react-native-wechat-android';
import WeChatIOS from 'react-native-wechat-ios';
import ActionSheet from 'react-native-actionsheet';
let appId = 'wxb0cb6c44afd49f5a';

const buttons = ['取消', '分享给朋友', '分享到朋友圈'];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

let shareLink = 'http://q.eqxiu.com/s/HtKFR6OC?eqrcode=1&from=groupmessage&isappinstalled=0'
let thumbImage = 'http://images.haigame7.com/wxshare/thumbImage.jpg'
export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      alertvoice:false,
      messages: [],
      allcache: 0,
      registerWechat: false,
      isWXAppInstalled: true,
    }
  }

  componentWillMount() {
    this.getData()
  }
  componentDidMount() {
    // this.isWXAppInstalled()
    if (Platform.OS == 'android') {
      WeChatAndroid.registerApp(appId,(err,registerOK) => {
          if(registerOK) {
            this.setState({registerWechat: true})
          } else {
            // Toast.show('分享功能异常');
          }
      });
      DeviceEventEmitter.addListener('finishedShare',function(event){
       var success = event.success;
       if(success){
        Toast.show('分享成功');
       }else{
        Toast.show('分享失败');
       }
      });
    } else if(Platform.OS == 'ios') {
      WeChatIOS.registerApp(appId, (res) => {
        if(res) {
          // Toast.show(res.toString())
          this.setState({registerWechat: true})
        } else {
          // Toast.show('分享功能异常');
        }
      });
      //ios未添加分享回调
    } else {
      console.log('Unknow Platform');
    }
    this.isWXAppInstalled()
  }
  isWXAppInstalled() {
    if (Platform.OS == 'android') {
      WeChatAndroid.isWXAppInstalled(
       (err,isInstalled) => {
         if(!isInstalled) {
           this.setState({
             isWXAppInstalled: false
           })
          //  Toast.show("未安装微信应用，无法使用微信充值功能")
         } else {
          //  this.isWXAppSupportApi()
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
          // Toast.show("未安装微信应用，无法使用微信充值功能")
        } else {
          // this.isWXAppSupportApi()
        }
      });
    }
  }
  async getData(){
    try {
      this.setState({
        allcache: Math.round((await httpCache.getSize()/1024)/1024*10)/10 + 'M',
      });
    } catch(err){
      Toast('获取错误', err.message);
    }
  }
  async clearCache(){
    try {
      await httpCache.clear();
      Toast.show('清除缓存成功');
      await this.getData();
    } catch(err){
      Toast('清除失败', err.message);
    }
  }

  openalert(alertvoice){
    if(alertvoice){
        this.setState({alertvoice: false});
     }else{
        this.setState({alertvoice: true});
     }
    return this.state.notshow;
  }
 onLoginout(){
   AsyncStorage.removeItem(GlobalVariable.USER_INFO.USERSESSION).then((value)=>{
     Toast.show("退出登录");
     if(this.props.updateLoginState){
       this.props.updateLoginState();
        }
    });
     setTimeout(()=>{
       this.props.navigator.popToTop();
     },200)
 }
 _toNextScreen(params){
    // Toast.show("this is a message")
    let _this = this;
    this.props.navigator.push({
      name: params.name,
      component: params.component,
      sceneConfig:params.sceneConfig || undefined,
      params: {
        ...this.props,
      }
    })
  }

  _share(type){
    // console.log();
    if (Platform.OS == 'android') {
      let webpageOptions = {
        title: '来氦7游戏赚钱两不误',
        desc: '组自己的战队，约最强的敌人，打最爽的团战，赢取更多的奖金。来氦7，输赢我们一起扛！',
        thumbSize: 150,
        scene: type,
        type: 3,
        webpageUrl: shareLink,
        thumbImage: thumbImage,
      }
      WeChatAndroid.sendReq(webpageOptions,(err,sendOK) => {
        console.log('调用分享结果')
        console.log(sendOK);
      });
    } else if(Platform.OS == 'ios') {
      WeChatIOS.sendLinkURL({
        link: shareLink,
        tagName: 'H7',
        title: '来氦7游戏赚钱两不误',
        desc: '组自己的战队，约最强的敌人，打最爽的团战，赢取更多的奖金。来氦7，输赢我们一起扛！',
        thumbImage: thumbImage,
        scene: type
      });
    } else {
      console.log('unknown platform');
    }

  }
  _handlePress(index) {
    // let type;
    // switch (index) {
    //   case 1:
    //     type = 0
    //     break;
    //   case 2:
    //     type = 1
    //     break;
    //   default:
    //     break;
    //
    // }
    // console.log(typeof(index) === 'Object');
    if(typeof(index) !== 'number' || index === 0){
      return
    }
    this._share(index -1)
   }

   _showActionSheet() {
     if(!this.state.registerWechat || !this.state.isWXAppInstalled) {
       Toast.show('分享功能异常,未安装微信')
       return
     }
     this.ActionSheet.show();
   }

  render(){
    //分享功能能
    // <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._toNextScreen.bind(this,{"name":"分享","component":Share})}>
    //   <Text style={styles.listviewtextleft}>分享H7给朋友们</Text>
    //   <View style={styles.listviewtextbox} ></View>
    //   <Text style={styles.listviewtextright}>微信</Text>
    //   <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
    // </TouchableOpacity>

    // <View style={styles.listview}>
    //   <Text style={styles.listviewtextleft}>系统消息提示音</Text>
    //   <View style={styles.listviewtextbox} >
    //     <Switch onValueChange={(value) =>this.openalert(this.state.alertvoice)} style={[styles.switchSetting]} value= {this.state.alertvoice}/>
    //   </View>
    // </View>
    return (
      <View >
        <Header screenTitle='设置' navigator={this.props.navigator}/>

        <ScrollView style={commonstyle.bodyer}>
          <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this.clearCache.bind(this)}>
            <Text style={styles.listviewtextleft}>清空缓存</Text>
            <View style={styles.listviewtextbox} ></View>
            <Text style={styles.listviewtextright}>{this.state.allcache}</Text>
            <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
          </TouchableOpacity>

          <View style={styles.listbox}></View>

          <TouchableOpacity style={styles.listview} activeOpacity={0.8} onPress={this._showActionSheet.bind(this)}>
            <Text style={styles.listviewtextleft}>分享</Text>
            <View style={styles.listviewtextbox} ></View>
            <Text style={styles.listviewtextright}>微信</Text>
            <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listview} activeOpacity={0.8}  onPress={this._toNextScreen.bind(this,{"name":"隐私协议","component":PrivacyAgreement})}>
            <Text style={styles.listviewtextleft}>隐私协议</Text>
            <View style={styles.listviewtextbox} ></View>
            <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listview} activeOpacity={0.8}  onPress={this._toNextScreen.bind(this,{"name":"关于H7","component":About})}>
            <Text style={styles.listviewtextleft}>关于H7</Text>
            <View style={styles.listviewtextbox} ></View>
            <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
          </TouchableOpacity>


          <TouchableHighlight style = {this.state.loading ? [styles.btn, styles.btndisable] : styles.btn} onPress = {() => this.onLoginout() } underlayColor = {'#FF0000'}  >
             <Text style = {styles.btnfont}> { '退出登录'}</Text>
          </TouchableHighlight>
        </ScrollView>
        <ActionSheet
            ref={(o) => this.ActionSheet = o}
            title="分享到微信"
            options={buttons}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this._handlePress.bind(this)}
        />
    </View>
    );
  }
}
