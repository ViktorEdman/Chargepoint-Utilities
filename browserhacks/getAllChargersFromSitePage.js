(function () {
    const commaseparated = confirm('Do you want that commaseparated?')
    const locationId = location.pathname.split('/')[2]
    const requestUri = `https://www.blms.nu/api/chargepoints/list/?locationId=${locationId}&page=1&pageSize=500&IsArchived=false&isHomeCharger=null&isPublic=null`
    fetch(requestUri).then(response => response.json()).then((response)=> console.log(response.chargePoints.map(charger => charger.chargePoint.chargePointId).join(commaseparated ? ',' : '\n')))
})();   