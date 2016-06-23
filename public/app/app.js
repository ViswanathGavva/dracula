angular.module('admin', ['ngRoute','ui.bootstrap'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/adminstates',{
			templateUrl:'app/admin/states/states.html'
			})
		.when('/admincities',{
			templateUrl:'app/admin/cities/cities.html'
		})
		.when('/adminevents',{
			templateUrl:'app/admin/events/events.html'
		})	
		.when('/adminbloodbanks',{
			templateUrl:'app/admin/bbs/bbs.html'
		})
		.otherwise({redirectTo:'/'});
			
	}]);
;