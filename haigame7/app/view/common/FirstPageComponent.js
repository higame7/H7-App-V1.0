import React, {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

import SecondPageComponent from './SecondPageComponent';
import B from './ThirdPage';
import C from './SecondPage_1';
export default class FirstPageComponent extends React.Component {

  //在组件类创建的时候调用一次，然后返回值被缓存下来。全局调用一次，所有实例共享。
  //es6: defaultProps es5: getDefaultProps
  //es6 这两个属性不能写在class内。
  // FirstPageComponent.propTypes={//属性校验器，表示改属性必须是bool，否则报错
  //   title: React.PropTypes.bool,
  // }
  // FirstPageComponent.defaultProps={title:'133'};//设置默认属性
  //在组件挂载之前调用一次。返回值将会作为 this.state 的初始值
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      user: null,
      data:{'name':'小怪兽'},
      updateFn: this.upFn.bind(this)
    };
  }
  componentWillReceiveProps(nextProps) {
  }
  //在初始化渲染执行之前立刻调用
  // componentWillMount() {
  //   console.log("渲染之前 componentWillMount");
  // }
  componentDidMount() {
    this.upFn()
  }
  //
  // //在组件接收到新的 props 的时候调用，也就是父组件修改子组件的属性时触发。在初始化渲染的时候，该方法不会调用。可以用于更新 state 来响应某个 prop 的改变。
  // componentWillReceiveProps(nextProps) {
  //   console.log("firs page receive // componentWillMount");
  //   console.log(nextProps);
  // }



 upFn() {
   let data = {'name':'凹凸曼'}
   setTimeout(() => {
     console.log('开始更新');
     this.setState({
       data: data
     })
   },3000)
 }
  _pressButton(){
    //const { navigator } = this.props;
    var _this = this;
    const navigator = this.props.navigator;
    // ToastAndroid.show('提示的信息', ToastAndroid.SHORT);
    if(navigator) {
      navigator.push({
        name: 'SecondPageComponent',
        component: SecondPageComponent,
        params: {
          ...this.state,
          getUser(user) {
            _this.setState({
              user: user
            })
          }
        }
      })
    }
  }

  render() {
    if( this.state.user ) {
      return(
              <View>
                  <Text>用户信息: { JSON.stringify(this.state.user) }</Text>
                  <Text>{ this.state.woqu.name }</Text>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                      <Text>点我跳转</Text>
                    </TouchableOpacity>
              </View>
          );
    }else{
      return (
        <View>
          <View><Text>点我跳转</Text></View>
          <View><Text>点我跳转</Text></View>
          <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text>点我跳转</Text>
          </TouchableOpacity>
          <B name={this.state.data.name}/>
          <C name={this.state.data.name}/>
        </View>
      )
    }
  }
}
