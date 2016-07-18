'use strict';
/**
 * APP 创建战队
 * @author Drex
 */
import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import Header from '../common/headernav';
import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/teamstyle';
import TeamService from '../../network/teamservice';
import Toast from '@remobile/react-native-toast';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      imgnull: 0,
      value:'',
      jsonvalue:'',
      creater:0,
      teamname:'',
      navigator: undefined,
      isUsed: false,
      defaultTeamName:'请输入战队名称',
      defaultTeamLogo: 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png',
    }

  }
  componentWillMount() {
    // this.props.previousCallback();
  }
  selectPhotoTapped() {
      let options = {
          title: '选择照片',
          cancelButtonTitle: '取消',
          takePhotoButtonTitle: '拍照',
          chooseFromLibraryButtonTitle: '从相册选择',
          quality: 1,
          maxWidth: 300,
          maxHeight: 300,
          allowsEditing: true,
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
            value: source,
            jsonvalue:response.data,
            imgnull:1,
          });
        }
      });
    }
  _callback(){
    let teamData={
    'creater':this.state.creater,
    'teamname':this.state.teamname,
    'teamlogo':this.state.jsonvalue,
    'teamtype':'DOTA2',
    };
    if(teamData.teamname==''){
      Toast.showShortCenter('请填写战队名称');
      return;
    }else if(teamData.teamlogo==''){
      Toast.showShortCenter('请上传战队图片');
      return;
    }else{
      TeamService.createTeam(teamData,(response)=>{
        // console.log(response[0].MessageCode);
        if(response[0].MessageCode == '0'){
          Toast.show('创建成功');
          this.timer = setTimeout(()=>{
              this.props._callback('TeamInfo');
              // this.props.previousCallback();
              if(this.props.updateLoginState){
                this.props.updateLoginState();
              }
              if(this.props.fightCallback){
                this.props.fightCallback();
              }
             if(this.props.navigator.getCurrentRoutes().length>3){
               var route =this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-3];
               this.props.navigator.jumpTo(route);
             }else{
                 this.props.navigator.pop();
             }
            },1000);
        }else if(response[0].MessageCode=='20001'){
          Toast.showShortCenter('已经存在同名的战队');
        }
        else {
          Toast.showShortCenter('创建失败');
        }
      });
    }

  }
  renderteamimg(){
    if(this.state.imgnull==0){
      return(
        <View>
          <TouchableOpacity onPress={()=> this.selectPhotoTapped()} style={commonstyle.viewcenter} activeOpacity={0.8}>
            <Text style={[commonstyle.gray, commonstyle.fontsize22]}>+</Text>
            <Text style={commonstyle.gray}>添加战队头像</Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View>
          <TouchableOpacity onPress={()=> this.selectPhotoTapped()} style={commonstyle.viewcenter} activeOpacity={0.8}>
            <Image style={styles.teamcreateportrait} source={{uri:this.state.value||'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
          </TouchableOpacity>
        </View>
      );
    }
  }
  componentDidMount(){
      this.setState({
        navigator: this.props.navigator,
        creater:this.props.userData.UserID,
      });
  }

  render() {
    let teamimg = this.renderteamimg();
    return(
      <View>
        <Header screenTitle='创建战队' isPop={true} iconText='完成' callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={styles.teamcreate}>
            <View style={styles.teamcreateimg}>{teamimg}</View>
            <View style={[commonstyle.btnborderred, styles.teamcreateinput]}>
            <TextInput placeholder={'请输入战队名称'} placeholderTextColor={'#484848'} maxLength={8} style={[commonstyle.cream, styles.teamcreateinputfont]} onChangeText={(text) => this.setState({teamname: text})} />
            </View>
            <View style={commonstyle.viewleft}>
              <Text style={commonstyle.gray}>温馨提示：</Text>
              <Text style={commonstyle.gray}>您的战队战队创建完成后，将会有一次更改名称及战队LOGO的机会</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
