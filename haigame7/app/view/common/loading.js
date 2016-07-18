'use strict';
/**
 *  正在加载组件
 * @return {[Loading Component]}
 * @author zaki.zi
 */
import React , {
  View,
  Text,
  Image
  } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

var Loading = React.createClass({
  render: function () {
    return (
    <Spinner visible={true} />
    );
  }
});

module.exports = Loading;
