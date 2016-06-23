angular.module('admin')
	.factory('eventService',['$http','$log','$q',function($http,$log,$q){
		//Return functions as apis.
		return {
			list:list,
			save: saveEvent,
			getbyid:getbyID,
			delete: deleteEvent
		};
							
		//Implementation of the above API functions.
			
		function list(){				
			return $http.get('/adminevents').then(handleSuccess,handleError);
		}
		
		function getbyID(id){
			return $http.get('/adminevents/'+id).then(handleSuccess,handleError);
		}
		
		function saveEvent(event){
			if(event._id){
				//update event.
				return $http.put('/adminevents/'+event._id,event).then(handleSuccess,handleError);
			}else{
				//insert
				console.log(event.enddt);
				return $http.post('/adminevents',event).then(handleSuccess,handleError);
			}
			
		}
		
		function deleteEvent(id){
			return $http.delete('/adminevents/'+id).then(handleSuccess,handleError);
		}
		
		//Private metods to handle success and error of xhr calls.
		
		function handleSuccess(response){
			return response.data; 
		}
		
		function handleError(response){
			 if (! angular.isObject( response.data ) || ! response.data.message) {
                    return( $q.reject( "An unknown error occurred." ) );
            	}
			return( $q.reject( response.data.message ) );			
		}
		
	
	}]);