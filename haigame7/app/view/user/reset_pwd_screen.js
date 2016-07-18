'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator,
  TextInput
} from 'react-native';
// var Header = require('../common/headernav');

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Header from '../common/headernav';
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      navigator: this.props.navigator
    }
  }

  _callback() {
    ToastAndroid.show("回调方法",ToastAndroid.SHORT)
    this.state.navigator.pop()
  }

  render() {
    let fields = [
        { ref: 'passwordold', placeholder: '请输入原始密码', placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 20, secureTextEntry: true, message: '* 密码必填'},
        { ref: 'passwordnew', placeholder: '请您设置新密码', placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 20, secureTextEntry: true, message: '* 密码必填'},
        { ref: 'passwordrepeat', placeholder: '请再次确认密码', placeholderTextColor: (Platform.OS === 'ios') ?'white':'block', keyboardType: 'default', maxLength: 20, secureTextEntry: true, message: '* 密码必填'},
    ];
    return(
      <View>
        <Header screenTitle='重置密码' isPop={true} iconText='完成' callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={styles.listview}>
            <View style={styles.listviewlable}><Text style={styles.listviewlablefont}>原始密码</Text></View>
            <View style={styles.listviewinput}><TextInput style={styles.listviewinputfont} {...fields[0] } onChangeText={(text) => this.setState({text})} /></View>
          </View>

          <View style={styles.listview}>
            <View style={styles.listviewlable}><Text style={styles.listviewlablefont}>新 密 码</Text></View>
            <View style={styles.listviewinput}><TextInput style={styles.listviewinputfont} {...fields[1] } onChangeText={(text) => this.setState({text})} /></View>
          </View>

          <View style={styles.listview}>
            <View style={styles.listviewlable}><Text style={styles.listviewlablefont}>确认密码</Text></View>
            <View style={styles.listviewinput}><TextInput style={styles.listviewinputfont} {...fields[2] } onChangeText={(text) => this.setState({text})} /></View>
          </View>
        </View>
      </View>
    );
  }
}
