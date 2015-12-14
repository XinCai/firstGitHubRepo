# ConditionalEligibilityProtractorTest

setup project you need to install following

1) Node js tool for visual studio , https://github.com/Microsoft/nodejstools

2) install protractor https://github.com/angular/protractor/blob/master/docs/tutorial.md

3) run npm install

https://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings 

Page object rule applied 

===============================================================================
'use strict';

var AngularPage = function () {
  browser.get('http://www.angularjs.org');
};

AngularPage.prototype  = Object.create({}, {
  todoText:  {   get: function ()     { return element(by.model('todoText'));             }},
  addButton: {   get: function ()     { return element(by.css('[value="add"]'));          }},
  yourName:  {   get: function ()     { return element(by.model('yourName'));             }},
  greeting:  {   get: function ()     { return element(by.binding('yourName')).getText(); }},
  todoList:  {   get: function ()     { return element.all(by.repeater('todo in todos')); }},
  typeName:  { value: function (keys) { return this.yourName.sendKeys(keys);              }} ,
  todoAt:    { value: function (idx)  { return this.todoList.get(idx).getText();          }},
  addTodo:   { value: function (todo) {
    this.todoText.sendKeys(todo);
    this.addButton.click();
  }}
});

module.exports = AngularPage;
=========================================================================================================
'use strict';

var AngularPage = require('../pages/angular.page.js');

describe('angularjs homepage', function () {
  var page;

  beforeEach(function () {
    page = new AngularPage();
  });

  it('should greet the named user', function () {
    page.typeName('Julie');
    expect(page.greeting).toEqual('Hello Julie!');
  });

  describe('todo list', function () {
    it('should list todos', function () {
      expect(page.todoList.count()).toEqual(2);
      expect(page.todoAt(1)).toEqual('build an angular app');
    });

    it('should add a todo', function () {
      page.addTodo('write a protractor test');
      expect(page.todoList.count()).toEqual(3);
      expect(page.todoAt(2)).toEqual('write a protractor test');
    });
  });

});
