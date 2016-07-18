'use strict';
/**
 * APP 战队信息
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */
var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var {
  View,
  Text,
  Image,
  Component,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Navigator,
  ScrollView
  } = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import TeamService from '../../network/teamservice';
import UserService from '../../network/userservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';
import Toast from '@remobile/react-native-toast';
import UserInfo from '../rank/userinfo';

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      teaminfo:this.props.teaminfo,
      userID:this.props.userID,
      messages: [],
      creatUser:{},
    }
  }
  componentWillMount(){
    this.initData();
  }
  initData(){

    UserService.getUserInfoByUserID(this.props.teaminfo.CreateUserID, (response) => {
      if (response[0].MessageCode == '0') {
        let data = response[1];
        this.setState({
          creatUser: data,
        })
      } else {
        Toast.show('获取用户数据失败'+ response[0].Message);
        this.setState({
          loading: false,
        })
      }
    });
  }

  gotoRoute(name,params) {
      this.props.navigator.push({ name: name, component: UserInfo, params:{'userinfo':params},sceneConfig: Navigator.SceneConfigs.FloatFromBottom });
  }
  renderUserImageItem(rowData,key){
    return(
      <TouchableOpacity key={key}  onPress={()=>this.gotoRoute('userinfo',rowData)}>
      <Image style={styles.listviewteamimg} source={{uri:rowData.UserPicture}} />
      </TouchableOpacity>
    );
  }
  render(){
    var that = this;
    var userimage =Object.keys(that.state.teaminfo.UserImage).map(function(item,key) {
      return that.renderUserImageItem(that.state.teaminfo.UserImage[item],key);
    });
    var total = this.state.teaminfo.WinCount + this.state.teaminfo.LoseCount + this.state.teaminfo.FollowCount;
    var winning = Math.round(this.state.teaminfo.WinCount/(!isNaN(total)?1:total*100));

    return (
      <View>
        <Header screenTitle='战队信息' navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          <Image source={require('../../images/userbg.jpg')} style={styles.headbg} resizeMode={"cover"} >
            <View style={styles.blocktop}>
              <Image style={styles.headportrait} source={{uri:this.state.teaminfo.TeamPicture}} />
            </View>

            <View style={styles.blocktop}>
              <Text style={[styles.headname, commonstyle.white]}>{this.state.teaminfo.TeamName}</Text>
              <View style={[commonstyle.row, styles.headtextblock]}>
                <View style={styles.headtextleft}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  战斗力  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{this.state.teaminfo.FightScore}</Text>
                </View>
                <View style={styles.headtextline}></View>
                <View style={styles.headtextright}>
                  <Text style={[commonstyle.yellow, commonstyle.fontsize12]}>{'  氦气  '}</Text>
                  <Text style={[commonstyle.red, commonstyle.fontsize12]}>{this.state.teaminfo.Asset}</Text>
                </View>
              </View>
              <View style={styles.headtext}>
                <Text style={[commonstyle.cream, commonstyle.fontsize12, styles.headtextfont]}>{this.state.teaminfo.TeamDescription}</Text>
              </View>
            </View>
          </Image>

          <View style={styles.listblock}>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>战队战绩</Text></View>
              <View style={styles.listviewright}>
                <Text style={commonstyle.cream}>参赛场次  </Text>
                <Text style={commonstyle.yellow}>{total}场</Text>
                <Text style={commonstyle.cream}>  胜率  </Text>
                <Text style={commonstyle.red}>{winning}%</Text>
              </View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>成立日期</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.teaminfo.CreateTime}</Text></View>
            </View>
            <View style={styles.listview}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>招募信息</Text></View>
              <View style={styles.listviewright}><Text style={commonstyle.cream}>{this.state.teaminfo.RecruitContent}</Text></View>
            </View>
            <View style={[styles.listview, styles.nobottom]}>
              <View style={styles.listviewleft}><Text style={commonstyle.gray}>战队成员</Text></View>
              <View style={styles.listviewright}>
                <View style={styles.listviewteam}>
                 <TouchableOpacity  onPress={()=>this.gotoRoute('userinfo',this.state.creatUser)}>
                  <Image style={styles.listviewteamleader} source={{uri:this.state.teaminfo.CreateUserLogo}} />
                  </TouchableOpacity>
                  <View style={styles.listviewteamblock}>
                    {userimage}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
