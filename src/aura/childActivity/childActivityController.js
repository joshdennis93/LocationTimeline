({
    toggleActivity : function(component, event, helper) {
        $A.util.toggleClass(component.find('expId'), 'slds-is-open');
    }
})