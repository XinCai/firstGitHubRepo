/**
 * Created by CaiKe on 10/12/2015.
 */

'use strict';

function config() {
	var _config = {
		globalTimeOut: 10000
	};

	this.get = function (key) {
		return _config[key];
	};
};

module.exports = new config();
