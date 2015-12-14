'use strict';
exports.config = {
    framework: 'jasmine2',

    onPrepare: function(){
        // set implicit wait times in ms...
        browser.manage().timeouts().implicitlyWait(5000);
    },

    //seleniumAddress: 'http://poc.seleniumgrid.dev.cba/wd/hub',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: ['specs/testspec.js'],
    seleniumArgs: ['-browserTimeout=60'],
    capabilities: {
        browserName: 'chrome',
        count: 1
    },
    baseUrl: 'https://home-buying.dp.test.finest.online.cba/ConditionalEligibility#/',
    allScriptsTimeout: 30000
}
