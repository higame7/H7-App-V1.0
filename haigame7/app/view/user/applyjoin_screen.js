'use strict';
/**
 * 申请加入
 *
 * @return {[Team Component]}
 * @author Drex
 */
import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ListView,
  Navigator,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';
import Header from '../common/headernav';
import Util from '../common/util';
import PlayerInfo from '../team/playerinfo';
import TeamService from '../../network/teamservice';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import GlobalVariable from '../../constants/globalvariable';
import GlobalSetup from '../../constants/globalsetup';
import Toast from '@remobile/react-native-toast';

export default class extends React.Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userData:{},
      userteamdata:{},
      teamID:0,
      dataSource: ds.cloneWithRows([]),
      myapplyjoinList:[],
      footerMsg: "点击加载更多",
    }
  }
  componentWillMount(){
    this.setState({
      userData:this.props.userData,
      teamID:this.props.teamID,
      paraLoad:{teamID:this.props.teamID,startpage:GlobalVariable.PAGE_INFO.StartPage,pagecount:GlobalVariable.PAGE_INFO.PageCount-2}
    });
  }
  componentDidMount(){
     setTimeout(()=>{
       this.initData();
     },400)
  }
  initData(){
    {/*请求我的战队信息*/}
    TeamService.getUserDefaultTeam(this.props.userData.UserID,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
        if(response[0].MessageCode == '40001'){
          Toast.show('服务器请求异常');
        }else if(response[0].MessageCode == '0'){
          this.setState({
            userteamdata:response[1]
          });
        }else{
          Toast.show(response[0].Message);
        }
      }
      else {
        Toast.show('请求错误');
      }
    });
    TeamService.getApplyUserList({teamID:this.state.teamID,startpage:GlobalVariable.PAGE_INFO.StartPage,pagecount:GlobalVariable.PAGE_INFO.PageCount-2},(response) => {
    if (response !== GlobalSetup.REQUEST_SUCCESS) {
      if(response[0].MessageCode == '40001'){
        Toast.show('服务器请求异常');
      }else if(response[0].MessageCode == '0'){
        let newData = response[1];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          myapplyjoinList:newData,
        });
      }
     }else{
         Toast.show('请求错误');
     }
   });
  }
  handleApply(params,isok){
    if(this.state.userteamdata.Role=="teamuser"){
      Toast.showLongCenter("队员无法操作");
      return;
    }
    let requestdata = {'teamID':this.state.teamID,'userID':params.UserID,'messageID':params.MessageID,'isOK':isok};
    TeamService.handleMyApply(requestdata,(response) => {
    if (response !== GlobalSetup.REQUEST_SUCCESS) {
      if(response[0].MessageCode == '40001'){
        Toast.show('服务器请求异常');
      }else if(response[0].MessageCode == '0'){
          if(isok==0){
            Toast.showLongCenter('已同意');
          }else{
            Toast.showLongCenter('已拒绝');
          }

        setTimeout(()=>{
          this.initData();
          this.props.updateLoginState();
          },1000);
      }
     }else{
          Toast.show(response[0].Message);
     }
   });
  }
  gotoRoute(name,params) {
    if (name == 'playerinfo') {
        if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
            this.props.navigator.push({ name: name, component: PlayerInfo, params:{'teamID':this.state.teamID,'playerinfo':params,'userteamdata':this.state.userteamdata},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
        }
      }
    }
  renderHeroImageItem(rowData,key){
    return(
      <Image key={key} style={styles.listblocktexthero} source={{uri:rowData.HeroImage}} />
    );
  }
  _renderRow(rowData) {
   var that = this;
   var items =Object.keys(rowData.HeroImage).map(function(item,key) {
     return that.renderHeroImageItem(rowData.HeroImage[item],key);
   });
   let state;
   if(rowData.State=="加入战队"||rowData.State=="招募队员"){
     state=  <View style={styles.listblocktext}><Button  onPress={()=>this.handleApply(rowData,0)} containerStyle={[commonstyle.btnredwhite, styles.listblockbutton]} style={[commonstyle.white, commonstyle.fontsize12]} activeOpacity={0.8}>同意</Button><Button  onPress={()=>this.handleApply(rowData,1)} containerStyle={[commonstyle.btngrayblack, styles.listblockbutton]} style={[commonstyle.black, commonstyle.fontsize12]} activeOpacity={0.8}>拒绝</Button></View>;
   }else if(rowData.State=="加入成功"||rowData.State=="招募成功"){
     state=  <View style={styles.listblocktext}><Button containerStyle={[commonstyle.btnborderred, styles.listblockbutton]} style={[commonstyle.red, commonstyle.fontsize12]} activeOpacity={0.8}>已同意</Button></View>;
   }else if(rowData.State=="加入失败"||rowData.State=="招募失败"){
     state=  <View style={styles.listblocktext}><Button containerStyle={[commonstyle.btnbordergray, styles.listblockbutton]} style={[commonstyle.gray, commonstyle.fontsize12]} activeOpacity={0.8}>已拒绝</Button></View>;
   }else{
     state=  <View style={styles.listblocktext}><Button containerStyle={[commonstyle.btnbordergray, styles.listblockbutton]} style={[commonstyle.gray, commonstyle.fontsize12]} activeOpacity={0.8}>已失效</Button></View>;

   }
    return (
      <TouchableHighlight style={styles.listblock} underlayColor='#000000' onPress={()=>this.gotoRoute('playerinfo',rowData)}>
        <View style={commonstyle.row}>
          <Image style={styles.listblockimg} source={{uri:rowData.UserWebPicture}} />
          <View style={commonstyle.col1}>
            <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.UserWebNickName}</Text>
            <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{'生命不息,电竞不止~~1231231231'}</Text>
            <View style={styles.listblocktext}>
              <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'战斗力:  '}</Text>
              <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.GamePower}</Text>
              <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦气:  '}</Text>
              <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.Asset}</Text>
            </View>
            <View style={commonstyle.row}>
              <View style={styles.listblocktextleft}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12]}>擅长英雄</Text>
              </View>
              <View style={styles.listblocktext}>
               {items}
              </View>
            </View>
            <View style={styles.listblocktext}>
            {state}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _onLoadMore(params) {
      let _ds = this.state.myapplyjoinList;
      let _params =params;
      _params.startpage = _params.startpage+1;
      this.setState({
        footerMsg: "正在加载....."
      });
      {/*加载下一页*/}
      TeamService.getApplyUserList(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<1){
            setTimeout(()=>{
              Toast.show("木有更多数据了...");
              this.setState({
              footerMsg: "点击加载更多..."
             });
          },1000);
          }
          for(var item in nextData){
            _ds.push(nextData[item])
          }
        } else {
          Toast.show('请求错误' + response[0].Message);
        }
      });
      //这等到有api在搞吧
      setTimeout(()=>{
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(_ds),
            footerMsg: "点击加载更多",
          });
      },1000);

  }
  _renderFooter() {
    return (
      <TouchableHighlight underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this)}>
        <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerMsg}</Text>
      </TouchableHighlight>
    );
  }
  render() {
    //优化时候告知下 aran
    return(
      <View style={styles.container}>
        <Header screenTitle='申请加入' isPop={true} navigator={this.props.navigator}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow= {this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      </View>
    );
  }
}
