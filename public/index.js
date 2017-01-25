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
      select.appendChild(option);
    });
  }

  var requestComplete = function() {
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var data = JSON.parse(jsonString);


    populateList(data);
  }

  var app = function() {
    var listOfcountries = document.querySelector('#list-of-countries');
    var url = "https://restcountries.eu/rest/v1/all";
      makeRequest(url, requestComplete);  
    
    listOfcountries.onchange = function() {
      
    }

  }

  window.onload = app;