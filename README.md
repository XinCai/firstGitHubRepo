https://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings 

The Protractor community is getting bigger by the day. We have blogged about ways to get hands-on with Protractor and how to test your AngularJS apps with it. In this blog, let’s look beyond Protractor’s support for writing UI Tests for AngularJS. Let’s examine a few of Protractor’s shortcomings and then understand how they can be overcome with Page Objects.

Protractor has Shortcomings?!

Let us go through this example spec from the Protractor GitHub page:

describe('angularjs homepage', function() {
  it('should greet the named user', function() {
  browser.get('http://www.angularjs.org');
  element(by.model('yourName')).sendKeys('Julie');
  var greeting = element(by.binding('yourName'));
  expect(greeting.getText()).toEqual('Hello Julie!');
});

describe('todo list', function() {
  var todoList;
  beforeEach(function() {
  browser.get('http://www.angularjs.org');
  todoList = element.all(by.repeater('todo in todos'));
});

it('should list todos', function() {
  expect(todoList.count()).toEqual(2);
  expect(todoList.get(1).getText()).toEqual('build an angular app');
});

it('should add a todo', function() {
  var addTodo = element(by.model('todoText'));
  var addButton = element(by.css('[value="add"]'));

  addTodo.sendKeys('write a protractor test');
  addButton.click();

  expect(todoList.count()).toEqual(3);
  expect(todoList.get(2).getText()).toEqual('write a protractor test');
});
 

Although this spec is syntactically perfect and does the right thing, it can cause a few problems:

1. Lack of Domain Specific Language (DSL) Support1:  It is hard to understand what is being tested, because the Protractor specific vocabulary ( element, by.binding, by.model, etc.) is not related to the business and features. Having test specifications that speak the jargon of the domain goes a long way in helping business understand the rationale behind the tests

2. Code Duplication​2:  Following are the steps to add a new Todo function:

Get the addTodo input by model
Get the addButton button by css
Write something on the input using sendKeys
Click on the button to confirm.
Although it is just four lines long, it is likely that we will need to add todos in many of our tests, so these four lines will be copied and pasted along many files, leading to code duplication. For example, when you are testing the amount of todos that are pending, you will need to simulate adding todos before check the count.

3. High Coupling3:  Just as an exercise, ask yourself, what would happen if the input field where you type a new todo has to be changed? What if it was required to click a button before being able to enter a new todo? Such changes (which may seem unlikely at the start) end up happening in every project. It is essential to not be highly coupled, but instead be flexible enough to be ready for change.

4. Tough Maintenance:  All these issues above will make your awesome Protractor tests a huge pain to maintain in a medium/long term. As the project grows and change creeps in, nobody will be keen on changing the numerous ‘Adding todo logic’ spread across your code.

As you can see, even a very small application example like the “Todo” one above is likely to suffer from issues. These problems get magnified as the complexity of your application increases.

How Page Objects can help

Firstly, what are Page Objects? Here is a definition from the Selenium team:

Page Object is a Design Pattern which has become popular in test automation for enhancing test maintenance and reducing code duplication. A page object is an object-oriented class that serves as an interface to a page of your AUT. The tests then use the methods of this page object class whenever they need to interact with that page of the UI. The benefit is that if the UI changes for the page, the tests themselves don’t need to change, only the code within the page object needs to change. Subsequently all changes to support that new UI are located in one place.

How can PageObjects help? Let’s take a look at how we can refactor the same example above using Page Objects:

Refactored Spec - Gist
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
Notice that the much of the code is contained inside the AngularPage. The idea is to move all the logic required to interact with the page inside this class.

Our suite now is more focused on the behaviour of the page, than on how select this or that element.

Now let’s take a look at how the page object looks like.

The Page Object - Gist
'use strict';

var AngularPage = function () {
  browser.get('http://www.angularjs.org');
};

 AngularPage.prototype = Object.create({}, {
    todoText: { get: function () { return element(by.model('todoText')); }},
    addButton: { get: function () { return element(by.css('[value="add"]')); }},
    yourName: { get: function () { return element(by.model('yourName')); }},
    greeting: { get: function () { return element(by.binding('yourName')).getText(); }},
    todoList: { get: function () { return element.all(by.repeater('todo in todos')); }},
    typeName: { value: function (keys) { return this.yourName.sendKeys(keys); }},
    todoAt: { value: function (idx) { return this.todoList.get(idx).getText(); }},
    addTodo: { value: function (todo) {
    this.todoText.sendKeys(todo);
    this.addButton.click();
  }}
});

module.exports = AngularPage;
We’ll now revisit the “shortcomings” I had listed earlier and see how the refactored Page Objects version helped overcome them:

Lack of Domain Language Support: Notice that all the Protractor specific words are gone in the refactored version and you have more business-like expressions instead. That is much easier to read, especially by business folks, thus helping them better understand the test specifications.
Code Duplication: The lines of code that were likely to be copied and pasted are now inside the Page Object and we just call this Page Object if we need to execute them.
High Coupling: Since the tests only talk to the Page Object, it is totally decoupled from the elements inside each page. This means that if we need to change something on the UI the tests will stay pretty much the same. With Page Object we have the right abstraction of the page elements and their actions.
Hard Maintenance: As a consequence of the points above, it is much easier now to maintain these tests in the medium/long term.
Well done! You just learned how to write better Protractor tests.

I hope you are curious to try it out. If you do so, please come back and share your learnings.

Further Reading:

Selenium’s comprehensive overview of Page Objects
Page Object - Martin Fowler
Domain Specific Language - Martin Fowler
Don’t Repeat Yourself - Dave Thomas, interviewed by Bill Venners
Cohesion And Coupling - Jeremy Miller
