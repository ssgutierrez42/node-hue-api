'use strict';

const v3 = require('../../index').v3
  , testConfig = require('../../test/support/testValues')
;

// Load the Hue Bridge API for the desired bridge and username
async function getApi() {
  const searchResults = await v3.discovery.nupnpSearch()
    , host = searchResults[0].ipaddress
    , username = testConfig.username
  ;

  return await v3.hue.create(host, username);
}

// Obtains a light by name from the Hue Bridge
async function getLight(name) {
  const api = await getApi();

  // Obtain the light using the name provided
  const light = await api.lights.getLightByName(name);

  // Display the details of the light object we got back
  console.log(light.toStringDetailed());
}

// Get a specific light
getLight('Office Desk Right');