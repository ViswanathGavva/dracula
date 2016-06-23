angular.module('admin')
	.controller('eventController',['$scope','$routeParams','CityService','eventService','focusService','filterFilter',function($scope,$routeParams,CityService,eventService,focusService,filterFilter){
		var self=this;
		
		self.errors=[];
		self.events=[];
		self.cities=[];
		self.curEvent={};
		self.action ='Add';
		$scope.startDtPickr = {
    		opened: false
  		};

  		$scope.endDtPickr = {
    		opened: false
  		};
  		
  		$scope.dateOptions = {
    		dateDisabled: disabled,
		    formatYear: 'yy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
	    };
  		
		// Disable weekend selection
  		function disabled(data) {
    		var date = data.date,
      		mode = data.mode;
    		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  		}
		
		resetForm = function(){
			self.curEvent={};
			self.action='Add';
		}
		
		fetchEvents = function(){
			eventService.list().then(function(events){
				self.events=events;
			},function(error){
				//error while fetching the data
				self.errors.push(error);
			})
		}
		fetchEvents();
		
		fetchCities = function(){
			CityService.list().then(function(cities){
				//self.cities=
				cities.forEach(function(ele){
					self.cities.push(ele.name);
				});
			},function(error){
				self.errors.push(error);
			})
		}
		fetchCities();
		
		self.saveEvent = function(){
		//self.curEvent.city = self.curEvent.city.name;
			eventService.save(self.curEvent).then(function(success){
				//insert success.
				resetForm();
				fetchEvents();
			},function(error){
				//insert failed.
				self.errors.push(error);
			});
		}
		
		self.deleteEvent = function(id){
			eventService.delete(id).then(function(success){
				console.log('Deleted successfully');
				fetchEvents();
				console.log(success);
			},function(error){
				console.log('Error while deleting Event');
				console.log(error);
			});
		}	
		
		self.editEvent = function(id){			
			eventService.getbyid(id).then(function(event){			 
				//set the response data to self.event. so that the form will show the event details to edit.				
				event.enddt= new Date(event.enddt);
				event.startdt= new Date(event.startdt);
				self.curEvent=event;
				self.action='Update';
				focusService.setFocus('eventId');
			},function(err){
			console.log('Error while fetching event');	
			self.errors=["Could not fetch event."];		
			});	
		}
	}]);