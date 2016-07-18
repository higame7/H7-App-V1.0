'use strict';
/**
 * APP 编辑战队
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
  constructor(props) {
    super(props);
    this.state = {
      imgnull: 0,
      value:'',
      jsonvalue:'',
      creater:0,
      TeamID: this.props.teamData.TeamID,
      TeamName:this.props.teamData.TeamName,
      TeamLogo: this.props.teamData.TeamLogo,
      TeamDescription: this.props.teamData.TeamDescription,
      teamname:'',
      navigator: undefined,
      isUsed: false,
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
          imgnull:1,
          showLogo: response.data,
          TeamLogo: source,
        });
      }
    });
  }
  _callback(){
    let property = this.props.screenTitle;
    let value;
    if(this.state.TeamName==''){
      Toast.showShortCenter('请填写战队名称');
      return;
    }else if(this.state.TeamDescription==''){
      Toast.showShortCenter('请填写战队宣言');
      return;
    }else{
      value = {TeamID: this.state.TeamID,TeamName:this.state.TeamName,TeamLogo: this.state.imgnull==1? this.state.showLogo: '',TeamDescription: this.state.TeamDescription,};
    };
    this.props.setProperty(value);
    if(this.props.navigator) {
       this.props.navigator.pop();
    }
  }
  componentDidMount(){
    this.setState({
      navigator: this.props.navigator,
      creater:this.props.userData.UserID,
    });
  }

  render() {
    return(
      <View>
        <Header screenTitle='编辑战队' isPop={true} iconText='完成' callback={this._callback.bind(this)} navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
          <View style={styles.teamcreate}>
            <View style={styles.teamcreateimg}>
              <TouchableOpacity style={commonstyle.viewcenter} activeOpacity={0.8} onPress={()=> this.selectPhotoTapped()}>
                <Image style={styles.teamcreateportrait} source={{uri:this.state.TeamLogo}} />
              </TouchableOpacity>
            </View>
            <View style={[commonstyle.btnborderred, styles.teamcreateinput]}>
            <TextInput placeholder={'请输入战队名称'} defaultValue={this.state.TeamName} placeholderTextColor={'#484848'} maxLength={8} style={[commonstyle.cream, styles.teamcreateinputfont]} onChangeText={(text) => this.setState({TeamName: text})} />
            </View>
            <View style={[commonstyle.btnborderred, styles.teamcreateinput]}>
            <TextInput placeholder={'请输入战队宣言'} defaultValue={this.state.TeamDescription} placeholderTextColor={'#484848'} maxLength={16} style={[commonstyle.cream, styles.teamcreateinputfont]} onChangeText={(text) => this.setState({TeamDescription: text})} />
            </View>
            <View style={commonstyle.viewleft}>
              <Text style={commonstyle.gray}>温馨提示：战队宣言请限制在16个字以内！</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
