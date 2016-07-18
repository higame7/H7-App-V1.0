'use strict';

import React,{
  AppRegistry,
  StyleSheet,
  DeviceEventEmitter,
  ListView,
  Text,
  TouchableHighlight,
  View,
  ToastAndroid
} from 'react-native';

let testData = [
  {"firstName":"Black","LastName":"Garrett"},
  {"firstName":"Morales","LastName":"Duncan"},
  {"firstName":"Ramos","LastName":"King"},
  {"firstName":"Dunn","LastName":"Collins"},
  {"firstName":"Fernandez","LastName":"Montgomery"},
  {"firstName":"Burns","LastName":"Fox"},
  {"firstName":"Richardson","LastName":"Kim"},
  {"firstName":"Hanson","LastName":"Evans"},
  {"firstName":"Anderson","LastName":"Hunt"},
  {"firstName":"White","LastName":"Andrews"},
  {"firstName":"Reyes","LastName":"Perez"},
  {"firstName":"Dixon","LastName":"Barnes"},
  {"firstName":"Murray","LastName":"Rose"},
  {"firstName":"Cook","LastName":"Dean"},
  {"firstName":"Black","LastName":"Garrett"}
];

class SampleRow extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.text}>{this.props.LastName},{this.props.firstName}</Text>
        </View>
      </View>
    );
  }
}
export default class extends React.Component {

  constructor() {
    super();
    let ds = new ListView.DataSource({
      sectionHeaderHasChanged: (r1, r2) => r1 != r2,
      rowHasChanged: (r1, r2) => r1 != r2
    });

    var {data, sectionIds} = this.renderListViewData(testData.sort(this.compare.bind(this)));
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(data, sectionIds)
    };
  }
  compare(a, b) {
      if (a.LastName < b.LastName)
        return -1;
      if (a.LastName > b.LastName)
        return 1;
      return 0;
  }
  componentDidMount() {
    let listViewScrollView = this.refs.listView.getScrollResponder();
    listViewScrollView.scrollTo(1)
  }

  renderListViewData(users) {
    let data = {};
    let sectionIds = [];
    users.map((user) => {
      let section = user.LastName.charAt(0);
      if (sectionIds.indexOf(section) === -1) {
        sectionIds.push(section);
        data[section] = [];
      }
      data[section].push(user);
    });
    return {data, sectionIds};
  }

  renderSectionHeader(data, sectionId) {
    let text;
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{sectionId}</Text>
      </View>
    );
  }

  renderRow(rowData) {
    return <SampleRow {...rowData} style={styles.row}/>
  }

  render() {
    return (
      <ListView
        ref="listView"
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  text: {
    fontSize: 24,
    fontWeight: "100",
    color: 'black',
  },
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
});
