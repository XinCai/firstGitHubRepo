'use strict';
var ceLandingPage = require('../pages/ceLandingPage');
var newToBankPage = require('../pages/newToBankPage');
var netBankLoginPage = require('../pages/netBankLoginPage');
var ceStartPage = require('../pages/ceStartPage');
var userData = require('../data/netBankUser');
var reporter = require('../utils/reporter');
/**
 * Conditional Eligibility Test Scenarios
 */
describe ('conditional eligibility tests', function() {

    var pageLanding = ceLandingPage;
    var pageNewToBank = newToBankPage;
    var pageLogin  = netBankLoginPage;
    var pageCeStart = ceStartPage;

    /**
     * set up
     */
    beforeAll(function() {
        if (jasmine.version) { //the case for version 2.0.0
            console.log('jasmine-version:' + jasmine.version);
        }
        else { //the case for version 1.3
            console.log('jasmine-version:' + jasmine.getEnv().versionString());
        }
        jasmine.getEnv().addReporter(reporter);
    });

    /**
     * tear down
     */
    afterAll(function() {
        //TODO : Add following clean up function when required
    });

    beforeEach(function() {
        pageLanding.get();
        browser.driver.manage().window().maximize();
    });

    afterEach(function()
    {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        //if there is pop up alert, close it
        browser.driver.switchTo().alert().then(
            function (alert) { alert.dismiss(); },
            function (err) { }
        );
    });

    it('should go to netbank login page', function() {
        pageLanding.continue();
        pageLanding.continueEL();
        pageNewToBank.waitClickApply();
        expect(pageLogin.clientLabel.getText()).toBe('Client number');
    });

    it('should login netbank page', function() {
        pageLanding.continue();
        pageLanding.continueEL();
        pageNewToBank.waitClickApply();
        pageLogin.loginNetBank(userData);
        //switch back to angular page
        browser.ignoreSynchronization = false;
        expect(pageCeStart.justMeButton.getText()).toBe('Just me');
    });

});
