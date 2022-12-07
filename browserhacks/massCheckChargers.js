chargepointList = window
  .prompt("Please enter chargers to be checked.")
  .split(",");

let progress = 0;
let total = chargepointList.length;

const promiseArray = chargepointList.map(async (chargePointId) => {
  return fetch(
    "https://www.blms.nu/api/ChargePoints/"+chargePointId+"/check-communication/",
    {
      headers: {
        accept: "application/json",
        "accept-language": "sv,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Microsoft Edge";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://www.blms.nu/locations/2001065/data",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  )
    .then((response) => {
      console.log("Check for " + chargePointId + " requested.");
      console.log(response.ok ? "Successful" : "Failed");
      return {
        chargepointId: chargePointId,
        success: response.ok,
      };
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
        progress++;
        console.log(`${(progress/total*100).toFixed(2)}% checked`)
    });
});

Promise.all(promiseArray).then((values)=>{
  const successes = values.filter(value => value.success === true)
  const fails = values.filter(value => value.success === false)
  console.log(`Successful checks:${successes.length}, ${(successes.length/total*100).toFixed(2)}%`)
  console.table(successes);
  console.log(`Failed checks:${fails.length}, ${(fails.length/total*100).toFixed(2)}%`);
  console.table(fails);
}
);