'use strict'

var React = require('react-native');
var Headernav = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var Util = require('../common/util');
var DateTimePicker = require('@remobile/react-native-datetime-picker');
var {
  View,
  Alert,
  Component,
  Text,
  TextArea,
  StyleSheet,
  TextInput,
  Navigator,
  TouchableOpacity,
  ScrollView
  } = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/fightstyle';
import FightService from '../../network/fightservice';
import GlobalSetup from '../../constants/globalsetup';
import Toast from '@remobile/react-native-toast';
export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      content:undefined,
      textnumber:0,
      teamasset:0,
      userid:0,
      steamid:0,
      eteamid:0,
      money:-1,
      fighttime:'',
      messages: []
    }
  }
  componentDidMount() {
    this.setState({
      teamasset:this.props.teamasset,
      userid:this.props.userid,
      steamid:this.props.steamid,
      eteamid:this.props.eteamid,
    });
  }

  onChange(text){
    this.setState(
      {
        content:text,
        textnumber:text.length
      }
    );
    console.log(text);
  }
  makechanllenge(){

    let datetomorrow = new Date().getTime()+1000*60*60*24;
    let datenextweek = new Date().getTime()+1000*60*60*24*7;
    let datefight = new Date(this.state.fighttime).getTime();
    let type = /^[0-9]*[1-9][0-9]*$/;
    let re = new RegExp(type);

    if(this.state.fighttime==''){
        Toast.showLongCenter('请输入日期');
    }
    else if(this.state.money>this.state.teamasset){
          Toast.showLongCenter('战队资产不够');
    }else if(this.state.money<10){
        Toast.showLongCenter('请输入大于10氦气的正整数');
    }else if(this.state.money.match(re) == null) {
      Toast.showLongCenter("请填写大于1的整数金额");
    }else if(datefight<datetomorrow){
        Toast.showLongCenter('约战日期应在一天以后');
    }else if(datefight>datenextweek){
      Toast.showLongCenter('约战日期应在一周内');
    }
      else{
      let requestData={
        userid:this.state.userid,
        steamid:this.state.steamid,
        eteamid:this.state.eteamid,
        money:parseInt(this.state.money),
        fighttime:this.state.fighttime,
      };
      FightService.makeChanllenge(requestData,(response) => {
       if (response !== GlobalSetup.REQUEST_SUCCESS) {
         if (response[0].MessageCode == '0') {
          Toast.showLongCenter('约战请求已发出,请在我的约战中查看对方回复');
         } else {
           Toast.show(response[0].Message);
         }
      }else {
          Alert.alert('请求错误');
          //ToastAndroid.show('请求错误',ToastAndroid.SHORT);
      }
      });
    }

  }
  showDatePicker(){
      var date = this.state.date;
      this.picker.showDatePicker(date, (d)=>{
          this.showTimePicker(d);
      });

  }
  showTimePicker(fightdate){
      var date = this.state.date;
      this.picker.showTimePicker(date, (d)=>{
          d.setFullYear(fightdate.getFullYear());
          d.setMonth(fightdate.getMonth());
          d.setDate(fightdate.getDate());
          this.setState({fighttime:d});
      });
  }
  formatDate(strTime){
    if(strTime!=''){
      var date = new Date(strTime);
      var format = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
      return format;
    }else{
      return '';
    }
  }

  render(){
    return (
      <View>
        <Headernav screenTitle='发起约战'  navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View  style={styles.fightview}>
            <Text style={[commonstyle.yellow,commonstyle.fontsize12]}>{'您的压注金额需大于10氦气'}</Text>
            <View style={styles.fightviewinput}>
              <TextInput style={[commonstyle.cream, styles.fightviewinputfont]} placeholder={'请输入压注金额'} maxLength={11} underlineColorAndroid = 'transparent' placeholderTextColor={'#484848'} keyboardType={'numeric'} onChangeText={(text) => this.state.money = text}  />
            </View>
            <View style={styles.fightviewinput}>
              <TextInput style={[commonstyle.white, styles.fightviewinputfont]} placeholder={'请选择约战日期'}  placeholderTextColor={'#484848'} editable={false} onChangeText={(text) => this.state.fighttime = text} defaultValue={this.formatDate(this.state.fighttime.toString())}  />
              <TouchableOpacity style={styles.fightviewinputicon} activeOpacity={0.8} onPress={this.showDatePicker.bind(this)}>
                <Icon name="date" size={16}  color={'#484848'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.fightviewtextarea}>
              <TextInput style={[commonstyle.cream, {height: 100, borderColor: 'gray', borderWidth: 1,justifyContent: 'flex-start',}]}
                multiline={true}
                placeholder='嘲讽两句'
                placeholderTextColor='rgb(180,180,180)'
                {...this.props}
                onChangeText={(text) => this.onChange(text)}
                value={this.state.value}
                numberOfLines = {5}
                underlineColorAndroid = 'transparent'
                maxLength={200}
                ></TextInput>
              <View style={styles.fightviewtextnum}><Text style={commonstyle.cream}>{this.state.textnumber}/200</Text></View>
            </View>
            <TouchableOpacity style = {styles.fightviewbtn} onPress={()=>this.makechanllenge()}  >
              <Text style = {commonstyle.white}> {'发送挑战'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{top:-Util.size.height*19/50}}>
            <DateTimePicker  ref={(picker)=>{this.picker=picker}}/>
          </View>
        </View>
      </View>
    );
  }
}
