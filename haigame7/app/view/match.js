'use strict';
/**
 * APP 赛事
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */

import React, {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ListView,
  Component,
  TouchableOpacity,
  Navigator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/Iconfont';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import Toast from '@remobile/react-native-toast';
import commonstyle from '../styles/commonstyle';
import styles from '../styles/matchstyle';

import MatchRule from './match/matchrule';
import MatchSchedule from './match/matchschedule';
import Login from './user/login';
import User from './user.js';
import MatchService from '../network/matchservice';
import GuessService from '../network/guessservice';
import TeamService from '../network/teamservice';
import AssertService from '../network/assertservice';
import GlobalSetup from '../constants/globalsetup';
import GlobalVariable from '../constants/globalvariable';

const default_user_pic = 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'
export default class extends Component{
  constructor(props) {
    super(props);
    var databobo = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataguess = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var datamyguess = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      navbar: 0,
      databoboSource: databobo.cloneWithRows([]),
      dataguessSource:dataguess.cloneWithRows([]),
      datamyguessSource:datamyguess.cloneWithRows([]),
      bobolist:[],
      boboid: 1,
      matchstate:0,
      guesslist:[],
      isOpen:false,
      loaded:false,
      joincount:-1,
      jointeam:'',
      jointime:'',
      userphone:'' ,
      guessmoney:0,
      userdata:{
        userid:0,
        userteamid:0,
        userasset:0,
        role:"",
      },
      hjData:{},
      hjEarnData:{},
      matchdata:{
        matchID: 4,
        matchname:'',
        showpicture:'',
        introduce:'',
      },
      modaData:"",
    }
  }
  //获取app.js传值
  updateContentData(content){
    this.setState({
      content: content,
      jointeam:'',
      isOpen: false,
      userphone:content.userData.PhoneNumber,
      userdata:{
        userid:0,
        userteamid:0,
        userasset:0,
        role:"",
      }
    });
    this.initData();
  }
  //加载组件
  componentWillMount() {
    // this.setState({loaded: true})
  }
  initData(){
    {/*请求我的战队信息*/}
    TeamService.getUserDefaultTeam(this.state.content.userData.UserID,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          this.setState({
            userdata:{
              userid:response[1].Creater,
              userteamid:response[1].TeamID,
              userasset:response[1].Asset,
              role:response[1].Role,
            },
          });
        }else{
        //  Toast.showLongCenter(response[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
    this.getTotalAssertAndRank(this.state.userphone);
    this.getMatchList();
    this.getGuessList();
  }
  getTotalAssertAndRank(phoneNum) {
    AssertService.getTotalAssertAndRank(phoneNum,(response) => {
      if (response[0].MessageCode == '0') {
        let data = {'totalAsset': response[1].TotalAsset,'myRank': response[1].MyRank}
        this.setState({
          hjData: data,
          hjEarnData:{
            'totalAsset':response[1].TotalAsset,
            'totalEarnAsset':0,
          },
        });
      } else {
        console.log('getTotalAssertAndRank 请求错误' + response[0].Message); //可能是数据直接添加的用
        this.setState({
          isOpen: false,
          hjData:{
            totalAsset:0,
          },
          hjEarnData:{
          totalAsset:0,
          totalEarnAsset:0,
        }
        });
      }
    })
  }
  getMatchList(){
    {/*请求赛事信息*/}
    MatchService.getMatchList((response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          this.setState({
            matchdata:{
              matchID:response[1][0].MatchID,
              matchname:response[1][0].MatchName,
              showpicture:response[1][0].ShowPicture,
              introduce:response[1][0].Introduce,
            },
          });
          this.getMatchState(this.state.matchdata);
          this.getBoBoList(this.state.matchdata);
        }else{
          Toast.showLongCenter(reponse[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
  }
  getGuessList(){
    {/*请求竞猜列表*/}
    GuessService.getGuessList((response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          this.setState({
            dataguessSource: this.state.dataguessSource.cloneWithRows(newData),
            guesslist:newData,
          });
        }else{
          Toast.showLongCenter(response[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
  }
  getMatchState(matchdata){
    {/*请求赛事信息*/}
    MatchService.getMatchState(matchdata,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          this.setState({
            matchstate:response[1].MatchState,
          });
        }else{
          Toast.showLongCenter(response[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
  }
  calculateGuess(text){
    let type = /^[0-9]*[1-9][0-9]*$/;
    let re = new RegExp(type);
    if (text.match(re) == null) {
      var money = 0;
    }else{
      var money = parseInt(text);
    }
    this.setState({
      guessmoney:money,
      hjEarnData:{
        totalAsset:this.state.hjData.totalAsset-money,
        totalEarnAsset:money*this.state.modaData.guessodd,
      },
    });
    this.state.guessmoney = text
  }
  getBoBoList(matchdata){
    MatchService.getBoBoList(matchdata,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          let groups=this.groupItems(newData,3);
          this.setState({
            databoboSource: this.state.databoboSource.cloneWithRows(groups),
            bobolist:newData,
            loaded:false,
          });
        }else{
          Toast.showLongCenter(response[0].Message);
        }
       }else{
        Toast.show('请求错误');
      }
    });
  }
  groupItems(items, itemsPerRow){
    var itemsGroups = [];
    var group = [];
    items.forEach(function(item) {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });
    if (group.length > 0) {
      itemsGroups.push(group);
    }
    return itemsGroups;
  }
  _openBoBoModa(rowData) {
    if(this.state.matchstate==1){
      this.gotoRoute('matchschedule',this.state.matchdata);
    }else{
      MatchService.getBoBoCount(rowData,(response) => {
        if (response !== GlobalSetup.REQUEST_SUCCESS) {
          if(response[0].MessageCode == '40001'){
            Toast.show('服务器请求异常');
          }else if(response[0].MessageCode == '0'){
            this.setState({
              joincount:response[1].JoinCount,
            });
          }else{
           Toast.showLongCenter(response[0].Message);
          }
        }else{
          Toast.show('请求错误');
        }
      });
      MatchService.myJoinMatch({matchID:rowData.MatchID,teamID:this.state.userdata.userteamid,phonenumber:this.state.userphone},(response2) => {
        if (response2 !== GlobalSetup.REQUEST_SUCCESS) {
          if(response2[0].MessageCode == '50001'){
            this.setState({
              isOpen: true,
              modaData:rowData,
              jointeam: '',
            });
          }else if(response2[0].MessageCode == '0'){
            this.setState({
              isOpen: true,
              modaData:rowData,
              jointeam:response2[1].Name,
              jointime:response2[1].ApplyTime,
            });
          }else{
            Toast.showLongCenter(response[0].Message);
          }
        }
      });
    }
  }
  _openGuessModa(rowData) {
    GuessService.myGuessList({userID:this.state.content.userData.UserID,guessID:rowData.guessid,startpage:GlobalVariable.PAGE_INFO.StartPage,pagecount:GlobalVariable.PAGE_INFO.PageCount*20},(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          this.setState({
            datamyguessSource: this.state.datamyguessSource.cloneWithRows(newData),
            isOpen: true,
            modaData:rowData
          });
        }else{
          Toast.showLongCenter(response[0].Message);
        }
      }else{
        Toast.show('请求错误');
      }
    });
  }
  _closeModa() {
    this.setState({isOpen: false});
    if(this.state.navbar==1){
      let money = 0;
      this.setState({
        guessmoney:money,
        hjEarnData:{
          totalAsset:this.state.hjData.totalAsset-money,
          totalEarnAsset:money*this.state.modaData.guessodd,
        },
      });
    };
  }
  _doBet(params){
    if(this.state.content.userData.UserID==undefined){
      this.props.navigator.push({
        name:'login',
        component:Login,
        params:{...this.props},
      });
    }else if(this.state.userdata.userteamid==0){
      this.props.navigator.push({
        name:'user',
        component:User,
        params:{'userData':this.state.content.userData,'openmodal':true},
      });
    }else{
      params.money = parseInt(this.state.guessmoney);
      let _money =   params.money.toString()
      let type = /^[0-9]*[1-9][0-9]*$/;
      let re = new RegExp(type);
      if (_money.match(re) == null) {
        Toast.showShortCenter("请填写大于1的整数金额");
        return
      }
      if(params.money>this.state.hjData.totalAsset){
        Toast.showShortCenter("没有足够的氦气");
        return
      }else if(params.money<10){
        Toast.showShortCenter("最小押注10氦气");
        return
      }
      GuessService.doGuessBet(params,(response) => {
        if (response !== GlobalSetup.REQUEST_SUCCESS) {
          if(response[0].MessageCode == '40001'){
            Toast.show('服务器请求异常');
          }else if(response[0].MessageCode == '0'){
            Toast.showLongCenter('下注成功');
            this.initData();
          }else{
            Toast.showLongCenter(response[0].Message);
          }
          {/*更新请求*/}
          setTimeout(()=>{
            this.getGuessList();
            this.setState({isOpen: false});
          },1000);
        }else{
          Toast.show('请求错误');
        }
      });
    }
  }
  _joinMatch(params){
    if(this.state.content.userData.UserID==undefined){
      this.props.navigator.push({
        name:'login',
        component:Login,
        params:{...this.props},
      });
    }else if(this.state.userdata.userteamid==0){
      this.props.navigator.push({
        name:'user',
        component:User,
        params:{'userData':this.state.content.userData,'openmodal':true,...this.props},
      });
    }else{
      MatchService.joinMatch(params,(response) => {
        if (response !== GlobalSetup.REQUEST_SUCCESS) {
          if(response[0].MessageCode == '40001'){
              Toast.show('服务器请求异常');
          }else if(response[0].MessageCode == '0'){
           Toast.showLongCenter('报名成功');
            this.setState({isOpen: false});
         }else{
           Toast.showLongCenter(response[0].Message);
         }
       }
        else{
              Toast.show('请求错误');
          }
      });
    }
  }

  _quitMatch(params){
    if(params.modalteamname!==params.jointeamname){
      Toast.showLongCenter("您的战队已报名参赛，无法再次报名");
       return;
    }
    MatchService.quitMatch(params,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          Toast.showLongCenter('取消成功');
          this.setState({isOpen: false});
        }else{
          Toast.showLongCenter(response[0].Message);
        }
      }else{
        Toast.show(response[0].Message);
      }
    });
  }
  _switchNavbar(nav){
    this.setState({
      navbar:nav,
    });
    return;
  }
  gotoRoute(name,params) {
    if (name == 'matchrule') {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
        this.props.navigator.push({ name: name, component: MatchRule,params:{'matchdata':params}});
      }
    } else if (name == 'matchschedule') {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
        this.props.navigator.push({ name: name, component: MatchSchedule, params:{'matchdata':params,'boboID':this.state.boboid, 'userdata':this.state.userdata} });
      }
    }
  }
  rendermodaldetail(){
    if(this.state.navbar==0){
      {/*获得已报名战队数*/}
      let joinView =this.state.jointeam==''?<View style={commonstyle.modalbodybottom}></View>:<View style={commonstyle.modalbodybottom}><Text style={[commonstyle.red,commonstyle.fontsize12]}>{'您已加入'}{this.state.jointeam}{',报名结束后为您生成赛程信息,请关注'}</Text></View>

      return(
        <Modal isOpen={this.state.isOpen}  swipeToClose={false} onClosed={this._closeModa.bind(this)} style={[commonstyle.modal,commonstyle.modalbig]}  position={"top"} >
          <View style={styles.modalheader}>
            <Image style={styles.modalimg} source={{uri:this.state.modaData.UserPicture}} />
            <Text style={[commonstyle.white, commonstyle.fontsize14, styles.modalfont]}>{this.state.modaData.Name}</Text>
            <Text style={[commonstyle.gray, commonstyle.fontsize12, styles.modalfont]}>{this.state.modaData.TalkShow}</Text>
            <Text style={[commonstyle.yellow, commonstyle.fontsize14, styles.modalfont]}>{'英雄总名额  '}<Text style={commonstyle.red}>{this.state.joincount}{'/'}{this.state.modaData.Count}</Text></Text>
          </View>
          <ScrollView style={styles.modalscrollview} showsVerticalScrollIndicator={true} >
            <View style={commonstyle.viewleft}>
              <Text style={[commonstyle.cream, styles.modalfont]}>{'介绍:  '} <Text style={commonstyle.white}>{this.state.modaData.Introduce}</Text></Text>
            </View>
            {joinView}
          </ScrollView>
          <View style={[commonstyle.row, commonstyle.modalbtn]}>
            <Button containerStyle={[commonstyle.col1, commonstyle.modalbtnfont, commonstyle.btncreamblack]} style={commonstyle.black} activeOpacity={0.8} onPress={this._closeModa.bind(this)} >关闭</Button>
            <Button containerStyle={[commonstyle.col1, commonstyle.modalbtnfont, commonstyle.btnredwhite]} style={commonstyle.white} activeOpacity={0.8} onPress={this.state.jointeam==''?this._joinMatch.bind(this,{'matchID':this.state.modaData.MatchID,'boboID':this.state.modaData.BoBoID,'teamID':this.state.userdata.userteamid,'phone':this.state.userphone,'jointeam':this.state.jointeam}):this._quitMatch.bind(this,{'matchID':this.state.modaData.MatchID,'teamID':this.state.userdata.userteamid,'phone':this.state.userphone,'modalteamname':this.state.modaData.Name,'jointeamname':this.state.jointeam})} >{this.state.jointeam==''?'报名参赛':(this.state.jointeam==this.state.modaData.Name?'取消报名':'报名')}</Button>
          </View>
        </Modal>
      );
    }else{
      return(
        <Modal isOpen={this.state.isOpen}  swipeToClose={false} onClosed={this._closeModa.bind(this)} style={[commonstyle.modal, commonstyle.modalbig, styles.modalbgopacity]} position={"top"} >
          <View style={[styles.modalheader]}>
            <Text style={[commonstyle.cream, styles.modaltext]}>{'您的选择：'}{this.state.modaData.guessname}</Text>
            <View  style = {styles.modalinput }>
              <TextInput placeholder={'押注最小为10氦气,请输入押注金额'} maxLength={8} placeholderTextColor='#484848' underlineColorAndroid = 'transparent' style={styles.modalinputfont} keyboardType='numeric'  onChangeText = {(text) => this.calculateGuess(text)}/>
            </View>
            <View style ={commonstyle.row}>
              <View style={commonstyle.col1}><Text style={[commonstyle.cream, styles.modaltext]}>{'  可用氦气:  '}<Text style={commonstyle.yellow}>{this.state.hjEarnData.totalAsset}</Text></Text></View>
              <View style={commonstyle.col1}><Text style={[commonstyle.cream, styles.modaltext]}>{'  预估收益:  '}<Text style={commonstyle.yellow}>{Math.round(this.state.hjEarnData.totalEarnAsset)}</Text></Text></View>
            </View>
          </View>

          <View style={commonstyle.row}>
            <Button containerStyle={[commonstyle.col1, commonstyle.modalbtnfont, commonstyle.btncreamblack]} style={commonstyle.black} activeOpacity={0.8} onPress={this._closeModa.bind(this)} >取消关闭</Button>
            <Button containerStyle={[commonstyle.col1, commonstyle.modalbtnfont, commonstyle.btnredwhite]} style={commonstyle.white} activeOpacity={0.8} onPress={this._doBet.bind(this,{'guessID':this.state.modaData.guessid,'userID':this.state.content.userData.UserID,'teamID':this.state.modaData.guessteamid,'money':0,'odds':this.state.modaData.guessodd})} >确认下注</Button>
          </View>

          <View style={styles.modalfooter}>
            <View style={[commonstyle.row, styles.modaltabhead]}>
              <View style={[commonstyle.col1, commonstyle.viewcenter]}>
                <Text style={[commonstyle.red,commonstyle.fontsize12]}>{'时间'}</Text>
              </View>
              <View style={styles.modaltabline} ></View>
              <View style={[commonstyle.col2, commonstyle.viewcenter]}>
                <Text style={[commonstyle.red,commonstyle.fontsize12]}>{'押注项'}</Text>
              </View>
              <View style={styles.modaltabline} ></View>
              <View style={[commonstyle.col1, commonstyle.viewcenter]}>
                <Text style={[commonstyle.red,commonstyle.fontsize12]}>{'金额'}</Text>
              </View>
              <View style={styles.modaltabline} ></View>
              <View style={[commonstyle.col1, commonstyle.viewcenter]}>
                <Text style={[commonstyle.red,commonstyle.fontsize12]}>{'赔率'}</Text>
              </View>
              <View style={styles.modaltabline} ></View>
              <View style={[commonstyle.col1, commonstyle.viewcenter]}>
                <Text style={[commonstyle.red,commonstyle.fontsize12]}>{'预估收益'}</Text>
              </View>
            </View>
             <ListView
               dataSource={this.state.datamyguessSource}
               renderRow={this.rendermyguessList.bind(this)}
               renderFooter={this._renderFooter.bind(this)}
             />
          {/*footer*/}
          </View>
        </Modal>
      );
    }
  }
  renderItem(rowData,key){
    return(
      <View key={key} style={commonstyle.col1}>
      <TouchableOpacity style={commonstyle.viewcenter}   onPress={this._openBoBoModa.bind(this,rowData)}>
        <Image style={styles.anchorlistimg} source={{uri:rowData.UserPicture}} />
        <Text style={commonstyle.gray}>{rowData.Name}</Text>
      </TouchableOpacity>
      </View>
    );
  }
  _renderBoBoRow(group,sectionID,rowID){
    var that = this;
    var items =Object.keys(group).map(function(item,key) {
      return that.renderItem(group[item],key);
    });
    return(
      <View style={[commonstyle.row, styles.anchorlistblock]}>
        {items}
      </View>
    );
  }
  _renderGuessRow(rowData){
    return(
      <View style={styles.matchlist}>
        <Image source = {require('../images/assetbg.jpg')} style={styles.matchlistbg} resizeMode = {"cover"}>
          <View style={[commonstyle.viewcenter, styles.matchlisttitle]}><Text style={[commonstyle.fontsize14,commonstyle.white]}>{rowData.GuessName}</Text></View>
          <View style={commonstyle.row}>
            <TouchableOpacity style={[commonstyle.col1, commonstyle.viewcenter]} onPress={this._openGuessModa.bind(this,{guessid:rowData.GuessID,guessteamid:rowData.STeamID,guessname:rowData.STeamName,guessodd:rowData.STeamOdds})}>
              <Image style={styles.matchlistimg} source={{uri:rowData.STeamLogo}} />
              <Text style={[commonstyle.white, commonstyle.fontsize14, styles.matchlistname]}>{rowData.STeamName}</Text>
              <Text style={[commonstyle.yellow,commonstyle.fontsize12 ]}>{'赔率'}{rowData.STeamOdds}</Text>
            </TouchableOpacity>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Text style={[commonstyle.blue, styles.matchlistvs]}>{'VS'}</Text>
              <Text style={[commonstyle.white, commonstyle.fontsize12, styles.matchlistvstime]}>{rowData.MatchTime!==null?rowData.MatchTime.substring(0,10):rowData.MatchTime}</Text>
              <Text style={[commonstyle.yellow ]}>{rowData.GuessType}</Text>
            </View>
            <TouchableOpacity style={[commonstyle.col1, commonstyle.viewcenter]} onPress={this._openGuessModa.bind(this,{guessid:rowData.GuessID,guessteamid:rowData.ETeamID,guessname:rowData.ETeamName,guessodd:rowData.ETeamOdds})}>
              <Image style={styles.matchlistimg} source={{uri:rowData.ETeamLogo}} />
              <Text style={[commonstyle.white, commonstyle.fontsize14, styles.matchlistname]}>{rowData.ETeamName}</Text>
              <Text style={[commonstyle.yellow,commonstyle.fontsize12 ]}>{'赔率'}{rowData.ETeamOdds}</Text>
            </TouchableOpacity>
          </View>
        </Image>

        <View style={[commonstyle.row, styles.matchlisttab]}>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
            <Icon name="time" size={20} color={'#D31B25'}/>
            <Text style={[commonstyle.cream, commonstyle.fontsize12]}>{rowData.MatchTime!==null?rowData.MatchTime.substring(10,20):rowData.MatchTime}</Text>
          </View>
          <View style={styles.matchlisttabline}></View>
          <TouchableOpacity style={[commonstyle.col1, commonstyle.viewcenter]} activeOpacity={0.8} >
            <Icon name="fire" size={20} color={'#D31B25'}/>
            <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.AllMoney}{'氦气'}</Text>
          </TouchableOpacity>
          <View style={styles.matchlisttabline} ></View>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
            <Icon name="user" size={20} color={'#D31B25'}/>
            <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.AllUser}{'人押注'}</Text>
          </View>
        </View>
        <View style={commonstyle.row}>
          <View style={commonstyle.col1}></View>
          <View style={commonstyle.col1}></View>
        </View>
      </View>
    );
  }
  _renderFooter(){
  }
  rendermyguessList(rowData){
    return(
      <View style={styles.modaltabcontent}>
        <View style={[commonstyle.row, styles.modaltablist]}>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize12]}>{rowData.GuessTime!==null?rowData.GuessTime.substring(2,10):rowData.GuessTime}</Text>
          </View>
          <View style={[commonstyle.col2, commonstyle.viewcenter]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize12]}>{rowData.BetTeamName}</Text>
          </View>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize12]}>{rowData.BetMoney}</Text>
          </View>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize12]}>{rowData.Odds}</Text>
          </View>
          <View style={[commonstyle.col1, commonstyle.viewcenter]}>
            <Text style={[commonstyle.cream,commonstyle.fontsize12]}>{Math.round(rowData.BetMoney*rowData.Odds)}</Text>
          </View>
      </View>
    </View>
    );
  }
  rendermatchList(){
    if(this.state.navbar==0){
      return(
        <View style={commonstyle.viewbottom}>
        <TouchableOpacity  style={styles.matchbanner} activeOpacity={0.8} onPress={()=>this.gotoRoute('matchrule',this.state.matchdata)}>
          <Image  style={styles.matchbannerimg}source={{uri:this.state.matchdata.showpicture || default_user_pic}}  resizeMode={"stretch"} />
        </TouchableOpacity>
        <ListView
          dataSource={this.state.databoboSource}
          renderRow={this._renderBoBoRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          pageSize={3}
        />
        </View>
      );
    }
    else{
      return(
        <ListView
          dataSource={this.state.dataguessSource}
          renderRow={this._renderGuessRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      );
    }
  }
  render() {
    let matchlist = this.rendermatchList();
    let modal = this.rendermodaldetail();
    return (
      <View style={commonstyle.viewbodyer}>
        <View style={styles.nav}>
          <View style={styles.navtab}>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)}>
              <Text style={[this.state.navbar==0?commonstyle.red:commonstyle.white, commonstyle.fontsize14]}>比赛赛事</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
              <Text style={[this.state.navbar==0?commonstyle.white:commonstyle.red, commonstyle.fontsize14]}>赛事竞猜</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.scrollview}>
          {matchlist}
        </ScrollView>
        {/*modal*/}
        {modal}
        <Spinner visible={this.state.loaded} />
      </View>
    );
  }
}
