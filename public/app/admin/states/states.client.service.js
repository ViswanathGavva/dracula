angular.module('admin')
	.factory('StatesService',['$http','$log','$q',function($http,$log,$q){
		//local variables.
		
		//Return functions as apis.
		return {
			list:list,
			getbyid:getbyid,			
			save:save,
			deletestate:deletestate
		};
							
		//Implementation of the above API functions.
			
		function list(){				
			return $http.get('/adminstates').then(handleSuccess,handleError);
		}
		
		function getbyid(id){
			return $http.get('/adminstates/'+id).then(handleSuccess,handleError);
		}
				
		function save(state){	
			if(state._id)			{
				return $http.put('/adminstates/'+state._id,state).then(handleSuccess,handleError);
			}
			else{
				return $http.post('/adminstates/add',state).then(handleSuccess,handleError);				
			}
			
		}
		
		function deletestate(id){
			console.log(id);
			return $http.delete('/adminstates/'+id).then(handleSuccess,handleError);
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