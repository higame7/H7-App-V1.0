'use strict';

import React,
  {
    View,
    Component,
    Text,
    TextArea,
    TextInput,
    Image,
    TouchableOpacity,
    Navigator,
    TouchableHighlight,
    StyleSheet,
    ListView,
    RefreshControl,
    ToastAndroid
  } from 'react-native';

import Modal from 'react-native-modalbox';
import commonstyle from '../../styles/commonstyle';
/**
 * 没用到，仅做参考
 */
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentWillMount() {
    this.setState({
      isOpen: this.props.isOpen
    });

  }
  componentDidMount() {}

  setIsOpen(isOpen) {
    this.setState({
      isOpen: isOpen
    })
  }
  render() {
    return(
      <Modal isOpen={this.props.isOpen} backdropPressToClose={false} style={[commonstyle.modal, commonstyle.modalmiddle]} position={"center"}>
         <View style={commonstyle.modaltext}>
           <Text style={commonstyle.cream}>正在加载中，别着急哈~~~~</Text>
         </View>
       </Modal>
    );
  }
}
