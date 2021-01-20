const urlVelibStation = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes`


const showVelibStation = (selector, name, numberClassicalVelibs, numberElectricVelibs) => {
    selector.innerHTML += `
        <div>
            <h2>Station : ${name}</h2>
            <p>${numberClassicalVelibs} classical Velibs</p>
            <p>${numberElectricVelibs} electric Velibs</p>
        </div>
    `
}

const velibStation = document.getElementById("velib_station")

const velibStationFetch = () => {
    fetch(urlVelibStation)
        .then(response => response.json())
        .then(response => response.records)
        .then(post => {
            console.log("test");
            const stations = post.map(station => station.fields)

            velibStation.innerHTML = ""
            stations.forEach(station => {
                showVelibStation(velibStation, station.name, station.mechanical, station.ebike)
            });
        })

}

velibStationFetch()
setInterval(velibStationFetch, 60000)