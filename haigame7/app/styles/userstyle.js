'use strict';

import { StyleSheet, Platform } from 'react-native';
var Util = require('../view/common/util');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0, 0, 0)',
    },
    //登陆界面
    loginbg: {
        flex: 1,
        height: Util.size.height - 48,
        width: Util.size.width,
        backgroundColor: '#000000',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        height: 100
    },
    //个人中心
    headbg: {
        flex: 1,
        height: 240,
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
        left: Util.size.width / 2 + 20,
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
    headtab: {
        marginTop: 20,
    },
    headtabli: {
        alignItems: 'center',
        width: Util.size.width / 3 - 1,
        height: 40,
    },
    headtabtitle: {
        alignItems: 'center',
        height: 20,
    },
    headtabnumber: {
        alignItems: 'center',
        height: 20,
    },
    headtabline: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        width: Util.pixel,
        height: 20,

    },
    //输入框
    loginlabel: {
        width: Util.size.width - 72,
        marginTop: 10,
        marginBottom: -10,
        marginLeft: 36,
        marginRight: 36,
    },
    logininput: {
        height: 40,
        width: Util.size.width - 72,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#D31B25',
        borderRadius: 3,
        marginTop: 20,
        marginLeft: 36,
        marginRight: 36,
        backgroundColor: (Platform.OS === 'ios') ?'rgba(0, 0, 0, 0.6)':'rgba(211, 27, 37, 0.8)',
    },
    logininputfont: {
        height: 40,
        left: 5,
        width: Util.size.width - 72,
        color: (Platform.OS === 'ios') ?'#FFFFFF':'#000000',
    },
    logininputright: {
        position: 'absolute',
        width: 30,
        height: 30,
        top: 3,
        right: 5,
    },
    //链接组
    linkblock: {
        width: Util.size.width - 72,
        marginTop: 10,
        marginLeft: 36,
        marginRight: 36,
    },
    link: {
        height: 20,
        justifyContent: 'center',
    },
    linkleft: {
        textAlign: 'left',
    },
    linkright: {
        textAlign: 'right',
    },
    //按钮
    btn: {
        height: 40,
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
    btncode: {
        position: 'absolute',
        top: 2,
        right: 4,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 32,
        borderWidth: 0,
        borderRadius: 2,
        backgroundColor: '#FFCA00',
    },
    btncodefont: {
        fontSize: 14,
        color: '#282828',
    },
    btndisable: {
        backgroundColor: '#484848',
    },
    //区域块
    loginblock: {
        width: Util.size.width - 72,
        marginTop: 20,
        marginLeft: 36,
        marginRight: 36,
    },
    blocktop: {
        marginTop: 10,
        alignItems: 'center',
    },
    blockbottom: {
        marginBottom: 10,
        alignItems: 'center',
    },
    //文本框
    textareabox: {
        margin: 10,
        width: Util.size.width - 20,
        height: 80,
        backgroundColor: '#484848',
        justifyContent: 'flex-start',
    },
    textareainput: {
        left: 5,
        height: 50,
        color: '#C3C3C3',
        alignItems: 'flex-start',
    },
    textareanumber: {
        position: 'absolute',
        right: 5,
        bottom: 0,
        color: '#C3C3C3',
    },
    //列表块
    listview: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
        backgroundColor: '#000000',
    },
    listviewiconleft: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginRight: 10,
    },
    listviewiconright: {
        top: 5,
        width: 15,
        height: 30,
        marginLeft: 10,
    },
    listviewtextbox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    listviewtext: {
        flex: 1,
        color: '#FFFFFF',
        marginTop: 5,
    },
    listviewtextleft: {
        color: '#C3C3C3',
        marginTop: 5,
        justifyContent: 'center',
    },
    listviewtextright: {
        color: '#484848',
        marginTop: 5,
        justifyContent: 'center',
    },
    listviewtextimg: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    listbox: {
        height: 20,
        backgroundColor: '#484848',
        marginTop: -1,
    },
    listboxfoot: {
        height: (Platform.OS === 'ios') ? 2 : 25,
        backgroundColor: '#484848',
        marginTop: -1,
    },
    listboxfooter: {
        height: (Platform.OS === 'ios') ? 2 : 25,
        marginTop: -1,
    },
    listviewlable: {
        justifyContent: 'center',
        width: 80,
        borderRightWidth: 1,
        borderRightColor: '#D31B25',
    },
    listviewlablefont: {
        color: '#C3C3C3',
    },
    listviewinput: {
        flex: 1,
        height: 30,
        width: Util.size.width - 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listviewinputfont: {
        height: 30,
        left: 5,
        color: '#484848',
    },
    listviewhero: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listviewheroimg: {
        width: 44,
        height: 44,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: 'rgba(255, 0, 0, 0.4)',
        marginLeft: 10,
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
    //模态框
    pickerview: {
        backgroundColor: '#FFFFFF',
    },
    //选择框
    checkview: {
        height: 30,
        width: Util.size.width - 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 36,
        marginRight: 36,
    },
    checkbox: {
        width: 30,
        height: 30,
    },
    //滑块
    switchblock: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 36,
        marginRight: 36,
        width: Util.size.width - 72,
        height: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    switchtext: {
        flex: 1,
        textAlign: 'right',
        marginRight: 10
    },
    switchbar: {
        width: 50,
        height: 20,
    },
    //关于
    abouttext: {
        marginLeft: 10,
        marginRight: 10,
        width: Util.size.width - 20,
    },
    aboutbtn: {
        flex: 1,
        width: Util.size.width / 2 - 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#D31B25',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    //申请&受邀
    listblock: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    listblockimg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        marginRight: 10,
    },
    listblockbtn: {
        width: 75,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    listblockbutton: {
        width: 75,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 5,
    },
    listblocktext: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    listblocktextleft: {
        width: 50,
        marginRight: 10,
        marginTop: 5,
    },
    listblocktexthero: {
        width: 40,
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderColor: '#D31B25',
        borderRadius: 3,
    },
    //消息
    msglist: {
        backgroundColor: '#000000',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    msgliststatus: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D31B25',
        marginTop: 5,
        marginRight: 10,
    },
    msgliststatusno: {
        width: 8,
        height: 8,
        marginTop: 5,
        marginRight: 10,
    },
    msglistdata: {
        width: 130,
        marginLeft: 10,
        alignItems: 'flex-end',
    },
    msglisticon: {
        width: 10,
        alignItems: 'flex-end',
    },
    //资产
    assetbg: {
        height: (Platform.OS === 'ios') ?115 : 160,
        width: Util.size.width,
    },
    assetblock: {
        marginTop: 30,
    },
    assetlabel: {
        alignItems: 'center',
    },
    assetlistblock: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    assetlist: {
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#484848',
    },
    assettext: {
        left: 5,
        top:10,
    },
    rechargeview: {
        width: Util.size.width - 72,
        marginTop: 10,
        marginLeft: 36,
        marginRight: 36,
    },
    recharge: {
        height: 30,
        width: (Util.size.width - 72) / 3,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rechargeline: {
        width: 10,
    },
    //编辑资料
    avatarblock: {
        width: Util.size.width,
        height: Util.size.width,
        marginTop: 50,
    },
    avatar: {
        width: Util.size.width,
        height: Util.size.width,
    },
    infoinput: {
        width: Util.size.width - 20,
        height: 30,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 2,
        backgroundColor: '#484848',
    },
    infoinputfont: {
        height: 40,
    },
    //消息
    messagebox: {
        padding: 20,
    },
});
