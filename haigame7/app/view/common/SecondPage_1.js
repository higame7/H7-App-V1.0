var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Navigator
  } = React;
module.exports = React.createClass({
  getInitialState: function() {
        return {
            name: this.props.name,
        };
    },
  componentWillReceiveProps(nextProps) {
    if (nextProps.name != this.props.name) {
      this.setState({
        name: nextProps.name
      })
    }
  },
  render: function(){
    return(
      <View>
      <Text>Component C: {this.state.name}</Text>
      </View>
    );
  }
});
