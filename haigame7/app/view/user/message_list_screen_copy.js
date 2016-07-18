'use strict';
import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles/msg_list_style';
import ShowMsg from './message_show_screen';
import Header from '../common/headernav';
var Swipeout = require('react-native-swipeout');
//https://gist.github.com/iahu/0e524f4612a8925f2f9c
//http://bbs.reactnative.cn/topic/52/listview-datasource-clonewithrows-%E7%9A%84%E5%8F%82%E6%95%B0%E9%97%AE%E9%A2%98/2

var README_URL = 'https://coding.net/u/levi/p/imouto-host/git/raw/master/README.md';
var MAP = {'Acrylated':'AcrylicHosts','Hosts-ä': 'Hosts-a'};
var BASE_URL = 'https://coding.net/u/levi/p/imouto-host/git/raw/master/';
var GOOGLE_HOSTS_URL = 'https://raw.githubusercontent.com/txthinking/google-hosts/master/hosts';
// Buttons
var swipeoutBtns = [
  {
    text: '删除',
    backgroundColor: '#f61d4b'
  }
]
export default class extends React.Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row1','row2']),
      pressTest: 0,
			loaded: false,
			updatePressed: false,
      onpress: this._onItemPress.bind(this)
    }
  }
  componentDidMount() {
  		this.getData();
  }

  getData() {
    let _ds = JSON.parse(JSON.stringify(['hu','haoran']));
    fetch(README_URL)
    .then((response) => response.text())
    .then((responseText) => {
      let f = responseText.match(/\- (.+)/g);
      f = f.map((line, idx) => {
					let l = line.replace(/^\s?-\s?/, '') + '\n';
					let a = l.split(/\s?\:\s?/);
					return {
						title: a.shift(),
						desc: a.join(':').split(' ').shift()
					};
				});
        f.push({
          title: 'google-hosts',
          desc: '每天2:00-3:00'
        });
        var _ds = JSON.parse(JSON.stringify(f));
        // console.log(_ds);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(_ds),
          loaded: true
        });
    }).done();

  }

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }
    return this.renderList();
  }

  renderLoadingView() {
    return (
	      <View style={styles.loading}>
	        <Text>
	          Loading ...
	        </Text>
	      </View>
	    );
  }

  renderList() {
    return(
      <View style={styles.container}>
        <Header initObj={{title:'我的信息{33}',}} navigator={this.props.navigator}></Header>
          <ListView
    					style={styles.listGroup}
    					dataSource={this.state.dataSource}
              onEndReached={() => console.log('这里就是滚到最后了')}
              onEndReachedThreshold={5}
    					renderRow= {this._renderRow.bind(this)} />
        </View>
    );
  }

  _renderRow(rowData, sectionID, rowID) {
    return(
      <Swipeout right={swipeoutBtns} close={true}>
        <TouchableOpacity onPress={this.state.onpress} underlayColor="#06f">
          <View style={styles.listItem} id={rowID}>
    				<View style={styles.itemContent}>
    				<Text style={styles.itemTitle}>发件人{rowData.title}{rowData.desc}</Text>
    				<Text>标题标题标题标题：WFK</Text>
    				</View>
    				<View>
              <Text>内容是啥</Text>
            </View>
    			</View>
        </TouchableOpacity>
      </Swipeout>
    );
  }

  _onItemPress(rowData) {
    let _nav = this.props.navigator;
    console.log(_nav);
    if (_nav) {
      _nav.push({
        name: 'ShowMsg',
        component: ShowMsg,
        params: {
         rowData: rowData,
       }
      });
    }
  }
}
