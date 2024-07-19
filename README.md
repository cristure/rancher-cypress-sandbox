# rancher-cypress-sandbox

This a demo testing suite for the Rancher UI using cypress.

The testing suite requires an instance of Rancher installed and reachable from the target machine. It also requires an 
user with a password set in. Before running the tests, please populate in `cypress/fixtures/global.json` the `username`
and `password` fields.

Once Rancher has been configured, in order to trigger the tests run the following command `npx cypress open`
