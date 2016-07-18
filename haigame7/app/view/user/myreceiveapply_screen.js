'use strict';
/**
 * 我的受邀
 *
 * @return {[Team Component]}
 * @author Drex
 */
import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Navigator,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';
import Header from '../common/headernav';
import Util from '../common/util';
import TeamInfo from '../team/teaminfo';
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
      dataSource: ds.cloneWithRows([]),
      myinvitedList:[],
      footerMsg: "点击加载更多",
    }
  }
  componentWillMount(){
    this.setState({
      userData:this.props.content.userData,
      paraLoad:{userID:this.props.content.userData.UserID,startpage:GlobalVariable.PAGE_INFO.StartPage,pagecount:GlobalVariable.PAGE_INFO.PageCount-2}
    });

  }
  componentDidMount(){
    setTimeout(()=>{
      this.initData();
    },400)
  }

  initData(){
    let requestdata = {'userID':this.state.userData.UserID,'startpage':GlobalVariable.PAGE_INFO.StartPage,'pagecount':GlobalVariable.PAGE_INFO.PageCount-2};
    TeamService.myInvitedTeamList(requestdata,(response) => {
    if (response !== GlobalSetup.REQUEST_SUCCESS) {
      if(response[0].MessageCode == '40001'){
        Toast.show('服务器请求异常');
      }else if(response[0].MessageCode == '0'){
        let newData = response[1];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          myinvitedList:newData,
        });
      }
     }else{
         Toast.show('请求错误');
     }
   });
  }
 handleInvited(params,isok){
   let requestdata = {'teamID':params.TeamID,'userID':this.state.userData.UserID,'messageID':params.MessageID,'isOK':isok};
   TeamService.handleMyInvited(requestdata,(response) => {
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
         this.props.updateLoginState();
         this.initData();
         },1000);
     }
    }else{
        Toast.show(response[0].Message);
    }
  });
 }
 gotoRoute(name,params) {
   if (name == 'teaminfo') {
     if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != name) {
         this.props.navigator.push({ name: name, component: TeamInfo, params:{'teaminfo':params,'userID':this.state.userData.UserID,'role':this.props.role},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
     }
     }
   }
  _renderRow(rowData) {
    let state;
    if(rowData.State=="招募队员"){
      state=  <View style={styles.listblocktext}><Button onPress={()=>this.handleInvited(rowData,0)} containerStyle={[commonstyle.btnredwhite, styles.listblockbutton]} style={[commonstyle.white, commonstyle.fontsize12]} activeOpacity={0.8}>同意</Button><Button onPress={()=>this.handleInvited(rowData,1)}  containerStyle={[commonstyle.btngrayblack, styles.listblockbutton]} style={[commonstyle.black, commonstyle.fontsize12]} activeOpacity={0.8}>拒绝</Button></View>;
    }else if(rowData.State=="招募成功"){
      state=  <View style={styles.listblocktext}><Button containerStyle={[commonstyle.btnborderred, styles.listblockbutton]} style={[commonstyle.red, commonstyle.fontsize12]} activeOpacity={0.8}>已同意</Button></View>;
    }else if(rowData.State=="招募失败"){
      state=  <View style={styles.listblocktext}><Button containerStyle={[commonstyle.btnbordergray, styles.listblockbutton]} style={[commonstyle.gray, commonstyle.fontsize12]} activeOpacity={0.8}>已拒绝</Button></View>;
    }
    return (
      <TouchableHighlight style={styles.listblock} underlayColor='#000000' onPress={()=>this.gotoRoute('teaminfo',rowData)}>
        <View style={commonstyle.row}>
          <Image style={styles.listblockimg} source={{uri:rowData.TeamLogo}} />
          <View style={commonstyle.col1}>
            <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.TeamName}</Text>
            <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{rowData.TeamDescription}</Text>
            <View style={styles.listblocktext}>
              <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'战斗力:  '}</Text>
              <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.FightScore}</Text>
              <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦气:  '}</Text>
              <Text style={[commonstyle.red, commonstyle.fontsize12]}>{rowData.Asset}</Text>
            </View>
             {state}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _onLoadMore(params) {
      let _ds = this.state.myinvitedList;
      let _params =params
      _params.startpage = _params.startpage+1;
      this.setState({
        footerMsg: "正在加载....."
      });
      {/*加载下一页*/}
      TeamService.myApplyTeamList(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          if(nextData.length<1){
            setTimeout(()=>{
              Toast.show("木有更多数据了...");
              this.setState({
              footerMsg: "点击加载更多..."
             });
          },1000);
          }else{
            this.setState({
              footerMsg: "点击加载更多"
            });
          };
          for(var item in nextData){
            _ds.push(nextData[item])
          }
          setTimeout(()=>{
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(_ds),
            });
          },1000);
        } else {
          console.log('请求错误' + response[0].MessageCode);
        }
      });

  }


  _renderFooter() {
    return (
      <TouchableHighlight underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this,this.state.paraLoad)}>
        <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerMsg}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <Header screenTitle='受邀信息'  navigator={this.props.navigator}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow= {this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      </View>
    );
  }
}
