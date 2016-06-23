describe('states e2e tests:',function(){

	it('should show states on load',function(){
	//open the admin states URL in browser
	browser.get('/admin#/adminstates');
	
	var stateRows = element.all(by.repeater('state in ctrl.states'));
	expect(stateRows.count()).toEqual(8);
	
	//get first row's name and test it.
	var FirstRowName = element(by.repeater('state in ctrl.states').row(0).column('state.name')).getText();
	expect(FirstRowName).toEqual('Karnataka');		
	});
			
	it('On Save click',function(){
	//open the admin states URL in browser
	browser.get('/admin#/adminstates');
	var stateRows = element.all(by.repeater('state in ctrl.states'));
	expect(stateRows.count()).toEqual(8);
	
	var stateTxt = element(by.model('ctrl.state.name'));
	var AddBtn = element(by.css('.btn-primary'));
	stateTxt.clear();
	stateTxt.sendKeys('West Bengal');
	AddBtn.click();
	//check if it is saved. If yes, it should show in the grid now.
	stateRows = element.all(by.repeater('state in ctrl.states'));
	expect(stateRows.count()).toEqual(9);
	
	expect(stateRows.find('West Bengal')).toBeTruthy();
		
	});
	
	
	
	it('On Edit click of a state + update click + reset click',function(){
	//open the admin states URL in browser
	browser.get('/admin#/adminstates');
	
	//get edit button of Andhra and simulate click event.
	var AndhraEdit = element(by.repeater('state in ctrl.states').row(7)).element(by.css('.glyphicon-edit')).click();
	//check if the text box has the value corresponding to above ID.
	expect(element(by.model('ctrl.state.name')).getAttribute('value')).toEqual('Andhra');
	
	//TODO: Need to find how to test hidden fields since webdriver will not work on hidden elements/inputs.
	/*//check if the hidden element in form has the correct ID value.	
	//We need to make the hidden element as Text element. since web driver will not work on hidden elements.
	browser.driver.executeScript("document.getElementById('hiddenstateid').setAttribute('type','text')");
	expect(element(by.model('ctrl.state._id')).getAttribute('value')).toEqual('57209b670fa99826efb7e7c8');
	
	//browser.driver.executeScript("document.getElementById('hiddenstateid').setAttribute('type','hidden')");
	*/
	
	
	//check if the text box has focus. that is, to check IDs of activeElement promise and elementByID('stateid') promise are same.	
	expect(browser.driver.switchTo().activeElement().getId()).toEqual(element(by.id('stateid')).getId());				
	
	//check if the button value changed to Update.	
	expect(element(by.css('.btn-primary')).getAttribute('value')).toEqual('Update');
	
	var stateTxt = element(by.model('ctrl.state.name'));
	var updateBtn = element(by.css('.btn-primary'));
	stateTxt.clear();
	stateTxt.sendKeys('Andhra Pradesh');
	updateBtn.click();
	
	var AndhraRowName = element(by.repeater('state in ctrl.states').row(7).column('state.name')).getText();	
	expect(AndhraRowName).toEqual('Andhra Pradesh');
	expect(stateTxt.getAttribute('value')).toEqual('');
	expect(element(by.css('.btn-primary')).getAttribute('value')).toEqual('Add');	
	
	//get edit button of Andhra and simulate click event.
	var AndhraEdit = element(by.repeater('state in ctrl.states').row(7)).element(by.css('.glyphicon-edit')).click();
	var resetBtn = element(by.css('.btn-default'));
	expect(element(by.css('.btn-primary')).getAttribute('value')).toEqual('Update');	
	expect(stateTxt.getAttribute('value')).toEqual('Andhra Pradesh');
	resetBtn.click();
	expect(element(by.css('.btn-primary')).getAttribute('value')).toEqual('Add');	
	expect(stateTxt.getAttribute('value')).toEqual('');			
	
	});
	
	it('On Delete click',function(){
	//open the admin states URL in browser
	browser.get('/admin#/adminstates');
	var stateRows = element.all(by.repeater('state in ctrl.states'));
	expect(stateRows.count()).toEqual(9);
	var AndhraDelBtn = element(by.repeater('state in ctrl.states').row(1)).element(by.css('.glyphicon-trash'));
	AndhraDelBtn.click();
	stateRows = element.all(by.repeater('state in ctrl.states'));
	expect(stateRows.count()).toEqual(8);
	
		
	});
	
	
});