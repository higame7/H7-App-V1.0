'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator,
  Image,
  ToastAndroid,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Header from '../common/headernav'; //导航有问题
import styles from '../../styles/userstyle';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        text: '右上角的提交都还没有',
   navigator: this.props.navigator,
    }

  }
  onChange(text){
    this.setState(
      {
        textnumber:text.length
      }
    );
    // console.log(text.length);
  }

  _callback() {
    ToastAndroid.show("发送成功！",ToastAndroid.SHORT)
    this.state.navigator.pop()
  }

  render() {
    return(
      <View >
        <Header screenTitle='帮助与反馈' isPop={true} iconText='完成' callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <View style={styles.loginbg}>
          <View style={styles.textareabox}>
            <TextInput style={styles.textareainput} multiline={true} placeholder='请简述您的意见...' placeholderTextColor='#C3C3C3' onChangeText={(text) => this.onChange(text)} default={this.state.text} />
            <Text style={styles.textareanumber}>{this.state.textnumber}/2000</Text>
          </View>
        </View>
      </View>
    );
  }
}
