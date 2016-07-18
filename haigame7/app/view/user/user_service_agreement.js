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

let htmlStr = '<p class="MsoNormal" style="text-align:center;text-indent:21.1pt;background:white;" align="center">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">用户注册及服务协议</span></b><b><span style="line-height:150%;font-family:宋体;color:red;"></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">本协议是用户（以下简称“您”）与氦<span>7</span>平台（以下简称“本站”）及本站所有者北京昶冠文化传媒有限公司（以下简称“本司”）及其关联公司之间就用户注册及本站服务等相关事宜所订立的合同，请您仔细阅读本注册协议，您点击<span>"</span>同意并继续<span>"</span>按钮后，即视为您接受并同意遵守本协议的约定。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>1</span>条 本站服务条款的确认和接纳<span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">您同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。您确认：本协议条款是处理双方权利义务的依据，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定或约定。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.2</span><span style="line-height:150%;font-family:宋体;color:#333333;">您点击同意本协议的，即视为您确认自己具有享受本站服务相应的权利能力和行为能力，能够独立承担法律责任。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.3</span><b><i><u><span style="line-height:150%;font-family:宋体;color:#333333;">您确认，如果您在<span>18</span>周岁以下，您只能在父母或其他监护人的监护参与下才能使用本站；您一经注册确认，即视为您的监护人同意您的相关行为。</span></u></i></b><span style="line-height:150%;font-family:宋体;color:#333333;"></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.4</span><span style="line-height:150%;font-family:宋体;color:#333333;">您使用本站提供的服务时，应同时接受适用于本站特定服务、活动等的准则、条款和协议（以下统称为“其他条款”）；如果以下使用条件与“其他条款”有不一致之处，则以“其他条款”为准。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.5</span><span style="line-height:150%;font-family:宋体;color:#333333;">本司通过互联网依法为您提供本网站内容相关的服务，您在完全同意本协议及本站相关规定的情况下，方有权使用本站的相关服务。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.6</span><span style="line-height:150%;font-family:宋体;color:#333333;">您必须自行准备如下设备和承担如下开支：<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.6.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.6.2</span><span style="line-height:150%;font-family:宋体;color:#333333;">上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">1.6.3</span><span style="line-height:150%;font-family:宋体;color:#333333;">因使用本网站服务而需要您自行承担的其他费用。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>2</span>条 所有权及知识产权条款<span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">2.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">本站所刊登的所有内容（包括但不限于视频、音频、声音文件片段、文字、图表、商标、<span>logo</span>、标识、按钮图标、图像、数字下载、数据编辑和软件等），以及提供的各项服务，均由本司享有著作权、商标权、专利权、所有权、运作权及其他合法权益，或者取得权利人的授权，本站所有内容均受中国和国际相关版权法规、公约等的保护，未经本司书面许可，任何第三方无权将上述资料信息下载、转载、复制、</span><span style="line-height:150%;font-family:宋体;color:#333333;">出版、发行、公开展示、编码、翻译、传输或散布至任何其他计算机、服务器、网站或其他媒介</span><span style="line-height:150%;font-family:宋体;color:#333333;">。本站上所有内容的汇编是本司的排他财产，受中国和国际版权法的保护。本站上所有软件都是本司或关联公司的财产，受中国和国际版权法的保护。您不得鼓励、协助或授权任何其他人复制、修改、反向工程、反向编译或反汇编、拆解或者试图篡改全部或部分软件，或利用软件创设衍生产品。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">2.2</span><b><i><u><span style="line-height:150%;font-family:宋体;color:#333333;">本司有权不时地对本协议及本站的内容进行修改，并在本站张贴，无须另行通知您。在法律允许的最大限度范围内，本司对本协议及本站内容拥有解释权。</span></u></i></b><span style="line-height:150%;font-family:宋体;color:#333333;"></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">2.3</span><span style="line-height:150%;font-family:宋体;color:#333333;">您一旦接受本协议，即表明您主动将您在任何时间段在本站发表的任何形式的信息内的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利）等，全部独家且不可撤销地转让给本司所有，您同意本司有权就任何主体侵权而单独提起诉讼。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">2.4</span><span style="line-height:150%;font-family:宋体;color:#333333;">如您发现本网站其他用户有侵犯您的姓名权、肖像权、隐私权、著作权、账号被盗或其他合法权益现象的，请及时与本网站联系并附加相关权利证明文件，以便本网站及时作出处理，维护您的合法权益。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>3</span>条 用户信息收集及保护<span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">3.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">您应自行诚信向本站提供注册资料，您保证提供的注册资料真实、准确、完整、合法有效，您的注册资料如有变动的，应及时更新其注册资料。如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且本司保留单方终止您使用本司各项服务的权利。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">3.2</span><span style="line-height:150%;font-family:宋体;color:#333333;">您在本站进行注册、浏览、享受服务、评价、参加活动等行为时，涉及您真实姓名<span>/</span>名称、肖像、通信地址、联系电话、电子邮箱、服务详情、评价或反馈、投诉内容、<span>cookies</span>等信息的，本站有权从提供服务、开展活动、完成良好的客户体验等多种角度予以收集，并将对其中涉及个人隐私信息予以严格保密，除非得到您的授权、为履行强行性法律义务（如国家安全机关指令）或法律另有规定、本注册协议或其他条款另有约定外，本站不会向外界披露您的隐私信息<b>。<span> </span></b></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">3.3</span><span style="line-height:150%;font-family:宋体;color:#333333;">您注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定更改您的密码。您应谨慎合理的保存、使用您的账户信息。您若发现任何非法使用您的账户或其他存在安全漏洞的情况的，请立即通知本站并向公安机关报案。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">3.4</span><span style="line-height:150%;font-family:宋体;color:#333333;">您同意：本司拥有通过邮件、短信、电话、网站通知或声明等形式，向在本站注册用户发送与本站服务有关信息的权利。如</span><span style="line-height:150%;font-family:宋体;color:#404040;">您不</span><span style="line-height:150%;font-family:宋体;color:#333333;">希望接收上述信息，可退订。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">3.5</span><span style="line-height:150%;font-family:宋体;color:#333333;">您不得将在本站注册获得的账号、密码等账户信息提供给他人使用，即您的账户只限您个人使用，禁止赠与、借用、租用、转让、售卖及其他任何非本人操作，否则您应承担由此产生的全部责任，并与实际使用人承担连带责任，本站有权在未经通知的情况下回收该账号而无需向该账号使用人承担法律责任，由此带来的包括并不限于用户通讯中断、用户资料和道具等清空等损失由用户自行承担。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">3.6</span><span style="line-height:150%;font-family:宋体;color:#333333;">您同意：根据法律法规及司法、行政机关的强制性要求，本司有权使用您的注册信息、用户名、密码等信息，登陆进入您的注册账户，进行证据保全，包括但不限于公证、见证、协助司法机关进行调查取证等。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<a name="OLE_LINK2"></a><a name="OLE_LINK1"></a><span><span style="line-height:150%;font-family:宋体;">3.7 APP</span></span><span><span><span style="line-height:150%;font-family:宋体;">中“排行”功能会收集并上传您的对战数据、战斗力数据及氦气数据到我们的服务器中，用于名次排名。<span></span></span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>4</span>条 用户依法言行义务<span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">本协议依据国家相关法律法规规章制定，您同意严格遵守以下义务：<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.2</span><span style="line-height:150%;font-family:宋体;color:#333333;">从中国大陆向境外传输资料信息时必须符合中国有关法律法规；<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.3</span><span style="line-height:150%;font-family:宋体;color:#333333;">不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.4</span><span style="line-height:150%;font-family:宋体;color:#333333;">不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.5</span><span style="line-height:150%;font-family:宋体;color:#333333;">不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.6</span><span style="line-height:150%;font-family:宋体;color:#333333;">不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.7</span><span style="line-height:150%;font-family:宋体;color:#333333;">不得教唆他人从事本条所禁止的行为；<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.8</span><span style="line-height:150%;font-family:宋体;color:#333333;">除本注册协议、其他条款或另有其他约定外，您不得利用在本站注册的账户进行经营活动、牟利行为及其他未经本站许可的行为。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.9</span><span style="line-height:150%;font-family:宋体;color:#333333;">您不得利用任何非法手段获取其他用户个人信息，不得将其他用户信息用于任何营利或非营利目的，不得泄露其他用户或权利人的个人隐私，不得干扰其他用户的正常合法行为，否则本司有权采取本协议规定的合理措施制止您的上述行为，情节严重的，将提交公安机关进行刑事立案。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.10</span><span style="line-height:150%;font-family:宋体;color:#333333;">您不得发布任何侵犯他人著作权、商标权等知识产权或其他合法权利的内容；如果有其他用户或权利人发现您发布的信息涉嫌知识产权、或其他合法权益争议的，这些用户或权利人有权要求本司删除您发布的信息，或者采取其他必要措施予以制止，本司将会依法采取这些措施。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.11</span><span style="line-height:150%;font-family:宋体;color:#333333;">您应不时关注并遵守本站不时公布或修改的各类规则规定。本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知您的权利。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">4.12</span><span style="line-height:150%;font-family:宋体;color:#333333;">若您未遵守以上规定的，本站有权做出独立判断并采取暂停或关闭您的账号、停止服务等措施。您须对自己在网上的言论和行为承担法律责任。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>5</span>条 责任限制及不承诺担保<span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">5.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">除非另有明确的书面说明<span>,</span>本站及其所包含的或以其他方式通过本站提供给您的全部信息、内容、材料和服务，均是在“按现状”和“按现有”的基础上提供的。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">5.2</span><span style="line-height:150%;font-family:宋体;color:#333333;">除非另有明确的书面说明<span>,</span>本司不对本站的运营及其包含在本站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">5.3</span><span style="line-height:150%;font-family:宋体;color:#333333;">本司不担保本站所包含的或以其他方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。因软件<span>bug</span>、版本更新缺陷、第三方病毒攻击或其他原因导致的您的账号无法登陆或者出现其他数据异常，本司对此免责。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">5.4</span><span style="line-height:150%;font-family:宋体;color:#333333;">如因不可抗力或其他本站无法控制的原因使本站销售系统崩溃或无法正常使用导致无法提供服务等，本司会合理地尽力协助处理善后事宜。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">5.5</span><span style="line-height:150%;font-family:宋体;color:#333333;">您应对账户信息及密码承担保密责任，因您未能尽到信息安全和保密责任而致使您的账户发生任何问题的，您应承担全部责任。同时，因网络环境存在众多不可预知因素，因您自身终端网络原因（包括但不限于断网、黑客攻击、病毒等）造成您的本司账户或个人信息等被第三方窃取的，本司不承担赔偿责任。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">5.6</span><span style="line-height:150%;font-family:宋体;color:#333333;">您了解并同意，本司有权应国家有关机关的要求，向其提供您在本司的用户信息和服务记录等必要信息。如您涉嫌侵犯他人合法权益，则本司有权在初步判断涉嫌侵权行为可能存在的情况下，向权利人提供您必要的个人信息。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>6</span>条 协议更新及用户关注义务<span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">根据国家法律法规变化及网站运营需要，本司有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。您可随时登陆查阅最新协议；<b><i>您有义务不时关注并阅读最新版的协议、其他条款及网站公告。如您不同意更新后的协议，可以且应立即停止接受本司网站依据本协议提供的服务；如您继续使用本站提供的服务的，即视为同意更新后的协议及公告等内容。本司建议您在使用本站之前阅读本协议及本站的公告。</i></b> 如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>7</span>条 法律管辖和适用<span></span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">本协议的订立、执行和解释及争议的解决均适用在中华人民共和国大陆地区适用之有效法律。如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其他条款继续有效。如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向本司住所地法院提起诉讼。<span> </span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.1pt;background:white;" align="left">\
	<b><span style="line-height:150%;font-family:宋体;color:#333333;">第<span>8</span>条 其他<span> </span></span></b>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">8.1</span><span style="line-height:150%;font-family:宋体;color:#333333;">本司网站所有者是指在政府部门依法许可或备案的本司网站经营主体。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">8.2</span><span style="line-height:150%;font-family:宋体;color:#333333;">本司尊重您的合法权利，本协议及本站上发布的各类规则、声明、服务政策等其他内容，均是为了更好的、更加便利的为您提供服务。本站欢迎您和社会各界提出意见和建议，本司将虚心接受并适时修改本协议及本站上的各类规则。<span></span></span>\
</p>\
<p class="MsoNormal" style="text-align:left;text-indent:21.0pt;background:white;" align="left">\
	<span style="line-height:150%;font-family:宋体;color:#333333;">8.3</span><span style="line-height:150%;font-family:宋体;color:#333333;">本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请您着重阅读。<span></span></span>\
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
        <Headernav screenTitle={'注册服务协议'}  navigator={this.props.navigator}/>
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
