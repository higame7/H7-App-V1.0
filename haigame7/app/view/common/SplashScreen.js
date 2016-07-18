'use strict';

/**
 * 过场动画
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */
var React = require('react-native');
var {
  View,
  Text,
  Image,
  Dimensions, // 尺寸
  Animated,   // 动画
  } = React;

var styles = require('../../styles/SplashStyle');

var WIDTH = Dimensions.get('window').width;

var SplashScreen = React.createClass({

  /** [设置过场动画] */
  getInitialState: function () {
    // console.log(WIDTH);
    return {
      //不能加载项目内部资源
      cover: {image: {uri: 'http://img4.duitang.com/uploads/blog/201307/16/20130716084803_syBdu.thumb.600_0.jpeg'}, text: 'HaiGame 7'}, // 封面 splash
      bounceValue: new Animated.Value(1) // 弹力值
    };
  },

  // 组件初始化
  componentDidMount: function () {
    Animated.timing(
      this.state.bounceValue, {toValue: 1.2, duration: 2000}
    ).start();
  },

  render: function () {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={{uri: this.state.cover.image.uri}} // 混合资源
          style={{
            flex: 1,
            width: WIDTH,
            height: 1,
            transform: [{scale: this.state.bounceValue}]
          }}/>
        <Text style={styles.text}>
          {this.state.cover.text}
        </Text>
      </View>
    );
  }
});

module.exports = SplashScreen;
