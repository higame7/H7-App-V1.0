'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Header from '../common/headernav';
import UserService from '../../network/userservice';

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messageID: this.props.messagedata.MessageID,
      title: this.props.messagedata.Title,
      content: this.props.messagedata.Content,
      time: this.props.messagedata.Time,
    }
  }
  render() {
    return(
      <View>
        <Header screenTitle={this.state.title} isPop={true} navigator={this.props.navigator}/>
        <View style={[commonstyle.bodyer, styles.messagebox]}>
          <Text style={commonstyle.cream}>{this.state.content}</Text>
          <View style={commonstyle.viewright}>
            <Text style={[commonstyle.cream, commonstyle.fontsize12]}>{this.state.time}</Text>
          </View>
        </View>
      </View>
    );
  }
}
