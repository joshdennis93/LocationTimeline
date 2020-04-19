public with sharing class AccountListController {
    @AuraEnabled
    public static Wrapper fetchAddresses(id recordId) {
        system.debug('HI JOSH 1');
        List < CompleteAddressWrapper > listAddrWrap = new List < CompleteAddressWrapper >();
        List < Location__c > listLoc = new List < Location__c >();
        Wrapper wrap = new Wrapper();
        system.debug('HI JOSH 2');
        /* original code https://developer.salesforce.com/blogs/developer-relations/2015/11/building-context-aware-lightning-components.html,
         * 				 http://www.infallibletechie.com/2018/09/lightningmap-showing-multiple-markers.html
         *          for ( Account acc: [ SELECT Id, Name, BillingStreet, BillingState, BillingCountry, BillingPostalCode,
                                    BillingCity, BillingLatitude, BillingLongitude
                               FROM Account
                              WHERE BillingStreet != null
                              LIMIT 100 ] ) */

        for ( Location__c loc: [ SELECT Id, Name, Street__c, State__c, Country__c, Postcode__c,
                                    City__c
                               FROM Location__c
                              WHERE Account__c =:recordId
                              LIMIT 100 ] ) {
            system.debug('HI JOSH 3 ' + loc);
            AddressWrapper addrWrap = new AddressWrapper();
            CompleteAddressWrapper objWrap = new CompleteAddressWrapper();
            addrWrap.Street = loc.Street__c;
            addrWrap.City = loc.City__c;
            addrWrap.State = loc.State__c;
            addrWrap.Country = loc.Country__c;
            addrWrap.PostalCode = loc.Postcode__c;
            objWrap.location = addrWrap;
            objWrap.icon = 'custom:custom32';
            objWrap.title = loc.Name;
            listAddrWrap.add(objWrap);
            listLoc.add(loc);

        }

        wrap.listLoc = listLoc;
        wrap.listAddrWrap = listAddrWrap;
        system.debug('Out ' + listAddrWrap);
        return wrap;
    }

    @AuraEnabled
    public static List<Location__c> locList(id recordId) {
        return [SELECT id, name, DateRecorded__c, Street__c, City__c, State__c, Postcode__c, Description__c, Account__r.Name FROM Location__c WHERE Account__c =: recordId ORDER BY DateRecorded__c asc];
    }

    public class Wrapper {
        @AuraEnabled
        public List < Location__c > listLoc;
        @AuraEnabled
        public List < CompleteAddressWrapper > listAddrWrap;

    }

    public class AddressWrapper {
        @AuraEnabled
        public String Street;
        @AuraEnabled
        public String City;
        @AuraEnabled
        public String State;
        @AuraEnabled
        public String Country;
        @AuraEnabled
        public String PostalCode;
    }

    public class CompleteAddressWrapper {
        @AuraEnabled
        public String title;
        @AuraEnabled
        public String icon;
        @AuraEnabled
        public AddressWrapper location;

    }

}