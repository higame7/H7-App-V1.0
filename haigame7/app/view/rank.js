'use strict';
/**
 * APP 排行
 * @return {[rank Component]}
 * @author aran.hu
 */
 import React, {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Component,
    Navigator,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    } from 'react-native';
import Icon from 'react-native-vector-icons/Iconfont';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from '@remobile/react-native-toast';
import commonstyle from '../styles/commonstyle';
import styles from '../styles/rankstyle';

import UserRankList from './rank/userranklist';
import TeamRankList from './rank/teamranklist';
import TeamService from '../network/teamservice';
import RankService from '../network/rankservice';
import GlobalSetup from '../constants/globalsetup';
import GlobalVariable from '../constants/globalvariable';

var NAVBAR_DATA={first:"荣耀团队",second:"名人堂"};
var NAVSUBBAR_TEAM={first:"热度",second:"战斗力",third:"氦气"};
var NAVSUBBAR_USER={first:"大神系数",second:"战斗力",third:"氦气"};
//思路：1.分出两个组件：个人排行和团队排行

export default class extends Component{
  //初始化状态
  constructor(props) {
    super(props);
    this.state = {
      navbar: 0,
      userteamid:0,
      data: {subnavbar:1},
      ranksort:["Desc","Desc","Desc"],
      paraUser: {ranktype:'GameGrade',ranksort:'Desc',startpage:1,pagecount:10},
      paraTeam: {ranktype:'HotScore',ranksort:'Desc',startpage:1,pagecount:10},
      dataUserSource: new ListView.DataSource({rowHasChanged: (row1, row2) => true}),
      dataTeamSource: new ListView.DataSource({rowHasChanged: (row1, row2) => true}),
      dataUser:[],
      dataTeam:[],
      content:{
        userData:{},
      },
      userteamdata:{
        phone:'',
        asset:0,
        teamlogo:'',
        fightscore:0,
        recruit:'',
        Role:'',
      },
      loaded: false,
      footerOneMsg: "点击加载更多团队",
      footerTwoMsg: "点击加载更多名人",
      keyone: 0,
      keytwo: 0,
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
        },
      });
      {/*请求我的战队信息*/}
      TeamService.getUserDefaultTeam(content.userData.UserID,(response) => {
        if (response !== GlobalSetup.REQUEST_SUCCESS) {
         if(response[0].MessageCode == '0'){
            this.setState({
              userteamid:response[1].TeamID,
              userteamdata:response[1],
            });
          }
        }
        this.fetchUserData();
        this.fetchTeamData();
      }
    );

      this.setState({
        loaded: false
      });
  }
  //获取个人排行数据
  fetchUserData() {
    RankService.rankUser(this.state.paraUser,(response) => {
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        this.setState({
          dataUserSource: this.state.dataUserSource.cloneWithRows(newData),
          dataUser:newData,
        });
      }
      else {
        Toast.show(response[0].Message);
      }
    });
  }
  //获取团队排行数据
  fetchTeamData() {
    RankService.rankTeam(this.state.paraTeam,(response) => {
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        this.setState({
          dataTeamSource: this.state.dataTeamSource.cloneWithRows(newData),
          dataTeam:newData,
        });
      }
      else {
        Toast.show(response[0].Message);
      }
    });
  }

  _switchNavbar(nav){
    this.setState({
      navbar:nav,
      data:{subnavbar:1},
      ranksort:["Desc","Desc","Desc"],
      paraTeam: {ranktype:'HotScore',ranksort:'Desc',startpage:1,pagecount:10},
      paraUser: {ranktype:'GameGrade',ranksort:'Desc',startpage:1,pagecount:10},
    });
    if(nav==0){
        this.fetchTeamData();
    }else{
      this.fetchUserData();
    }
  }
  changeSort(ranksort,sub,ranktype,currenttype){
    switch(sub){
      case 1:
        if(ranksort[0]=="Desc"){
          if(ranktype==currenttype){
            this.setState({
              ranksort:["Asc","Desc","Desc"],
            });
          }
         }else{
          this.setState({
          ranksort:["Desc","Desc","Desc"],
          });
         }
      break;
      case 2:
        if(ranksort[1]=="Desc"){
          if(ranktype==currenttype){
            this.setState({
              ranksort:["Desc","Asc","Desc"],
            });
          }
         }else{
          this.setState({
          ranksort:["Desc","Desc","Desc"],
          });
         }
      break;
      case 3:
        if(ranksort[2]=="Desc"){
        if(ranktype==currenttype){
            this.setState({
                ranksort:["Desc","Desc","Asc"],
            });
          }
         }else{
          this.setState({
          ranksort:["Desc","Desc","Desc"],
          });
         }
      break;
      default:
    }

  return this.state.ranksort;
  }
  _switchSubNavbar(sub,params){
    if(this.state.navbar==0){
      var ranksort = this.changeSort(this.state.ranksort,sub,params.team,this.state.paraTeam.ranktype);

    this.setState({
      data:{subnavbar:sub},
      paraTeam: {ranktype:params.team,ranksort:ranksort[sub-1],startpage:1,pagecount:10},
    });
    this.fetchTeamData();
  }else {
    var ranksort = this.changeSort(this.state.ranksort,sub,params.user,this.state.paraUser.ranktype);
    this.setState({
      data:{subnavbar:sub},
      paraUser: {ranktype:params.user,ranksort:ranksort[sub-1],startpage:1,pagecount:10},
    });
    this.fetchUserData();
  }
  }
  //点击加载事件
  _renderFooter(){
    if(this.state.navbar==0){
      return(
        <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadTeam.bind(this,this.state.paraTeam,this.state.dataTeam)}>
          <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerOneMsg}</Text>
        </TouchableHighlight>
      );
    }else{
      return(
        <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadUser.bind(this,this.state.paraUser,this.state.dataUser)}>
          <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerTwoMsg}</Text>
        </TouchableHighlight>
      );
    }
  }
  //加载团队
  _onLoadTeam(param,data) {

      let _ds = data;
      let _params = param;
      _params.startpage = _params.startpage+1;
      this.setState({
        footerOneMsg: "正在加载.....",
      });
      {/*加载下一页*/}
      RankService.rankTeam(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<1){
            setTimeout(()=>{
           Toast.show("木有更多数据了...");
           this.setState({
              footerOneMsg: "点击加载更多团队",
          });
        },1000);
          }else{
            for(var item in nextData){
              _ds.push(nextData[item])
            }
            setTimeout(()=>{
              this.setState({
                dataTeamSource: this.state.dataTeamSource.cloneWithRows(_ds),
                dateTeam:_ds,
                loaded: false,
                footerOneMsg: "点击加载更多",
              });
            },1000);
          }
        } else {
        Toast.show(response[0].Message);
        }
      });

  }
  //加载用户
  _onLoadUser(param,data) {
      let _ds = data;
      let _params = param;
      _params.startpage = _params.startpage+1;
      this.setState({
        footerTwoMsg: "正在加载.....",
      });
      {/*加载下一页*/}
      RankService.rankUser(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<1){
              setTimeout(()=>{
              Toast.show("木有更多数据了...");
             this.setState({
                footerTwoMsg: "点击加载更多名人",
            });
          },1000);
          }else{
            for(var item in nextData){
              _ds.push(nextData[item])
            }
            setTimeout(()=>{
              this.setState({
                dataUserSource: this.state.dataUserSource.cloneWithRows(_ds),
                dateUser:_ds,
                loaded: false,
                footerTwoMsg: "点击加载更多",
              });
            },1000);
          }
        } else {
          Toast.show(response[0].Message);
        }
      });
  }

  renderSubData(){
    if(this.state.navbar==0){
      //返回团队排行分类
      return(NAVSUBBAR_TEAM);
    }
    else{
      //返回个人排行分类
      return(NAVSUBBAR_USER);
    }
  }

  renderUserRankList(user){
      //返回个人组件
      return(<UserRankList user={user} userID={this.state.content.userData.UserID} userteamid={this.state.userteamid} {...this.props} userteamdata={this.state.userteamdata}  navigator={this.props.navigator}/>);
  }

  renderTeamRankList(team){
      //返回团队组件
      return(<TeamRankList team={team} userID={this.state.content.userData.UserID}  {...this.props} userteamdata={this.state.userteamdata}  navigator={this.props.navigator}/>);
  }

  render() {
    let navdata=NAVBAR_DATA;
    let navsubdata=this.renderSubData();
    let listviewdata = '';
    if(this.state.navbar==1){
      listviewdata = <ListView dataSource={this.state.dataUserSource} renderRow={this.renderUserRankList.bind(this)} renderFooter={this._renderFooter.bind(this)}/>
    }else{
      listviewdata = <ListView dataSource={this.state.dataTeamSource} renderRow={this.renderTeamRankList.bind(this)} renderFooter={this._renderFooter.bind(this)}/>
    }
    return (
      <View style={commonstyle.viewbodyer}>
        <View style={styles.nav}>
          <View style={styles.navtab}>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)} >
              <Text style={[this.state.navbar==0?commonstyle.red:commonstyle.white, commonstyle.fontsize14]}>{navdata.first}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
              <Text style={[this.state.navbar==0?commonstyle.white:commonstyle.red, commonstyle.fontsize14]}>{navdata.second}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navsub}>
            <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8}  onPress = {() => this._switchSubNavbar(1,{'user':'GameGrade','team':'HotScore'})}>
              <Text style={[this.state.data.subnavbar==1?commonstyle.red:commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.first}</Text>
              <Icon name={this.state.ranksort[0]=="Desc"?"angle-down":"angle-up"} size={8}  style={[this.state.data.subnavbar==1?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
            </TouchableOpacity>

            <View style={styles.navsubline}></View>

            <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress = {() => this._switchSubNavbar(2,{'user':'GamePower','team':'FightScore'})}>
              <Text style={[this.state.data.subnavbar==2?commonstyle.red:commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.second}</Text>
              <Icon name={this.state.ranksort[1]=="Desc"?"angle-down":"angle-up"}  size={8}  style={[this.state.data.subnavbar==2?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
            </TouchableOpacity>

            <View style={styles.navsubline}></View>

            <TouchableOpacity style={styles.navsubblock} activeOpacity={0.8} onPress = {() => this._switchSubNavbar(3,{'user':'Asset','team':'Asset'})}>
              <Text style={[this.state.data.subnavbar==3?commonstyle.red:commonstyle.gray, commonstyle.fontsize12]}>{navsubdata.third}</Text>
              <Icon name={this.state.ranksort[2]=="Desc"?"angle-down":"angle-up"}  size={8}  style={[this.state.data.subnavbar==3?commonstyle.red:commonstyle.gray, styles.navsubicon]}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.scrollview}>
        {listviewdata}
        </ScrollView>
        <Spinner visible={this.state.loaded} />
      </View>
    );
  }
}
