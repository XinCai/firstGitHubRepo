'use strict';
var config = require('../config/config');

var CeStartPage = function () {

	this.url = browser.baseUrl + 'conditionalEligibility';
	this.pageLoaded = element(by.id('cal-start-page'));
	this.justMeButton = element(by.id('account-single-btn'));
	this.twoOfusButton = element(by.id('account-joint-btn'));

	this.get = function () {
		browser.get(this.url);
		browser.wait(this.pageLoaded, config.get('globalTimeOut'));
		browser.waitForAngular();
	};
};
//CELandingPage.prototype = basePage; // extend basePage...
module.exports = new CeStartPage();
