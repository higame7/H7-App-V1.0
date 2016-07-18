'use strict';

var React = require('react-native');

var {
    ListView,
    AppRegistry,
    StyleSheet,
    View,
    Text,
} = React;

var helloworld = React.createClass({
    getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4', 'row 5','row 6','row 7', 'row 8','row 9']),
    };
    },

    render: function() {
    return (
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
        initialListSize={5}
        pageSize={1}
        scrollRenderAheadDistance={20}
        />
    );
    },
});

var styles = StyleSheet.create({


});

AppRegistry.registerComponent('hellowrold',() => helloworld);
