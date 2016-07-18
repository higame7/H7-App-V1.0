'use strict';

import FecthService from './fetchservice';
import {ToastAndroid} from 'react-native';
import ApiConfig from '../constants/apiconfig';
export default{

  /* 获取赛事列表 */
  getMatchList(callback) {
    /**
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.GETMATCHLIST,
        {},
        callback
      );
  },
  /*获取赛事主播列表*/
  getBoBoList(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.GETBOBOLIST,
        {
          'MatchID':data.matchID,
        },
        callback
      );
  },
  /*获取约战列表*/
  getBoBoCount(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.GETBOBOCOUNT,
        {
          'MatchID':data.MatchID,
          'BoboID':data.BoBoID
        },
        callback
      );
  },
  /*报名参赛*/
  joinMatch(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.JOINMATCH,
        {
          'MatchID':data.matchID,
          'BoboID':data.boboID,
          'TeamID':data.teamID,
          'PhoneNumber':data.phone,
        },
        callback
      );
  },
  /*取消报名*/
  quitMatch(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.QUITMATCH,
        {
          'MatchID':data.matchID,
          'BoboID':data.boboID,
          'TeamID':data.teamID,
          'PhoneNumber':data.phone,
        },
        callback
      );
  },
  /*我的报名赛事*/
  myJoinMatch(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.MYJOINMATCH,
        {
          'MatchID':data.matchID,
          'TeamID':data.teamID,
          'PhoneNumber':data.phonenumber,
        },
        callback
      );
  },
  /*我的赛事列表*/
  myMatchList(data,callback){
    /**
     * @param  {[type]}   {'UserID':userID}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.MYMATCHLIST,
        {
          'UserID':data.userID,
          'State': data.state,
          'StartPage':data.startpage,
          'PageCount':data.pagecount,
        },
        callback
      );
  },
  /*赛事主播时间列表*/
  getMatchDateList(data, callback){
    /**
     * @param  {[type]}   {'MatchID':userID, 'BoBoID': boboID}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.MATCHDATELIST,
        {
          'MatchID':data.matchID,
          'BoBoID': data.boboID,
        },
        callback
      );

  },
  /*赛事主播列表*/
  getBoBoMatchList(data,callback){
    /**
     * @param  {[type]}   {'MatchID':userID, 'BoBoID': boboID}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.BOBOMATCHLIST,
        {
          'MatchID':data.matchID,
          'BoBoID': data.boboID,
          'MatchTime': data.matchtime,
        },
        callback
      );
  },
  /*赛事状态*/
  getMatchState(data,callback){
    /**
     * @param  {[type]}   {'UserID':userID}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.MATCH_API.MATCHSTATE,
        {
          'MatchID':data.matchID,
        },
        callback
      );
  },
}
