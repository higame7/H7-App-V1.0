'use strict';


import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loading: {
  	height: 36,
  	flex: 1,
  	alignItems: 'center',
  	alignSelf: 'stretch',
  	justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 20
  },
  lightGrayText: {
  	color: '#666'
  },
  buttonSmall: {
  	borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3385ff',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 9,
    paddingRight: 9,
    marginRight: 6
  },
  buttonSmallText: {
  	fontSize: 12,
    color: '#3385ff'
  },
  listTitle: {
  	paddingLeft: 6,
  	marginBottom: 10
  },
  listGroup: {
    
  },
  listItem: {
  	flex: 1,
  	flexDirection: 'row',
  	paddingLeft: 6,
  	paddingRight: 6,
  	paddingTop: 10,
  	paddingBottom: 10,
  	borderWidth: 1,
  	borderColor: '#ddd',
  	marginTop: -1,
  	backgroundColor: '#fff'
  },
  itemContent: {
  	flex: 1,
  	paddingLeft: 10
  },
  itemTitle: {
  	fontSize: 16,
  	marginBottom: 6
  },
  itemDesc: {
  	fontSize: 12,
  	color: '#333'
  },
  separator: {
  	height: 1,
  	backgroundColor: '#eee'
  },
  updatePressed: {
  	backgroundColor: '#eee',
  	borderColor: '#eee'
  }
});
