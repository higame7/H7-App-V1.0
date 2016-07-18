'use strict';
/**
 * 赛事组件
 * @return {[matchlist Component]}
 * @author Drex
 */
import React, {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Navigator,
    Component,
    TouchableOpacity,
    TouchableHighlight,
    } from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/matchstyle';

import MatchDetail from '../match/matchdetail';


var UserMatchList = React.createClass({
  getInitialState() {
    return {
      rowData: this.props.rowData,
      navigator:this.props.navigator,
      _onPress: null,
    }
  },
  componentDidMount(){
  },
  gotoRoute(params) {
      if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].name != params.name) {
        this.props.navigator.push({ name: params.name, component: MatchDetail, params:params,sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
      }
  },
  rendercurrent(){
    if(this.props.rowData.Result=='主队胜'){
      return(
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
          <View style={styles.schedulelisttime}><Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.props.rowData.EndTime.toString().substr(0, 10)}</Text></View>
          <View style={styles.schedulelisttime} activeOpacity={0.8} onPress = {this.gotoRoute.bind(this,{"name":"matchdetail","matchID":this.props.rowData.MatchID})}>
            <Text style={commonstyle.red}></Text>
          </View>
        </View>
      );
    }else if(this.props.rowData.Result=='客队胜'){
      return(
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
          <View style={styles.schedulelisttime}><Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.props.rowData.EndTime.toString().substr(0, 10)}</Text></View>
          <View style={styles.schedulelisttime} activeOpacity={0.8}  onPress = {this.gotoRoute.bind(this,{"name":"matchdetail","matchID":this.props.rowData.MatchID})}>
            <Text style={commonstyle.red}>查看详情</Text>
          </View>
        </View>
      );
    }else{
      return(
        <View style={commonstyle.col1}>
          <View style={[commonstyle.row, styles.schedulelistcenter]}>
            <View style={styles.schedulelistvs}>
              <Text style={[commonstyle.gray, commonstyle.fontsize18]}>{'VS'}</Text>
            </View>
          </View>
          <View style={styles.schedulelisttime}><Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.props.rowData.Result}</Text><Text style={[commonstyle.gray, commonstyle.fontsize14]}>{this.props.rowData.EndTime.toString().substr(0, 10)}</Text></View>
        </View>
      );
    }
  },
  render: function() {
    var matchcurrentstate = this.rendercurrent();
    return(
      <View>
        <View style={[styles.schedulelistblock]}>
          <View style={styles.schedulelisttitle}><Text style={commonstyle.black}>{this.props.rowData.MatchName}</Text></View>
          <View style={[commonstyle.row, styles.schedulelist]}>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:this.props.rowData.STeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{this.props.rowData.STeamName}</Text>
            </View>
            {matchcurrentstate}
            <View style={[commonstyle.col1, commonstyle.viewcenter]}>
              <Image style={styles.schedulelistimg} source={{uri:this.props.rowData.ETeamLogo}} />
              <Text style={[commonstyle.cream, commonstyle.fontsize14]}>{this.props.rowData.ETeamName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
});

 module.exports = UserMatchList;
