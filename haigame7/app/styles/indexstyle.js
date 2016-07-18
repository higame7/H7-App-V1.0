'use strict';

/**
 * APP入口样式
 * @param  {[type]} 'react-native' [description]
 * @return {[type]}                [description]
 * @author aran.hu
 */
var React = require('react-native');

var {
  StyleSheet
  } = React;

var IndexStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

module.exports = IndexStyle;
