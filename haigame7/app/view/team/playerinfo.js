'use strict';
/**
 * APP 玩家信息
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */
var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var Util = require('../common/util');
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
import TeamService from '../../network/teamservice';
import User from '../user.js';
import Toast from '@remobile/react-native-toast';

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      playerinfo:this.props.playerinfo,
      teamID:this.props.teamID,
      userteamdata:this.props.userteamdata,
      messages: []
    }
  }
  inviteUser(userID,teamID){
    if(this.state.teamID==0){
       this.props.navigator.push({
         name:'user',
         component:User,
         params:{'userData':this.props.playerinfo,'openmodal':true},
         sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
       });
       return;
     }else if(this.state.userteamdata.Role=="teamuser"){
       Toast.show("队员无法发出邀请");
       return;
     }
    var data = {'teamID':teamID,'userID':userID};
    TeamService.inviteUser(data,(response)=>{
      if(response[0].MessageCode == '20008'){
        Toast.show('您已经邀请该玩家');
      }
      else if (response[0].MessageCode == '20007') {
         Toast.show('您已向其他发出申请');
      }
      else if (response[0].MessageCode == '0') {
         Toast.show('成功发出邀请');
      } else {
        Toast.show(response[0].Message);
      }
    });
  }
  renderHeroImageItem(rowData,key){
    return(
      <Image key={key} style={styles.listviewheroimg} source={{uri:rowData.HeroImage}} />
    );
  }

  render(){
    var that = this
    var items =Object.keys(that.state.playerinfo.HeroImage).map(function(item,key) {
      return that.renderHeroImageItem(that.state.playerinfo.HeroImage[item],key);
    });
    return (
      <View>
        <Header screenTitle='个人信息'   navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
            <View style={styles.blocktop}>
              <Image style={styles.headportrait} source={{uri:this.state.playerinfo.UserPicture==undefined?this.state.playerinfo.UserWebPicture:this.state.playerinfo.UserPicture}} />
              <View style={styles.headportraitv}><Icon name="certified" size={15} color={this.state.playerinfo.HeroImage.length > 1? '#00B4FF':'#484848'} style={commonstyle.iconnobg}/><Text style={styles.headportraitvfont}>{this.state.playerinfo.HeroImage.length>1?"已认证":"未认证"}</Text></View>
            </View>

            <View style={styles.blocktop}>
            <Text style={[styles.headname, commonstyle.white]}>{this.state.playerinfo.NickName==undefined?(this.state.playerinfo.UserNickName==undefined?this.state.playerinfo.UserWebNickName:this.state.playerinfo.UserNickName):this.state.playerinfo.NickName}</Text>
              <View style={[commonstyle.row, styles.headtextblock]}>
                <View style={styles.headtextleft}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  战斗力  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.playerinfo.GamePower}{'  '}</Text>
                </View>
                <View style={styles.headtextline}></View>
                <View style={styles.headtextright}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦气  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.playerinfo.Asset}{'  '}</Text>
                </View>
              </View>
              <View style={styles.headtext}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12, styles.headtextfont]}>{this.state.playerinfo.Hobby}</Text>
              </View>
            </View>
          </Image>

          <View style={styles.listblock}>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>性别</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.playerinfo.Sex}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>地区</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.playerinfo.Address}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>擅长位置</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>暂无</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>注册时间</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.playerinfo.RegDate}</Text></View>
            </View>
            <View style={[styles.listview, styles.nobottom]}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>擅长英雄</Text></View>
              <View style={[styles.listviewright, styles.listviewhero]}>
               {items}
              </View>
            </View>
          </View>

          <TouchableHighlight  onPress={()=>this.inviteUser(this.state.playerinfo.UserID,this.state.teamID)} style = {styles.btn} underlayColor = {'#FF0000'} >
            <Text style = {styles.btnfont}> {'发出邀请' } </Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}
