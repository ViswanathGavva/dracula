angular.module('admin')
	.factory('bbsService',['$http','CityService','StatesService',function($http,CityService,StatesService){
		//local variables.
		
		//Return functions as apis.
		return {
			list:list,
			getbyid:getbyid,			
			save:save,
			delete:deleteBB
		};
		
		//Implementation of the above API functions.
		function list(){				
			return $http.get('/adminbloodbanks').then(handleSuccess,handleError);
		}
		
		function getbyid(id){
			return $http.get('/adminbloodbanks/'+id).then(handleSuccess,handleError);
		}
		
		function save(bb){	
			if(bb._id)			{
				return $http.put('/adminbloodbanks/'+bb._id,bb).then(handleSuccess,handleError);
			}
			else{
				return $http.post('/adminbloodbanks/',bb).then(handleSuccess,handleError);				
			}
			
		}
		
		function deleteBB(id){
			console.log(id);
			return $http.delete('/adminbloodbanks/'+id).then(handleSuccess,handleError);
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