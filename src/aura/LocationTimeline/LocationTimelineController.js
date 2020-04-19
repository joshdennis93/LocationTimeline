({
  doInit: function (component, event, helper) {
    helper.getAddresses(component);
    helper.getAddressDetails(component);
  },

  newLocClick: function (component, event, helper) {
    //component.set("v.viewNewRecordForm", true);
    var modalBody;
    var parentId= component.get('v.recordId');
    $A.createComponent("c:NewLocationForm", {parentId:parentId},
        function(content, status) {
            if (status === "SUCCESS") {
                modalBody = content;
                component.find('overlayLib').showCustomModal({
                    header: "New Location",
                    body: modalBody,
                    showCloseButton: true,
                    closeCallback: function() {
                        //alert('You closed the modal!');
                        helper.getAddresses(component);
                        helper.getAddressDetails(component);
                    }
                })
            }
        });

  },

  //note: this 'works' but auto-redirects user to the created record and we can't override the behaviour
  //https://salesforce.stackexchange.com/questions/198168/lightning-forcecreaterecord-capture-redirect-after-save
  createLocation: function (component, event, helper) {
    var ev = $A.get("e.force:createRecord");
    if (ev) {
      ev.setParams({
        entityApiName: "Location__c",
        defaultFieldValues: {
          Account__c: component.get("v.recordId"),
        },
      });
      ev.fire();
    } else {
      alert("Event [e.force:createRecord] not available");
    }
  }

  //saveLoc : function(component, event, helper) {
  //    component.set('v.viewNewRecordForm', false)
  //}
});