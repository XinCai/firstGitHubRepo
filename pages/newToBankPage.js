'use strict';
var basePage = require('./basePage');
//this is non-angular page
browser.ignoreSynchronization = true;
var config = require('../config/config');

var newToBankPage = function () {

	this.url = '';
	this.pageLoaded = element(by.id('acc-netbank-btn'));
	this.applyInButton = element(by.id('acc-netbank-btn'));
	this.createNewButton = element(by.id('acc-new-account-btn'));

	this.waitClickApply = function () {
		browser.driver.wait(this.applyInButton.isPresent(), config.get('globalTimeOut'));
		this.applyInButton.click();
	}
};
newToBankPage.prototype = basePage;
module.exports = new newToBankPage();

