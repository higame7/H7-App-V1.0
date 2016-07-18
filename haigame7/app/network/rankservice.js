'use strict';

import FecthService from './fetchservice';
import {ToastAndroid} from 'react-native';
import ApiConfig from '../constants/apiconfig';
export default{

  /* 获取个人排行 */
  rankUser(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.RANK_API.USERRANK [api path]
     * @param  {[type]}                [params]
     * @param  {Function} callback
     * @return response                        [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.RANK_API.USERRANK,
        {
          'RankType':data.ranktype,
          'RankSort':data.ranksort,
          'StartPage':data.startpage,
          'PageCount':data.pagecount
        },
        callback
      );
  },
  /* 获取团队排行 */
  rankTeam(data,callback) {
    /**
     * @param  {[type]}   ApiConfig.RANK_API.TEAMRANK [api path]
     * @param  {[type]}               [params]
     * @param  {Function} callback
     * @return response content                        [回调方法]
     */
      FecthService.postFecth(
        ApiConfig.RANK_API.TEAMRANK,
        {
          'RankType':data.ranktype,
          'RankSort':data.ranksort,
          'StartPage':data.startpage,
          'PageCount':data.pagecount
        },
        callback
      );
  },
}
