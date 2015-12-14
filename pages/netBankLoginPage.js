'use strict';
var config = require('../config/config');

var netBankLoginPage = function () {

	browser.ignoreSynchronization = true;
	this.url = 'https://www.my.dev0.finest.online.cba/netbank/';
	// this.pageLoaded = this.inDom(by.id('txtMyClientNumber_field'));
	this.clientNum = element(by.id('txtMyClientNumber_field'));
	this.password = element(by.id('txtMyPassword_field'));
	this.logonButton = element(by.id('btnLogon_field'));
	this.clientLabel = element(by.id('txtMyClientNumber_label'));
	/**
	 *
	 * log in net bank with user/pass
	 * @param user
	 * @param pass
	 */
	this.loginNetBank = function (user, pass) {
		this.clientNum.sendKeys(user);
		this.password.sendKeys(pass);
		this.logonButton.click();
	};

	this.loginNetBank = function (dataObj) {
		this.clientNum.sendKeys(dataObj.netBankLogin.username);
		this.password.sendKeys(dataObj.netBankLogin.password);
		this.logonButton.click();
	};

};
//netBankLoginPage.prototype = basePage; // extend basePage...
module.exports = new netBankLoginPage();

