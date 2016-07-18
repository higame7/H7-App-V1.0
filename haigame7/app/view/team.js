'use strict';
/**
 * APP 组队
 * @return {[Team Component]}
 * @author aran.hu
 */

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ListView,
  Navigator,
  Component,
  TouchableOpacity,
  TouchableHighlight,
  } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Toast from '@remobile/react-native-toast';
import commonstyle from '../styles/commonstyle';
import styles from '../styles/teamstyle';

import TeamRecruit from './team/teamrecruit';
import PlayerInfo from './team/playerinfo';
import TeamInfo from './team/teaminfo';
import MyApply from './user/myapply_screen';
import MyReceiveApply from './user/myreceiveapply_screen';
import MySendApply from './user/mysendapply_screen';
import ApplyJoin from './user/applyjoin_screen';
import Login from './user/login';
import User from './user.js';
import TeamService from '../network/teamservice';
import GlobalSetup from '../constants/globalsetup';
import GlobalVariable from '../constants/globalvariable';

export default class extends Component{
  constructor(props) {
    super(props);
    var dataRecruit = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataInvite = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      navbar: 0,
      invite:0,
      login:0,
      userteamname:'',
      userteamid:0,
      dataRecruitSource: dataRecruit.cloneWithRows(['row1']),
      dataInviteSource:dataInvite.cloneWithRows(['row1']),
      recruitlist:[],
      invitelist:[],
      paraRecruit:{},
      userteamdata:{
        phone:'',
        asset:0,
        teamlogo:'',
        fightscore:0,
        recruit:'',
        Role:'',
      },
      data:{
          subnavbarone:'我的申请',
          subnavbartwo:'我的受邀',
      },
      keyone:0,
      keytwo:0,
      footerOneMsg:'点击加载更多',
      footerTwoMsg:'点击加载更多',
      content:{
        userData:{},
      },
      loaded: false,
    }
  }
  //加载完组件后操作
  componentWillMount() {
    // this.setState({loaded: true})
  }
  updateContentData(content){
    this.setState({
      content: content,
      paraRecruit:{
        userID:content.userData.UserID,
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
        state:0,
      },
      paraInvite:{
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
        state:1,
      },
    });
    this.initData();
  }
  initData(){
    {/*请求我的战队信息*/}
    TeamService.getUserDefaultTeam(this.state.content.userData.UserID,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '20003'){
          this.setState({
            userteamname:'还没有创建战队',
            userteamid:0,
            userteamdata:{
              phone:'',
              asset:0,
              teamlogo:'',
              fightscore:0,
              recruit:'',
              Role:'',
            },
          });
        }else if(response[0].MessageCode=='10001'){
          this.setState({
           userteamname:'还没有登录',
           userteamid:0,
           userteamdata:{
             phone:'',
             asset:0,
             teamlogo:'',
             fightscore:0,
             recruit:'',
             Role:'',
           },
          });
        }else if(response[0].MessageCode == '0'){
          this.setState({
            userteamname:response[1].TeamName,
            userteamid:response[1].TeamID,
            userteamdata:{
              TeamID:response[1].TeamID,
              phone:this.state.userteamdata.phone,
              asset:response[1].Asset,
              Role:response[1].Role,
              teamlogo:response[1].TeamLogo,
              fightscore:response[1].FightScore,
              recruit:response[1].RecruitContent,
            },
            login:1,
          });
        }else{
          Toast.show(response[0].Message);
        }
      }
      else {
        Toast.show('请求错误');
      }
    });
    {/*招募信息列表*/}
    TeamService.getRecruitList(this.state.paraRecruit,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          console.log('招募信息列表_服务器请求异常');
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          this.setState({
            dataRecruitSource: this.state.dataRecruitSource.cloneWithRows(newData),
            recruitlist:newData,
          });
        }else{
          Toast.show(response[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
    TeamService.getInviteUserList(this.state.paraInvite,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          this.setState({
            dataInviteSource: this.state.dataInviteSource.cloneWithRows(newData),
            invitelist:newData,
          });
        }else{
          Toast.show(response[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
    this.setState({
      loaded:false,
    });
  }
  gotoRoute(name,params) {
    if(this.state.content.userData.UserID==undefined){
      this.props.navigator.push({
        name:'login',
        component:Login,
        params:{...this.props},
      });
    }else if(this.state.userteamid==0&&this.state.navbar!==0||this.state.userteamname=='还没有创建战队'&&this.state.navbar!==0){
      this.props.navigator.push({
        name:'user',
        component:User,
        params:{'userData':this.state.content.userData,'openmodal':true},
      });
    }else{
      if (name == 'teamrecruit') {
            this.props.navigator.push({ name: name, sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: TeamRecruit, params:{'teamrecruit':this.state.userteamdata.recruit,'teamid':this.state.userteamid,...this.props}});

      } else if (name == 'playerinfo') {
            this.props.navigator.push({ name: name,  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: PlayerInfo, params:{'teamID':this.state.userteamid,'playerinfo':params,'userteamdata':this.state.userteamdata}});
      }else if (name == 'teaminfo') {
            this.props.navigator.push({ name: name,  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: TeamInfo, params:{'teaminfo':params,'userID':this.state.content.userData.UserID,'role':this.state.userteamdata.Role} });
      }
      else if (name == 'myapply') {
            this.props.navigator.push({ name: name,  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: MyApply, params:{'content':this.state.content,'role':this.state.userteamdata.Role}});
      }
      else if (name == 'myreceiveapply') {
            this.props.navigator.push({ name: name,  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: MyReceiveApply, params:{'content':this.state.content,'role':this.state.userteamdata.Role,'updateLoginState':this.props.updateLoginState} });
      }
      else if (name == 'mysendapply') {
            this.props.navigator.push({ name: name,  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: MySendApply,params:{'teamID':this.state.userteamid,'userData':this.state.content.userData}});
      }
      else if (name == 'applyjoin') {
            this.props.navigator.push({ name: name,  sceneConfig: Navigator.SceneConfigs.FloatFromBottom,component: ApplyJoin,params:{'teamID':this.state.userteamid,'userData':this.state.content.userData,'updateLoginState':this.props.updateLoginState}});
      }
    }
  }
  _renderRecruitRow(rowData){
    return(
    <TouchableOpacity style={styles.teamlist} activeOpacity={0.8} onPress={()=>this.gotoRoute('teaminfo',rowData)}>
      <Image style={styles.teamlistimg} source={{uri:rowData.TeamLogo}} />
      <View style={styles.teamlistcenter}>
        <Text style={[commonstyle.yellow, commonstyle.fontsize14]}>{rowData.TeamName}</Text>
        <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{rowData.TeamDescription}</Text>
        <Text style={[commonstyle.cream, commonstyle.fontsize14]} numberOfLines={2}>{rowData.RecruitContent}</Text>
      </View>
      <View style={styles.teamlistright}>
        <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{rowData.RecruitTime}</Text>
        <TouchableOpacity  onPress={()=>this.state.content.userData.UserID==undefined?this.gotoRoute():this.applyTeam(this.state.content.userData.UserID,rowData.TeamID)} style = {[this.state.invite==0 ? commonstyle.btnredwhite : commonstyle.btncreamblack, styles.teamlistbtn]} activeOpacity={0.8}>
          <Text style = {this.state.invite==0 ? commonstyle.white:commonstyle.black}> { this.state.invite==0 ? '申请加入' : '已申请' } </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    );
  }
  renderHeroImageItem(rowData,key){
    return(
      <Image key={key} style={styles.userlistheroimg} source={{uri:rowData.HeroImage}} />
    );
  }
  _renderInviteRow(rowData){
    var that = this;
    var items =Object.keys(rowData.HeroImage).map(function(item,key) {
      return that.renderHeroImageItem(rowData.HeroImage[item],key);
    });
    return(
      <TouchableOpacity style={styles.userlist} activeOpacity={0.8} onPress={()=>this.gotoRoute('playerinfo',rowData)}>
        <Image style={styles.userlistimg} source={{uri:rowData.UserWebPicture}} />
        <View style={commonstyle.col1} >
          <Text style={commonstyle.white} >{rowData.UserWebNickName}</Text>
          <View style={styles.userlistteambox}>
            <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'战斗力:'}</Text>
            <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.GamePower}</Text>
            <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'氦气:'}</Text>
            <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.Asset}</Text>
          </View>
          <View style={styles.userlistteambox}>
            <Text style={[commonstyle.cream, commonstyle.fontsize12]}>{'擅长英雄:'}</Text>
            <View style={styles.userlisthero}>
             {items}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=>this.state.content.userData.UserID==0||this.state.content.userData.UserID==undefined||this.state.userteamid==0?this.gotoRoute():this.state.userteamdata.Role=="teamuser"?Toast.show("队员无法发出邀请"):this.inviteUser(rowData.UserID,this.state.userteamid)}  style = {[this.state.invite==0 ? commonstyle.btnredwhite : commonstyle.btncreamblack, styles.userlistbtn]} activeOpacity={0.8}>
          <Text style = {this.state.invite==0 ? commonstyle.white:commonstyle.black}> { this.state.invite==0 ? '邀请' : '已邀请' } </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  _renderFooter(){
    if(this.state.navbar==0){
      return(
        <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this,this.state.paraRecruit,this.state.recruitlist)}>
          <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerOneMsg}</Text>
        </TouchableHighlight>
      );
    }else{
      return(
        <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this,this.state.paraInvite,this.state.invitelist)}>
          <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerTwoMsg}</Text>
        </TouchableHighlight>
      );
    }
  }

  renderteamList(){
    if(this.state.navbar==0){
      return(
        <View>
        <ListView
          dataSource={this.state.dataRecruitSource}
          renderRow={this._renderRecruitRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
       </View>
      );
    }else{
      return(
        <View>
        <View style={styles.userlist}>
        <TouchableOpacity onPress={()=>this.gotoRoute('teaminfo',this.state.userteamdata)} >
          <Image style={styles.teamlistimg} source={{uri:this.state.userteamdata.teamlogo}} />
        </TouchableOpacity>
          <View style={styles.userlistteam}>
            <TouchableOpacity style={styles.userlistteamname} activeOpacity={0.8}>
              <Text style={commonstyle.cream}>{this.state.userteamname}</Text>
            </TouchableOpacity>
            <View style={styles.userlistteambox}>
              <Text style={commonstyle.yellow}>{'战斗力:'}</Text>
              <Text style={commonstyle.red}>{this.state.userteamdata.fightscore}</Text>
              <Text style={commonstyle.yellow}>{'氦气:'}</Text>
              <Text style={commonstyle.red}>{this.state.userteamdata.asset}</Text>
            </View>
            <Text style={commonstyle.cream}>{this.state.userteamdata.recruit}</Text>
            <TouchableOpacity style = {[commonstyle.btnredwhite, styles.teamlistbtn]} activeOpacity={0.8} onPress={()=>this.state.userteamdata.Role==""||this.state.userteamid==0?this.gotoRoute():this.state.userteamdata.Role=="teamcreater"?this.gotoRoute('teamrecruit',{'teamid':this.state.userteamid,'teamrecruit':this.state.userteamdata.recruit}):Toast.show("队员无法发布招募")} >
              <Text style = {commonstyle.white}> {'发布招募'} </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataInviteSource}
          renderRow={this._renderInviteRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
       </View>
      );
    }
  }

  _switchNavbar(nav){
 var nameone ='我的申请';
 var nametwo = '我的受邀';
  if(nav==1){
    nameone = '发出邀请';
    nametwo = '申请加入';
  }
 this.setState({
   navbar:nav,
   data:{subnavbarone:nameone,subnavbartwo:nametwo},
 });
 return;
  }
  applyTeam(userID,teamID){
    var data = {'userID':userID,'teamID':teamID};
    TeamService.applyTeam(data,(response)=>{
      if(response[0].MessageCode == '20006'){
        if(this.state.userteamdata.Role=="teamcreater"){
            Toast.show('您是战队队长无法加入');
        }
        else{
              Toast.show('您已经加入其他战队');
        }
      }
      else if (response[0].MessageCode == '20007') {
         Toast.show('您已向该战队发出申请');
      }
      else if (response[0].MessageCode == '0') {
         Toast.show('成功发出申请');
      } else {
        Toast.show('请求错误' + response[0].Message);
      }
    });
  }
  inviteUser(userID,teamID){
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
        Toast.show('请求错误' + response[0].Message);
      }
    });
  }
  _onLoadMore(param,data) {
      let _ds = data;
      let _params = param;
      _params.startpage = _params.startpage+1;
      if(param.state==0){
        this.setState({
          footerOneMsg: "正在加载.....",
        });
      }else if(param.state==1){
        this.setState({
          footerTwoMsg: "正在加载....."
        });
      }
      {/*加载下一页*/}
      let nextData='';
      if(param.state==0){
        TeamService.getRecruitList(_params,(response) => {
          this.parseLoadResponse(response,_ds,param.state);
      });
    }
    else if(param.state==1){
        TeamService.getInviteUserList(_params,(response) => {
        this.parseLoadResponse(response,_ds,param.state);
      });
     }

  }
  parseLoadResponse(response,data,state){
    if (response[0].MessageCode == '0') {
      let nextData = response[1];
      if(nextData.length<1&&state==0){
        setTimeout(()=>{
          Toast.show("木有更多数据了...");
          this.setState({
          footerOneMsg: "点击加载更多..."
         });
      },1000);
      }else if(nextData.length<1&&state==1){
        setTimeout(()=>{
          Toast.show("木有更多数据了...");
          this.setState({
          footerTwoMsg: "点击加载更多..."
         });
      },1000);
      }
     if(nextData.length==0){
            return;
      }else{
        for(var item in nextData){
        data.push(nextData[item])
         }
        setTimeout(()=>{
          if(state==0){
            this.setState({
              dataRecruitSource: this.state.dataRecruitSource.cloneWithRows(data),
              recruitlist:data,
              footerOneMsg: "点击加载更多",
                });
          }else if(state==1){
                this.setState({
                  dataInviteSource: this.state.dataInviteSource.cloneWithRows(data),
                  invitelist:data,
                  footerTwoMsg: "点击加载更多",
                });
              }
            },1000);
       }
     }else{
        Toast.show(response[0].Message);
     }
  }
  render(){
    let teamlist = this.renderteamList();
    return (
      <View style={commonstyle.viewbodyer}>
        <View style={styles.nav}>
          <View style={styles.navtab}>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)}>
              <Text style={[this.state.navbar==0?commonstyle.red:commonstyle.white, commonstyle.fontsize14]}>加入战队</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
              <Text style={[this.state.navbar==0?commonstyle.white:commonstyle.red, commonstyle.fontsize14]}>招募队员</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navsub}>
            <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress={()=>this.gotoRoute(this.state.data.subnavbarone=='我的申请'?'myapply':'mysendapply')}>
              <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{this.state.data.subnavbarone}</Text>
              <Text style={[commonstyle.red, commonstyle.fontsize12]}>{''}</Text>
            </TouchableOpacity>

            <View style={styles.navsubline}></View>

            <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress={()=>this.gotoRoute(this.state.data.subnavbartwo=='我的受邀'?'myreceiveapply':'applyjoin')}>
              <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{this.state.data.subnavbartwo}</Text>
              <Text style={[commonstyle.red, commonstyle.fontsize12]}>{''}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={[styles.scrollview]}>
          {teamlist}
        </ScrollView>
        <Spinner visible={this.state.loaded} />
     </View>
    );
  }
}
