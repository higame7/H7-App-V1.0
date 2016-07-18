'use strict'

var React = require('react-native');
var Headernav = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var Util = require('../common/util');
var {
  View,
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
import styles from '../../styles/teamstyle';
import TeamService from '../../network/teamservice';
import GlobalSetup from '../../constants/globalsetup';
import GlobalVariable from '../../constants/globalvariable';
import Toast from '@remobile/react-native-toast';
export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      content:undefined,
      textnumber:0,
      teamID:this.props.teamid,
      teamrecruit:this.props.teamrecruit,
      messages: []
    }
  }
  onChange(text){
    this.setState(
      {
        textnumber:text.length,
        content:text,
      }
    );
  }
  componentDidMount(){
    if(this.state.teamrecruit != undefined) {
      this.setState({
        content: this.state.teamrecruit,
        textnumber: this.state.teamrecruit.length
      })
    }
  }
 cancelRecruit(){
   this.props.navigator.pop();
 }
 sendRecruit(){
   if(this.state.textnumber<5){
     Toast.showShortCenter('至少输入5个字符');
     return;
   }
   var data = {'teamID':this.state.teamID,'content':this.state.content};
   TeamService.sendRecruit(data,(response)=>{
     if(response[0].MessageCode == '0'){
       Toast.show('发布成功');
       this.props.updateLoginState();
       if(this.props.callback!==undefined){
         this.props.callback();
       }
       setTimeout(()=>{
       this.props.navigator.pop();
        },1000);
     }
     else {
       Toast.showShortCenter('发布失败');
     }
   });
 }
  render(){
    return (
      <View>
        <Headernav screenTitle='发布招募'  navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={styles.recruitbox}>
            <TextInput style={styles.recruitinput} multiline={true} defaultValue={this.state.teamrecruit} placeholder='此处为填写招募队员信息...' placeholderTextColor='#C3C3C3' onChangeText={(text) => this.onChange(text)} value={this.state.value} maxLength={200}/>
            <Text style={styles.recruitnumber}>{this.state.textnumber}/200</Text>
          </View>
          <View style={styles.recruitbtnblock}>
            <TouchableOpacity onPress={()=>this.cancelRecruit()} style = {[commonstyle.btncreamblack, styles.recruitbtn]} activeOpacity={0.8}>
              <Text style = {commonstyle.black}> {'取消'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.sendRecruit()} style = {[commonstyle.btnredwhite, styles.recruitbtn]} activeOpacity={0.8}>
              <Text style = {commonstyle.white}> {'发布'}</Text>
            </TouchableOpacity>
          </View>
        </View>
     </View>
    );
  }
}
