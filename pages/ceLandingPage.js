'use strict';
var basePage = require('./basePage');
var config = require('../config/config');
var CELandingPage = function () {
	var ExpectedCon = protractor.ExpectedConditions;
	this.url = browser.baseUrl;
	this.pageLoaded = element(by.id('cal-start-page'));
	this.continueButton = element(by.id('cal-continue-btn'));
	this.continueELButton = element(by.id('el-check1-continue-btn'));
	this.bladeBackButton = element(by.id('blade-back-btn'));

	this.get = function () {
		browser.get(this.url);
		browser.wait(ExpectedCon.presenceOf(this.pageLoaded, config.get('globalTimeOut')));
		browser.waitForAngular();
	};
	/**
	 * TODO : tried element visible(), presenceOf(), doesn't work as expected, work out later on
	 *
	 */
	this.continue = function () {
		browser.wait(ExpectedCon.elementToBeClickable(this.continueButton, config.get('globalTimeOut')));
		browser.wait(ExpectedCon.presenceOf(this.continueButton, config.get('globalTimeOut')));
		//console.log('\n========='+ browser.wait(ExpectedCon.presenceOf(this.continueButton,10000)));
		browser.driver.sleep(config.get('globalTimeOut'));
		this.continueButton.click();
	};

	/**
	 * TODO : have to force sleep before do click action, find better solution later on
	 */
	this.continueEL = function () {
		browser.wait(ExpectedCon.elementToBeClickable(this.continueELButton, config.get('globalTimeOut')));
		browser.driver.sleep(2000);
		this.continueELButton.click();
	};
};

CELandingPage.prototype = basePage; // extend basePage...
module.exports = new CELandingPage();
