'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  NetInfo,
} = React;


var secondProject = React.createClass({

 getInitialState() {
    return {
      isConnected: null, //初始化当前网络是否连接状态
      isConnectionExpensive: (null : ?boolean),  // 初始化当前网络的状态是否消耗资费
      connectionInfo: null, //当前网络的链接信息
      connectionInfoHistory: [],
    };
  },
  // 此时虚拟 DOM 已经构建完成，改方法只会执行一次，这里添加了一些网络状态改变的监听
  componentDidMount: function() {
    // 添加网络连接状态的监听事件，并在_handleConnectivityChange方法中处理
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange
    );
    // 以异步方式获取一个布尔值，用于判断当前设备是否联网
    NetInfo.isConnected.fetch().done(
        (isConnected) => { this.setState({isConnected}); }
    );

    NetInfo.isConnectionExpensive(
        (isConnectionExpensive) => { this.setState({isConnectionExpensive}); }
    );

    // 添加网络连接信息状态的监听事件。
    NetInfo.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
    NetInfo.fetch().done(
        (connectionInfo) => { this.setState({connectionInfo}); }
    );
  },
  componentWillUnmount: function() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );

    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );

  },


   _handleConnectionInfoChange: function(connectionInfo) {
    this.setState({
      connectionInfo,
    });

    const connectionInfoHistory = this.state.connectionInfoHistory.slice();
    connectionInfoHistory.push(connectionInfo); //向数组的末尾添加一个新的connectionInfo
    this.setState({
      connectionInfoHistory,
    });
  },

  _handleConnectivityChange: function(isConnected) {
    this.setState({
      isConnected,
    });
  },

  render() {
    return (
        <View>
          <Text>网络状态：{this.state.isConnected ? 'Online' : 'Offline'}</Text>
          <Text>网络资费：{this.state.isConnectionExpensive === true ? 'Expensive' :
                this.state.isConnectionExpensive === false ? 'Not expensive'
                : 'Unknown'}</Text>
          <Text>网络信息：{this.state.connectionInfo}</Text>
          <Text>网络ConnectionInfoSubscription：{JSON.stringify(this.state.connectionInfoHistory)}</Text>
        </View>
    );
  }
});

module.exports = secondProject;
