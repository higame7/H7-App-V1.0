'use strict';
import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Iconfont';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/fightstyle';
import Toast from '@remobile/react-native-toast';
import Header from '../common/headernav';
import FightService from '../../network/fightservice';
import GlobalVariable from '../../constants/globalvariable'

export default class extends React.Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row1','row2']),
      initData:{
        startpage:GlobalVariable.PAGE_INFO.StartPage,
        pagecount:GlobalVariable.PAGE_INFO.PageCount,
      },
      db:[],
      loaded: false,
      onpress: undefined,
      isRefreshing: false,
      dataCount:0,
      keykey:0,
      footerMsg: "点击加载更多"
    }

  }
  componentWillMount() {
    this.setState({loaded: true})
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    {/*获取约战数据*/}
    FightService.getAllFightInfo(this.state.initData,(response) => {
      if (response[0].MessageCode == '0') {
        let newData = response[1];
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          db:newData,
          loaded: false
        });
      } else {
        Toast.show(response[0].Message);
      }
    });
  }
  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
    setTimeout(()=>{
      this.setState({
        isRefreshing: false
      });
    },1000);
  }

  _onLoadMore() {
      let _ds = this.state.db;
      let _params = this.state.initData;
      _params.startpage = _params.startpage+1;
      this.setState({
        footerMsg: "正在加载....."
      });
      {/*加载下一页*/}
      FightService.getAllFightInfo(_params,(response) => {
        if (response[0].MessageCode == '0') {
          let nextData = response[1];
          for(var item in nextData){
            _ds.push(nextData[item])
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(_ds),
            loaded: false,
          });
          if(nextData.length<1){
            this.setState({
              keykey:1,

            });
            setTimeout(()=>{
              Toast.show("木有更多数据了...");
              this.setState({
              footerMsg: "点击加载更多..."
             });
          },1000);
          }else{
            this.setState({
              footerMsg: "点击加载更多",
            });
          };
        } else {
          Toast.show(response[0].Message);
        }
      });

  }

  _renderFooter() {
    return(
      <TouchableHighlight underlayColor='#000000' style={commonstyle.paginationview} onPress={this._onLoadMore.bind(this)}>
        <Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.state.footerMsg}</Text>
      </TouchableHighlight>
    );
  }
  _renderRow(rowData, sectionID, rowID) {
    let desData = this.parseDescript(rowData.Description);
    return(
      <TouchableOpacity style={styles.textlist} activeOpacity={0.8} underlayColor="#000000" id={rowID}>
        <Text style={commonstyle.cream}>{'战队  '}<Text style={commonstyle.red}>{desData.teampre}{'  '}</Text>{desData.teamprecontent}<Text style={commonstyle.yellow}>{'  '}{desData.teamnext}{'  '}</Text>{desData.teamnextcontent}</Text>
          <View style={styles.userlistteambox}>
            <Icon name='time' size={13} style={styles.textlisticon} color={'#484848'} />
            <Text style={[commonstyle.gray, styles.textlistfont]}>{rowData.FightTime}</Text>
            <Icon name='money' size={13} style={styles.textlisticon} color={'#484848'} />
            <Text style={commonstyle.gray}>{rowData.FightAsset}{'氦气'}</Text>
          </View>
        </TouchableOpacity>
    );
  }
  parseDescript(descript){
    if(descript != '' && descript != null){
      var data =  descript.split('【');
      var dataOne = data[1].split('】');
      var dataTwo = data[2].split('】');
      var desData = {
        teampre:dataOne[0],
        teamprecontent:dataOne[1],
        teamnext:dataTwo[0],
        teamnextcontent:dataTwo[1],
      }
      return desData;
    }
   return '';
  }
  render() {
    return(
      <View style={styles.container}>
        <Header screenTitle='约战动态'  navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow= {this._renderRow.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
          />
        </View>
      </View>
    );
  }
}
