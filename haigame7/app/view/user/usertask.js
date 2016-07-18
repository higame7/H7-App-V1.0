'use strict';
/**
 * APP 我的任务
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */

import React, {
    View,
    Text,
    Image,
    StyleSheet,
    Component,
    TouchableOpacity,
    Navigator,
    ScrollView,
    TouchableHighlight,
    } from 'react-native';
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Certify from './usercertify';
import UserInfo from './userinfo';
import UserService from '../../network/userservice';
import Toast from '@remobile/react-native-toast';
export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      navbar: 0,
      signInMsg: '未签到',
      data:{
          subnavbar:1,
          subnavbarname:'热度',
      },
    }
  }

  componentWillMount(){
    UserService.isSignIn(this.props.userData.UserID,(response) => {
      if (response[0].MessageCode == '60002') {
        this.setState({
          signInMsg:'已签到'
        })
      }else{
      }
    })
  }

  gotoRoute(name,params) {
    if(name=='usercertify'){
      this.props.navigator.push({
        name:'certify',
        component:Certify,
        params:{...this.props},
       sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }else if(name=='userinfo'){
      this.props.navigator.push({
        name:'userinfo',
        component:UserInfo,
        params:{...this.props},
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }
  }
  _signIn(){
    if(this.state.signInMsg == '已签到'){
      Toast.show('今日已签到！')
      return
    } else {
      UserService.signIn(this.props.userData.UserID,(response) => {
        if (response[0].MessageCode == '0') {
            Toast.show('签到成功！')
            this.setState({
              signInMsg:'已签到'
            })
            this.props._callback('TotalAssertAndRank')
        }else if(response[0].MessageCode == '60002'){
            Toast.show('今日已签到！')
        } else{
          Toast.show('签到异常')
        }
      })
    }
  }
  rendertaskList(){
    return(
      <View>
        <TouchableOpacity style={styles.listview} onPress={()=>this.gotoRoute('userinfo')} activeOpacity={0.8}>
          <View style={styles.listviewiconleft}>
            <Icon name="modify" size={30} color={'#D31B25'} />
          </View>
          <Text style={styles.listviewtext}>{'完善资料  '}</Text>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listview} onPress={()=>this.gotoRoute('usercertify')}  activeOpacity={0.8}>
          <View style={styles.listviewiconleft}>
            <Icon name="task" size={30} color={'#D31B25'} />
          </View>
          <Text style={styles.listviewtext}>{'通过认证  '}</Text>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listview} onPress={this._signIn.bind(this)}  activeOpacity={0.8}>
          <View style={styles.listviewiconleft}>
            <Icon name="date" size={30} color={'#D31B25'} />
          </View>
          <Text style={styles.listviewtext}>{'签到'}<Text style={commonstyle.red}>{'  +1氦气'}</Text></Text>
          <Text style={styles.listviewtextright}>{this.state.signInMsg}</Text>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let tasklist = this.rendertaskList();
    return (
      <View>
        <Header screenTitle="我的任务"   navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          {tasklist}
        </View>
      </View>
    );
  }
}
