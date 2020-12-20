'use strict';

const v3 = require('../../../lib').v3;
// If using this code outside of this library the above should be replaced with
// const v3 = require('node-hue-api').v3;

const USERNAME = require('../../../test/support/testValues').username;


v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(USERNAME);
  })
  .then(api => {
    // Create a new group that we can then delete
    const zone = v3.model.createZone();
    zone.name = 'Testing Group Deletion';

    return api.groups.createGroup(zone)
      .then(group => {
        // Display the new group
        console.log(group.toStringDetailed());

        // Delete the group we just created
        return api.groups.deleteGroup(group.id);
      });
  })
  .then(result => {
    console.log(`Deleted group? ${result}`);
  })
  .catch(err => {
    console.error(err);
  })
;