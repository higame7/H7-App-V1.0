'use strict';
/**
 * APP 我的赛事
 * @return {[SplashScreen Component]}
 * @author Drex
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

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/matchstyle';

import Header from '../common/headernav';
import Loading from '../common/loading';
import UserMatchList from '../match/usermatchdate';
import MatchService from '../../network/matchservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';
import Toast from '@remobile/react-native-toast';

export default class extends Component{
  constructor(props) {
    super(props);
    var datasend = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    var datareceive = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    this.state = {
      datasendSource: datasend.cloneWithRows([]),
      datareceiveSource:datareceive.cloneWithRows([]),
      paraSend:{
        userID:this.props.userData.UserID,
        state: GlobalVariable.MATCH_INFO.Starting,
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
      },
      paraReceive:{
        userID:this.props.userData.UserID,
        state: GlobalVariable.MATCH_INFO.NoStart,
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
      },
      dataReceive:[],
      dataSend:[],
      footerOneMsg: "点击加载更多",
      footerTwoMsg: "点击加载更多",
      navbar:0,
      keyone:0,
      keytwo:0,
    }
  }
  //加载完组件后操作
  componentDidMount() {
      this.fetchSendData();
      this.fetchReceiveData();
  }
  //获取已结束赛事数据
  fetchSendData() {
    MatchService.myMatchList(this.state.paraSend,(response) => {
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        this.setState({
          datasendSource: this.state.datasendSource.cloneWithRows(newData),
          dataSend:newData,
        });
      }
      else {
        Toast.show(response[0].Message);
      }
    });
  }
  //获取未进行赛事数据
  fetchReceiveData() {
    MatchService.myMatchList(this.state.paraReceive,(response) => {
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        this.setState({
          datareceiveSource: this.state.datareceiveSource.cloneWithRows(newData),
          dataReceive:newData,
        });
      }
      else {
        Toast.show(response[0].Message);
      }
    });
  }
  _openModa() {
    this.setState({isOpen: true});
  }
  _closeModa() {
     this.setState({isOpen: false});
  }
  _switchNavbar(nav){
    this.setState({
      navbar:nav,
    });
  }
  gotoRoute(name) {
    if (name == 'matchrule') {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
        this.props.navigator.push({ name: name, component: MatchRule, sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
      }
    } else if (name == 'playerinfo') {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
      }
    }
  }
  rendermatchList(){
    if(this.state.navbar==0){
      return(
        <ListView
          dataSource={this.state.datasendSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      );
    }
    else{
      return(
        <ListView
          dataSource={this.state.datareceiveSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      );
    }
  }
  _renderRow(rowData){
    return(
      <UserMatchList rowData={rowData} navigator={this.props.navigator}  />
    );
  }
  _renderFooter(){
    if(this.state.navbar==0){
      return(
        <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this,this.state.paraSend,this.state.dataSend)}>
          <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerOneMsg}</Text>
        </TouchableHighlight>
      );
    }else{
      return(
        <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this,this.state.paraReceive,this.state.dataReceive)}>
          <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerTwoMsg}</Text>
        </TouchableHighlight>
      );
    }
  }
  _onLoadMore(param,data) {
      let _ds = data;
      let _params = param;
      _params.startpage = _params.startpage+1;
      if(param.state==GlobalVariable.MATCH_INFO.Starting){
        this.setState({
          footerOneMsg: "正在加载.....",
        });
      }else if(param.state==GlobalVariable.MATCH_INFO.NoStart){
        this.setState({
          footerTwoMsg: "正在加载.....",
        });
      }
      {/*加载下一页*/}
      MatchService.myMatchList(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<5&&param.state==GlobalVariable.MATCH_INFO.Starting){
            setTimeout(()=>{
              Toast.show("木有更多数据了...");
              this.setState({
              footerOneMsg: "点击加载更多..."
             });
          },1000);
          }else if(nextData.length<5&&param.state==GlobalVariable.MATCH_INFO.NoStart){
            setTimeout(()=>{
              Toast.show("木有更多数据了...");
              this.setState({
              footerTwoMsg: "点击加载更多..."
             });
          },1000);
          }else{
            for(var item in nextData){
              _ds.push(nextData[item])
            }
            setTimeout(()=>{
              if(param.state==GlobalVariable.MATCH_INFO.Starting){
                this.setState({
                  datasendSource: this.state.datasendSource.cloneWithRows(_ds),
                  dateSend:_ds,
                  loaded: true,
                  footerOneMsg: "点击加载更多",
                });
              }else if(param.state==GlobalVariable.MATCH_INFO.NoStart){
                this.setState({
                  datareceiveSource: this.state.datareceiveSource.cloneWithRows(_ds),
                  dataReceive:_ds,
                  loaded: true,
                  footerTwoMsg: "点击加载更多",
                });
              }
            },1000);
          }
        } else {
          Toast.show(response[0].Message);
        }
      });
  }
  render() {
    let matchlist = this.rendermatchList();
    return (
      <View style={styles.container}>
        <Header screenTitle="我的赛事" navigator={this.props.navigator}/>
        <View style={styles.nav}>
          <View style={styles.navtab}>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)}>
              <Text style={this.state.navbar==0?commonstyle.red:commonstyle.white}>已结束的比赛</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
              <Text style={this.state.navbar==0?commonstyle.white:commonstyle.red}>未进行的比赛</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.centerbg}>
          {matchlist}
        </ScrollView>
      </View>
    );
  }
}
