'use strict';
import GlobalSetup from '../constants/globalsetup'

function api(api, v){
	if(v instanceof Object){
		var p = Object.keys(v).map(function(k) {
			return encodeURIComponent(k) + "=" + encodeURIComponent(v[k]);
		}).join('&');
	}else if(v){
		var p = v;

  }else{
    var p ='';
	}
	return GlobalSetup.API_PATH + api + '?access_token=' + ACCESS_TOKEN + '&' + p;
}

// function getNodes(){
// 	return api('nodes.json');
// }
//
// function getComments(topic_id, offset, limit){
// 	return api('topics/'+topic_id+'/replies.json', {'offset':offset, 'limit':limit});
// }
//
// function getHomeTopics(offset, limit){
// 	return api('topics.json', {'type':'excellent','offset':offset, 'limit':limit});
// }
//
// function getNodeTopics(node_id, offset, limit){
// 	return api('topics.json', {'node_id':node_id, 'offset':offset, 'limit':limit});
// }
//
// function getTopic(id){
// 	return api('topics/'+id+'.json');
// }



/*************
 * User Auth *
 *
 *************/

register_api() {
	return ''
}

module.exports = {
	API: api,
};
