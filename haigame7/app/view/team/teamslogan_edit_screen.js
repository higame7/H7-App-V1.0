'use strict'

var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
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
  ScrollView,
  ToastAndroid
  } = React;

 import styles from '../../styles/userstyle';


export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      content:undefined,
      textnumber:0,
      messages: [],
     navigator: undefined,
      iconText: '完成'
    }
  }

  componentDidMount(){
      this.setState({
        navigator: this.props.navigator,
      });
  }

  onChange(text){
    this.setState(
      {
        textnumber:text.length
      }
    );
    console.log(text.length);
  }

  _callback() {
    ToastAndroid.show("回调方法",ToastAndroid.SHORT)
    this.state.navigator.pop()
  }
  render(){

    return (
      <View >
      <Header screenTitle='战队信息' isPop={true}   iconText={this.state.iconText} callback={this._callback.bind(this)} navigator={this.props.navigator}></Header>
      <View style={[styles.centerbg,{backgroundColor:'#000'}]}>
        <TextInput
            style={[styles.centertextarea,UserSignStyle.centertextarea]}
              multiline={true}
              placeholder='生命不息，电竞不止...'
              placeholderTextColor='rgb(120,120,120)'
              defaultValue='生命不息，电竞不止...'
              onChangeText={(text) => this.onChange(text)}
              value={this.state.value}
              maxLength={200}
              >
        </TextInput>
          <Text style={[styles.centertextareacount,UserSignStyle.centertextareacount]}>
            {this.state.textnumber}/200
          </Text>
      </View>

    </View>
    );
  }
}
var UserSignStyle = StyleSheet.create({
 centertextarea:{
   left:20,
   width:Util.size.width-40,
   height:Util.size.height/2-40,
   backgroundColor:'rgb(120,120,120)',
 },
 centertextareacount:{
   height:30,
   color:'rgb(255,255,255)',
  },

 });
