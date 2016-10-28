// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.constant('appConfig', {userRoles:['guest','user','admin'],apiEndPoint:'http://strato-dev4.blockapps.net/eth/v1.2/',keyserver:'http://localhost:8001/', contract:'contract Bid { address owner; address validator; address consumer; //0 - waiting for validation //1 - validated //2 - declined uint state; uint price; string reqType; //bid/ask string entityName; function Bid(uint _price, string _reqType, string _entityName, address _validator, address _consumer){ owner = msg.sender; state = 0; price = _price; reqType = _reqType; entityName = _entityName; validator = _validator; consumer = _consumer; } modifier onlyBy(address _user) { if(msg.sender != _user) throw; _ } modifier onlyIfValid() { if(state != 1) { throw; } _ } function validate() onlyBy(validator) { if(state != 0) { throw; } state = 1; } function discard() onlyBy(validator) { state = 2; } function getBidInfoPrice() onlyBy(consumer) onlyIfValid() public returns(uint) { return price; } function getBidInfoEntityName() onlyBy(consumer) onlyIfValid() public returns(string) { return entityName; } function getBidInfoRequestType() onlyBy(consumer) onlyIfValid() public returns(string) { return reqType; } function getBidState() onlyBy(validator) onlyBy(consumer) public returns(uint) { return state; } } ', addressConsumer:'934709c7a00474f4974b3c0770271d2ee14341bd',addressMiddlware:'526b78ea3f0159ec65e009790ec6a50fa36bc8a4'})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    controller:'MainCtrl',
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  }) 

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('tab.register', {
    url: '/register',
    views: {
      'register': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
