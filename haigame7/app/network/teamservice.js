'use strict';

import FecthService from './fetchservice';
import {ToastAndroid} from 'react-native';
import ApiConfig from '../constants/apiconfig';
export default{

  /* 获取我的战队 */
  getUserDefaultTeam(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.TEAM_API.GETUSERDEFAULTTEAM,
        {
          'CreatUserID':data,
        },
        callback
      );
  },
  /* 设置我的默认战队 */
  setUserDefaultTeam(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.TEAM_API.SETDEFAULTTEAM,
        {
          'CreatUserID':data.userID,
          'TeamName':data.teamname
        },
        callback
      );
  },
  /*获取战队详情*/
  getTeambyID(data,callback){
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.TEAM_API.GETTEAMBYID,
        {
          'TeamID':data.teamID,
        },
        callback
      );
},
/*获取我的战队列表*/
getAllMyTeam(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.GETALLMYTEAM,
      {
        'CreatUserID':data.userID,
      },
      callback
    );
},
/*创建新战队*/
createTeam(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.CREATETEAM,
      {
        'CreatUserID':data.creater,
        'TeamName':data.teamname,
        'TeamLogo':data.teamlogo,
        'TeamType':data.teamtype,
      },
      callback
    );
},
/*编辑战队*/
editTeam(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.UPDATETEAM,
      {
        'TeamID':data.TeamID,
        'TeamName':data.TeamName,
        'TeamLogo':data.TeamLogo,
        'TeamDescription':data.TeamDescription,
      },
      callback
    );
},
/*删除战队*/
deleteTeam(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.DELETETEAM,
      {
        'CreatUserID':data.creater,
        'TeamName':data.teamname,
        'TeamType':data.teamtype,
      },
      callback
    );
},
  /*获取约战列表*/
  getTeamList(data,callback){
    /**
     * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
     * @param  {[type]}   {'PhoneNumber':phone}             [params]
     * @param  {Function} callback
     * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.TEAM_API.GETTEAMLIST,
        {
          'createUserID':data.createUserID,
          'Type':data.type,
          'TeamFightScore':data.teamfightscore,
          'UserFightScore':data.userfightscore,
          'Sort':data.sort,
          'StartPage':data.startpage,
          'PageCount':data.pagecount,
        },
        callback
      );
},
/*获取我的申请列表*/
myApplyTeamList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.MYAPPLYTEAMLIST,
      {
        'UserID':data.userID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*加入战队*/
applyTeam(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.APPLYTEAM,
      {
        'UserID':data.userID,
        'TeamID':data.teamID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},

/*获取受邀列表*/
myInvitedTeamList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.MYINVITEDTEAMLIST,
      {
        'UserID':data.userID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*获取招募信息列表*/
getRecruitList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.GETRECRUITLIST,
      {
        'UserID':data.userID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*发布招募信息*/
sendRecruit(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.SENDRECRUIT,
      {
        'TeamID':data.teamID,
        'Content':data.content,
      },
      callback
    );
},
/*获取邀请队员列表*/
getInviteUserList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.USER_API.NOTEAMUSERLIST,
      {
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*邀请队员*/
inviteUser(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'TeamID':teamID,'UserID':userID}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.INVITEUSER,
      {
        'TeamID':data.teamID,
        'UserID':data.userID,
      },
      callback
    );
},
/*获得发出邀请列表*/
getInvitedUserList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'TeamID':teamID,'UserID':userID}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.INVITEDUSERLIST,
      {
        'TeamID':data.teamID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*获得申请加入列表*/
getApplyUserList(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'TeamID':teamID,'UserID':userID}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.APPLYUSERLIST,
      {
        'TeamID':data.teamID,
        'StartPage':data.startpage,
        'PageCount':data.pagecount,
      },
      callback
    );
},
/*我的受邀操作【同意or拒绝】*/
handleMyInvited(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'TeamID':teamID,'UserID':userID}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.HANDLEMYINVITED,
      {
        'TeamID':data.teamID,
        'UserID':data.userID,
        'MessageID':data.messageID,
        'ISOK':data.isOK,
      },
      callback
    );
},
/*我的受邀操作【同意or拒绝】*/
handleMyApply(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'TeamID':teamID,'UserID':userID}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.HANDLEMYAPPLY,
      {
        'TeamID':data.teamID,
        'UserID':data.userID,
        'MessageID':data.messageID,
        'ISOK':data.isOK,
      },
      callback
    );
},
/*加入战队*/
removeTeamUser(data,callback){
  /**
   * @param  {[type]}   ApiConfig.USER_API.GETVERIFYCODE1 [api path]
   * @param  {[type]}   {'PhoneNumber':phone}             [params]
   * @param  {Function} callback
   * @return response content {MessageCode: 0, Message: ""}                       [回调方法]
   */
    FecthService.postFecth(
      ApiConfig.TEAM_API.REMOVEUSER,
      {
        'TeamID':data.teamID,
        'UserID':data.userID,
      },
      callback
    );
},


}
