describe('states Controller:onload',function(){

	//Create a instance of admin module for each test
	beforeEach(module('admin'));
	beforeEach(module('adminMocks'));
	
	var ctrl,mockBackend;		
	
	beforeEach(inject(function($controller,$httpBackend,$window,$timeout){
		mockBackend = $httpBackend;
		
		//mock server call to fetch the data. Respond with some fake data.
		mockBackend.expectGET('/adminstates')
			.respond([{"_id":"57209b650fa99826efb7e7c7","name":"Karnataka"},
		{"_id":"57209b670fa99826efb7e7c8","name":"Andhra"},
		{"_id":"57209b670fa99826efb7e7c9","name":"Telangana"},
		{"_id":"57209b670fa99826efb7e7ca","name":"Delhi"},
		{"_id":"57209b680fa99826efb7e7cb","name":"Assam"}]);
				
		ctrl = $controller('statecontroller');
	}));
	
	
	
	//on load tests.	
	it('the action should be equal to - Add', function() { 
		mockBackend.flush();
		expect(ctrl.action).toEqual('Add');
	});
	
	it('states should be loaded on load', function() { 				
		// Simulate a server response
        mockBackend.flush();
        
		expect(ctrl.states).toEqual([{"_id":"57209b650fa99826efb7e7c7","name":"Karnataka"},
		{"_id":"57209b670fa99826efb7e7c8","name":"Andhra"},
		{"_id":"57209b670fa99826efb7e7c9","name":"Telangana"},
		{"_id":"57209b670fa99826efb7e7ca","name":"Delhi"},
		{"_id":"57209b680fa99826efb7e7cb","name":"Assam"}]);		
	});
	
	afterEach(function() {
	// Ensure that all expects set on the $httpBackend were actually called 
	mockBackend.verifyNoOutstandingExpectation();
	// Ensure that all requests to the server have actually responded (using flush()) 
	mockBackend.verifyNoOutstandingRequest();
	});
	
	/*it('onload: self.state should be empty', function() { 
		
	});
	
	
	//on edit click
	it('onedit: the action should be equal to - Update', function() { 
		//expect(ctrl.action).toEqual('Update');
	});
	
	it('onedit: the state text box should have the focus and the class',function(){
	
	});
	
	it('onedit: the state text box should have the value selected',function(){
	
	});
	
	//on Update click
	it('onupdate: self.state should be empty',function(){
		
	});
	it('onupdate: the action should be equal to - Add', function() { 
		expect(ctrl.action).toEqual('Add');
	});
	it('onupdate: self.states[updated state id] should have the updated value',function(){
		
	});*/
	
	
	

});

describe('states controller: on edit',function(){
	//Create a instance of admin module for each test
	beforeEach(module('admin'));
	beforeEach(module('adminMocks'));
	
	var ctrl,mockBackend;
	var windowMock,scope,compile,formElem,timeout,mockFocusService;	
		
		
	beforeEach(inject(function($controller,$httpBackend,$compile,$rootScope,$window,$timeout,focusService){
		mockBackend = $httpBackend;		
		timeout = $timeout;		
		//mock server call to fetch the data.
		mockBackend.expectGET('/adminstates')
			.respond([{"_id":"57209b650fa99826efb7e7c7","name":"Karnataka"},
		{"_id":"57209b670fa99826efb7e7c8","name":"Andhra"},
		{"_id":"57209b670fa99826efb7e7c9","name":"Telangana"},
		{"_id":"57209b670fa99826efb7e7ca","name":"Delhi"},
		{"_id":"57209b680fa99826efb7e7cb","name":"Assam"},
		{"_id":"57554a1c29b540566078d869","name":"Himachal Pradesh","__v":0},
		{"_id":"575555c929b540566078d86a","name":"Arunachal Pradesh","__v":0},
		{"_id":"575555f429b540566078d86c","name":"TamilNadu","__v":0},
		{"_id":"5756afbe525b41a570faf01e","name":"Kerala","__v":0}]);															
		
		spyOn(focusService,'setFocus').and.callThrough();//set a spy on focus service's setFocus method.
		mockFocusService = focusService;				
		
		ctrl = $controller('statecontroller');
					
	}));	

		
	//on edit click	
	it('\n the self.state should be equal to selected state'
		+'\n the action should be equal to - Update'
		+'\n the input text should have the focus',function(){
		
		
		
		//mock server call to fetch the state by ID.
		mockBackend.expectGET('/adminstates/57209b670fa99826efb7e7c8')
			.respond([{"_id":"57209b670fa99826efb7e7c8","name":"Andhra"}]);				
			
		/* call the server via editState function.
		   This function will call the server + change the action to Update + set the focus on input.
		*/
		ctrl.editState('57209b670fa99826efb7e7c8');	
		
		mockBackend.flush();// simulate server call response.
		
		//the self.state should be equal to selected state
		expect(ctrl.state).toEqual([{"_id":"57209b670fa99826efb7e7c8","name":"Andhra"}]);
		
		//the action should be equal to - Update
		expect(ctrl.action).toEqual('Update');
		
		//the input text should have the focus				
		expect(mockFocusService.setFocus).toHaveBeenCalled();
		//spyOn(formElem.find('input'),'focus');
				
		
	});
		
	
	afterEach(function() {
	// Ensure that all expects set on the $httpBackend were actually called 
	mockBackend.verifyNoOutstandingExpectation();
	// Ensure that all requests to the server have actually responded (using flush()) 
	mockBackend.verifyNoOutstandingRequest();
	});	
	
	
});

