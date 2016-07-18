'use strict'

var React = require('react-native');
var Headernav = require('../common/headernav');
var {
  View,
  Component,
  Text,
  WebView,
  TextArea,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  ScrollView
} = React;

var commonstyle = require('../../styles/commonstyle');
var styles = require('../../styles/matchstyle');

let htmlStr = '<p class="MsoNormal" style="text-align:center;" align="center">\
	<a name="OLE_LINK2"></a><a name="OLE_LINK1"></a><span><b><span style="font-family:宋体;">隐私协议 <span></span></span></b></span>\
</p>\
<p class="MsoNormal" style="text-align:center;" align="center">\
	<span><span><b><span style="font-family:宋体;">&nbsp;</span></b></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span><span><span style="line-height:150%;font-family:宋体;color:#333333;">本隐私协议是用户（以下简称“您”）与氦<span>7</span>平台（以下简称“本站”）之间就</span></span></span><span><span><span style="line-height:150%;font-family:宋体;">隐私相关规定所做的约定。随着我站服务范围的扩大，我们会随时更新我们的隐私协议。为使您能放心使用本站的各项服务，本站将严格遵守有关保护个人信息的法律法规。<span></span></span></span></span>\
</p>\
<span></span><span></span> \
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>1</span>条 个人信息的定义</span><span style="line-height:150%;font-family:宋体;"> <span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">在本隐私协议中记述的<span>“</span>个人信息<span>”</span>指您在本站进行注册、浏览、上传信息、享受服务、评价、参加活动等行为时，的会员账号、密码、姓名、性别、肖像、邮件地址、电话、通信地址、身份证号码、服务详情、评价或反馈、投诉内容、<span>cookies</span>等信息，通过其中的一个或几个信息的组合即能识别特定个人的信息。 <span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>2</span>条 个人信息的真实性<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">您应自行诚信向本站提供注册资料，您保证提供的注册资料真实、准确、完整、合法有效，您的注册资料如有变动的，应及时更新其注册资料。如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且本司保留单方终止您使用本司各项服务的权利。 <span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>3</span>条 个人信息的收集和使用<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">3.1</span><span style="line-height:150%;font-family:宋体;">本站有权从会员管理、调查问卷、提供服务、开展活动、完成良好的客户体验等多种角度收集您的个人信息，并将对其中涉及个人隐私信息予以严格保密，除非得到您的授权、为履行强行性法律义务（如国家安全机关指令）或法律另有规定、本注册协议或其他条款另有约定外，本站不会向外界披露您的隐私信息。 <span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">3.2</span><span style="line-height:150%;font-family:宋体;">您同意：本司拥有通过邮件、短信、电话、网站通知或声明等形式，向在本站注册用户发送与本站服务有关信息的权利。如您不希望接收上述信息，可退订。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">3.3</span><span style="line-height:150%;font-family:宋体;">您同意：根据法律法规及司法、行政机关的强制性要求，本司有权使用您的注册信息、用户名、密码等信息，登陆进入您的注册账户，进行证据保全，包括但不限于公证、见证、协助司法机关进行调查取证等。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">3.4</span><span style="line-height:150%;font-family:宋体;">您一旦接受本协议，即表明您主动将您在任何时间段在本站发表的任何形式的信息内的财产性权利等任何可转让的权利等，全部独家且不可撤销地转让给本司所有，您同意本司有权就任何主体侵权而单独提起诉讼。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">3.5\
APP</span><span style="line-height:150%;font-family:宋体;">中“排行”功能会收集并上传您的对战数据、战斗力数据及氦气数据到我们的服务器中，用于名次排名。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>4</span>条 账户使用<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;">您不得将在本站注册获得的账号、密码等账户信息提供给他人使用，即您的账户只限您个人使用，禁止赠与、借用、租用、转让、售卖及其他任何非本人操作，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任，本站有权在未经通知的情况下回收该账号而无需向该账号使用人承担法律责任，由此带来的包括并不限于用户通讯中断、用户资料和道具等清空等损失由用户自行承担。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>5</span>条 外部链接</span><span style="line-height:150%;font-family:宋体;"></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">本站含有到其他网站的链接，且我们可能在任何需要的时候增加商业伙伴或共用品牌的网站，但本站对外链网站的隐私保护措施不负任何责任。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>6</span>条 </span><span style="line-height:150%;font-family:宋体;">个人信息的公开、修改、删除<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">本站将按照中华人民共和国相关法律法规对个人信息进行公开、修改、删除的相关处理。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>7</span>条 权利维护<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">如您发现本网站其他用户有侵犯您的姓名权、肖像权\、隐私权、著作权、账号被盗或其他合法权益现象的，请及时与本网站联系并附加相关权利证明文件，以便本网站及时作出处理，维护您的合法权益。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>8</span>条 管辖<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">本协议的订立、执行和解释及争议的解决均适用在中华人民共和国大陆地区适用之有效法律。如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其他条款继续有效。如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向本站住所地法院提起诉讼。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;" align="left">\
	<span style="line-height:150%;font-family:宋体;">第<span>9</span>条 有关隐私保护政策的更新 <span></span></span>\
</p>\
<p class="MsoNormal" style="text-indent:21.0pt;">\
	<span style="line-height:150%;font-family:宋体;">本站为适应法律法规的变更或按照需要将不时改订隐私保护政策，以保护个人信息，改订后，我们将登载最新的隐私协议。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-indent:21.0pt;">\
	<span style="line-height:150%;font-family:宋体;">第<span>10</span>条 本协议未做约定的，以本站的《用户注册及服务协议》约定为准。<span></span></span><br /><br />\
</p>'
export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      matchdata:{},
      messages: [],
      scalingEnabled: true,
    }
  }
  componentWillMount(){
    this.setState(
      {
      }

    );
  }

  render(){
    return (
      <View>
        <Headernav screenTitle={'隐私协议'}  navigator={this.props.navigator}/>
        <View style={commonstyle.bodyer}>
       <WebView
         source={{html: htmlStr}}
         scalesPageToFit={true}
         />
        </View>
      </View>
    );
  }
}
