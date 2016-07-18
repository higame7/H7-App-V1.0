const USER_MODELS = {
  1: {name: 'mot', age: 23},
  2: {name: 'huharoan', age: 26},
};


import React, {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import FirstPageComponent from './FirstPageComponent';

export default class SecondPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('ThirdPage receiveProps');
    if (nextProps.name != this.props.name) {
      this.setState({
        name: nextProps.name
      })
    }
  }
  componentWillMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        // console.log(this.props.key);

        console.log('12121212');
        console.log(this.props);
    }

  _pressButton() {
    const { navigator } = this.props;
    if(this.props.getUser) {
      var user = USER_MODELS[this.props.id];
      this.props.dodo();
      this.props.getUser(user);
    }
    if(navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
       navigator.pop();
    }
  }

  render() {
    return (
      <View>
      <Text>Component BBBB: {this.state.name}</Text>
      </View>
    );
  }
}
