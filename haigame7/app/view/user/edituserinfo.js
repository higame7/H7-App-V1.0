'use strict'

import React,
{
  View,
  Component,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var Header = require('../common/headernav');
import Toast from '@remobile/react-native-toast';
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: this.props.userdata,
      iconText: '完成',
      value: '', //存储变更数据用
      imgSrc: '' //更改头像临时存储使用
    }
  }

  componentDidMount(){
    if (this.props.screenTitle == '头像'){

    }
    switch (this.props.screenTitle) {
      case '头像':
        this.setState({
          iconText: '',
          imgSrc: this.props.userdata.UserWebPicture
        })
        break;
      case '昵称':
        this.setState({
          value: this.props.userdata.UserWebNickName
        })
        break;
      case '个性签名':
        this.setState({
          value: this.props.userdata.Hobby
        })
        break;
      default:

    }
  }

  _callback() {
    let property = this.props.screenTitle;
    let value;
    switch (property) {
      case '昵称':
        value = this.state.value;
        if(value == '' || value.indexOf(" ") >=0){
          Toast.showShortCenter("用户名不能为空！");
          return;
        }else{
          break;
        }
      case '个性签名':
        value = this.state.value;
        if(value == '' || value.indexOf(" ") >=0){
          Toast.showShortCenter("个性签名不能为空！");
          return;
        }else{
          break;
        }
      case '手机号':
        value = this.state.value;
      case '头像':
        this.selectPhotoTapped.bind(this)
        value = this.state.value;
      default:
        break;
    }
    if (property != '头像' || this.state.iconText == '确定'){
      this.props.setProperty(property,value);
      if(this.props.navigator) {
         this.props.navigator.pop();
      }
    }
  }
  selectPhotoTapped() {
      let options = {
          title: '选择照片',
          cancelButtonTitle: '取消',
          takePhotoButtonTitle: '拍照',
          chooseFromLibraryButtonTitle: '从相册选择',
          maxWidth: 300,
          maxHeight: 300,
          quality: 1,
          allowsEditing: true,
          storageOptions: {
            skipBackup: true
          }
        };

      ImagePickerManager.showImagePicker(options, (response) => {
        // console.log('Response = ', response);

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
          // let source = {uri: response.uri.replace('file://', ''), isStatic: true};
          // let data = this.state.userdata;
          //这里出发了上个界面的componentWillReceiveProps 传入了新的props
          // data['UserWebPicture'] = data //这里就是这里,搞好了可就爽了
          
          this.setState({
            value: response.data,
            iconText: '确定',
            imgSrc: source,
          });
        }
      });
    }
  render() {
    // let childScreen = (
    //   <View>
    //     <Text></Text>
    //   </View>
    // )

    let childScreen;
    switch (this.props.screenTitle) {
      case '昵称':
          childScreen = (
            <View style={[styles.infoinput,{height:40}]}>
              <TextInput style={[commonstyle.cream, styles.infoinputfont,{fontSize:15}]} placeholder={'最多输入8个字符'} placeholderTextColor={'#C3C3C3'} maxLength={8} onChangeText={(text) => this.setState({value: text})} defaultValue={this.state.userdata.UserWebNickName}/>
            </View>
          )
        break;
      case '个性签名':
          childScreen = (
            <View style={[styles.infoinput,{height:40}]}>
              <TextInput style={[commonstyle.cream, styles.infoinputfont,{height:40,fontSize:15}]} placeholder={'最多输入16个字符'} placeholderTextColor={'#C3C3C3'} onChangeText={(text) => this.setState({value: text})} defaultValue={this.state.userdata.Hobby}/>
            </View>
          )
        break;
      case '头像':
          childScreen = (
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={styles.avatarblock}>
              { this.state.UserWebPicture === null ? <Text>Select a Photo</Text> :
                <Image style={styles.avatar} source={{uri: this.state.imgSrc || 'http://images.haigame7.com/logo/20160216133928XXKqu4W0Z5j3PxEIK0zW6uUR3LY=.png'}} />
              }
              </View>
            </TouchableOpacity>
          )
      default:
        break;
    }

    return(
      <View>
        <Header screenTitle={this.props.screenTitle}  iconText={this.state.iconText} navigator={this.props.navigator} callback={this._callback.bind(this)}/>
        <View style={commonstyle.bodyer}>{childScreen}</View>
      </View>
    );
  }
}
