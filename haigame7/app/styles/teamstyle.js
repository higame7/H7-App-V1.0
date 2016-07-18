'use strict';

var React = require('react-native');
var Util = require('../view/common/util');

var {
    StyleSheet,
    Platform
} = React;

var TeamStyle = StyleSheet.create({
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
    //滚动列表
    scrollview: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    teamlist: {
        height: 100,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    teamlistimg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    teamlistcenter: {
        flex: 1,
    },
    teamlistright: {
        width: 80,
        alignItems: 'flex-end',
    },
    teamlistbtn: {
        marginTop: 10,
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    userlist: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    userlistimg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    userlistteam: {
        flex: 1,
    },
    userlistteamname: {
        backgroundColor: '#484848',
        borderRadius: 5,
        padding: 10,
    },
    userlistteamicon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    userlistteambox: {
        flexDirection: 'row',
        marginTop: 5,
    },
    userlistcenter: {
        flex: 1,
        width: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    userlisthero: {
        flexDirection: 'row',
    },
    userlistheroimg: {
        width: 40,
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderColor: '#D31B25',
        borderRadius: 3,
    },
    userlistbtn: {
        marginTop: 10,
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    //战队信息
    headbg: {
        flex: 1,
        height: 220,
        width: Util.size.width,
    },
    headportrait: {
        width: 100,
        height: 100,
        borderWidth: 4,
        borderRadius: 50,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    headportraitv: {
        position: 'absolute',
        flexDirection: 'row',
        left: Util.size.width/2 + 20,
        bottom: 0,
        width: 50,
    },
    headportraitvfont: {
        color: '#FFFFFF',
        fontSize: 10,
    },
    headname: {
        fontSize: 18,
    },
    headtext: {
        marginTop: 5,
        paddingLeft: 60,
        paddingRight: 60,
    },
    headtextfont: {
        textAlign: 'center',
    },
    headtextblock: {
        marginTop: 5,
        paddingLeft: 60,
        paddingRight: 60,
    },
    headtextleft: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    headtextright: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    headtextline: {
        width: 1,
        height: 10,
        margin: 5,
        backgroundColor: '#484848',
    },
    //属性
    listblock: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#000000',
    },
    listview: {
        flexDirection: 'row',
        paddingTop: 7,
        paddingBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    listviewleft: {
        width: 60,
        marginRight: 10,
    },
    listviewright: {
        flex: 1,
        flexDirection: 'row',
    },
    listviewteam: {

    },
    listviewteamleader: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(255, 0, 0, 0.4)',
        marginRight: 10,
    },
    listviewteamblock: {
        flexDirection: 'row',
        marginTop: 10,
    },
    listviewteamlink: {
        width: 44,
        height: 44,
        marginRight: 10,
    },
    listviewteamedit: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    listviewteamimg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        marginRight: 10,
    },
    listviewhero: {
        flexDirection: 'row',
    },
    listviewheroimg: {
        width: 44,
        height: 44,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: 'rgba(255, 0, 0, 0.4)',
        marginRight: 10,
    },
    listviewbtnblock: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        width: Util.size.width - 20,
        height: 40,
    },
    //区域块
    blocktop: {
        marginTop: 10,
        alignItems: 'center',
    },
    blockbottom: {
        marginBottom: 10,
        alignItems: 'center',
    },
    nobottom: {
        borderBottomWidth: 0,
    },
    //按钮
    btn: {
        height:40,
        width: Util.size.width - 72,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 2,
        backgroundColor: '#D31B25',
        marginTop: 20,
        marginLeft: 36,
        marginRight: 36,
    },
    btnfont: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    btndisable: {
        backgroundColor: '#484848',
    },
    carousellist: {
        marginLeft: 15,
        marginRight: 15,
    },
    carousellistimg: {
        width: Util.size.width / 5,
        height: Util.size.width / 5,
        borderWidth: 1,
        borderColor: 'rgb(208, 46, 70)',
        borderRadius: 5,
        marginBottom: 5,
    },
    carousellistimgactive: {
        width: Util.size.width / 5,
        height: Util.size.width / 5,
        borderWidth: 3,
        borderColor: 'rgb(208, 46, 70)',
        borderRadius: 5,
        marginBottom: 5,
    },
    toggle: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
    },
    togglelist: {
        marginBottom: 10,
    },
    togglelistimg: {
        width: Util.size.width / 5,
        height: Util.size.width / 5,
        borderWidth: 1,
        borderColor: 'rgb(208, 46, 70)',
        borderRadius: 5,
        marginBottom: 5,
        marginRight: 10,
    },
    togglelistimgactive: {
        width: Util.size.width / 5,
        height: Util.size.width / 5,
        borderWidth: 3,
        borderColor: 'rgb(208, 46, 70)',
        borderRadius: 5,
        marginBottom: 5,
        marginRight: 10,
    },
    //文本框
    recruitbox: {
        margin: 10,
        width: Util.size.width - 20,
        height: 80,
        backgroundColor: '#484848',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    recruitinput: {
        height: 50,
        color: '#C3C3C3',
        alignItems: 'flex-start',
    },
    recruitnumber: {
        position: 'absolute',
        right: 5,
        bottom: 0,
        color: '#C3C3C3',
    },
    recruitbtnblock: {
        flexDirection: 'row',
        marginTop: -10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        width: Util.size.width - 20,
        height: 40,
        backgroundColor: '#484848',
        borderRadius: 5,
    },
    recruitbtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    //添加
    teamcreate: {
        marginTop: 20,
        marginLeft: 36,
        marginRight: 36,
        width: Util.size.width - 72,
        alignItems: 'center',
    },
    teamcreateimg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#C3C3C3',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    teamcreateportrait: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 2,
    },
    teamcreateinput: {
        height: 40,
        width: Util.size.width - 72,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    teamcreateinputfont: {
        textAlign: 'center',
        height: 50,
    },
    teammanage: {
        margin: 10,
    },
    teammanagelader: {
        alignItems: 'center',
    },
    teammanageuser: {
        marginTop: 10,
        alignItems:'flex-start',
        flexWrap:'wrap',

    },
    teammanageimg: {
        width: (Util.size.width - 20)/4 - 20,
        height: (Util.size.width - 20)/4 - 20,
        borderRadius: ((Util.size.width - 20)/4 - 20)/2,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    teammanageline: {
        height: 20,
        backgroundColor: '#484848',
    },
    teammanagelist: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    teammanagelistimg: {
        width: (Util.size.width - 20)/4 - 20,
        height: (Util.size.width - 20)/4 - 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#D31B25',
        marginRight: 10,
    },
});

module.exports = TeamStyle;
