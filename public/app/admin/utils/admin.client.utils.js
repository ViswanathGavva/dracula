angular.module('admin')
	.factory('focusService',['$window','$timeout',function($window,$timeout){
		return { 
		setFocus : function(id) {
      	// timeout makes sure that is invoked after any other event has been triggered.
      	// e.g. click events that need to run before the focus or
      	// inputs elements that are in a disabled state but are enabled when those events
      	// are triggered.
      	$timeout(function() {
        	var element = $window.document.getElementById(id);
        	if(element)
          	element.focus();
      	});
    	}
    };
	}])
	.filter('shortText',['$window',function($window){
		//local variables to this filter
		var shorttext='';
		return function(text,limit){
		if (!limit) return value;
		
			if(text.length > limit){
				shorttext = text.substr(0, limit);
				shorttext+='...';
			}
			else{
				shorttext = text;
			}
		return shorttext;	
		}
	}])
	
	.filter('address',['$window',function($window){
		//local variables to this filter
		var retValue='',addArr=[];
		return function(text){
			retValue='';	
			addArr = text.split(',');
			for(var i=0;i<addArr.length;i++){
							retValue += addArr[i]+'\n';
			}
			
						
		return retValue;	
		}
	}])
	;