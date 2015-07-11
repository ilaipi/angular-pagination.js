# angular.pagination.js
a pagination class use angular `$http.post` to request data

Usage:
1. create instance
```
  var pageNum = 1;//the first page num, usually is 1 I think
  var pageSize = 15;//data max rows in one page
  var pagination = new AngularPagination('yourDataUrl', pageNum, pageSize);
  
```

2. create angular app
```
  var myApp = angular.module('my-app', [
      'ui.router', 'ui.bootstrap', 'angular-highlight'
  ]);
```
3.create a service
```
  myApp.factory('barService', [function () {
    var data = {
      /**
       * 翻页对象
       */
      pagination: null
    };
  }]);
```

4.init pagination
```
  myApp.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider, $httpProvider) {
    $stateProvider.state('yourState', {
        url: '/a_url',
        templateUrl: 'static/templates/xxxxx.html',
        controller: 'yourCtl',
        resolve: {
            pagination: ['$http', function ($http) {
                //this is the requirement
                pagination.$http = $http;
                return pagination.current();
            }]
        }
    })
  })
```

5.create angular controller
```
  myApp.controller('yourCtl', ['$scope', 'barService', function($scope, barService){
    $scope.barService = barService;
  }]);
```

5.use in your view
```
  <div class="col-lg-4">
    <div class="input-group">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" ng-click="barService.data.pagination.search()"><span
                  class="glyphicon glyphicon-search"></span>
          </button>
        </span>
        <input type="text" class="form-control" placeholder="搜寻对话人或对话记录"
               ng-model="barService.data.pagination.keyword" ng-keypress="barService.data.pagination.search($event)">
    </div>
</div>
<div class="nav navbar-nav navbar-right">
    <label>共&nbsp;&nbsp;{{barService.data.pagination.config.total}}&nbsp;&nbsp;人</label>
    <button
            class="btn btn-default btn-xs"
            ng-click="barService.data.pagination.first()"
            ng-disabled="!barService.data.pagination.toFirst">
        <<
    </button>

    <button
            class="btn btn-default btn-xs"
            ng-click="barService.data.pagination.previous()"
            ng-disabled="!barService.data.pagination.older">
        <
    </button>

    <input
            type="text"
            ng-model="barService.data.pagination.pageNum"
            ng-keypress="barService.data.pagination.go($event)"
            style="width: 30px"/>

    <label>/</label>

    <label>{{barService.data.pagination.config.pages}}</label>

    <button
            class="btn btn-default btn-xs"
            ng-click="barService.data.pagination.next()"
            ng-disabled="!barService.data.pagination.newer">
        >
    </button>

    <button
            class="btn btn-default btn-xs"
            ng-click="barService.data.pagination.end()"
            ng-disabled="!barService.data.pagination.toEnd">
        >>
    </button>
</div>
```
