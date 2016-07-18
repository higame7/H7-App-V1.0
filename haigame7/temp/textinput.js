'use strict';
import React, {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    ToastAndroid,
    DeviceEventEmitter,
    TouchableHighlight
} from 'react-native';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "default"
    }
  }
  render() {
    return(
      <View>
      <TextInput
        secureTextEntry={true}
       style={{height: 40, borderColor: 'gray', borderWidth: 1,color: 'red'}}
       onChangeText={(text) => this.setState({text})}
       value={this.state.text}
      />
      </View>
    )
  }
}
