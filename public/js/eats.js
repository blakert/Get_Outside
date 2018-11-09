 function addContent(){
      for(let i = 0; i < 5; i++){ 
            const result = document.createElement('div');
            result.setAttribute('class','restauarant');
            
            const restTitle = document.createElement('h1');
            const titleText = document.createTextNode(restaurants[i]["name"]);
            
            const restPara = document.createElement('p');
           // const paraText = document.createTextNode(restaurants[i]["location"]["address"]);
            
            const mapDiv = document.createElement('div');
            mapDiv.setAttribute('id',`mapid${i}`);
            mapDiv.setAttribute('class','maps');
            
            //restPara.appendChild(paraText);
            restTitle.appendChild(titleText);
            result.appendChild(restTitle);
            result.appendChild(restPara);
            result.appendChild(mapDiv)
        } 
}
function addMaps() {
    for (let i = 0; i < 5; i++) {

        let lat = restaurants[i]["restaurant"]["location"]["latitude"];
        let lon = restaurants[i]["restaurant"]["location"]["longitude"];
        const mymap = L.map('mapid' + i).setView([lat, lon], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYnQyMDE4IiwiYSI6ImNqbno2bTY0bTFqbjEza3J3ZzBveHF6OHYifQ.Y93v4zPL5_1TjCje1hNMYw'
        }).addTo(mymap);
    }

}
addContent();

