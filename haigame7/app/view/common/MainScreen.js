'use strict';
/**
 * APPs首屏
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */
var React = require('react-native');

var {
  View,
  Text,
  Image
  } = React;

var MainScreeStyle = require('../../styles/MainScreeStyle');

var MainScreen = React.createClass({
  render: function () {
    return (
      <View style={MainScreeStyle.container}>
        <Text style={MainScreeStyle.welcome}>
          Main Screen.
        </Text>
        <Image style={{width: 15,height: 15}} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
      </View>
    );
  }
});

module.exports = MainScreen;
