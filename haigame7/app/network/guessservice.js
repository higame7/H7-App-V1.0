'use strict';

import FecthService from './fetchservice';
import {ToastAndroid} from 'react-native';
import ApiConfig from '../constants/apiconfig';
export default{

  /* 获取竞猜列表 */
  getGuessList(callback) {
    /**
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.GUESS_API.GETGUESSLIST,
        {},
        callback
      );
  },
  /*下注*/
  doGuessBet(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.GUESS_API.DOGUESSBET,
        {
          'GuessID':data.guessID,
          'UserID':data.userID,
          'TeamID':data.teamID,
          'Money':data.money,
          'Odds':data.odds,
        },
        callback
      );
  },
  /*我的竞猜列表*/
  myGuessList(data,callback){
    /**
     * @param  {[type]}   {'MatchID':matchid}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.GUESS_API.MYGUESSLIST,
        {
          'UserID':data.userID,
          'GuessID':data.guessID,
          'StartPage':data.startpage,
          'PageCount':data.pagecount,
        },
        callback
      );
  },
}
