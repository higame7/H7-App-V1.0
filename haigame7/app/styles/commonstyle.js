'use strict';

var React = require('react-native');
var Util = require('../view/common/util');

var {
    StyleSheet,
    Platform
} = React;

var CommonStyle = StyleSheet.create({
    header: {
        height: (Platform.OS === 'ios') ? 64 : 48,
        padding: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#D31B25'
    },
    headerleft: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 48,
        marginLeft: (Platform.OS === 'ios') ? -10 : 15,
    },
    headertext: {
        justifyContent: 'center',
        height:  (Platform.OS === 'ios') ? 44 : 48,
    },
    headertextfont: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff',
        height: 25,
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerright: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 48,
        marginRight: (Platform.OS === 'ios') ? -10 : 15,
    },
    headertextright: {
        fontSize: 14,
        color: '#fff',
    },
    bodyer: {
        height: (Platform.OS === 'ios') ? Util.size.height - 64 : Util.size.height - 48,
        width: Util.size.width,
        backgroundColor: '#000000',
    },
    viewbodyer: {
        height: (Platform.OS === 'ios') ? Util.size.height - 113 : Util.size.height - 122,
        width: Util.size.width,
        backgroundColor: '#000000',
    },
    viewbottom:{
        paddingBottom: 10,
    },
    footer: {
        backgroundColor: '#FF0009',
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        bottom: 0,
    },
    //栅格
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    col1: {
        flex: 1,
    },
    col2: {
        flex: 2,
    },
    col3: {
        flex: 3,
    },
    col4: {
        flex: 4,
    },
    col5: {
        flex: 5,
    },
    col6: {
        flex: 6,
    },
    col7: {
        flex: 7,
    },
    col8: {
        flex: 8,
    },
    //文字对其
    viewleft: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    viewcenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewright: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    //定位
    relative: {
        position: 'relative',
    },
    absolute: {
        position: 'absolute',
    },
    //模态框
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    modaltitle: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    modalbody: {
        padding: 10,
        marginTop: 10,
        marginBottom: 40,
        backgroundColor: '#1A1917',
    },
    modalbodybottom:{
        paddingBottom: 70,
    },
    modaltext: {
        marginTop: 30,
        padding: 10,
    },
    modalsmall: {
        height: 150,
        width: Util.size.width - 40,
        backgroundColor: '#484848',
        justifyContent: 'flex-start',
    },
    modalmiddle: {
        height: 300,
        width: Util.size.width - 40,
        backgroundColor: '#484848',
        justifyContent: 'flex-start',
    },
    modalbig: {
        marginTop: 10,
        height: (Platform.OS === 'ios') ? Util.size.height - 154 : Util.size.height - 138,
        width: Util.size.width - 40,
        backgroundColor: '#484848',
        justifyContent: 'flex-start',
    },
    modalclose: {
        position: 'absolute',
        right: 0,
        top: 10,
        width: 30,
        height: 30,
    },
    modalbtn: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
    },
    modalbtnfont: {
        width: Util.size.width / 2 - 20,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    //色彩
    white: {
        color: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    cream: {
        color: '#C3C3C3',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    gray: {
        color: '#484848',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    cyan: {
        color: '#30CCC1',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    blue: {
        color: '#00B4FF',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    yellow: {
        color: '#FFCA00',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    orange: {
        color: '#FF6F64',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    red: {
        color: '#D31B25',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    purple: {
        color: '#C1337F',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    black: {
        color: '#282828',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    //字体大小
    fontsize12: {
        fontSize: 12,
    },
    fontsize14: {
        fontSize: 14,
    },
    fontsize18: {
        fontSize: 18,
    },
    fontsize22: {
        fontSize: 22,
    },
    //按钮
    icon: {
        height: 30,
        width: 30,
    },
    btnredwhite: {
        backgroundColor: '#D31B25',
        borderWidth: 1,
        borderColor: '#D31B25',
    },
    btnyellowblack: {
        backgroundColor: '#FFCA00',
        borderWidth: 1,
        borderColor: '#FFCA00',
    },
    btncreamblack: {
        backgroundColor: '#C3C3C3',
        borderWidth: 1,
        borderColor: '#C3C3C3',
    },
    btngrayblack: {
        backgroundColor: '#484848',
        borderWidth: 1,
        borderColor: '#484848',
    },
    btnwhitered: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D31B25',
    },
    btnborderred: {
        borderWidth: 1,
        borderColor: '#D31B25',
    },
    btnbordergray: {
        borderWidth: 1,
        borderColor: '#484848',
    },
    btnborderblue: {
        borderWidth: 1,
        borderColor: '#00B4FF',
    },
    btnborderorange: {
        borderWidth: 1,
        borderColor: '#FF6F64',
    },
    btnbordercyan: {
        borderWidth: 1,
        borderColor: '#30CCC1',
    },
    btnborderpurple: {
        borderWidth: 1,
        borderColor: '#C1337F',
    },
    //图标
    iconnobg: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    pointred: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor:'#FFFFFF',
        backgroundColor: '#960000',
    },
    //刷新&加载
    loading: {
        height: 36,
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    refreshview: {
        height: 30,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    refreshviewblock: {
        backgroundColor: '#484848',
        padding: 2,
    },
    paginationview: {
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    defaultview: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000000',
    },
});

module.exports = CommonStyle;
