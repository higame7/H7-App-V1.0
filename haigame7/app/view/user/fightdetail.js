'use strict';
/**
 * APPs我的赛事
 * @return {[SplashScreen Component]}
 * @author aran.hu
 */

import React, {
    View,
    Text,
    TextInput,
    Image,
    Alert,
    StyleSheet,
    Component,
    TouchableOpacity,
    Navigator,
    ScrollView,
    TouchableHighlight,
    } from 'react-native';
var Util = require('../common/util');
var Header = require('../common/headernav'); // 主屏
var Icon = require('react-native-vector-icons/Iconfont');
var ImagePickerManager = require('NativeModules').ImagePickerManager;
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/fightstyle';
import FightService from '../../network/fightservice';
import TeamService from '../../network/teamservice';
import GlobalSetup from '../../constants/globalsetup';
import Toast from '@remobile/react-native-toast';


export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      content:{},
      userdata:{},
      userteamdata:{},
      fightstate:'',
    }
  }
  componentDidMount(){
    TeamService.getUserDefaultTeam(this.props.userdata.UserID,(response) => {
      if (response !== GlobalSetup.REQUEST_SUCCESS) {
       if(response[0].MessageCode == '0'){
          this.setState({
            content:this.props.rowData,
            userdata:this.props.userdata,
            userteamdata:response[1],
            fightstate:this.props.fightstate,
            fightaddress:this.props.fightstate=='send'?this.props.rowData.SFightAddress:this.props.rowData.EFightAddress,
            fightpic:this.props.fightstate=='send'?this.props.rowData.SFightPic:this.props.rowData.EFightPic,
          });
        }
      }
    });
  }
  _reject(){
    if(this.state.userteamdata.Role=="teamuser"){
      Toast.showLongCenter("队员无权操作");
      return;
    }
    let requestdata = {'userID':this.state.userdata.UserID,'dateID':this.state.content.DateID,'money':this.state.content.Money,}
    FightService.reject(requestdata,(response) => {
     if (response !== GlobalSetup.REQUEST_SUCCESS) {
       if (response[0].MessageCode == '0') {
        Toast.showLongCenter('已拒绝约战');
        this.props.callback();
        setTimeout(()=>{
        this.props.navigator.pop();
      },1000);
       } else {
         Toast.show(response[0].Message);
       }
    }else {
        Toast.showLongCenter('请求错误');
        //ToastAndroid.show('请求错误',ToastAndroid.SHORT);
    }
    });
  }
  _accept(){
    if(this.state.userteamdata.Role=="teamuser"){
      Toast.showLongCenter("队员无权操作");
      return;
    }
    let requestdata = {'userID':this.state.userdata.UserID,'dateID':this.state.content.DateID,'money':this.state.content.Money,}
    FightService.accept(requestdata,(response) => {
     if (response !== GlobalSetup.REQUEST_SUCCESS) {
       if (response[0].MessageCode == '0') {
        Toast.showLongCenter('已接受约战');
        this.props.callback();
        setTimeout(()=>{
        this.props.navigator.pop();
      },1000);
       } else {
         Toast.show(response[0].Message);
       }
    }else {
        Toast.showLongCenter('请求错误');
        //ToastAndroid.show('请求错误',ToastAndroid.SHORT);
    }
    });
  }
  confirmResult(fightaddress){
    if(this.state.userteamdata.Role=="teamuser"){
      Toast.showLongCenter("队员无权操作");
      return;
    }
   if(this.state.fightaddress!==fightaddress){
     Alert.alert(
             '确认比赛ID号',
             '您跟对方输入不一致',
             [
               {text: '确认', onPress: () => this._updateGameID(this.state.fightaddress, this.state.showLogo)},
             ]
           )
   }else{
     this._updateGameID(this.state.fightaddress, this.state.showLogo);
   }
  }
  selectPhotoTapped() {
    let options = {
      title: '选择照片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选择',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        let source = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          showLogo: response.data,
          fightpic: source,
        });
      }
    });
  }
  _updateGameID(updateaddress, updatepic){
    let requestdata = {'dateID':this.state.content.DateID,'sfightaddress':this.state.fightstate=='send'?updateaddress:null,'efightaddress':this.state.fightstate=='send'?null:updateaddress,'sfightpic':this.state.fightstate=='send'?updatepic:null,'efightpic':this.state.fightstate=='send'?null:updatepic,}
    FightService.updateGameID(requestdata,(response) => {
     if (response !== GlobalSetup.REQUEST_SUCCESS) {
       if (response[0].MessageCode == '0') {
        Toast.showLongCenter('确认成功');
        this.props.callback();
        setTimeout(()=>{
        this.props.navigator.pop();
      },1000);
       } else {
         Toast.show(response[0].Message);
       }
    }else {
        Toast.showLongCenter('请求错误');
        //ToastAndroid.show('请求错误',ToastAndroid.SHORT);
    }
    });
  }
  renderfightdetailList(){
     if(this.state.content.CurrentState=='发起挑战'){
       return(
       <View>
         <View style={styles.fightdetail}>
           <Icon name="war" size={60}  style={commonstyle.red}/>
           <Text style={[commonstyle.white,styles.fightdetailtext]}>{'['+this.state.content.STeamName+'] 战队'}</Text>
           <Text style={[commonstyle.white,styles.fightdetailtext]}>{'向你的战队 ['+this.state.content.ETeamName+'] 发起挑战'}</Text>
           <Text style={[commonstyle.red,commonstyle.fontsize14,styles.fightdetailtext]}>{'压注金额'+this.state.content.Money+'氦气'}</Text>
           <Text style={[commonstyle.yellow,styles.fightdetailtext]}>{' 是否接受挑战？'}</Text>
           <View style={styles.detailbtnblock}>
             <TouchableOpacity style = {[commonstyle.btncreamblack, styles.detailbtn]} onPress={()=>this._reject()} activeOpacity={0.8}>
               <Text style = {commonstyle.black}> {'认怂'}</Text>
             </TouchableOpacity>
             <TouchableOpacity style = {[commonstyle.btnredwhite, styles.detailbtn]} onPress={()=>this._accept()}  activeOpacity={0.8}>
               <Text style = {commonstyle.white}> {'接受挑战'}</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     );
     }else if(this.state.content.CurrentState=='已应战')
      return(
      <View>
        <View style={styles.fightdetail}>
          <Icon name="war" size={60}  style={commonstyle.red}/>
          <Text style={[commonstyle.white,styles.fightdetailtext]}>{this.props.fightstate=='send'?this.state.content.ETeamName:this.state.content.STeamName+' 战队联系人电话: '+this.state.content.PhoneNumber}</Text>
          <Text style={[commonstyle.red,commonstyle.fontsize14,styles.fightdetailtext]}>{'压注金额'+this.state.content.Money+'氦气'}</Text>
          <Text style={[commonstyle.yellow,styles.fightdetailtext]}>{'约战时间: '+this.state.content.FightTime}</Text>
          <Text style={[commonstyle.yellow,styles.fightdetailtext]}>{'对方确认比赛ID号: '}{this.state.fightstate=='send'?this.state.content.EFightAddress:this.state.content.SFightAddress}</Text>
          <View  style = {styles.fightdetailinput }>
            <TextInput placeholder={'请输入比赛ID号'} placeholderTextColor='#484848' style={[styles.fightdetailfont,commonstyle.cream]} keyboardType='numeric'   defaultValue={this.state.fightstate=='send'?this.state.content.SFightAddress:this.state.content.EFightAddress}  onChangeText = {(text) => this.state.fightaddress = text }/>
          </View>
          <TouchableOpacity style={styles.fightdetailpic} onPress={this.selectPhotoTapped.bind(this)}>
            { this.state.fightpic == null ? <Text style={styles.avatarfont}>上传比赛结果照片</Text> :
              <Image style={styles.avatarimg} source={{uri: this.state.fightpic || 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
            }
          </TouchableOpacity>
          <View style={styles.detailbtnblock}>
            <TouchableOpacity style = {[commonstyle.btnredwhite, styles.detailbtn]} onPress={()=>this.confirmResult(this.state.fightstate=='send'?this.state.content.EFightAddress:this.state.content.SFightAddress)} activeOpacity={0.8}>
              <Text style = {commonstyle.white}> {'确认结果'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  render() {
    let fightdetaillist = this.renderfightdetailList();
    return (
      <View>
        <Header screenTitle="约战详情" navigator={this.props.navigator}/>
        <ScrollView style={commonstyle.bodyer}>
          {fightdetaillist}
        </ScrollView>
      </View>
    );
  }
}
