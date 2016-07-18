'use strict';
import React, {
  StyleSheet,
  Text,
  View,
  Animated,
  LayoutAnimation,
  PanResponder,
  Navigator,
  Image,
  ToastAndroid,
  ListView,
  ScrollView
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import Header from '../common/headernav';
import Circle from './teamuseranimated';
import TeamUser from './teamuser_show_screen';


export default class extends React.Component {
  state: any;
  props: any;
  _onMove: (position: Point) => void;
  constructor(props: any){
    super(props);
    var keys = [];
    for (var idx = 0; idx < this.props.teamData.TeamUser.length; idx++) {
      keys.push(idx);
    }
    this.state = {
      keys,
      navigator: undefined,
      teamData: {},
      isUsed: false,
      restLayouts: [],
      openVal: new Animated.Value(0),
    };
    this._onMove = this._onMove.bind(this);
  }
  componentDidMount(){
      this.setState({
        navigator: this.props.navigator,
        teamData:this.props.teamData
      });
  }
  _callback(){
    console.log(this.state.keys);
  }
  _onMove(position: Point): void {
    var newKeys = moveToClosest(this.state, position);
    if (newKeys !== this.state.keys) {
      LayoutAnimation.easeInEaseOut();  // animates layout update as one batch (step3: uncomment)
      this.setState({keys: newKeys});
    }
  }
  _toNextScreen(params){
    let _this = this;
    this.props.navigator.push({
      name:'个人信息',
      component: TeamUser,
      sceneConfig:params.sceneConfig || undefined,
      params: {
        ...this.props,
        ...params,
        }
    })
  }

  renderCircle(){
   var circles =  this.state.keys.map((key, idx) => {
      if (key === this.state.activeKey) {
        return (
          <Circle key={key + 'd'} {...this.props} toggleActive={this._toNextScreen.bind(this,{'teamuser':this.props.teamData.TeamUser[idx]})} teamUser={this.props.teamData.TeamUser[idx]} dummy={true} />
      );
      } else {
        if (!this.state.restLayouts[idx]) {
          var onLayout = function(index, e) {
            var layout = e.nativeEvent.layout;
            this.setState((state) => {
              state.restLayouts[index] = layout;
              return state;
            });
          }.bind(this, idx);
        }
        return (
          <Circle
            key={key}
            id={key}
            teamUser={this.props.teamData.TeamUser[idx]}
            toggleActive={this._toNextScreen.bind(this,{'teamuser':this.props.teamData.TeamUser[idx]})}
            openVal={this.state.openVal}
            {...this.props}
            onLayout={onLayout}
            restLayout={this.state.restLayouts[idx]}
            onActivate={this.setState.bind(this, {
              activeKey: key,
              activeInitialLayout: this.state.restLayouts[idx],
            })}
          />
        );
      }
    });
    if (this.state.activeKey) {
      circles.push(
        <Animated.View key="dark" style={[styles.darkening, {opacity: this.state.openVal}]} />
      );
      circles.push(
        <Circle
          openVal={this.state.openVal}
          key={this.state.activeKey}
          id={this.state.activeKey}
          restLayout={this.state.activeInitialLayout}
          containerLayout={this.state.layout}
          onMove={this._onMove}
          onDeactivate={() => {this.deactive(); }}
        />
      );
    }
    return(
      <View style={[commonstyle.row, styles.teammanageuser]}>{circles}</View>
    );
  }
  deactive(){
  this.setState({
    activeKey: undefined,
  });
}
  render() {
    var circles = this.renderCircle();
    return(
      <View>
        <Header screenTitle='队员管理' isPop={true} iconText='完成' callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={styles.teammanage}>
            <View style={[commonstyle.row, styles.teammanagelader]}>
              <Image style={styles.teammanageimg} source={{uri:this.state.teamData.CreaterPicture}} />
            </View>
           {circles}
          </View>
        </View>
      </View>
    );
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
