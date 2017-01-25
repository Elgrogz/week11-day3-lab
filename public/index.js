var data = null;

var makeRequest = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
}

var populateList = function(countries) {
    var select = document.querySelector('#list-of-countries');

    countries.forEach(function(country) {
      var option = document.createElement('option');
      option.innerText = country.name;
      option.value = country.name;
      select.appendChild(option);
    });
  }

  var getCountry = function() {
    var container = document.querySelector('#country-info');
    container.innerText = "";
    data.forEach(function(country){
      if (country.name === this.value){
        console.log(country.name);
        var ul = document.createElement('ul');
        ul.innerText = country.name;
        var population = document.createElement('li');
        population.innerText = "Population: " + country.population;
        ul.appendChild(population);
        var capital = document.createElement('li');
        capital.innerText = "Capital city: " + country.capital;
        ul.appendChild(capital);
        container.appendChild(ul);

        var mapDiv = document.querySelector('#country-map');
        var coords = {lat: country.latlng[0], lng: country.latlng[1]};
        var mainMap = new MapWrapper(mapDiv, coords, 6);
        mainMap.addMarker(coords);

        localStorage.setItem('country', this.value)
      }
    }.bind(this));
  }

  var requestComplete = function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    data = JSON.parse(jsonString);

    populateList(data);
  }

  var app = function() {
      var url = "https://restcountries.eu/rest/v1/all";
      makeRequest(url, requestComplete);  

      var listOfcountries = document.querySelector('#list-of-countries');
    
    listOfcountries.onchange = getCountry;




   

  }

  window.onload = app;