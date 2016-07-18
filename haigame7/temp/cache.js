'use strict';

import React,{
  AppRegistry,
  StyleSheet,
  DeviceEventEmitter,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native';

import * as httpCache from '../app/components/common/cache'
export default class TestPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  componentWillMount(){
    this.getData();
  }
  async getData(){
    try {
      this.setState({
        'http': Math.round((await httpCache.getHttpCacheSize()/1024)/1024*10)/10 + 'M',
        'image': Math.round((await httpCache.getImageCacheSize()/1024)/1024*10)/10 + 'M',
        'all': Math.round((await httpCache.getSize()/1024)/1024*10)/10 + 'M',
      });
    } catch(err){
      alert('错误', err.message);
    }
  }
  async clearCache(){
    try {
      await httpCache.clear();
      alert('清除缓存成功');
      await this.getData();
    } catch(err){
      alert('错误', err.message);
    }
  }
  showPage(){
    this.props.navigator.push({
      component: MyPage
    })
  }
  render() {
    const { session } = this.props;
    return (
      <View >
        <View>
          <Text>Http缓存大小：{this.state.http}</Text>
          <Text>图片缓存大小：{this.state.image}</Text>
          <Text>总缓存大小：{this.state.all}</Text>
        </View>
        <TouchableOpacity onPress={()=>this.getData()}>
          <Text>刷新缓存大小</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.clearCache()}>
          <Text>清除缓存</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
