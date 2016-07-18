var React = require('react-native');
var Util = require('./util');
var User = require('../user');
import Login from '../user/login';
var Icon = require('react-native-vector-icons/Iconfont');
var CommonStyle = require('../../styles/commonstyle');
import GlobalVariable from '../../constants/globalvariable';

var {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
  } = React;

module.exports = React.createClass({

  getInitialState: function()
  {
    return {
      data:undefined
   };
  },
  render: function(){
    var screenTitle = this.props.screenTitle;

    if (this.state.data!==null) {
      userLogin = <Image source={{uri:'http://sso.haigame7.com/images/logo.png'}}  style={CommonStyle.headerImage}/>
    } else {
      userLogin = <Icon name="user" size={30} color="#FFF" />
    }
    return (
      <View style={[CommonStyle.header, CommonStyle.row]}>
        <TouchableOpacity style={[CommonStyle.col1, CommonStyle.headerleft]} onPress={this._pop}>
          <Icon name="angle-left" size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={[CommonStyle.col1, CommonStyle.headertext]}>
          <Text style={CommonStyle.headertextfont} numberOfLines={1}>{screenTitle}</Text>
        </View>
        <View style={CommonStyle.col1}>
        </View>
      </View>
    );
  },

  _pop: function(){
    if(this.props.navigator!==undefined){
     this.props.navigator.pop();
    }
  },
  _pushroute:function(){
    AsyncStorage.getItem(GlobalVariable.USER_INFO.USERSESSION).then((value)=>this.setState({data:value}));
    if (this.state.data!==null){
        this.props.navigator.push({name:'user',component:User});
    }else{
        // this.props.navigator.push({name:'login',component:Login});
        this.props.navigator.push({name:'user',component:User});
    }

  }

});
