angular.module('starter.controllers', [])
.controller('MainCtrl', function($scope) {
  $scope.isLoggedIn = function() {
    return localStorage.getItem('userInfo');
  }
})
.controller('DashCtrl', function($scope,appConfig,$http) {
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
  $scope.submit= function(){
    var data = {
          "password": JSON.parse(localStorage.getItem('userInfo')).password,
          "src" : appConfig.contract, 
          "args": {
            "_price": $scope.data.Price,
            "_reqType": $scope.data.Qty,
            "_entityName": $scope.data.Qty,
            "_validator": appConfig.addressMiddlware,
            "_consumer": appConfig.addressConsumer
            //,
            //"oracleAddress": $scope.pizzaContract.oracleAddress
          }
        };
      
      var req = {
        method: 'POST',
        url: appConfig.keyserver + 'users/' + JSON.parse(localStorage.getItem('userInfo')).username + '/' + localStorage.getItem('userAddress') + '/contract',
        headers: {
          "content-type": "application/json"
        },
        data : data
      };
      $http(req).then(response => {
        console.log("ADDRESS of POST");
        console.log(response.data);

        $scope.newContract = response.data;
        /**
         * After deploying the smart contract we will call 
         * the contract method and pass in the contract details
         */
      //   var data = {
      //     "password": JSON.parse(localStorage.getItem('userInfo')).password,
      //     "src" : appConfig.contract, 
      //     "args": {
      //       "_price": $scope.pizzaContract.price,
      //       "_reqType": $scope.pizzaContract.topping,
      //       "_entityName": $scope.pizzaContract.topping,
      //       "_validator": $scope.pizzaContract.topping,
      //       "_consumer": $scope.pizzaContract.topping
      //       //,
      //       //"oracleAddress": $scope.pizzaContract.oracleAddress
      //     }
      //   };
  
      //   var req = {
      //    method: 'POST',
      //    url: appConfig.keyserver + 'users/' + JSON.parse(localStorage.getItem('userInfo')).username+ '/'+ localStorageService.get('address') + '/contract/Pizza/' + $scope.newContract + '/call',
      //    headers: {
      //      'Content-Type': 'application/json'
      //    },
      //    data: JSON.stringify(data)
      //   };
    
      //   $http(req).then(response => {
      //     /**
      //      * Now that we have a successfully deployed smart contract 
      //      * let's transition to the detail view of the contract.
      //      */
      //     $('#mining-transaction').modal('hide');
      //     $('#mining-transaction').on('hidden.bs.modal', function (e) {
      //       $state.transitionTo('issuance', {id:$scope.newContract});
      //     });
      //   }, response => {
      //       $scope.data = response.data || "Request failed";
      //       $scope.status = response.status;
      //   });
      }, response => {
      //     $scope.data = response.data || "Request failed";
      //     $scope.status = response.status;
       });
  }

})
.controller("RegisterCtrl", function($scope,$state,appConfig,$http) {
  $scope.formInfo = {
    username: '',
    password: '',
    finCorpAddress: ''
  }
  $scope.isLoggedIn = function() {
    return localStorage.getItem('userInfo');
  }
  $scope.register = function() {
    localStorage.setItem('userInfo' , JSON.stringify( $scope.formInfo));
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
        localStorage.setItem('userAddress' , response.data);
        $state.transitionTo('dashboard', {name: $scope.newUser});
      }, response => {
          // $scope.data = response.data || "Request failed";
          // $scope.status = response.status;
          //localStorage.setItem('userAddress' , response.data);
      });
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
