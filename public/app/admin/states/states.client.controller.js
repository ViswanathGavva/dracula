angular.module('admin')
	.controller('statecontroller',['$scope','$routeParams','StatesService','focusService','filterFilter',function($scope,$routeParams,StatesService,focusService,filterFilter){
		var self=this;
				
		/* Models are 
		self.states -- List of states to be shown in table view 
		self.state  -- Updated/Inserted state data in the form`
		self.action	-- Button value to update/create state.
		pageId      -- PageId for pagenation
		errors 		-- error messages to display.
		*/
		self.action='Add';
		self.errors=[];
		/*
			These are scope's models used for pagination directive.
		*/
		$scope.currentPage =1;
		$scope.itemsPerPage =3;		
		$scope.maxSize=3;
		
		/*
			This is the search string user types in filter text box.
		*/
		$scope.searchStr='';
		
		
		//Function to fetch states from server
		//Old function with out pagination directive.
		 fetchStates1 = function(){
			
			StatesService.list().then(
				function(states){
					self.states=states;
				},function(error){
					console.log(error);
				}
			);
			
		}
		
		//Function to fetch states from server with pagination applied.
		 fetchStates = function(){
			
			StatesService.list().then(
				function(states){
					self.totalStates = states;					
					$scope.totalItems=states.length;
					$scope.$watch('currentPage + itemsPerPage + totalItems',function(newVal,oldVal){
						var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
		    				end = begin + $scope.itemsPerPage; 
						if($scope.filteredStates){														
		    				self.states = $scope.filteredStates.slice(begin, end);	
						}else{						
		    				self.states = states.slice(begin, end);
		    			}
					});
				},function(error){
					console.log(error);
				}
			);
			
		}
		
		
				
		//On load self.states should be fetched from server.		
		fetchStates();				
		
		$scope.$watch('searchStr',function(newVal,oldVal){
			//filter only when totalStates is available. i.e dont run in first load when self.totalStates not yet resolved.
			if(self.totalStates){
				//Filter the values based on search string's new value.
				$scope.filteredStates = filterFilter(self.totalStates, newVal);
				//change the totalItems value so that the watch on 'currentPage + itemsPerPage + totalItems' will be triggered.
				$scope.totalItems=$scope.filteredStates.length;
				//If user searches on 2nd page, the pagination should go back to first page with new results. so set the currentPage to 1 again.
				$scope.currentPage =1;
			}else{
				//do nothing.may be in future
			}
			
					
		});
				
						
		
		// Add/Update a new state
		self.saveState = function(){		
			//call states service to save this data.
			StatesService.save(self.state).then(function(saveResponse){
				console.log(saveResponse);
				
				//If successfully saved, call the list function.
			 	fetchStates();
			 	//reset form.
				self.state={};			
				self.action='Add';
			},function(err){//common error handler
			console.log('Error while saving state');	
			self.errors.push(err);
			//self.errors=["Could not save state."];		
			});						
		};
		
		//For Edit existing state, We need to fetch the state by Id and set it to form's model i.e self.state.
		self.editState = function(id){			
			//call states service to fetch the state by ID
			StatesService.getbyid(id).then(function(state){			 
				//set the response data to self.state. so that the form will show the state details to edit.				
				self.state=state;
				self.action='Update';
				focusService.setFocus('stateid');
			},function(err){
			console.log('Error while saving state');	
			self.errors=["Could not fetch state."];		
			});						
		};
		
		//Delete States.
		self.deleteState = function(id){
			StatesService.deletestate(id).then(function(delResponse){
				console.log(delResponse);
				//If successfully deleted, Then reset self.totalStates and call list function again to fetch data from server.
				self.totalStates=null;
				fetchStates();
			},function(err){
				console.log('Error while deleting state');	
				self.errors=["Could not delete state."];	
			});
		
		};		
		
		self.resetForm = function(){
		self.state={};
		self.action='Add';
		}
		
		$scope.closeAlert = function(index) {
    		self.errors.splice(index, 1);
  		};
									
		
	}]);