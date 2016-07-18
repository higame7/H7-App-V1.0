'use strict';
/**
 * 团队排行组件
 * @return {[teamranklist Component]}
 * @author aran.hu
 */
import React, {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Component,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    } from 'react-native';

//引用样式文件
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/rankstyle';
import Login from '../user/login';
import TeamInfo from '../team/teaminfo';

var TeamRankList = React.createClass({
  getInitialState() {
    return {
      team: this.props.team,
      userID: this.props.userID,
      navigator:this.props.navigator,
    }
  },
  gotoRoute(name,params) {
    if(this.props.userID==undefined){
      this.props.navigator.push({
        name:'login',
        component:Login,
        params:{...this.props},
       sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }
    else {
      this.props.navigator.push({ name: name, component: TeamInfo, params:{'teaminfo':params,'userID':this.props.userID,'role':this.props.userteamdata.Role},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
    }
  },
  render: function() {
    //返回团队排行组件
    return(
      <View>
        <TouchableOpacity style={styles.ranklist} activeOpacity={0.8} onPress={()=>this.gotoRoute('teaminfo',this.props.team)}>
          <Image style={styles.ranklistimg} source={{uri:this.props.team.TeamPicture}} />
          <View style={styles.ranklistcenter}>
            <Text style={[commonstyle.white, commonstyle.fontsize14]}>{this.props.team.TeamName}</Text>
            <Text style={[commonstyle.gray, commonstyle.fontsize12, styles.ranklisttext]}>{this.props.team.TeamDescription}</Text>
            <View style={styles.ranklistrow}>
              <Text style={commonstyle.yellow}>{'战斗力:  '}</Text>
              <Text style={commonstyle.red}>{this.props.team.FightScore}</Text>
              <Text style={commonstyle.yellow}>{'  氦气:  '}</Text>
              <Text style={commonstyle.red}>{this.props.team.Asset}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});
module.exports = TeamRankList;
