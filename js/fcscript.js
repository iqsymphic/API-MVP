"use strict";

const apiKey =
  "a5c729b3cf224d268a63435072b5f04a0edf7be10062443bb849f39e40824229";
const searchURL = "https://xivapi.com/freecompany/search";

$(document).ready(function() {
  watchForm();
});

function watchForm() {
  $("#search-form").submit(e => {
    event.preventDefault();
    let searchFreeCompany = $("#name-input").val();
    let searchServer = $("#server-input").val();
    getCharacterInfo(searchFreeCompany, searchServer);
  });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.Results.length; i++) {
    $("#results-list").append(
      `<ul style="list-style-type:none;"><li><br><br>
             <h3>Name: ${responseJson.Results[i].Name}</h3>
              <p>Server: ${responseJson.Results[i].Server}</p>
          <br><br>
          </li></ul>`
    );
  }
  $("#results-list").removeClass("hidden");
}

function getCharacterInfo(query, query2) {
  const params = {
    name: query,
    server: query2,
    private_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url, { mode: "cors" })
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
}
