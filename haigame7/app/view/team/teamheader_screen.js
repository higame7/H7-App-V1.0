'use strict';

import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';

import UserInfo from '../user/userinfo';
import UserSign from '../user/usersign';
import UserCertify from '../user/usercertify';
import UserAsset from '../user/userasset';

export default class extends React.Component {

  _pressSign() {
    const nav = this.props.navigator;
    if(nav) {
      nav.push({
        name: 'usersign',
        component: UserSign,
        sceneConfig:Navigator.SceneConfigs.FloatFromRight
      })
    }else{
      console.log('_navigator_navigator_navigator_navigator');
    }
  }
  _pressUserInfo() {
    const nav = this.props.navigator;
    if(nav) {
      nav.push({
        name: 'userinfo',
        component: UserInfo,
      })
    }else{
      console.log('_navigator_navigator_navigator_navigator');
    }
  }
  _pressUserAsset() {
    const nav = this.props.navigator;
    if(nav) {
      nav.push({
        name: 'userasset',
        component: UserAsset
      })
    }else{
      console.log('_navigator_navigator_navigator_navigator');
    }
  }
  render() {
    return(
      <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
        <TouchableOpacity style={styles.blocktop} onPress={this._pressUserInfo.bind(this)}>
          <Image style={styles.headportrait} source={{uri:'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
        </TouchableOpacity>

        <View style={styles.blocktop}>
          <Text style={[styles.headname, commonstyle.white]}>战队名称</Text>
          <TouchableOpacity style={styles.headtext} onPress={this._pressSign.bind(this)}>
            <Text style={commonstyle.cream}>战队宣言:生命不息电竞不止生命不息电竞不止生命不息电竞不止</Text>
          </TouchableOpacity>
        </View>

        <View style={[commonstyle.row, styles.headtab]}>
          <View style={[commonstyle.col1, styles.headtabli]}>
            <Text style={[styles.headtabtitle, commonstyle.yellow]}>战斗力</Text>
            <Text style={[styles.headtabnumber, commonstyle.cream]}>000</Text>
          </View>
          <View style={styles.headtabline} ></View>
          <TouchableOpacity style={[commonstyle.col1, styles.headtabli]} activeOpacity={0.8} onPress={this._pressUserAsset.bind(this)}>
            <Text style={[styles.headtabtitle, commonstyle.yellow]}>氦气</Text>
            <Text style={[styles.headtabnumber, commonstyle.red]}>000</Text>
          </TouchableOpacity>
          <View style={styles.headtabline} ></View>
          <View style={[commonstyle.col1, styles.headtabli]}>
            <Text style={[styles.headtabtitle, commonstyle.yellow]}>游戏</Text>
            <Text style={[styles.headtabnumber, commonstyle.red]}>000</Text>
          </View>
        </View>
      </Image>
    );
  }

}
