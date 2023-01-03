chargepointList = window.prompt("Please enter chargers for override, separated by comma").split(",");
overrideReason = window.prompt("Please enter override reason");

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
  "body": "{\"overrideConnector\":0,\"overrideStatus\":1,\"overrideReason\":\""+overrideReason+"\"}",
  "method": "PUT",
  "mode": "cors",
  "credentials": "include"
    })
});

Promise.all(promiseArray).then((values)=>{
    console.log('added overrides:')
    console.table(values)
}
);
