'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import Button from 'react-native-button';
import Header from '../common/headernav';
import Icon from 'react-native-vector-icons/Iconfont';
import TeamService from '../../network/teamservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';
import Toast from '@remobile/react-native-toast';

export default class extends React.Component {
  /**
   * @param role 队长 captain | 队员：teamuser | 非本队成员: user
   * @return {[type]} [description]
   */
  constructor() {
    super();
    this.state = {
        navigator: undefined,
        userData:{},
        teamData:{},
  defaultTeamLogo: 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png',
             role: 'user',
    }
  }
  componentWillMount(){
      this.state = {
        navigator: this.props.navigator,
        userData:this.props.teamuser,
        teamData:this.props.teamData,
      }
  }

  renderHeroImageItem(groups){
    let that = this;
    var items = Object.keys(groups).map(function(item,key) {
        return(
            <Image  key={key} style={styles.listviewheroimg} source={{uri:groups[item].HeroImage}} />
        );

    });
    return(
       <View style={[styles.listviewright, styles.listviewhero]}>{items}</View>
    );
  }
  confirmDelUser(){
    Alert.alert(
      '删除队员',
      '确认删除战队？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed!')},
        {text: '确认', onPress: () => this.removeTeamUser()},
      ]
    )
  }
  removeTeamUser(){
    let data={'teamID':this.state.teamData.TeamID,'userID':this.state.userData.UserID};
     TeamService.removeTeamUser(data,(response)=>{
       if(response[0].MessageCode == '0'){
         Toast.show('删除成功');
         this.timer = setTimeout(()=>{
             this.props._callback('TeamInfo');
              this.props.callback();
             if(this.props.navigator.getCurrentRoutes().length>4){
               var route =this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-3];
               this.props.navigator.jumpTo(route);
             }else{
               this.props.navigator.pop();
             }
           },1000);

       }else if(response[0].MessageCode=='20009'){
         Toast.show('您没有解散的权利');
       }
       else {
         Toast.show('删除失败');
       }
     });
  }
  render() {
    let items = this.renderHeroImageItem(this.state.userData.HeroImage);
    let delUser = this.state.teamData.Role=="teamcreater"?this.state.userData.UserID==this.state.teamData.Creater?<View></View>:<TouchableHighlight onPress={()=>this.confirmDelUser()} style = {styles.btn} underlayColor = {'#FF0000'} ><Text style = {styles.btnfont}> {'移出战队' } </Text></TouchableHighlight>:<View></View>
    return(
      <View>
        <Header screenTitle='个人信息' isPop={true} navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
            <View style={styles.blocktop}>
              <Image style={styles.headportrait} source={{uri:this.state.userData==undefined?this.state.defaultTeamLogo:this.state.userData.UserPicture==undefined?this.state.userData.UserWebPicture:this.state.userData.UserPicture}} />
              <View style={styles.headportraitv}><Icon name="certified" size={15} color={this.state.userData.HeroImage.length > 1? '#00B4FF':'#484848'} style={commonstyle.iconnobg}/><Text style={styles.headportraitvfont}>{this.state.userData.HeroImage.length>1?"已认证":"未认证"}</Text></View>
            </View>

            <View style={styles.blocktop}>
              <Text style={[styles.headname, commonstyle.white]}>{this.state.userData==undefined?"名字":this.state.userData.UserNickName==undefined?this.state.userData.UserWebNickName:this.state.userData.UserNickName}</Text>
              <View style={[commonstyle.row, styles.headtextblock]}>
                <View style={styles.headtextleft}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  战斗力  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.userData.FightScore==undefined?this.state.userData.GamePower:this.state.userData.FightScore}{'  '}</Text>
                </View>
                <View style={styles.headtextline}></View>
                <View style={styles.headtextright}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦气  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{'  '}{this.state.userData.Asset}{'  '}</Text>
                </View>
              </View>
              <View style={styles.headtext}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12, styles.headtextfont]}>{'个性签名:'}{this.state.userData.Hobby}</Text>
              </View>
            </View>
          </Image>

          <View style={styles.listblock}>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>性别</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userData.Sex}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>电话</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userData.PhoneNumber}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>地区</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userData.Address}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>擅长位置</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>暂无</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>出生日期</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.userData.Birthday}</Text></View>
            </View>
            <View style={[styles.listview, styles.nobottom]}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>擅长英雄</Text></View>
               {items}
            </View>
          </View>
          {delUser}

        </ScrollView>
      </View>
    );
  }
}
