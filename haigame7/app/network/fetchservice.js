'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import GlobalSetup from '../constants/globalsetup';
/** 网络请求 */
export default{

  status(response) {
    if(response.status >= 200 && response.status <=300) {
      return Promise.resolve(response);
    } else {
      Toast.show('网络请求错误');
      return Promise.reject(new Error(response.statusText));
    }
  },

  json(response) {
    return response.json();
  },

  /*************************
   * 请求头                 *
   * @return {TokenHeader] *
   * @author aran.hu
   *************************/
  getTokenHeader() {
    let tHeader = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    return tHeader;
  },

  /**
   * Get 方法可以用
   * @param  {[type]} api [path]
   * @param  {[type]} v   [params]
   * @return {[type]}     [description]
   */
  _api(api, params){
  	if(v instanceof Object){
  		var p = Object.keys(params).map(function(k) {
  			return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
  		}).join('&');
  	}else if(params){
  		var p = params;

    }else{
      var p ='';
  	}
    // var _url = GlobalSetup.API_CONFIG.API_PATH + api + '?access_token=' + GlobalSetup.API_CONFIG.ACCESS_TOKEN + '&' + p;
    // console.log('网络请求' + _url);
  	return '';
  },


/**
 * Post Fecth Request
 * @param  {[string]} url=''            [Request Url]
 * @param  {[map]} params_map=new Map() [Params Map] e.g {'name','aran.hu'}
 * @return {
 *         success: Fecth Response && Fecth Data
 *         fail: FailMsg
 * }
 * @author aran.hu
 */
  postFecth(url,params,callback) {
    // ToastAndroid.show(JSON.stringify(params), ToastAndroid.SHORT);
    // return '';
    // console.log(this.getTokenHeader());
    // console.log(url);
    // ToastAndroid.show('开始请求', ToastAndroid.SHORT);
    // ToastAndroid.show(url, ToastAndroid.SHORT);
    // return '';
    return(
      fetch(url,{
        method: 'POST',//RESTFUL API
        headers: this.getTokenHeader(),
        body: JSON.stringify(params)
      })
      .then(this.status)
      .then(this.json)
      .then((responseText) => {
        // console.log(responseText);
        callback(responseText)
      })
      .catch((error) => {
        // throw error;
        callback(GlobalSetup.REQUEST_FAIL);
      })
    )
  },

  /**
   * Get Fetch Request
   * @param  {[type]} url: string        [请求URL]
   * @return {[type]}      [description]
   */
  getFetch(url: string) {
    fetch(url)
    .then((response) => response.json())
    .then((responseText) =>{
      callback(responseText)
    })
    .catch((error) => {
      Toast.show(error);
      throw new Error(error);
    })
    .done()
  },

}
