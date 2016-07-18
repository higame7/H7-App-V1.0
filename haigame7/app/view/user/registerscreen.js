'use strict';

import React, {
  Modal,
  Component,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  TextInput,
  Alert,
  Navigator,
  Platform,
  NetInfo
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Header from '../common/headernav';
import Setpwd from './setpwd.js';
import UserService from '../../network/userservice';
import GlobalSetup from '../../constants/globalsetup';

import Toast from '@remobile/react-native-toast';
import {CountDownText} from 'react-native-sk-countdown';
import UserServiceAgreement from './user_service_agreement';
import CheckBox from 'react-native-checkbox';
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        phoneNumber: '',
        code: '',
        reset: false,
      },
      securityCode: '',
      codeState: 0,
      loading: false,
      getCodeMsg: '获取验证码',
      isToushable: true,
      isAgreed: false
    }
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      (res) => {
        if(!res){
          Toast.showLongCenter("无网络连接")
        }
      }
    );
  }

  onFocus(argument) {
    setTimeout(() => {
      // let scrollResponder = this.refs.registerFormC.getScrollResponder();
      //     scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      //       React.findNodeHandle(this.refs[argument.ref]), 110, true
      //     );
    }, 50);
  }
  /*下一步*/
  gotoRoute(name,argument) {
    if(this.state.data.phoneNumber == '' || this.state.data.phoneNumber.indexOf(' ') > -1){
      Toast.showShortCenter('手机号不能为空！');
      return;
    }else if(this.state.data.code == '' || this.state.data.code.indexOf(' ') > -1){
      Toast.showShortCenter('验证码不能为空！');
      return;
    }else if(this.state.codeState == 1){
      Toast.showShortCenter('验证码已失效！');
      return;
    }else if(this.state.data.code != this.state.securityCode){
      Toast.showShortCenter('验证码不正确！');
      return;
    }else if(!this.state.isAgreed){
      Toast.showShortCenter('请阅读并勾选注册服务协议！');
      return;
    }else {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
        this.props.navigator.push({name: name,component: Setpwd,params:{data:this.state.data,reset:false},sceneConfig:Navigator.SceneConfigs.FloatFromBottom});
      }
      return;
    };
  }
  /*获取验证码*/
  _getVerifiCode() {
    if (this.state.data.phoneNumber == '' || this.state.data.phoneNumber.indexOf(' ') > -1) {
      Toast.showShortCenter('手机号不能为空！');
      return;
    }
    if(!/^1[34578]\d{9}$/.test(this.state.data.phoneNumber)){
      Toast.showShortCenter('请输入正确的手机号！');
      return;
    }
    UserService.getVerifiCode(this.state.data.phoneNumber,(response) => {
      if (response[0].MessageCode == '0') {
        this.setState({
          securityCode: response[0].Message,
          isToushable: false,
          codeState: 0,
        });
        Toast.showShortCenter("验证码已发送");
        setTimeout(()=>{
          this.setState({
            codeState: 1,
          });
        },300000);
      }else if(response[0].MessageCode == '10003'){
        this.setState({
          isToushable: true,
        });
        Toast.showShortCenter("验证码获取失败");
        return;
      }else if(response[0].MessageCode == '10004'){
        this.setState({
          isToushable: true,
        });
        Toast.showShortCenter("手机号已注册");
        return;
      } else {
        Toast.showShortCenter("系统问题" + response[0].Message);
        this.setState({
          isToushable: true,
        });
      }
    })
  }

  _showServiceAgreement(){
    this.props.navigator.push({
      name: '用户注册及服务协议',
      component: UserServiceAgreement,
      params:{
        data:this.state.data,reset:false
      },
      sceneConfig:Navigator.SceneConfigs.FloatFromBottom});
  }

  render() {
    let fields = [
      {ref: 'phone', placeholder: '手机号', keyboardType: 'numeric', maxLength: 11,placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', underlineColorAndroid: 'rgba(0, 0, 0, 0)', message: '* 手机号必填', style: [styles.logininputfont]},
      {ref: 'securitycode', placeholder: '验证码',keyboardType: 'numeric', maxLength: 6,placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', underlineColorAndroid: 'rgba(0, 0, 0, 0)', message: '* 验证码必填', style: [styles.logininputfont]}
    ]
    var codebtn;
    if (this.state.isToushable) {
      codebtn = <TouchableOpacity style={this.state.loading ? styles.btndisable : styles.btncode} activeOpacity={0.8} onPress={this._getVerifiCode.bind(this)}><Text style={styles.btncodefont}>{this.state.getCodeMsg}</Text></TouchableOpacity>;
    } else {
      codebtn = <View style={[styles.btncode, styles.btndisable]}><CountDownText
        style={styles.btncodefont}
        countType='seconds'
        auto={true}
        afterEnd={() => {
          this.setState({
            isToushable: true,
            getCodeMsg: '获取验证码'
          });
        }}
        timeLeft={60}
        step={-1}
        startText='获取验证码'
        endText='获取验证码'
        intervalText={(sec) => sec + '秒重新获取'}
      /></View>;
    }
    return(
      <View style={{ flex: 1 }}>
      <Header screenTitle = '注册' navigator = { this.props.navigator } />
      <Image source = {require('../../images/loginbg.jpg')} style = {styles.loginbg} resizeMode = {"cover"}>
          <View activeOpacity = {1} style = {styles.logo}>
              <Image style = {{width: 80, height: 80, }} source = { require('../../images/logo.png') }/>
          </View>
          <View key={'phone'} style={styles.logininput}>
              <TextInput {...fields[0]} onFocus={() => this.onFocus({...fields[0]})} onChangeText={(text) => this.state.data.phoneNumber = text} />
          </View>
          <View key={'securitycode'} style={styles.logininput}>
              <TextInput {...fields[1]} onFocus={() => this.onFocus({...fields[0]})} onChangeText={(text) => this.state.data.code = text} />
              {codebtn}
          </View>
          <View style={[commonstyle.row,styles.checkview]}>
            <CheckBox
              label=''
              checked={this.state.isAgreed}
              onChange={(checked) =>{this.setState({isAgreed: checked})}}
            />
            <TouchableHighlight style={commonstyle.col1} underlayColor={'rgba(0, 0, 0, 0)'} onPress={this._showServiceAgreement.bind(this)}>
              <Text style={commonstyle.blue}>用户注册及服务协议</Text>
            </TouchableHighlight>
          </View>

          <TouchableHighlight style={this.state.loading ? [styles.btn, styles.btndisable] : styles.btn} underlayColor={'#FF0000'} onPress={() => this.gotoRoute('setpwd',fields)}>
              <Text style={styles.btnfont} >{'下一步'}</Text>
          </TouchableHighlight>
      </Image>
      </View>
    );
  }
}
