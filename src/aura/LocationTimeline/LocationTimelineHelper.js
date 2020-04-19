({
    getAddresses : function(component) {
        var action = component.get("c.locList"); //changed taskList to locList
        action.setParams({
            "recordId": component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.lstActivity", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log("INCOMPLETE RESPONSE");
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if(errors) {
                    if(errors[0] && errors[0].message) {
                        console.log("Error message: "+
                            errors[0].message);
                    }
                } else{
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    getAddressDetails : function(component) {
        component.set('v.mycolumns', [
            {label: 'Location Name', fieldName: 'Name', type: 'text'},
            {label: 'State', fieldName: 'State', type: 'text'},
            {label: 'City', fieldName: 'City', type: 'Text'}
        ]);
        var action = component.get("c.fetchAddresses");
	        action.setParams({
    	        "recordId": component.get("v.recordId")
        	});
        	action.setCallback(this, function(response) {

            var state = response.getState();
            if ( state === "SUCCESS" ) {
                component.set( "v.listLoc", response.getReturnValue().listLoc );
                component.set( "v.markers", response.getReturnValue().listAddrWrap );
            }
        });
        $A.enqueueAction(action);
    }

})
