'use strict';

var React = require('react-native');
var Util = require('../view/common/util');

var {
    StyleSheet,
    Platform
} = React;

var RankStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    //Tab选择
    nav: {
        height: 70,
    },
    navtab: {
        flexDirection: 'row',
        height: 40,
        width: Util.size.width,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#232220',
    },
    navbtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#C3C3C3',
    },
    navbtnactive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#D31B25',
    },
    navsub: {
        flexDirection: 'row',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    navsubblock: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    navsubline: {
        width: 1,
        height: 14,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#484848',
    },
    navsubicon: {
        marginLeft: 5,
    },
    //滚动列表
    scrollview: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    ranklist: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    ranklistimg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    ranklistcenter: {
        flex: 1,
    },
    ranklistrow: {
        flexDirection:'row',
        alignItems: 'flex-start',
    },
    ranklisttext: {
        marginTop: 5,
        marginBottom: 5,
    },
});

module.exports = RankStyle;
