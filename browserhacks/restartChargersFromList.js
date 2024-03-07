chargepointList = window.prompt("Please enter chargers to be restarted separated by comma or new line");
if (chargepointList.includes(","))
    chargepointList = chargepointList.split(',')
if (chargepointList.includes("\n"))
    chargepointList = chargepointList.split('\n')

let total = chargepointList.length;

const promiseArray = chargepointList.map(async(chargePointId)=>{
    return fetch("https://www.blms.nu/api/remote/reset/", {
        headers: {
            accept: "application/json",
            "accept-language": "sv,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": '"Microsoft Edge";v="105", " Not;A Brand";v="99", "Chromium";v="105"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
        },
        referrer: "https://www.blms.nu/locations/2000151/data?chargePointId=" + chargePointId,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: '{"chargePointId":' + chargePointId + ',"type":"Hard"}',
        method: "POST",
        mode: "cors",
        credentials: "include",
    }).then((response)=>{
        console.log("Restart for " + chargePointId + " requested.");
        console.log(response.ok ? "Successful" : "Failed");
        return {
            chargepointId: chargePointId,
            success: response.ok,
        };
    }
    ).catch((error)=>{
        console.error(error);
    }
    );
}
);

Promise.all(promiseArray).then((values)=>{
    const successes = values.filter(value=>value.success === true)
    const fails = values.filter(value=>value.success === false)
    console.log(`Successful reboots:${successes.length}, ${(successes.length / total * 100).toFixed(2)}%`)
    console.table(successes);
    console.log(`Failed reboots:${fails.length}, ${(fails.length / total * 100).toFixed(2)}%`);
    console.table(fails);
});
