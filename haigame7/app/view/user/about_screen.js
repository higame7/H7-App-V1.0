'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Linking,
  View,
  ScrollView,
  Navigator,
  Image,
  TouchableOpacity
} from 'react-native';

import commonstyle from '../../styles/commonstyle';
import styles from '../../styles/userstyle';
import Header from '../common/headernav'; //导航有问题
import Help from './help_screen';
import Toast from '@remobile/react-native-toast';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Iconfont';
import Button from 'react-native-button';
import UserServiceAgreement from './user_service_agreement';
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }

  _help() {
    Toast.show('帮助反馈');
  }
  _update() {
    ToastAndroid.show('检查版本更新',ToastAndroid.SHORT);
  }
  _website() {
    Toast.show('正在建设...');
    return;
    let url = "http://sso.haigame7.com";
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  _userAgreement() {
    Toast.show('用户协议');
  }
  _openModa() {
    this.setState({isOpen: true});
  }
  _closeModa() {
     this.setState({isOpen: false});
  }
  _showServiceAgreement(){
    this.props.navigator.push({
      name: '用户注册及服务协议',
      component: UserServiceAgreement,
      params:{
        data:this.state.data,reset:false
      },
      sceneConfig:Navigator.SceneConfigs.FloatFromBottom});
  }
  _agreementView(){
    return(
      <Modal isOpen={this.state.isOpen}  swipeToClose={false} onClosed={this._closeModa.bind(this)} style={[commonstyle.modal, commonstyle.modalbig]} position={"top"} >
        <View style={commonstyle.modaltitle}>
          <Text style={[commonstyle.cream, commonstyle.fontsize14]}>用户协议</Text>
        </View>
        <ScrollView style={commonstyle.modalbody}  showsVerticalScrollIndicator={true} >
          <View style={commonstyle.modalbodybottom}>
            <Text style={[commonstyle.cream, commonstyle.fontsize12]}>
             {'第1条 本站服务条款的确认和接纳\n\n'}
             {'1.1您同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。您确认：本协议条款是处理双方权利义务的依据，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定或约定。\n\n'}
             {'1.2您点击同意本协议的，即视为您确认自己具有享受本站服务相应的权利能力和行为能力，能够独立承担法律责任。\n\n'}
             {'1.3您确认，如果您在18周岁以下，您只能在父母或其他监护人的监护参与下才能使用本站；您一经注册确认，即视为您的监护人同意您的相关行为。\n\n'}
             {'1.4您使用本站提供的服务时，应同时接受适用于本站特定服务、活动等的准则、条款和协议（以下统称为“其他条款”）；如果以下使用条件与“其他条款”有不一致之处，则以“其他条款”为准。\n\n'}
             {'1.5本司通过互联网依法为您提供本网站内容相关的服务，您在完全同意本协议及本站相关规定的情况下，方有权使用本站的相关服务。\n\n'}
             {'1.6您必须自行准备如下设备和承担如下开支：\n\n'}
             {'1.6.1上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；\n\n'}
             {'1.6.2上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。\n\n'}
             {'1.6.3因使用本网站服务而需要您自行承担的其他费用。\n\n'}
             {'第2条 所有权及知识产权条款\n\n'}
             {'2.1本站所刊登的所有内容（包括但不限于视频、音频、声音文件片段、文字、图表、商标、logo、标识、按钮图标、图像、数字下载、数据编辑和软件等），以及提供的各项服务，均由本司享有著作权、商标权、专利权、所有权、运作权及其他合法权益，或者取得权利人的授权，本站所有内容均受中国和国际相关版权法规、公约等的保护，未经本司书面许可，任何第三方无权将上述资料信息下载、转载、复制、出版、发行、公开展示、编码、翻译、传输或散布至任何其他计算机、服务器、网站或其他媒介。本站上所有内容的汇编是本司的排他财产，受中国和国际版权法的保护。本站上所有软件都是本司或关联公司的财产，受中国和国际版权法的保护。您不得鼓励、协助或授权任何其他人复制、修改、反向工程、反向编译或反汇编、拆解或者试图篡改全部或部分软件，或利用软件创设衍生产品。\n\n'}
             {'2.2本司有权不时地对本协议及本站的内容进行修改，并在本站张贴，无须另行通知您。在法律允许的最大限度范围内，本司对本协议及本站内容拥有解释权。\n\n'}
             {'2.3您一旦接受本协议，即表明您主动将您在任何时间段在本站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利）等，全部独家且不可撤销地转让给本司所有，您同意本司有权就任何主体侵权而单独提起诉讼。\n\n'}
             {'2.4如您发现本网站其他用户有侵犯您的姓名权、肖像权、隐私权、著作权或其他合法权益现象的，请及时与本网站联系并附加相关权利证明文件，以便本网站及时作出处理，维护您的合法权益。\n\n'}
             {'第3条 用户信息收集及保护\n\n'}
             {'3.1您应自行诚信向本站提供注册资料，您保证提供的注册资料真实、准确、完整、合法有效，您的注册资料如有变动的，应及时更新其注册资料。如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且本司保留单方终止您使用本司各项服务的权利。\n\n'}
             {'3.2您在本站进行注册、浏览、享受服务、评价、参加活动等行为时，涉及您真实姓名/名称、通信地址、联系电话、电子邮箱、服务详情、评价或反馈、投诉内容、cookies等信息的，本站有权从提供服务、开展活动、完成良好的客户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保密，除非得到您的授权、为履行强行性法律义务（如国家安全机关指令）或法律另有规定、本注册协议或其他条款另有约定外，本站不会向外界披露您的隐私信息。\n\n'}
             {'3.3您注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定更改您的密码。您应谨慎合理的保存、使用您的账户信息。您若发现任何非法使用您的账户或其他存在安全漏洞的情况的，请立即通知本站并向公安机关报案。\n\n'}
             {'3.4您同意：本司拥有通过邮件、短信、电话、网站通知或声明等形式，向在本站注册用户发送与本站服务有关信息的权利。如您不希望接收上述信息，可退订。\n\n'}
             {'3.5您不得将在本站注册获得的账号、密码等账户信息提供给他人使用，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任。\n\n'}
             {'3.6您同意：根据法律法规及司法、行政机关的强制性要求，本司有权使用您的注册信息、用户名、密码等信息，登陆进入您的注册账户，进行证据保全，包括但不限于公证、见证、协助司法机关进行调查取证等。\n\n'}
             {'第4条 用户依法言行义务\n\n'}
             {'本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：\n\n'}
             {'4.1不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论； \n\n'}
             {'4.2从中国大陆向境外传输资料信息时必须符合中国有关法律法规；\n\n'}
             {'4.3不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；\n\n'}
             {'4.4不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；\n\n'}
             {'4.5不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；\n\n'}
             {'4.6不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；\n\n'}
             {'4.7不得教唆他人从事本条所禁止的行为；\n\n'}
             {'4.8除本注册协议、其他条款或另有其他约定外，您不得利用在本站注册的账户进行经营活动、牟利行为及其他未经本站许可的行为。\n\n'}
             {'4.9您不得利用任何非法手段获取其他用户个人信息，不得将其他用户信息用于任何营利或非营利目的，不得泄露其他用户或权利人的个人隐私，不得干扰其他用户的正常合法行为，否则本司有权采取本协议规定的合理措施制止您的上述行为，情节严重的，将提交公安机关进行刑事立案。\n\n'}
             {'4.10您不得发布任何侵犯他人著作权、商标权等知识产权或其他合法权利的内容；如果有其他用户或权利人发现您发布的信息涉嫌知识产权、或其他合法权益争议的，这些用户或权利人有权要求本司删除您发布的信息，或者采取其他必要措施予以制止，本司将会依法采取这些措施。\n\n'}
             {'4.11您应不时关注并遵守本站不时公布或修改的各类规则规定。本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知您的权利。\n\n'}
             {'4.12若您未遵守以上规定的，本站有权做出独立判断并采取暂停或关闭您的账号、停止服务等措施。您须对自己在网上的言论和行为承担法律责任。\n\n'}
             {'第5条 责任限制及不承诺担保\n\n'}
             {'5.1除非另有明确的书面说明,本站及其所包含的或以其他方式通过本站提供给您的全部信息、内容、材料和服务，均是在“按现状”和“按现有”的基础上提供的。\n\n'}
             {'5.2除非另有明确的书面说明,本司不对本站的运营及其包含在本站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。\n\n'}
             {'5.3本司不担保本站所包含的或以其他方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。\n\n'}
             {'5.4如因不可抗力或其他本站无法控制的原因使本站销售系统崩溃或无法正常使用导致无法提供服务等，本司会合理地尽力协助处理善后事宜。\n\n'}
             {'5.5您应对账户信息及密码承担保密责任，因您未能尽到信息安全和保密责任而致使您的账户发生任何问题的，您应承担全部责任。同时，因网络环境存在众多不可预知因素，因您自身终端网络原因（包括但不限于断网、黑客攻击、病毒等）造成您的本司账户或个人信息等被第三方窃取的，本司不承担赔偿责任。\n\n'}
             {'5.6您了解并同意，本司有权应国家有关机关的要求，向其提供您在本司的用户信息和服务记录等必要信息。如您涉嫌侵犯他人合法权益，则本司有权在初步判断涉嫌侵权行为可能存在的情况下，向权利人提供您必要的个人信息。\n\n'}
             {'第6条 协议更新及用户关注义务\n\n'}
             {'根据国家法律法规变化及网站运营需要，本司有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。您可随时登陆查阅最新协议；您有义务不时关注并阅读最新版的协议、其他条款及网站公告。如您不同意更新后的协议，可以且应立即停止接受本司网站依据本协议提供的服务；如您继续使用本站提供的服务的，即视为同意更新后的协议及公告等内容。本司建议您在使用本站之前阅读本协议及本站的公告。 如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。 \n\n'}
             {'第7条 法律管辖和适用\n\n'}
             {'本协议的订立、执行和解释及争议的解决均适用在中华人民共和国大陆地区适用之有效法律。如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其他条款继续有效。如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向本司住所地法院提起诉讼。\n\n'}
             {'第8条 其他 \n\n'}
             {'8.1本司网站所有者是指在政府部门依法许可或备案的本司网站经营主体。\n\n'}
             {'8.2本司尊重您的合法权利，本协议及本站上发布的各类规则、声明、服务政策等其他内容，均是为了更好的、更加便利的为您提供服务。本站欢迎您和社会各界提出意见和建议，本司将虚心接受并适时修改本协议及本站上的各类规则。\n\n'}


            </Text>
          </View>
        </ScrollView>
        <View style={[commonstyle.row, commonstyle.modalbtn]}>
          <Button containerStyle={[commonstyle.col1, commonstyle.modalbtnfont, commonstyle.btnredwhite]} style={commonstyle.white} activeOpacity={0.8} onPress={this._closeModa.bind(this)} >关闭</Button>
        </View>
      </Modal>
    );
  }

  _toNextScreen(params){
     // Toast.show("this is a message")
     let _this = this;
     this.props.navigator.push({
       name: params.name,
       component: params.component,
       sceneConfig:params.sceneConfig || undefined,
       params: {
         ...this.props,
       }
     })
   }
  render() {
    return(
      <View >
        <Header screenTitle='关于H7'  navigator={this.props.navigator}/>
        <Image source={require('../../images/loginbg.jpg')} style={styles.loginbg} resizeMode={"cover"} >
          <ScrollView style={[commonstyle.bodyer, {backgroundColor: 'rgba(0, 0, 0, 0)',}]}>
            <View activeOpacity = {1} style = {styles.logo}>
              <Image style = {{width: 80, height: 80, }} source = { require('../../images/logo.png') }/>
            </View>
            <View style={styles.abouttext}>
              <Text style={commonstyle.cream}>        氦7互娱，以不分等级、不看背景、全民电竞、全民娱乐为宗旨，力争打造全国最优秀的非职业电子竞技约战平台。为广大电子竞技爱好者提供一个全新的以促进电竞社交、分享电竞经验、提高电竞水平为目的的互动交流平台。</Text>
              <Text style={commonstyle.cream}>        氦7互娱以草根电竞、全民电竞的理念为基础，致力为中国电竞崛起做贡献，为中国职业电竞输送人才，传播电竞正能量。</Text>
              <Text style={commonstyle.cream}>        氦7互娱始终坚持以“诚信、创新、沟通”为团队宗旨，服务于中国电子竞技行业。奉行“质量第一，信誉第一”的原则。开拓创新，积极进取，做中国最好的电子竞技约战平台。</Text>
              <Text style={commonstyle.cream}>        氦7互娱更是会不定期的举办各种赛事。最专业、最权威，是我们的比赛理念。</Text>
              <Text style={commonstyle.cream}>        电竞已经成为时尚，电竞已经成为风向。热爱电竞执着电竞的玩家，氦7互娱将帮助你完成梦想，实现价值！</Text>
              <Text style={commonstyle.cream}>        如果你对我们感兴趣，也是热爱电竞的小伙伴，可以联系我们。</Text>
              <Text style={commonstyle.cream}>        我们的联系方式：yoyo.liu@haigame7.com</Text>
              <Text style={commonstyle.cream}>        问题交流反馈QQ群：2932308448</Text>
            </View>

            <View style={[styles.listview, {backgroundColor: 'rgba(0, 0, 0, 0)',}]}></View>
            <TouchableOpacity style={[styles.listview, {backgroundColor: 'rgba(0, 0, 0, 0)',}]} activeOpacity={0.8}  onPress={this._toNextScreen.bind(this,{"name":"帮助与反馈","component":Help})}>
              <Text style={styles.listviewtextleft}>帮助与反馈</Text>
              <View style={styles.listviewtextbox} ></View>
              <Icon name="angle-right" size={20} color={'#484848'} style={styles.listviewiconright} />
            </TouchableOpacity>


            <View style={commonstyle.row}>
              <TouchableOpacity style={styles.aboutbtn} onPress={this._website.bind(null,this)}>
                <Text style={commonstyle.red}>官方网站</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.aboutbtn} onPress={this._showServiceAgreement.bind(this)}>
                <Text style={commonstyle.red}>用户协议</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.listbox, {backgroundColor: 'rgba(0, 0, 0, 0)',}]}></View>
            <View style={[styles.listbox, {backgroundColor: 'rgba(0, 0, 0, 0)',}]}></View>
          </ScrollView>
        </Image>
      </View>
    );
  }
}
