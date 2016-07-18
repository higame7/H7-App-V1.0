'use strict';
/**
 * APP 玩家信息
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */
var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var {
  View,
  Text,
  Image,
  Component,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Navigator,
  ScrollView
  } = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import Toast from '@remobile/react-native-toast';

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userinfo:this.props.userinfo,
      messages: []
    }
  }
  renderHeroImageItem(rowData,key){
    return(
      <Image key={key} style={styles.listviewheroimg} source={{uri:rowData.HeroImage}} />
    );
  }

  render(){

    var that = this
    var items =Object.keys(that.state.userinfo.HeroImage).map(function(item,key) {
      return that.renderHeroImageItem(that.state.userinfo.HeroImage[item],key);
    });

    return (
      <View>
        <Header screenTitle='个人信息'   navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
            <View style={styles.blocktop}>
              <Image style={styles.headportrait} source={{uri:this.state.userinfo.UserPicture==undefined?this.state.userinfo.UserWebPicture:this.state.userinfo.UserPicture}} />
              <View style={styles.headportraitv}><Icon name="certified" size={15} color={this.state.userinfo.HeroImage.length > 1? '#00B4FF':'#484848'} style={commonstyle.iconnobg}/><Text style={styles.headportraitvfont}>{this.state.userinfo.HeroImage.length>1?"已认证":"未认证"}</Text></View>
            </View>

            <View style={styles.blocktop}>
              <Text style={[styles.headname, commonstyle.white]}>{this.state.userinfo.NickName==undefined?(this.state.userinfo.UserNickName==undefined?this.state.userinfo.UserWebNickName:this.state.userinfo.UserNickName):this.state.userinfo.NickName}</Text>
              <View style={[commonstyle.row, styles.headtextblock]}>
                <View style={styles.headtextleft}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  战斗力  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.userinfo.GamePower==undefined?this.state.userinfo.FightScore:this.state.userinfo.GamePower}{'  '}</Text>
                </View>
                <View style={styles.headtextline}></View>
                <View style={styles.headtextright}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦气  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.userinfo.Asset}{'  '}</Text>
                </View>
              </View>
              <View style={styles.headtext}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12, styles.headtextfont]}>{this.state.userinfo.Hobby}</Text>
              </View>
            </View>
          </Image>

          <View style={styles.listblock}>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>性别</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userinfo.Sex}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>地区</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userinfo.Address}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>擅长位置</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>暂无</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>注册时间</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userinfo.RegDate}</Text></View>
            </View>
            <View style={[styles.listview, styles.nobottom]}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>擅长英雄</Text></View>
              <View style={[styles.listviewright, styles.listviewhero]}>
               {items}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
