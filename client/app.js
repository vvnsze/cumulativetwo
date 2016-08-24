var app = angular.module('FarmLocations', []);

app.controller('foodList',function($scope, foodSearch){
  $scope.toggle = foodSearch.toggle;
  $scope.result ='';
  $scope.receivedFood = foodSearch.receivedFood;

  $scope.addFoodItem = function(item){
    if(item){
      $scope.search(item);
    } else{
      $scope.result= 'Please put in a food Item';
    }
  }

  $scope.search = function(item){
    foodSearch.submitSearch(item);
    console.log($scope.receivedFood);
  }

});


app.factory('foodSearch',function($http){

  // $http({
  //   method: 'GET',
  //   url: '/search'
  // }).then(function(response){
  //   console.log('response received properly line 29' , response);
  // }).catch(function(error){
  //   console.error('+++line31 app.js foodsearch get not working');
  // });
  var toggle = false;
  var receivedFood =[]; //this is now an object!
  var submitSearch = function(item){
    console.log('line 37 received ' + item);
    $http({
      method:'GET',
      url:'/fooditem',
      params: {item:item}
    }).then(function(response){
      toggle = true;
      for (var i = 0; i < response.data.length; i++){
        receivedFood.push(response.data[i]);
        if(receivedFood.length > 11){
          return;
        }
      }
    }).catch(function(error){
      console.log(error);
    })

  }

  return{
    submitSearch: submitSearch,
    receivedFood: receivedFood,
    toggle: toggle
  };

});
