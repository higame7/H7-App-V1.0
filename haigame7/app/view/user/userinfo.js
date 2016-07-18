'use strict'

var React = require('react-native');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Navigator,
  ScrollView,
  Modal,
  Dimensions,
  StyleSheet,
  Component,
  AsyncStorage
  } = React;

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import EditScreen from './edituserinfo';
import Picker from 'react-native-picker';
import UserService from '../../network/userservice';
import AreaData from '../../components/common/area.json';
import GlobalVariable from '../../constants/globalvariable';
import Toast from '@remobile/react-native-toast';
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalVisible:false,
      userData: this.props.userData,
      pickerData: {'北京':{'北京':['朝阳区']}},
      selectedValue: ['北京', '北京', '朝阳区'],
      selectedValueDate:['2000', '4', '1'],
      avatarSource: {uri:this.props.userData.UserWebPicture}
    }
  }

  componentWillMount() {
    // AsyncStorage.getItem(GlobalVariable.USER_INFO.USERSESSION).then((value)=>{
    //   let jsondata = JSON.parse(value);
    //   alert(jsondata.Birthday)
    //   if (jsondata.Birthday != '' && jsondata.Birthday != null){
    //     let birthday = jsondata.Birthday.split("-");
    //     this.setState({
    //       userData: jsondata
    //     })
    //   }
    // });
  }


  componentDidMount() {
    this.setState({
      pickerData: this._createAreaData(AreaData)
    })
    // Alert.alert(this.state.userData.Address)
    if(this.state.userData.Address != undefined && this.state.userData.Address != ''){
      this.setState({
        selectedValue: this._setSelectedValue(this.state.userData.Address),
      })
    }
    if (this.state.userData.Birthday != '' && this.state.userData.Birthday != undefined){
      let birthday = this.state.userData.Birthday.split("-");
      this.setState({
        selectedValueDate: ['2000', '4', '18']
      })
    }
  }
  componentWillReceiveProps(nextProps,nextState) {
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  _createAreaData(area){
    let data = {};
    let len = area.length;
    for(let i=0;i<len;i++){
      let city = area[i]['city'];
      let cityLen = city.length;
      let ProvinceName = area[i]['name'];
      data[ProvinceName] = {};
      for(let j=0;j<cityLen;j++){
        let area = city[j]['area'];
        let cityName = city[j]['name'];
        data[ProvinceName][cityName] = area;
      }
    }
    return data;
  }
  _setSelectedValue(addr){
    let result = [];
    let temp = addr.split("-");
    if (this.beContent(temp[0])){
      result[0] = temp[0];
      result[1] = temp[0];
      result[2] = temp[2];
    } else {
      result[0] = temp[0];
      result[1] = temp[1];
      result[2] = temp[2];
    }
    return result;
  }

  beContent(str){
    const list = ['北京','上海','天津','重庆'];
    return list.indexOf(str) === -1?false: true;
  }
  createDateData(){
    let date = {};
    for(let i=1950;i<2050;i++){
      let month = {};
      for(let j = 1;j<13;j++){
        let day = [];
        if(j === 2){
          for(let k=1;k<29;k++){
            day.push(k);
          }
        } else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
          for(let k=1;k<32;k++){
            day.push(k);
          }
        } else {
          for(let k=1;k<31;k++){
            day.push(k);
          }
        }
        month[j] = day;
      }
      date[i] = month;
    }
    return date;
  }

  /**
   * 更新属性
   * @param  {[type]} property [description]
   * @return {[type]}          [description]
   */
  _editInfo(property) {
    if(property == '手机号') {
      Toast.show("手机号暂不可更改")
      return
    }
    let _this = this;
    let udata = _this.state.userData
    this.props.navigator.push({
      name: 'edituserinfo',
      component: EditScreen,
      params: {
        userdata: this.state.userData,
        screenTitle: property,
        setProperty(key,pro){
          // console.log('列表页设置相应属性:' + key);
          switch (key) {
            case '昵称':
              UserService.updateUserInfo({"PhoneNumber":_this.state.userData.PhoneNumber,'UserWebNickName':pro},(response) => {
                // console.log(response[0].MessageCode);
                if(response[0].MessageCode == '0') {
                  udata['UserWebNickName'] = pro
                  AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION, JSON.stringify(udata));
                } else if(response[0].MessageCode == '10007') {
                  Toast.show('昵称已经存在，换个呗:)');
                } else {
                  console.log('更新失败');
                  Toast.show('更新失败');
                }
              })
              break;
            case '个性签名':
            UserService.updateUserInfo({"PhoneNumber":_this.state.userData.PhoneNumber,'Hobby':pro},(response) => {
              // console.log(pro);
              if(response[0].MessageCode == '0') {
                udata['Hobby'] = pro
                AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION, JSON.stringify(udata));
              } else {
                console.log('更新失败');
                Alert.alert(response[0].Message);
              }
            })
              break;
            case '手机号':
              break;
            case '头像':
              UserService.updateUserInfo({"PhoneNumber":_this.state.userData.PhoneNumber,'UserWebPicture':pro},(response) => {
                // console.log(response[0]);
                // console.log('***************&&&&');
                if(response[0].MessageCode == '0') {
                  udata['UserWebPicture'] = 'data:image/jpeg;base64,' + pro
                  AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION, JSON.stringify(udata));
                } else {
                  console.log(response[0].Message);
                  //api没有限制,暂时或者永远这么写了就
                  Toast.show("更新失败，图片过大");
                }
              })
               break;
            default:
             break;
          }
          _this.setState({
            userData: udata
          })
          _this.timer = setTimeout(()=>{
            _this.props._callback('UserInfo');
          },1000);
        }
      }
    });
  }
  _onPressHandle(){
    this.refs.sexPicker.toggle();
  }
  _onPressHandle_1(){
    this.refs.addresPicker.toggle();
  }
  _onPressHandle_2(){
    this.refs.datePicker.toggle();
  }
  _sexDone(pickedValue){
    let data = this.state.userData;
    data['Sex'] = pickedValue[0];
    UserService.updateUserInfo({"PhoneNumber":this.state.userData.PhoneNumber,'Sex':data['Sex']},(response) => {
      if(response[0].MessageCode == '0') {
        AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION, JSON.stringify(data));
        this.setState({
          userData: data
        })
      } else {
        console.log('更新失败');
        Toast.show(response[0].Message);
      }
    })
  }
  _addrDone(pickedValue){
    let addr;
    if (pickedValue[0] == pickedValue[1]) {
      addr = pickedValue[1] + '-' + pickedValue[2];
    } else {
      addr = pickedValue[0] + '-' + pickedValue[1];
    }
    let data = this.state.userData;
    data['Address'] = addr;
    UserService.updateUserInfo({"PhoneNumber":this.state.userData.PhoneNumber,'Address':addr},(response) => {
      if(response[0].MessageCode == '0') {
        AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION, JSON.stringify(data));
        this.setState({
          userData: data
        })
      } else {
        console.log('更新失败');
        Toast.show(response[0].Message);
      }
    })
  }
  _dateDone(pickedValue){
    //  console.log(pickedValue);
    let date = pickedValue[0] + '-' + pickedValue[1] + '-' + pickedValue[2];
    let data = this.state.userData;
    data['Birthday'] = date;
    UserService.updateUserInfo({"PhoneNumber":this.state.userData.PhoneNumber,'Birthday':date},(response) => {
      if(response[0].MessageCode == '0') {
        AsyncStorage.setItem(GlobalVariable.USER_INFO.USERSESSION, JSON.stringify(data));
        this.setState({
          userData: data
        })
      } else {
        console.log('更新失败');
        Toast.show(response[0].Message);
      }
    })
  }
  renderHeroImageItem(rowData,key){
    return(
      <Image key={key} style={styles.listviewheroimg} source={{uri:rowData.HeroImage}} />
    );
  }
  render() {
    var that = this;
    var HeroImages =Object.keys(that.state.userData.HeroImage).map(function(item,key) {
      return that.renderHeroImageItem(that.state.userData.HeroImage[item],key);
    });
    return(
      <View >
      <Header screenTitle='我的资料'  navigator={this.props.navigator}/>
      <ScrollView style={commonstyle.bodyer}>
        <View style={[styles.listview, {height: 100,}]}>
          <Text style={[styles.listviewtextleft, {marginTop: 35,}]}>头像</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'头像')}>
            <Image style={styles.listviewtextimg} source={{uri:this.state.userData.UserWebPicture || 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={[styles.listviewiconright, {marginTop: 30,}]} />
        </View>

        <View style={styles.listview} >
          <Text  style={styles.listviewtextleft}>昵称</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'昵称')}>
            <Text style={styles.listviewtextright}>{this.state.userData.UserWebNickName}</Text>
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </View>

        <View style={styles.listview} >
          <Text  style={styles.listviewtextleft}>性别</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._onPressHandle.bind(this)} >
            <Text style={styles.listviewtextright}>{this.state.userData.Sex} </Text>
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </View>

        <View style={styles.listview} >
          <Text  style={styles.listviewtextleft}>地区</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._onPressHandle_1.bind(this)}>
            <Text style={styles.listviewtextright}>{this.state.userData.Address}</Text>
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </View>

        <View style={styles.listview} >
          <Text  style={styles.listviewtextleft}>生日</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._onPressHandle_2.bind(this)} >
            <Text style={styles.listviewtextright}>{this.state.userData.Birthday}</Text>
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </View>

        <View style={styles.listview} >
          <Text  style={styles.listviewtextleft}>手机号</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'手机号')}>
          <Text style={styles.listviewtextright}>{this.state.userData.PhoneNumber}</Text>
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </View>

        <View style={styles.listview} >
          <Text  style={styles.listviewtextleft}>个性签名</Text>
          <TouchableOpacity style={styles.listviewtextbox} activeOpacity={0.8} onPress={this._editInfo.bind(this,'个性签名')}>
            <Text style={styles.listviewtextright}>{this.state.userData.Hobby}</Text>
          </TouchableOpacity>
          <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
        </View>

        <View style={[styles.listview, {height: 60,}]} >
          <Text  style={styles.listviewtextleft}>擅长英雄</Text>
          <View style={styles.listviewhero}>
            {HeroImages}
          </View>
        </View>
        </ScrollView>

        <Picker
          ref={'sexPicker'}
          style={{
            height: 200
          }}
          pickerBtnText='确定'
          pickerCancelBtnText='取消'
          showDuration={100}
          showMask={true}
          pickerData={['男','女']}
          selectedValue={'男'}
          onPickerDone={this._sexDone.bind(this)}
        />
        <Picker
          ref={'addresPicker'}
          style={{
            height: 200
          }}
          pickerBtnText='确定'
          pickerCancelBtnText='取消'
          showDuration={100}
          showMask={true}
          pickerData={this.state.pickerData}
          selectedValue={this.state.selectedValue}
          onPickerDone={this._addrDone.bind(this)}
        />
        <Picker
          ref={'datePicker'}
          style={{
            height: 200
          }}
          pickerBtnText='确定'
          pickerCancelBtnText='取消'
          showDuration={100}
          showMask={true}
          pickerData={this.createDateData()}
          selectedValue={this.state.selectedValueDate}
          onPickerDone={this._dateDone.bind(this)}
        />
      </View>
    );
  }
}
