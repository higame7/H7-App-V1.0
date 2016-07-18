'use strict';
/**
 * APPs我的赛事
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */

import React, {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
  Component,
  TouchableOpacity,
  Navigator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/fightstyle';
import Header from '../common/headernav'; // 主屏

import UserFightList from '../fight/userfightdate';
import Loading from '../common/loading';
import Toast from '@remobile/react-native-toast';
import FightService from '../../network/fightservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';

export default class extends Component{
  constructor(props) {
    super(props);
    var datasend = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var datareceive = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      datasendSource: datasend.cloneWithRows([]),
      datareceiveSource:datareceive.cloneWithRows([]),
      paraSend:{
        phone:this.props.userData.PhoneNumber?this.props.userData.PhoneNumber : '',
        fighttype:GlobalVariable.FIGHT_INFO.FightSend,
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
      },
      paraReceive:{
        phone:this.props.userData.PhoneNumber?this.props.userData.PhoneNumber : '',
        fighttype:GlobalVariable.FIGHT_INFO.FightReceive,
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
      },
      userData:this.props.userData,
      dataReceive:[],
      dataSend:[],
      footerOneMsg: "点击加载更多",
      footerTwoMsg: "点击加载更多",
      navbar:0,
      keyone:0,
    }
  }
  //加载完组件后操作
  componentDidMount() {
      this.fetchSendData();
      this.fetchReceiveData();
  }
  //获取发出约战数据
  fetchSendData() {
    FightService.getUserFight(this.state.paraSend,(response) => {
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
  //获取接受约战数据
  fetchReceiveData() {
    FightService.getUserFight(this.state.paraReceive,(response) => {
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
    return;
  }
  gotoRoute(name) {
    if (name == 'fightdetail') {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
        this.props.navigator.push({ name: name, component: FightDetail, sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
      }
    } else if (name == 'userinfo') {

    }
  }
  renderfightList(){
    if(this.state.navbar==0){
      return(
        <ListView
          dataSource={this.state.datasendSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      );
    }else{
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
    let _this =this;
  if(this.state.navbar==0){
    return(
      <UserFightList rowData={rowData} fightstate={'send'} userdata={this.state.userData} callback={function(key,params){_this.fetchSendData()}}  navigator={this.props.navigator}  />
    );
  }else{
    return(
      <UserFightList rowData={rowData} fightstate={'receive'} userdata={this.state.userData} callback={function(key,params){_this.fetchReceiveData()}} navigator={this.props.navigator}  />
    );
  }
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
      if(param.fighttype==GlobalVariable.FIGHT_INFO.FightSend){
        this.setState({
          footerOneMsg: "正在加载.....",
        });
      }else if(param.fighttype==GlobalVariable.FIGHT_INFO.FightReceive){
        this.setState({
          footerTwoMsg: "正在加载....."
        });
      }
      {/*加载下一页*/}
      FightService.getUserFight(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<1&&param.fighttype==GlobalVariable.FIGHT_INFO.FightSend){
            setTimeout(()=>{
              Toast.show("木有更多数据了...");
              this.setState({
              footerOneMsg: "点击加载更多..."
             });
          },1000);
        }else if(nextData.length<1&&param.fighttype==GlobalVariable.FIGHT_INFO.FightReceive){
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
              _ds.push(nextData[item])
            }
            setTimeout(()=>{
              if(param.fighttype==GlobalVariable.FIGHT_INFO.FightSend){
                this.setState({
                  datasendSource: this.state.datasendSource.cloneWithRows(_ds),
                  dateSend:_ds,
                  loaded: true,
                  footerOneMsg: "点击加载更多",
                });
              }else if(param.fighttype==GlobalVariable.FIGHT_INFO.FightReceive){
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
      //这等到有api在搞吧

  }
  render() {
    let fightlist =  this.renderfightList();
    return (
      <View style={styles.container}>
        <Header screenTitle="我的约战"   navigator={this.props.navigator}/>
        <View style={styles.navtab}>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtnactive:styles.navbtn} activeOpacity={0.8}  onPress = {() => this._switchNavbar(0)}>
              <Text style={this.state.navbar==0?commonstyle.red:commonstyle.white}>发出的约战</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.navbar==0?styles.navbtn:styles.navbtnactive} activeOpacity={0.8}  onPress = {() => this._switchNavbar(1)}>
              <Text style={this.state.navbar==0?commonstyle.white:commonstyle.red}>收到的约战</Text>
            </TouchableOpacity>
          </View>
        <ScrollView style={styles.scrollview}>
          {fightlist}
        </ScrollView>
      </View>
    );
  }
}
