'use strict';
/**
 * APP 赛事详情
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
  ScrollView,
  TouchableHighlight,
  } from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/matchstyle';
import Header from '../common/headernav'; 
import Icon from 'react-native-vector-icons/Iconfont';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
     steamname:'',
     eteamname:'',
     money:0,
     side: 0,
     open: 0,
     }
    }
  componentDidMount(){
    this.setState({
      steamname:this.props.steamname,
      eteamname:this.props.eteamname,
      money:this.props.money,
    });
  }
  _switchSubbar(sub, num){
    if(sub ==0){
      this.setState({
        open: 1,
        side: num,
      });
    }else{
      this.setState({
        open: 0,
        side: num,
      });
    }
    return;
  }
  render() {
    return (
      <View>
        <Header screenTitle="赛事详情" iconName='share' navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={[commonstyle.row, styles.detaildescription]}>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}><Text style={[commonstyle.cream, commonstyle.fontsize12]}>{'结束时间'}</Text><Text style={[commonstyle.red, commonstyle.fontsize12]}>{'1小时前'}</Text></View>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}><Text style={[commonstyle.cream, commonstyle.fontsize12]}>{'持续时间'}</Text><Text style={[commonstyle.red, commonstyle.fontsize12]}>{'25：00'}</Text></View>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}><Text style={[commonstyle.cream, commonstyle.fontsize12]}>{'赛事规格'}</Text><Text style={[commonstyle.red, commonstyle.fontsize12]}>{'联赛'}</Text></View>
            <View style={[commonstyle.col1, commonstyle.viewcenter]}><Text style={[commonstyle.cream, commonstyle.fontsize12]}>{'比赛模式'}</Text><Text style={[commonstyle.red, commonstyle.fontsize12]}>{'BO3'}</Text></View>
          </View>
          <ScrollView style={styles.detaillistblock}>
            <View style={[commonstyle.row, styles.detailresultyellow]}>
              <View style={[commonstyle.col1, commonstyle.btnyellowblack, styles.detailresultbg]}><Text style={commonstyle.black}>奶粉去哪了：<Text style={commonstyle.black}>失败</Text></Text></View>
              <View style={[commonstyle.btnyellowblack, styles.detailresulttransform]}></View>
              <View style={[commonstyle.col1, commonstyle.viewright]}>
                <Text style={[commonstyle.red, commonstyle.fontsize12]}>杀敌 <Text>3</Text> 经验 <Text>1148</Text> 氦气 <Text>150</Text> </Text>
              </View>
            </View>
            <View style={styles.detaillist}>
              <TouchableOpacity style={commonstyle.row} activeOpacity={0.8}  onPress = {() => this._switchSubbar(this.state.open, 1)}>
                <View style={commonstyle.col3}><Image style={styles.detailhero} source={require('../../images/userbg.jpg')}/></View>
                <View style={commonstyle.col3}>
                  <Text style={commonstyle.cream}>FATA <Icon name="success" size={10} color={'#00B4FF'} /></Text>
                  <Text style={commonstyle.cream}>2  /  7  /  0</Text>
                  <Text style={commonstyle.yellow}>KDA:  15.00</Text>
                </View>
                <View style={commonstyle.col4}>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                </View>
                <View style={[commonstyle.col2, commonstyle.viewright]}><Image style={styles.detailuser} source={require('../../images/userbg.jpg')}/></View>
              </TouchableOpacity>
              <View style={this.state.open==1&&this.state.side==1?[commonstyle.row, styles.detaillistdata]:styles.detaillistnodata }>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>英雄伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>建筑伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>英雄治疗： XXXX</Text>
                </View>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>正反补： XXXX</Text>
                  <Text style={commonstyle.cream}>XPM： XXXX</Text>
                  <Text style={commonstyle.cream}>GPM： XXXX</Text>
                </View>
              </View>
            </View>
            <View style={styles.detaillist}>
              <TouchableOpacity style={commonstyle.row} activeOpacity={0.8}  onPress = {() => this._switchSubbar(this.state.open, 2)}>
                <View style={commonstyle.col3}><Image style={styles.detailhero} source={require('../../images/userbg.jpg')}/></View>
                <View style={commonstyle.col3}>
                  <Text style={commonstyle.cream}>FATA <Icon name="success" size={10} color={'#00B4FF'} /></Text>
                  <Text style={commonstyle.cream}>2  /  7  /  0</Text>
                  <Text style={commonstyle.yellow}>KDA:  15.00</Text>
                </View>
                <View style={commonstyle.col4}>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                </View>
                <View style={[commonstyle.col2, commonstyle.viewright]}><Image style={styles.detailuser} source={require('../../images/userbg.jpg')}/></View>
              </TouchableOpacity>
              <View style={this.state.open==1&&this.state.side==2?[commonstyle.row, styles.detaillistdata]:styles.detaillistnodata }>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>英雄伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>建筑伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>英雄治疗： XXXX</Text>
                </View>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>正反补： XXXX</Text>
                  <Text style={commonstyle.cream}>XPM： XXXX</Text>
                  <Text style={commonstyle.cream}>GPM： XXXX</Text>
                </View>
              </View>
            </View>

            <View style={[commonstyle.row, styles.detailresultred]}>
              <View style={[commonstyle.col1, commonstyle.btnredwhite, styles.detailresultbg]}><Text style={commonstyle.white}>奶粉去哪了：<Text>胜利</Text></Text></View>
              <View style={[commonstyle.btnredwhite, styles.detailresulttransform]}></View>
              <View style={[commonstyle.col1, commonstyle.viewright]}>
                <Text style={[commonstyle.red, commonstyle.fontsize12]}>杀敌 <Text>3</Text> 经验 <Text>1148</Text> 氦气 <Text>150</Text> </Text>
              </View>
            </View>
            <View style={styles.detaillist}>
              <TouchableOpacity style={commonstyle.row} activeOpacity={0.8}  onPress = {() => this._switchSubbar(this.state.open, 6)}>
                <View style={commonstyle.col3}><Image style={styles.detailhero} source={require('../../images/userbg.jpg')}/></View>
                <View style={commonstyle.col3}>
                  <Text style={commonstyle.cream}>FATA <Icon name="success" size={10} color={'#00B4FF'} /></Text>
                  <Text style={commonstyle.cream}>2  /  7  /  0</Text>
                  <Text style={commonstyle.yellow}>KDA:  15.00</Text>
                </View>
                <View style={commonstyle.col4}>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                </View>
                <View style={[commonstyle.col2, commonstyle.viewright]}><Image style={styles.detailuser} source={require('../../images/userbg.jpg')}/></View>
              </TouchableOpacity>
              <View style={this.state.open==1&&this.state.side==6?[commonstyle.row, styles.detaillistdata]:styles.detaillistnodata }>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>英雄伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>建筑伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>英雄治疗： XXXX</Text>
                </View>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>正反补： XXXX</Text>
                  <Text style={commonstyle.cream}>XPM： XXXX</Text>
                  <Text style={commonstyle.cream}>GPM： XXXX</Text>
                </View>
              </View>
            </View>
            <View style={styles.detaillist}>
              <TouchableOpacity style={commonstyle.row} activeOpacity={0.8}  onPress = {() => this._switchSubbar(this.state.open, 7)}>
                <View style={commonstyle.col3}><Image style={styles.detailhero} source={require('../../images/userbg.jpg')}/></View>
                <View style={commonstyle.col3}>
                  <Text style={commonstyle.cream}>FATA <Icon name="success" size={10} color={'#00B4FF'} /></Text>
                  <Text style={commonstyle.cream}>2  /  7  /  0</Text>
                  <Text style={commonstyle.yellow}>KDA:  15.00</Text>
                </View>
                <View style={commonstyle.col4}>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                  <View style={commonstyle.row}>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                    <View style={commonstyle.col1}><Image style={styles.detailarms} source={require('../../images/userbg.jpg')}/></View>
                  </View>
                </View>
                <View style={[commonstyle.col2, commonstyle.viewright]}><Image style={styles.detailuser} source={require('../../images/userbg.jpg')}/></View>
              </TouchableOpacity>
              <View style={this.state.open==1&&this.state.side==7?[commonstyle.row, styles.detaillistdata]:styles.detaillistnodata }>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>英雄伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>建筑伤害： XXXX</Text>
                  <Text style={commonstyle.cream}>英雄治疗： XXXX</Text>
                </View>
                <View style={commonstyle.col1}>
                  <Text style={commonstyle.cream}>正反补： XXXX</Text>
                  <Text style={commonstyle.cream}>XPM： XXXX</Text>
                  <Text style={commonstyle.cream}>GPM： XXXX</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailnote}><Text style={commonstyle.cream}>数据来自氦7官方平台</Text></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}