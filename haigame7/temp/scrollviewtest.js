import React, {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
const UIManager = require('NativeModules').UIManager;
import autobind from 'autobind-decorator'

const favoriteEmoji = ['🤗🤗🤗🤗🤗', '😅😅😅😅😅', '😆😆😆😆😆']
const newFavoriteEmoji = ['🏃🏃🏃🏃🏃', '💩💩💩💩💩', '👸👸👸👸👸', '🤗🤗🤗🤗🤗', '😅😅😅😅😅', '😆😆😆😆😆']

export const title = '07 - PullToRefresh'
export const description = '下拉刷新'
export default class PullToRefresh extends React.Component {
  state = {
    isRefreshing: false,
    loaded: 0,
    rowData: favoriteEmoji.map(
      (val, i) => ({emoji: val})
    )
  };

//获取当前滚动的Y值
// <ScrollView onScroll={this.handleScroll} />
//   handleScroll: function(event: Object) {
//  console.log(event.nativeEvent.contentOffset.y);
// },

//获取制定组建的四面八方的值
// const UIManager = require('NativeModules').UIManager;
// const handle = React.findNodeHandle(this.refs.myElement);
// UIManager.measureLayoutRelativeToParent(
//   handle,
//   (e) => {console.error(e)},
//   (x, y, w, h) => {
//     console.log('offset', x, y, w, h);
//   });

// onScroll={(e) => { console.log(UIManager.measure(this.refs._scrollView.getInnerViewNode(), (fx, fy, width, height, px, py) => {
//   console.log('Component width is: ' + width)
//   console.log('Component height is: ' + height)
//   console.log('X offset to frame: ' + fx)
//   console.log('Y offset to frame: ' + fy)
//   console.log('X offset to page: ' + px)
//   console.log('Y offset to page: ' + py)
// })); }}
  comp(e) {

  }
  render () {
    const rows = this.state.rowData.map((row, i) => {
      return <Row key={i} {...row} onClick={this._onClick}/>
    })

    const now = new Date().toString()

    return (
      <View style={{flex: 1}}>
        <ScrollView
          ref="_scrollView"
          style={styles.scrollview}
          onScroll={this.comp.bind(this)}
          scrollEventThrottle={50}
          refreshControl={
            <RefreshControl

              style={styles.refresh}
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor='#eeeeee'
              title={'Last Update at ' + now}
              colors={['#ffffff', '#ffffff', '#ffffff']}
              progressBackgroundColor='#ffffff'
            />
          }>
          {rows}
        </ScrollView>
      </View>
    )
  }

  _onRefresh () {
    this.setState({isRefreshing: true})
    setTimeout(() => {
      const rowData = newFavoriteEmoji
        .map((val, i) => ({
          emoji: val
        }))
        .concat(this.state.rowData)

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData
      })
    }, 2000)
  }
}

class Row extends React.Component {
  render () {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.row}>
          <Text style={styles.text}>{this.props.emoji}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 2,
    backgroundColor: '#16141B'
  },
  row: {
    padding: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 50
  },
  refresh: {
    backgroundColor: '#333333'
  }
})
