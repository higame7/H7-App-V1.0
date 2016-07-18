import Store from 'react-native-store';
import React, {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Component
} from 'react-native';
const DB = {
    'bar': Store.model('bar')
}
export default class SectionHeader extends React.Component {
  // somewhere inside react components
  constructor(props) {
    super(props);
    this.state ={
      bar: undefined,
      key: undefined
    }
  }
  componentDidMount() {
      // Return all items
      // DB.foo.find().then(resp => this.setState({items: resp}));
      this.getData()
  }
  getData(){
    DB.bar.find().then(resp => {
      console.log(resp);
      this.setState({bar: resp.length})
    })
  }
  handleFilter(itemName) {
      DB.bar.find({
          where: {name:'huhaoran'}
      }).then(resp => this.setState({key: JSON.stringify(resp)}));
  }

  handleOnPress() {
      DB.bar.add({
          name: 'huhaoran',
          age: 12
      }).then(() => this.getData());
  }

  render(){
    let bar = (<View><Text>{this.state.bar}</Text></View>)

    return(
      <View>
      <TouchableHighlight onPress={this.handleOnPress.bind(this)}>
        <Text>点击添加</Text>
      </TouchableHighlight>
      {bar}
      <TouchableHighlight onPress={this.handleFilter.bind(this)}>
        <Text>查找</Text>
      </TouchableHighlight>
      <Text>{this.state.key}</Text>
      </View>
    );
  }
}
