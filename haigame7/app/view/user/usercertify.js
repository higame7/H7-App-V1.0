'use strict'

import React, {
  View,
  Component,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';

import Header from '../common/headernav';
import Icon from 'react-native-vector-icons/Iconfont';
import UserService from '../../network/userservice';
import Toast from '@remobile/react-native-toast';

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
    data: {
      dota2id: '',
      certifyid: '',
    },
    btn_msg: '申请认证',
    fightData: this.props.fightData,
    resultStr: '',
    loading: false,
  }
}

componentWillMount() {
  if (this.state.fightData.CertifyState == '1') {
    this.setState({
      btn_msg: '重新认证',
      data:{
        dota2id: this.state.fightData.GameID,
        certifyid: this.state.fightData.CertifyName,
      },
      resultStr: '已认证'
    })
  } else if(this.state.fightData.CertifyState == '2') {
    this.setState({
      btn_msg: '认证中...',
      data:{
        dota2id: this.state.fightData.GameID,
        certifyid: this.state.fightData.CertifyName,
      },
      resultStr: '认证中...'
    })
  }else if(this.state.fightData.CertifyState == '3') {
    this.setState({
      btn_msg: '重新认证',
      data:{
        dota2id: this.state.fightData.GameID,
        certifyid: this.state.fightData.CertifyName,
      },
      resultStr: '认证失败...'
    })
  } else {
    this.setState({
      btn_msg: '申请认证',
      dota2id: '',
      certifyid: '',
      resultStr: '未认证...'
    })
  }
}
componentWillUnmount() {
  this.timer && clearTimeout(this.timer);
}
componentWillUnmount() {
  this.timer && clearTimeout(this.timer);
}
gotoCertify(numberID,argument) {
  if(this.state.loading){
    Toast.showShortCenter('认证已提交，无需重复提交！');
    return;
  }
  if(this.state.data.dota2id == '' || this.state.data.dota2id.indexOf(' ') > -1){
    Toast.showShortCenter('Dota2数字ID不能为空！');
    return;
  }else if(isNaN(this.state.data.dota2id)){
    Toast.showShortCenter('Dota2数字ID只能是数字！');
    return;
  }
  if (this.state.btn_msg == '申请认证') {
    UserService.certifyGameID({'PhoneNumber':this.props.userData.PhoneNumber,'GameID': this.state.data.dota2id},(response) => {
        if (response[0].MessageCode == '0') {
          let data = this.state.data;
          data['certifyid'] = response[0].Message;
          this.setState({
            data: data,
            btn_msg: '认证中...',
            resultStr: '认证中...',
            loading: true,
          })
          this.timer = setTimeout(()=>{
            this.props._callback('Usercertify');
            showShortCenter.show('申请已经发出,请等待');
          },1000);
        } else {
          Toast.showShortCenter('认证失败');
        }
    });
  } else {
    UserService.updateCertifyGameID({'PhoneNumber':this.props.userData.PhoneNumber,'GameID': this.state.data.dota2id},(response) => {
      if (response[0].MessageCode == '0') {
        let data = this.state.data;
        data['certifyid'] = response[0].Message;
        this.setState({
          data: data,
          btn_msg: '认证中...',
          resultStr: '认证中...',
          loading: true,
        })
        this.timer = setTimeout(()=>{
          this.props._callback('Usercertify');
          Toast.showShortCenter('申请已经发出,请等待');
        },1000);

      } else {
        Toast.showShortCenter('认证失败');
      }
    });
  }
  return;
}

render(){
  let fields = [
    {ref: 'dota2id', placeholder: '请输入Dota2数字ID', keyboardType: 'numeric', maxLength: 10,placeholderTextColor: '#484848', style: [styles.logininputfont]},
    {ref: 'certifyid', editable: false, style: [styles.logininputfont]}
  ]
  let btn;
    if (this.state.fightData.CertifyState == '0') {
      btn =
      (
        <TouchableHighlight style={this.state.loading ? [styles.btn, styles.btndisable] : styles.btn} underlayColor={'#FF0000'} onPress={() => this.gotoCertify('setpwd',fields)}>
          <Text style={styles.btnfont} >{this.state.btn_msg}</Text>
        </TouchableHighlight>
      )
    } else if(this.state.fightData.CertifyState == '2') {
      btn =
      (
        <View style={[styles.btn, styles.btndisable]} underlayColor={'#000000'}>
          <Text style={styles.btnfont} >{this.state.btn_msg}</Text>
        </View>
      )
    } else {
      btn =
      (
        <TouchableHighlight style={this.state.loading ? [styles.btn, styles.btndisable] : styles.btn} underlayColor={'#FF0000'} onPress={() => this.gotoCertify('setpwd',fields)}>
          <Text style={styles.btnfont} >{this.state.btn_msg}</Text>
        </TouchableHighlight>
      )
    }

  return (
    <View >
      <Header screenTitle='账号认证' navigator={this.props.navigator}/>
      <Image source = {require('../../images/loginbg.jpg')} style = {styles.loginbg} resizeMode = {"cover"}>

      <View style={styles.loginlabel}>
        <Text style={commonstyle.cream}>{'请输入Dota2数字ID'}</Text>
      </View>
      <View key={'dota2id'} style={styles.logininput}>
        <TextInput {...fields[0]} defaultValue={this.state.data.dota2id || ''} underlineColorAndroid = 'transparent' onChangeText={(text) => this.state.data.dota2id = text} />
      </View>

      <View style={styles.loginlabel}>
        <Text style={commonstyle.cream}>{'自动生成的氦7ID为'}</Text>
      </View>
      <View key={'certifyid'} style={styles.logininput}>
        <TextInput {...fields[1]} defaultValue={this.state.data.certifyid}/>
        <View style={styles.logininputright} underlayColor={'#000000'} onPress={()=>console.log('copy certify')}>
          <Icon name="copy" size={30} color={'#C3C3C3'} />
        </View>
      </View>
      {btn}
      <View style={styles.linkblock}>
      <Text style={commonstyle.cream}>认证结果：{this.state.resultStr}</Text>
      </View>
      <ScrollView>
        <View style={styles.linkblock}>
          <Text style={commonstyle.cream}>{'规则文字内容:\n'}</Text>
          <Text style={commonstyle.cream}>{'1、请在输入框内输入您的DOTA数字ID;\n2、输入数字ID后，请点击”认证“按钮;\n3、点击”认证“按钮后，会在ID生成框内自动生成一个名字ID\n4、用户需在DOTA2客户端内，将自己的DOTA2ID，修改成由氦7平台提供的ID；\n5、修改完成后，我们将在3个工作日内，完成审核工作确认无误后，予以认证'}</Text>
        </View>
      </ScrollView>

      </Image>
    </View>
   );
 }
}
