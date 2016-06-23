angular.module('admin')
	.factory('CityService',['$http','$log','$q',function($http,$log,$q){
		//local variables.
		
		//Return functions as apis.
		return {
			list:list,
			getbyid:getbyid,			
			save:save,
			delete:deletecity
		};
							
		//Implementation of the above API functions.
		function list(){				
			return $http.get('/admincities').then(handleSuccess,handleError);
		}
		
		function getbyid(id){
			return $http.get('/admincities/'+id).then(handleSuccess,handleError);
		}
		
		function save(city){	
			if(city._id)			{
				return $http.put('/admincities/'+city._id,city).then(handleSuccess,handleError);
			}
			else{
				return $http.post('/admincities/',city).then(handleSuccess,handleError);				
			}
			
		}
		
		function deletecity(id){
			console.log(id);
			return $http.delete('/admincities/'+id).then(handleSuccess,handleError);
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