var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  width,
  height
} = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  ScrollView,
  ListView,
  View,
  Text,
  Animated
} = React;
//http://browniefed.com/blog/2015/08/01/react-native-animated-listview-row-swipe/

var GREY = 0;
var GREEN = 1;
var RED = 2;

var values = [1,2,3,4];

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

var AnimatedFlick = React.createClass({
  getInitialState: function() {
    return {
        values: values,
        colors: values.map( () => new Animated.Value(GREY) )
    };
  },
  _animateScroll: function(index, e) {
    var threshold = width / 5;
    var x = e.nativeEvent.contentOffset.x;
    var target = null;

    x = x * -1;

    if (x > -50 && this._target != GREY) {
      target = GREY;
    } else if (x < -50 && x > -threshold && this._target != GREEN) {
      target = GREEN;
    } else if (x < -threshold && this._target != RED) {
      target = RED;
    }

    if (target !== null) {
      this._target = target;
      this._targetIndex = index;

      Animated.timing(this.state.colors[index], {
        toValue: target,
        duration: 180,
      }).start();
    }

  },
  takeAction: function() {
    this.setState({
      action: true
    });
  },
  getActionText: function() {
    var actionText = '';

    if (this.state.action) {
      if (this._target == GREEN) {
        actionText = 'Save Action';
      } else if (this._target == RED) {
        actionText = 'Delete Action'
      } else {
        actionText = 'No Action';
      }

      return 'You took "' + actionText + '" on the ' + this._targetIndex + ' row';
    }

    return 'You have not taken an action yet';
  },
  _renderRow: function(value, index) {

    var bgColor = this.state.colors[index].interpolate({
      inputRange: [
        GREY,
        GREEN,
        RED
      ],
      outputRange: [
        'rgb(180, 180, 180)',
        'rgb(63, 236, 35)',
        'rgb(233, 19, 19)',
      ],
    });

    return (
        <View
          style={styles.row}
          key={index}
        >
          <AnimatedScrollView
            horizontal={true}
            directionalLockEnabled={true}
            style={[{flex: 1, height: 100}, {backgroundColor: bgColor}]}
            onScroll={this._animateScroll.bind(this, index)}
            scrollEventThrottle={16}
            onMomentumScrollBegin={this.takeAction}
          >
            <View style={{flex: 1}}>
              <Text>{value + "  <----- Slide the row that way and release"}</Text>
            </View>
          </AnimatedScrollView>
        </View>
    )
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.outerScroll}>
          {this.state.values.map(this._renderRow, this)}
        </ScrollView>
        <Text>{this.getActionText()}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  outerScroll: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1
  }
});

module.exports = AnimatedFlick;
