/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule AnExApp
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Animated,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Image,
  View,
} = React;
import commonstyle from '../../styles/commonstyle';
import teamstyles from '../../styles/teamstyle';
import TeamUser from './teamuser_show_screen';

var Util = require('../common/util');

var CIRCLE_SIZE = (Util.size.width - 20)/4 - 20;
var CIRCLE_MARGIN = 10;


class Circle extends React.Component {
  state: any;
  props: any;
  longTimer: number;

  _onLongPress: () => void;
  _toggleIsActive: () => void;
  constructor(props: Object): void {
    super(props);
    this._onLongPress = this._onLongPress.bind(this);
    this._toggleIsActive = this._toggleIsActive.bind(this);
    this.state = {
      isActive: false,
      teamUser:this.props.teamUser,
      pan: new Animated.ValueXY(), // Vectors reduce boilerplate.  (step1: uncomment)
      pop: new Animated.Value(0),  // Initial value.               (step2a: uncomment)
    };
  }

  _onLongPress(): void {
    var config = {tension: 40, friction: 3};
    this.state.pan.addListener((value) => {  // Async listener for state changes  (step1: uncomment)
      this.props.onMove && this.props.onMove(value);
    });
    Animated.spring(this.state.pop, {
      toValue: 1,                  //  Pop to larger size.                      (step2b: uncomment)
      ...config,                   //  Reuse config for convenient consistency  (step2b: uncomment)
    }).start();
    this.setState({panResponder: PanResponder.create({
      onPanResponderMove: Animated.event([
        null,                                         // native event - ignore      (step1: uncomment)
        {dx: this.state.pan.x, dy: this.state.pan.y}, // links pan to gestureState  (step1: uncomment)
      ]),
      onPanResponderRelease: (e, gestureState) => {
        LayoutAnimation.easeInEaseOut();  // @flowfixme animates layout update as one batch (step3: uncomment)
        Animated.spring(this.state.pop, {
          toValue: 0,                     // Pop back to 0                       (step2c: uncomment)
          ...config,
        }).start();
        this.setState({panResponder: undefined});
        this.props.onMove && this.props.onMove({
          x: gestureState.dx + this.props.restLayout.x,
          y: gestureState.dy + this.props.restLayout.y,
        });
        this.props.onDeactivate();
      },
    })}, () => {
      this.props.onActivate();
    });
  }

  render(): ReactElement {
    if (this.state.panResponder) {
      var handlers = this.state.panResponder.panHandlers;
      var dragStyle = {                 //  Used to position while dragging
        position: 'absolute',           //  Hoist out of layout                    (step1: uncomment)
        ...this.state.pan.getLayout(),  //  Convenience converter                  (step1: uncomment)
      };
    } else {
      handlers = {
        onStartShouldSetResponder: () => !this.state.isActive,
        onResponderGrant: () => {
          this.state.pan.setValue({x: 0, y: 0});           // reset                (step1: uncomment)
          this.state.pan.setOffset(this.props.restLayout); // offset from onLayout (step1: uncomment)
          this.longTimer = setTimeout(this._onLongPress, 300);
        },
        onResponderRelease: () => {
          if (!this.state.panResponder) {
            clearTimeout(this.longTimer);
            this._toggleIsActive();
          }
        }
      };
    }
    var animatedStyle: Object = {
      shadowOpacity: this.state.pop,    // no need for interpolation            (step2d: uncomment)
      transform: [
        {scale: this.state.pop.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3]         // scale up from 1 to 1.3               (step2d: uncomment)
        })},
      ],
    };
    var openVal = this.props.openVal;
    if (this.props.dummy) {
      animatedStyle.opacity = 0;
    } else if (this.state.isActive) {
      var innerOpenStyle = [styles.open, {                                 // (step4: uncomment)
        left: openVal.interpolate({inputRange: [0, 1], outputRange: [this.props.restLayout.x, 0]}),
        top: openVal.interpolate({inputRange: [0, 1], outputRange: [this.props.restLayout.y, 0]}),
        width: openVal.interpolate({inputRange: [0, 1], outputRange: [CIRCLE_SIZE, this.props.containerLayout.width]}),
        height: openVal.interpolate({inputRange: [0, 1], outputRange: [CIRCLE_SIZE, this.props.containerLayout.height]}),
        margin: openVal.interpolate({inputRange: [0, 1], outputRange: [CIRCLE_MARGIN, 0]}),
        borderRadius: openVal.interpolate({inputRange: [-0.15, 0, 0.5, 1], outputRange: [0, CIRCLE_SIZE / 2, CIRCLE_SIZE * 1.3, 0]}),
      }];
    }
    return (
      <Animated.View
        onLayout={this.props.onLayout}
        style={[styles.dragView, dragStyle, animatedStyle, this.state.isActive ? styles.open : null]}
        {...handlers}>
        <Animated.View style={[styles.circle, innerOpenStyle]}>
        <View  style={[commonstyle.col1, commonstyle.viewcenter]}>
        <Image style={teamstyles.teammanageimg} source={{uri:this.state.teamUser.UserPicture}} />
        </View>
        </Animated.View>
      </Animated.View>
    );
  }
  _toggleIsActive(velocity) {
  this.props.toggleActive({"name":"个人信息","component":TeamUser})
  }

}
type Point = {x: number, y: number};
function distance(p1: Point, p2: Point): number {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}

function moveToClosest({activeKey, keys, restLayouts}, position) {
  var activeIdx = -1;
  var closestIdx = activeIdx;
  var minDist = Infinity;
  var newKeys = [];
  keys.forEach((key, idx) => {
    var dist = distance(position, restLayouts[idx]);
    if (key === activeKey) {
      idx = activeIdx;
    } else {
      newKeys.push(key);
    }
    if (dist < minDist) {
      minDist = dist;
      closestIdx = idx;
    }
  });
  if (closestIdx === activeIdx) {
    return keys; // nothing changed
  } else {
    newKeys.splice(closestIdx, 0, activeKey);
    return newKeys;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64, // push content below nav bar
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: 'black',
    margin: CIRCLE_MARGIN,
    overflow: 'hidden',
  },
  dragView: {
    shadowRadius: 10,
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowOffset: {height: 8},
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  open: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: undefined, // unset value from styles.circle
    height: undefined, // unset value from styles.circle
    borderRadius: 0, // unset value from styles.circle
  },
  darkening: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = Circle;
