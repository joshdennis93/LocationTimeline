# LocationTimeline
Visually displays records containing address data (any valid combination of street, city, state, postcode, country), according to a specified date.

## Installation
1. Clone/download files in repo
2. Use your favourite metadata management tool to add them to your current metadata and push to your org. Or, simply copy/paste code into the dev console?

Note: 'Address__c' object is included as example and isn't strictly needed.

3. Change code as necessary (currently hardcoded to specific fields)
4. Add to lightning page via Lightning App Builder.

## Examples
![image1](/images/image1.png)

![image2](/images/image2.png)

## Use cases
- Track movement of entities on a map (e.g. in COVID-19 use case, identifying locations an infected patient may have visited)
- Visualise plan for sales/service/deliveries (e.g. view a salesperson's travels on a given day by querying for all Work Orders/Opportunities/Events on a given day)
- Identify shipments/logistics (e.g. if a ship carrying coal is going to dock at 3 ports over 14 days, seeing its current location v.s. future docking locations)

## E2E example
![E2E demo](/images/E2E demo.gif)