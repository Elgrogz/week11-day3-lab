var makeRequest = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = callback;
    request.send();
}

var populateList = function(countries) {
    var ul = document.querySelector('#country-list');

    countries.forEach(function(country) {
      var li = document.createElement('li');
      li.innerText = country.name;
      ul.appendChild(li);
    });
  }

  var requestComplete = function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var countries = JSON.parse(jsonString);

    populateList(countries);
  }

  var app = function() {
    var getCountries = document.querySelector('#get-countries');
    var url = "https://restcountries.eu/rest/v1/all";
    
    getCountries.onclick = function() {
      makeRequest(url, requestComplete);  
    }

  }

  window.onload = app;