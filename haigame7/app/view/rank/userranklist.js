'use strict';
/**
 * 团队排行组件
 * @return {[teamranklist Component]}
 * @author aran.hu
 */

var Icon = require('react-native-vector-icons/Iconfont');

import React, {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Component,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    } from 'react-native';

//引用样式文件
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/rankstyle';
import UserInfo from '../rank/userinfo';
import Login from '../user/login';
import PlayerInfo from '../team/playerinfo';

var UserRankList = React.createClass({
  getInitialState() {

    return {
      user: this.props.user,
      userID: this.props.userID,
      userteamid: this.props.userteamid,
      navigator:this.props.navigator,
    }
  },
  gotoRoute(name,params) {
    if(this.props.userID==undefined){
      this.props.navigator.push({
        name:'login',
        component:Login,
        params:{...this.props},
       sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }
    else {
      this.props.navigator.push({ name: name, component: UserInfo, params:{'teamID':this.props.userteamid,'userinfo':params,...this.props},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
    }
  },
  render: function() {
    //返回选手排行组件
    return(
      <View>
        <TouchableOpacity style={styles.ranklist} activeOpacity={0.8} onPress={()=>this.gotoRoute('userinfo',this.props.user)}>
          <Image style={styles.ranklistimg} source={{uri:this.props.user.UserPicture}} />
          <View style={styles.ranklistcenter}>
            <Text style={[commonstyle.white, commonstyle.fontsize14]}>{this.props.user.NickName}</Text>
            <Text style={[commonstyle.gray, commonstyle.fontsize12, styles.ranklisttext]}>{this.props.user.Hobby}</Text>
            <View style={styles.ranklistrow}>
              <Text style={commonstyle.yellow}>{'战斗力:  '}</Text>
              <Text style={commonstyle.red}>{this.props.user.GamePower}</Text>
              <Text style={commonstyle.yellow}>{'  氦气:  '}</Text>
              <Text style={commonstyle.red}>{this.props.user.Asset}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});
module.exports = UserRankList;
