'use strict'

import React,
  {
    View,
    Component,
    Text,
    TextArea,
    Image,
    TouchableOpacity,
    Navigator,
    TouchableHighlight,
    StyleSheet,
    ListView,
    RefreshControl,
    Alert,
    ScrollView,
    Platform
  } from 'react-native';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Header from '../common/headernav';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Iconfont';
import Recharge from './recharge';
import AssertService from '../../network/assertservice';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from '@remobile/react-native-toast';

export default class extends Component{
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row1','row2']),
      isRefreshing: false,
      content: undefined,
      hjData: this.props.hjData,
      userData: this.props.userData,
      isFetchData: true,
      keykey: 0,
      isOpen: true,
      modalOpen:false,
      footerMsg: "点击加载",
      startPage: 1,
      isTotalData: false,
      assetData: []
    }
  }
  componentDidMount() {
    this._fetchAssertList()
  }

  componentWillReceiveProps(nextProps){
  }
  _fetchAssertList(startPage){
    let requestParams ={
      'userID': this.props.userData.UserID,
      'startPage': this.state.startPage,
      'pageCount': 20
    }
    if(startPage != undefined) {
      requestParams['startPage'] = startPage;
    }
    // console.log(requestParams);
    AssertService.fetchAssertList(requestParams,(response) => {
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        if(newData.length<1){
          setTimeout(()=>{
            Toast.show("木有更多数据了...");
            this.setState({
            isTotalData: true,
            footerMsg: "点击加载"
           });
        },1000);
        } else {
          // let b = this.state.assetData
          let a = this.state.assetData.concat(newData)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(a),
            isOpen: false,
            assetData: a,
            footerMsg: '点击加载'
          });
        }
      } else {
        Toast.show(response[0].Message);
        this.setState({isOpen: false})
      }
    });
  }
  _onLoadMore(){
    this.setState({
      footerMsg: "正在加载.....",
      startPage: this.state.startPage + 1
    })
    this._fetchAssertList();
  }
  _getTotalAssertAndRank() {
    AssertService.getTotalAssertAndRank(this.props.userData.PhoneNumber,(response) => {
      // console.log(response);
      if (response[0].MessageCode == '0') {
        let data = {'totalAsset': response[1].TotalAsset,'myRank': response[1].MyRank}
        this.setState({
          hjData: data
        });
      } else {
        console.log('请求错误' + response[0].Message);
      }
    })
  }

  _closeModa() {
     this.setState({modalOpen: false});
  }
  _openModa() {
     this.setState({modalOpen: true});
  }
  gotoRecharge(name) {
    if (Platform.OS == 'ios') {
      Toast.showShortCenter('充值功能暂未提供...')
      return
    }
    this.props.navigator.push({
      name: name,
      component: Recharge,
      params:{
        ...this.props,
      _userAssetCallback: this._userAssetCallback.bind(this)
      }});
  }
  _userAssetCallback(key,params){
    switch (key) {
      case 'TotalAssertAndRank':
        this._getTotalAssertAndRank()
        this.props._callback('TotalAssertAndRank') //回调user的callback方法
        if('startPage' in params){
          // console.log('&&&&&&&&&&&');
          // console.log('回调更新');
          this.setState({
            assetData: []
          })
          this._fetchAssertList(params['startPage'])
        }
        break;
    }
  }

  //   _onRefresh() {
  //     this.setState({
  //       isRefreshing: true
  //     });
  //     console.log("下拉刷新");
  //     setTimeout(()=>{
  //       this.setState({
  //         isRefreshing: false
  //       });
  //     },1000);
  //   }
  //   _onLoadMore() {
  //     if (this.state.keykey > 3) {
  //       this.setState({
  //         footerMsg: "木有更多多数据了~~~~"
  //       });
  //     }else{
  //     }
  // }
  _renderRow(rowData, sectionID, rowID) {
    return(
      <View style={[commonstyle.row, styles.assetlist]}>
        <View style={commonstyle.col1} >
          <Text style={commonstyle.cream}>{rowData.GainWay}</Text>
        </View>
        <View style={commonstyle.col1}>
          <Text style={commonstyle.red}>{rowData.VirtualMoney}</Text>
        </View>
        <View style={[commonstyle.col1, commonstyle.viewright]}>
          <Text style={commonstyle.gray}>{rowData.GainTime}</Text>
        </View>
      </View>
    );
  }
  _renderFooter(){
    return(
      <TouchableHighlight   underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this)}>
        <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerMsg}</Text>
      </TouchableHighlight>
    );
  }
  render(){
    let RechargeView;
    if (Platform.OS == 'ios') {

    } else {
      RechargeView = (
        <TouchableHighlight style={[styles.btn, commonstyle.btnwhitered]} underlayColor={'#FFFFFF'} onPress={() => this.gotoRecharge('recharge')}>
          <Text style={commonstyle.red} >{'氦气充值'}</Text>
        </TouchableHighlight>
      )
    }
    return (
      <View>
        <Header screenTitle='我的资产' iconText='氦气说明' isPop={true}  navigator={this.props.navigator} icon_onPress={this._openModa.bind(this)}/>
        <View style={commonstyle.bodyer}>
          <Image source = {require('../../images/assetbg.jpg')} style={styles.assetbg} resizeMode = {"cover"}>
          <View style={[commonstyle.row, styles.assetblock]}>
            <View style={[commonstyle.col1, styles.assetlabel]}>
              <View style={commonstyle.row}>
                <Icon name="money" size={25} color={'#D31B25'} style={commonstyle.iconnobg}/>
                <Text style={[commonstyle.red, commonstyle.fontsize12, styles.assettext]}>总金额</Text>
              </View>
              <Text style={[commonstyle.yellow, commonstyle.fontsize22]}>{this.state.hjData.totalAsset}</Text>
            </View>

            <View style={styles.headtabline}></View>

            <TouchableOpacity style={[commonstyle.col1, styles.assetlabel]}>
              <View style={commonstyle.row}>
                <Icon name="ranking" size={25} color={'#D31B25'} style={commonstyle.iconnobg}/>
                <Text style={[commonstyle.red, commonstyle.fontsize12, styles.assettext]}>财富排行</Text>
              </View>
              <Text style={[commonstyle.yellow, commonstyle.fontsize22]}>{this.state.hjData.myRank}</Text>
            </TouchableOpacity>
          </View>

          {RechargeView}
          </Image>

          <ScrollView style={styles.assetlistblock}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow= {this._renderRow.bind(this)}
              renderFooter={this._renderFooter.bind(this)}
            />
            <View style={styles.listboxfooter}></View>
          </ScrollView>
        </View>
        <Modal isOpen={this.state.modalOpen}  style={[commonstyle.modal, commonstyle.modalmiddle]} position={"center"}>
          <View style={commonstyle.modalclose}><Button onPress={this._closeModa.bind(this)} ><Icon name="error" size={20} color={'#FF0000'} /></Button></View>
          <View style={commonstyle.modaltext}>
            <Text style={commonstyle.cream}>1）什么是氦气？</Text>
            <Text style={commonstyle.cream}>氦气是氦7约战平台通用的虚拟货币，可用于约战、竞猜时使用。</Text>
            <Text style={commonstyle.cream}>2）氦气的获取方式？</Text>
            <Text style={commonstyle.cream}>注册用户送50氦气，每日签到送1氦气。</Text>
          </View>
          <View style={[commonstyle.row, commonstyle.modalbtn]}>
            <Button containerStyle={[commonstyle.col1, commonstyle.modalbtnfont, commonstyle.btnredwhite]} activeOpacity={0.8}  onPress={this._closeModa.bind(this)} style={commonstyle.white}>关闭</Button>
          </View>
        </Modal>
      </View>
    );
  }
}
