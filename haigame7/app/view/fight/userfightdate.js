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
    Navigator,
    Component,
    TouchableOpacity,
    TouchableHighlight,
    } from 'react-native';

//引用样式文件
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/fightstyle';
import FightDetail from '../user/fightdetail';
import TeamService from '../../network/teamservice';
import Toast from '@remobile/react-native-toast';
import TeamInfo from '../team/teaminfo';
var Util = require('../common/util');


var UserFightList = React.createClass({
  getInitialState() {
    return {
      rowData: this.props.rowData,
      fightstate:this.props.fightstate,
      userData:this.props.userdata,
      steamData:{},
      eteamData:{},
      navigator:this.props.navigator,
      _onPress: null,
    }
  },
  componentDidMount(){
     this.getUserTeamInfo(this.props.rowData.STeamID,1);
     this.getUserTeamInfo(this.props.rowData.ETeamID,0);
  },
  getUserTeamInfo(teamID,flag) {
    var teamData ={};
    TeamService.getTeambyID({"teamID":teamID},(response) => {
      // console.log(creatUserID);
      if (response[0].MessageCode == '0'||response[0].MessageCode == '20003') {
        if(flag){
          this.setState({
            steamData:response[1],
          });
        }else{
          this.setState({
            eteamData:response[1],
          });
        }
      }else{
        Toast.show(response[0].Message);
      }
    });
  },
  gotoRoute(name,params) {
   if (name == 'fightdetail') {
       this.props.navigator.push({ name: params.name, component: FightDetail, params:{...this.props},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
   } else if (name == 'teaminfo') {
         this.props.navigator.push({ name: name, component: TeamInfo, params:{'teaminfo':params,'userID':this.props.userdata.UserID,'role':"teamcreater"},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
   }
 },
 formatDate(strTime){
   if(strTime!=''||strTime!=undefined){

     return strTime.substring(0,10);
   }else{
     return '';
   }
 },
 rendercurrent(){
   if(this.props.rowData.CurrentState=='已认怂'){
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnbordergray]} >
         <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{this.props.rowData.CurrentState}</Text>
       </TouchableOpacity>
     );
   }
   else if(this.props.rowData.CurrentState=='发起挑战'&&this.props.fightstate=='send'){
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnbordergray]}  >
         <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{'等待回复'}</Text>
       </TouchableOpacity>
     );
   }else if(this.props.rowData.CurrentState=='已拒绝'){
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnbordergray]}  >
         <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{this.props.rowData.CurrentState}</Text>
       </TouchableOpacity>
     );
   }
   else if(this.props.rowData.CurrentState=='挑战成功'&&this.props.fightstate=='send'){
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnborderred]}  >
         <Text style={[commonstyle.red, commonstyle.fontsize14]}>{'+'}{this.props.rowData.Money}{'氦气'}</Text>
       </TouchableOpacity>
     );
   }
   else if(this.props.rowData.CurrentState=='挑战成功'&&this.props.fightstate=='receive'){
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnbordergray]}  >
         <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{'-'}{this.props.rowData.Money}{'氦气'}</Text>
       </TouchableOpacity>
     );
   }else if(this.props.rowData.CurrentState=='守擂成功'&&this.props.fightstate=='send'){
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnbordergray]}  >
         <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{'-'}{this.props.rowData.Money}{'氦气'}</Text>
       </TouchableOpacity>
     );
   }else if(this.props.rowData.CurrentState=='守擂成功'&&this.props.fightstate=='receive'){
     <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnborderred]}  >
       <Text style={[commonstyle.red, commonstyle.fontsize14]}>{'+'}{this.props.rowData.Money}{'氦气'}</Text>
     </TouchableOpacity>
   }
   else{
     return(
       <TouchableOpacity style={[styles.fightlistbtn,commonstyle.btnyellowblack]} onPress = {this.gotoRoute.bind(this,"fightdetail")} >
         <Text style={[commonstyle.black, commonstyle.fontsize12]}>{'确认赛果'}</Text>
       </TouchableOpacity>
     );
   }

 },
 renderresulttitle(){
   var fightcurrentstate = this.rendercurrent();
   var formatDate = this.formatDate(this.props.rowData.StateTimeStr);
  if(this.props.rowData.CurrentState=='挑战成功'){
    return(
      <View style={[commonstyle.col1, commonstyle.viewcenter]}>
      <View style={commonstyle.row}>
       <View style={[commonstyle.btnborderorange, styles.fightlisttexticon]}>
        <Text style={[commonstyle.orange, commonstyle.fontsize12]}>{'胜'}</Text>
       </View>
        <Text style={[commonstyle.blue, commonstyle.fontsize22]}>{'VS'}</Text>
        <View style={[commonstyle.btnbordercyan, styles.fightlisttexticon]}>
          <Text style={[commonstyle.cyan, commonstyle.fontsize12]}>{'负'}</Text>
        </View>
      </View>
        <Text style={[commonstyle.gray, commonstyle.fontsize12, styles.fightlistdate]}>{formatDate}</Text>
        {fightcurrentstate}
      </View>
    );
  }else if(this.props.rowData.CurrentState=='守擂成功'){
    return(
      <View style={[commonstyle.col1, commonstyle.viewcenter]}>
      <View style={commonstyle.row}>
      <View style={[commonstyle.btnbordercyan, styles.fightlisttexticon]}>
        <Text style={[commonstyle.cyan, commonstyle.fontsize12]}>{'负'}</Text>
      </View>
        <Text style={[commonstyle.blue, commonstyle.fontsize22]}>{'VS'}</Text>
        <View style={[commonstyle.btnborderorange, styles.fightlisttexticon]}>
         <Text style={[commonstyle.orange, commonstyle.fontsize12]}>{'胜'}</Text>
        </View>
      </View>
        <Text style={[commonstyle.gray, commonstyle.fontsize12, styles.fightlistdate]}>{formatDate}</Text>
        {fightcurrentstate}
      </View>
    );
  }else{
    return(
      <View style={[commonstyle.col1, commonstyle.viewcenter]}>
        <Text style={[commonstyle.blue, commonstyle.fontsize22]}>{'VS'}</Text>
        <Text style={[commonstyle.gray, commonstyle.fontsize12, styles.fightlistdate]}>{formatDate}</Text>
        {fightcurrentstate}
      </View>
    );
  }
 },
  render: function() {
    var fightresulttitle = this.renderresulttitle();
    return(
      <View>
        <View style={[commonstyle.row, styles.fightlist]}>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
          <TouchableOpacity onPress = {this.gotoRoute.bind(this,"teaminfo",this.state.steamData)}>
            <Image style={styles.fightlistimg} source={{uri:this.state.steamData.TeamLogo}} />
          </TouchableOpacity>
            <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{this.state.steamData.TeamName}</Text>
          </View>
           {fightresulttitle}
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
          <TouchableOpacity onPress = {this.gotoRoute.bind(this,"teaminfo",this.state.eteamData)}>
            <Image style={styles.fightlistimg} source={{uri:this.state.eteamData.TeamLogo}} />
          </TouchableOpacity>
            <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{this.state.eteamData.TeamName}</Text>
          </View>
        </View>
      </View>
    );
  }
});

 module.exports = UserFightList;
