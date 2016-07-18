'use strict';
/**
 * 发出邀请
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
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Header from '../common/headernav';
import Util from '../common/util';
import TeamService from '../../network/teamservice';
import commonstyle from '../../styles/commonstyle';
import PlayerInfo from '../team/playerinfo';
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
      mysendapplyList:[],
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
    TeamService.getInvitedUserList({teamID:this.state.teamID,startpage:GlobalVariable.PAGE_INFO.StartPage,pagecount:GlobalVariable.PAGE_INFO.PageCount-2},(response) => {
    if (response !== GlobalSetup.REQUEST_SUCCESS) {
      if(response[0].MessageCode == '40001'){
        Toast.show('服务器请求异常');
      }else if(response[0].MessageCode == '0'){
        let newData = response[1];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          mysendapplyList:newData,
        });
      }
     }else{
         Toast.show('请求错误');
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
      state=<View style={[commonstyle.btnbordergray, styles.listblockbtn]}><Text style={commonstyle.gray}>{'等待回复'}</Text></View>;
    }else if(rowData.State=="招募成功"||rowData.State=="加入成功"){
      state=<View style={[commonstyle.btnborderred, styles.listblockbtn]}><Text style={commonstyle.red}>{'成功加入'}</Text></View>;
    }else if(rowData.State=="招募失败"||rowData.State=="加入失败"){
      state=<View style={[commonstyle.btnredwhite, styles.listblockbtn]}><Text style={commonstyle.white}>{'被拒绝'}</Text></View>;
    }else{
      state=<View style={[commonstyle.btnbordergray, styles.listblockbtn]}><Text style={commonstyle.gray}>{'已失效'}</Text></View>;
    }
    return (
      <TouchableHighlight style={styles.listblock} underlayColor='#000000' onPress={()=>this.gotoRoute('playerinfo',rowData)} >
        <View style={commonstyle.row}>
          <Image style={styles.listblockimg} source={{uri:rowData.UserWebPicture}} />
          <View style={commonstyle.col1}>
            <View style={commonstyle.row}>
              <View style={commonstyle.col1}>
                <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{rowData.UserWebNickName}</Text>
                <Text style={[commonstyle.gray, commonstyle.fontsize12]}>{rowData.Hobby}</Text>
              </View>
              {state}
            </View>
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
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _onLoadMore(params) {
      let _ds = this.state.mysendapplyList;
      let _params =params;
      _params.startpage = _params.startpage+1;
      this.setState({
        footerMsg: "正在加载....."
      });
      {/*加载下一页*/}
      TeamService.getInvitedUserList(_params,(response) => {

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
          Toast.show(response[0].Message);
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
      <TouchableHighlight underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this,this.state.paraLoad)}>
        <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerMsg}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <Header screenTitle='发出邀请' isPop={true} navigator={this.props.navigator}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow= {this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
        />
      </View>
    );
  }
}
