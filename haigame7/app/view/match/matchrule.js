'use strict'

var React = require('react-native');
var Headernav = require('../common/headernav');
var {
  View,
  Component,
  Text,
  WebView,
  TextArea,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  ScrollView
} = React;

var commonstyle = require('../../styles/commonstyle');
var styles = require('../../styles/matchstyle');

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      matchdata:{},
      messages: [],
      scalingEnabled: true,
      urlcontent:this.props.matchdata.introduce,
    }
  }
  componentWillMount(){
    this.setState(
      {
        matchdata:this.props.matchdata,
      }

    );
  }

  render(){
    return (
      <View>
        <Headernav screenTitle={this.state.matchdata.matchname}  navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
       <WebView
         source={{html: this.state.urlcontent}}
         scalesPageToFit={true}
         />
        </View>
      </View>
    );
  }
}
