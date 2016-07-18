'use strict';

import FecthService from './fetchservice';
import ApiConfig from '../constants/apiconfig';
import {ToastAndroid} from 'react-native';

export default {

  getCurrentVersion(data,callback) {
    FecthService.postFecth(
      ApiConfig.OTHER_API.CURRENTVERSION,
      {},
      callback
    );
  },

}
