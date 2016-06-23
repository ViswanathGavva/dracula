angular.module('admin')
	.controller('bbscontroller',['$scope','$http','$log','bbsService',function($scope,$http,$log,bbsService){
		var self=this;
		//models
		self.bbs=[];
		self.action='Add';
		
		function fetchBBs(){
			bbsService.list().then(function(bbs){
				self.bbs=bbs;
			},function(error){
			
			});
		}
		
		fetchBBs();
	}]);