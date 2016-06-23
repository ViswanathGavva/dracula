angular.module('admin')
	.controller('citycontroller',['$scope','$routeParams','StatesService','CityService','focusService','filterFilter',function($scope,$routeParams,StatesService,CityService,focusService,filterFilter){
		var self=this;
		/*models: 
		cdata  -- Current selected/entered city data.
		cities -- List of cities to be loaded on page load.
		states -- List of states to populate in select box.
		action -- the name of the Add/Update button.
		errors -- error messages to display.
		*/
		//on load button should read Add
		self.action = 'Add';
		self.errors =[];
		self.cdata = {};
		/*
			These are scope's models used for pagination.
		*/
		$scope.currentPage =1;
		$scope.itemsPerPage =3;		
		$scope.maxSize=3;
				
		/*
			These are filter's models.
		*/
		$scope.CitySearchStr='';
		$scope.StateSearchStr ='';

		
		//function to fetch the states.
		fetchStates = function(){
		
			StatesService.list().then(function(states){
				self.states= states;
			},function(error){
				console.log('Error while fetching states');	
				self.errors=["No states exist OR there is error loading states from server."];	
			});
		};
		
		//on load fetch all the states to populate in the select box.
		fetchStates();
		
		//function to fetch the cities. Use self.cities model.
		fetchCities = function(){
			CityService.list().then(function(cities){
				self.totalCities = cities;				
				$scope.totalItems=cities.length;
					$scope.$watch('currentPage + itemsPerPage + totalItems',function(){
						var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
		    				end = begin + $scope.itemsPerPage; 
						if($scope.fiteredCities){
							self.cities = $scope.fiteredCities.slice(begin, end);
							
						}else{
							self.cities = cities.slice(begin, end);
						}												
		    			
					});
			},function(err){
				console.log('Error while fetching states');	
				self.errors=["No states exist OR there is error loading states from server."];	
			});
		};
		//on load cities should show.
		fetchCities();
		
		
		
		$scope.$watch('CitySearchStr',function(newVal,oldVal){
			//filter only when totalCities is available. i.e dont run in first load when self.totalCities not yet resolved.
			if(self.totalCities){
				//Filter cities.
				$scope.fiteredCities = filterFilter(self.totalCities,newVal);
				$scope.totalItems=$scope.fiteredCities.length;
				$scope.currentPage=1;
				
			}else{
				//do nothing. may be in future.
			}
		});
		
		$scope.$watch('StateSearchStr',function(newVal,oldVal){
			//filter only when self.states is available. i.e dont run in first load when self.states not yet resolved.
			if(self.states){
				//Filter states.
				$scope.filteredStates = filterFilter(self.states,newVal);
				
				//Filter cities.
				$scope.fiteredCities = filterFilter(self.totalCities,function(city){
						var res= $scope.filteredStates.map(function(state){ return state._id;}).indexOf(city.state);						
						return (res >= 0);

				});
				
				$scope.totalItems=$scope.fiteredCities.length;
				$scope.currentPage=1;
				
			}else{
				//do nothing. may be in future.
			}
		});
		
		//function to fetch the selected state and populate it in the form for updating.		
		self.editCity = function(id){		
			CityService.getbyid(id).then(function(cityData){
								StatesService.getbyid(cityData.state).then(function(StateData){
									self.cdata=cityData;
									self.cdata.state=StateData;
									self.action='Update';
									focusService.setFocus('state');
								},function(error){
				console.log('Error while fetching cityData');	
				self.errors=["No state exist OR there is error loading City from server."];
			});
		
		});
		};
		
		self.saveCity = function(){
			console.log(self.cdata);
			CityService.save(self.cdata).then(function(success){
				console.log('sucessfully saved');
				console.log(success);
				self.resetForm();
				fetchCities();
				
				
			},function(error){
				console.log('Error while saving');
				console.log(error);
			});
			
		}
		
		self.deleteCity = function(id){
			CityService.delete(id).then(function(success){
				console.log('Deleted successfully');
				fetchCities();
				console.log(success);
			},function(error){
				console.log('Error while deleting city');
				console.log(error);
			});
			
		}
		
		//Reset the form and change the button value to Add on reset click.
		self.resetForm = function(){
			self.cdata = {};
			self.action='Add';
		};
		
		
	
	}]);