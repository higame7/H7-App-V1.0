'use strict';
/**
 * APP 赛程详情
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
  ListView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
var Header = require('../common/headernav'); // 主屏
var commonstyle = require('../../styles/commonstyle');
var styles = require('../../styles/matchstyle');
var Carousel = require('react-native-carousel');
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import MatchDetail from '../match/matchdetail';
import UserMatch from '../user/usermatch';
import MatchService from '../../network/matchservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';
import Toast from '@remobile/react-native-toast';
import Login from '../user/login';

export default class extends Component{
  constructor(props) {
    super(props);
    var databobo = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var datamatchdate = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var databobomatch = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      navbar: this.props.boboID,
      subbar: 0,
      databoboSource: databobo.cloneWithRows([]),
      datamatchdateSource: datamatchdate.cloneWithRows([]),
      databobomatchSource: databobomatch.cloneWithRows([]),
      bobolist:[],
      matchdatelist:[],
      bobomatchlist:[],
      boboid: this.props.boboID,
      starttime: '',
      num: 1,
      loaded:false,
      userphone:this.props.phoneNum?this.props.phoneNum : '13439843883' ,
      userData:{
        UserID:this.props.userdata.userid,
        UserTeamID:this.props.userdata.userteamid,
        UserAsset:this.props.userdata.userasset,
      },
      matchdata:{
        matchID:this.props.matchdata.matchID,
        matchname:this.props.matchdata.matchname,
        showpicture:this.props.matchdata.showpicture,
        introduce:this.props.matchdata.introduce,
      },
    }
  }
  componentWillMount() {
    this.initData();
  }
  initData(){
   this.getBoBoList();
   this.getMatchDateList(this.state.matchdata.matchID, this.state.boboid, this.state.num);
  }
  getBoBoList(){
    MatchService.getBoBoList(this.state.matchdata,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          this.setState({
            databoboSource: this.state.databoboSource.cloneWithRows(newData),
            bobolist:newData,
            loaded:false,
          });
         }
       }
        else{
            Toast.show(response[0].Message);
          }
    });
  }
  getMatchDateList(matchid, boboid, num){
    MatchService.getMatchDateList({matchID: matchid,boboID: boboid},(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          if(newData!==[]){
            this.setState({
              starttime: newData[0]==undefined?'':newData[0].StartTime.toString(),
              datamatchdateSource: this.state.datamatchdateSource.cloneWithRows(newData),
              matchdatelist:newData,
              loaded:false,
            });
          }
          if(num == 1){
            this.getBoBoMatchList(this.state.matchdata.matchID, this.state.boboid, this.state.starttime);
          }
         }
       }
        else{
            Toast.show(response[0].Message);
          }
    });
  }
  getBoBoMatchList(matchid, boboid, matchdate){
    MatchService.getBoBoMatchList({matchID: matchid,boboID: boboid,matchtime: matchdate},(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          let newData = response[1];
          this.setState({
            databobomatchSource: this.state.databobomatchSource.cloneWithRows(newData),
            bobomatchlist:newData,
            loaded:false,
          });
         }
       }
        else{
            Toast.show(response[0].Message);
          }
    });
  }
  _switchNavbar(nav){
    this.setState({
      navbar:nav,
      boboid: nav,
      subbar: 0,
      num: 1,
    });
    this.getBoBoList();
    this.getMatchDateList(this.state.matchdata.matchID, this.state.boboid, this.state.num);
    return;
  }
  _switchSubbar(sub, date){
    this.setState({
      subbar:sub,
      starttime: date,
      num: 2,
    });
    this.getMatchDateList(this.state.matchdata.matchID, this.state.boboid, this.state.num);
    this.getBoBoMatchList(this.state.matchdata.matchID, this.state.boboid, date);
    return;
  }
  _renderFooter(){

  }
  gotoRoute(params) {
    if (params.name == 'usermatch') {
      if(this.state.userData.UserID==undefined||this.state.userData.UserID==0){
        this.props.navigator.push({
          name:'login',
          component:Login,
          params:{...this.props},
         sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        });
      }
      else if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != params.name) {
        this.props.navigator.push({ name: params.name, component: UserMatch, params:{'userData':this.state.userData},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
      }
    } else if (params.name == 'matchdetail') {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != params.name) {
        this.props.navigator.push({ name: params.name, component: MatchDetail, params:params,sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
      }
    }
  }
  _renderBoBoRow(rowData){
    return(
      <TouchableOpacity style={[commonstyle.viewcenter, styles.carousellist]} activeOpacity={0.8} onPress = {() => this._switchNavbar(rowData.BoBoID)}>
        <Image style={rowData.BoBoID==this.state.navbar?styles.carousellistimgactive:styles.carousellistimg} source={{uri:rowData.UserPicture}} />
        <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.Name}</Text>
      </TouchableOpacity>
    );
  }
  _renderMatchDateRow(rowData,sectionID,rowID){
    return(
      <TouchableOpacity style={[this.state.subbar==rowID?styles.navbtnactive:styles.navbtn, styles.navtime]} activeOpacity={0.8}  onPress = {() => this._switchSubbar(rowID, rowData.StartTime)}>
        <Text style={this.state.subbar==rowID?commonstyle.red:commonstyle.white}>{rowData.StartTime}</Text>
      </TouchableOpacity>
    );
  }
  _renderBoBoMatchRow(rowData){
    if(rowData.Result=='主队胜'){
      return(
          <View style={[commonstyle.row, styles.schedulelist]}>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:rowData.STeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.STeamName}</Text>
            </View>
            <View style={commonstyle.col1}>
              <View style={[commonstyle.row, styles.schedulelistcenter]}>
                <View style={[commonstyle.btnborderorange, styles.schedulelisttexticon]}>
                  <Text style={[commonstyle.orange, commonstyle.fontsize12]}>{'胜'}</Text>
                </View>
                <View style={styles.schedulelistvs}>
                  <Text style={[commonstyle.blue, commonstyle.fontsize18]}>{'VS'}</Text>
                </View>
                <View style={[commonstyle.btnbordercyan, styles.schedulelisttexticon]}>
                  <Text style={[commonstyle.cyan, commonstyle.fontsize12]}>{'负'}</Text>
                </View>
              </View>
              <TouchableOpacity style={[commonstyle.btnborderred, styles.schedulelistbtn]} activeOpacity={0.8}  onPress = {this.gotoRoute.bind(this,{"name":"matchdetail","matchID":rowData.MatchID})}>
                <Text style={[commonstyle.red, commonstyle.fontsize14]}>{'查看详情'}</Text>
              </TouchableOpacity>
            </View>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:rowData.ETeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.ETeamName}</Text>
            </View>
          </View>
        );
    }else if(rowData.Result=='客队胜'){
      return(
          <View style={[commonstyle.row, styles.schedulelist]}>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:rowData.STeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.STeamName}</Text>
            </View>
            <View style={commonstyle.col1}>
              <View style={[commonstyle.row, styles.schedulelistcenter]}>
                <View style={[commonstyle.btnbordercyan, styles.schedulelisttexticon]}>
                  <Text style={[commonstyle.cyan, commonstyle.fontsize12]}>{'负'}</Text>
                </View>
                <View style={styles.schedulelistvs}>
                  <Text style={[commonstyle.blue, commonstyle.fontsize18]}>{'VS'}</Text>
                </View>
                <View style={[commonstyle.btnborderorange, styles.schedulelisttexticon]}>
                  <Text style={[commonstyle.orange, commonstyle.fontsize12]}>{'胜'}</Text>
                </View>
              </View>
              <TouchableOpacity style={[commonstyle.btnborderred, styles.schedulelistbtn]} activeOpacity={0.8}  onPress = {this.gotoRoute.bind(this,{"name":"matchdetail","matchID":rowData.MatchID})}>
                <Text style={[commonstyle.red, commonstyle.fontsize14]}>{'查看详情'}</Text>
              </TouchableOpacity>
            </View>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:rowData.ETeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.ETeamName}</Text>
            </View>
          </View>
        );
    }else{
      return(
          <View style={[commonstyle.row, styles.schedulelist]}>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:rowData.STeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.STeamName}</Text>
            </View>
            <View style={commonstyle.col1}>
              <View style={[commonstyle.row, styles.schedulelistcenter]}>
                <View style={commonstyle.col1}></View>
                <View style={styles.schedulelistvs}>
                  <Text style={[commonstyle.gray, commonstyle.fontsize18]}>{'VS'}</Text>
                </View>
                <View style={commonstyle.col1}></View>
              </View>
              <View style={[commonstyle.btnbordergray, styles.schedulelistbtn]}>
                <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{'未开始'}</Text>
              </View>
            </View>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:rowData.ETeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.ETeamName}</Text>
            </View>
          </View>
        );
    }
  }
  rendercarousellist(){
    return(
      <View style={styles.carouselview}>
        <Carousel  hideIndicators={true} animate={false} delay={5000}  loop={true} >
          <View style={styles.carousellistblock}>
            <ListView style={styles.carousellist} horizontal={true}
              dataSource={this.state.databoboSource}
              renderRow={this._renderBoBoRow.bind(this)}
            />
          </View>
        </Carousel>
      </View>
    );
  }
  render() {
    let carousel = this.rendercarousellist();
    let matchtitle = this.state.matchdata.matchname;
    return (
      <View style={styles.container}>
        <Header screenTitle={matchtitle} iconText='我的赛事' callback={this.gotoRoute.bind(this,{"name":"usermatch"})} navigator={this.props.navigator}/>
        {/*轮播*/}
        {carousel}
        {/*轮播end*/}
        <View style={styles.nav}>
          <View style={styles.navtab}>
            <Carousel  hideIndicators={true} animate={false} delay={5000}  loop={true} >
              <ListView style={styles.navtimetab} horizontal={true}
                  dataSource={this.state.datamatchdateSource}
                  renderRow={this._renderMatchDateRow.bind(this)}
                />
            </Carousel>
          </View>
        </View>
        <ScrollView style={styles.centerbg}>
          <ListView
              dataSource={this.state.databobomatchSource}
              renderRow={this._renderBoBoMatchRow.bind(this)}
              renderFooter={this._renderFooter.bind(this)}
            />
        </ScrollView>
      </View>
    );
  }
}
