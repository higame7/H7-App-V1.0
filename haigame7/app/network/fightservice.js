'use strict';

import FecthService from './fetchservice';
import {ToastAndroid} from 'react-native';
import ApiConfig from '../constants/apiconfig';
export default{
  /* 获取团队排行 */
  makeChanllenge(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.FIGHT_API.MAKECHANLLENGE,
        {
          'UserID':data.userid,
          'STeamID':data.steamid,
          'ETeamID':data.eteamid,
          'Money':data.money,
          'FightTime':data.fighttime,
        },
        callback
      );
  },
  /* 获取我的约战 */
  getUserFight(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.FIGHT_API.GETUSERFIGHT,
        {
          'PhoneNumber':data.phone,
          'FightType':data.fighttype,
          'StartPage':data.startpage,
          'PageCount':data.pagecount,
        },
        callback
      );
  },

  /* 获取团队排行 */
  getAllFightInfo(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.FIGHT_API.GETALLFIGHTINFO,
        {
          'StartPage':data.startpage,
          'PageCount':data.pagecount,
        },
        callback
      );
  },
  /* 认怂 */
  reject(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.FIGHT_API.REJECT,
        {
          'UserID':data.userID,
          'DateID':data.dateID,
          'Money':data.money,
        },
        callback
      );
  },
  /* 应战 */
  accept(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.FIGHT_API.ACCEPT,
        {
          'UserID':data.userID,
          'DateID':data.dateID,
          'Money':data.money,
        },
        callback
      );
  },
  /* 上传比赛ID */
  updateGameID(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.FIGHT_API.UPDATEGAMEID,
        {
          'DateID':data.dateID,
          'SFightAddress':data.sfightaddress,
          'EFightAddress':data.efightaddress,
          'SFightPic':data.sfightpic,
          'EFightPic':data.efightpic,
        },
        callback
      );
  },
}
