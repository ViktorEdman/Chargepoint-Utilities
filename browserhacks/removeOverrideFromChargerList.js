chargepointList = window.prompt("Please enter chargers for override to be removed from, separated by comma").split(",");

const promiseArray = chargepointList.map(async (chargePointId)=>{

return fetch("https://www.blms.nu/api/chargepoints/"+chargePointId+"/override/", {
  "headers": {
    "accept": "application/json",
    "accept-language": "sv,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://www.blms.nu/locations/2002837/data",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"overrideConnector\":0,\"overrideStatus\":0,\"overrideReason\":\"ok\"}",
  "method": "PUT",
  "mode": "cors",
  "credentials": "include"
    })
});

Promise.all(promiseArray).then((values)=>{
    console.log('Removed overrides:')
    console.table(values)
}
);