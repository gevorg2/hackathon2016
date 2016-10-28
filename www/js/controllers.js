angular.module('starter.controllers', [])
.controller('MainCtrl', function($scope) {
  $scope.isLoggedIn = function() {
    return localStorage.getItem('userInfo');
  }
})
.controller('DashCtrl', function($scope) {
 $scope.isLoggedIn = function() {
    return localStorage.getItem('userInfo');
  }
  $scope.data = {
    finorg: '',
    username: '',
    type: 'A',
    Paycond: 'B',
    Qty: '',
    Price: ''
  }

/*
 var request={
     price:0,
      reqType:'bid',//bid/ask
     entityName: ''
  }
   var contract ={
     Address:'',
     middlwareAddress: '',
     consumerAddress:'',
     request: request
   }
 */
  $scope.createContract= function(){

  }

})
.controller("RegisterCtrl", function($scope,$state,appConfig) {
  $scope.formInfo = {
    username: '',
    password: '',
    finCorpAddress: ''
  }
  $scope.isLoggedIn = function() {
    return localStorage.getItem('userInfo');
  }
  $scope.register = function() {
    localStorage.setItem('userInfo' , JSON.stringify({finCorpAddress: $scope.formInfo.finCorpAddress}));
    $scope.createUser($scope.formInfo);
    $state.go('tab.dash', null, {reload: true});
  }
    $scope.createUser = function(userInfo){

      var dataString = "password=" + userInfo.password+"&faucet=1";

      var req = {
       method: 'POST',
       url: appConfig.keyserver + 'users/'+userInfo.username,
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data: dataString
      };

      $http(req).then(response => {
        console.log('created user');
        $state.transitionTo('dashboard', {name: $scope.newUser});
      }, response => {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      });
    } 
    
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
