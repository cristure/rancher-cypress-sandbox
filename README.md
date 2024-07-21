# rancher-cypress-sandbox

This a demo testing suite for the Rancher UI using cypress.

The testing suite requires an instance of Rancher installed and reachable from the target machine. It also requires an 
user with a password set in. Before running the tests, please populate in `cypress/fixtures/global.json` the `username`
and `password` fields.

Once Rancher has been configured, in order to trigger the tests run the following command `npx cypress open`

## Setup example
You will need Docker installed for the following example

1. The test expects a user with a password already defined. You can download my backup from here. [here](https://drive.usercontent.google.com/download?id=1UxD91cgdjqRJ6p5PRHvPaoe4KYbLxpKd&export=download&authuser=0&confirm=t&uuid=cf9b5265-6777-4683-a366-528de22d5750&at=APZUnTVg3SwptgpBiq4jIIAWpU4t:1721565539878).
2. Extract the `.tar.gz`
```azure
tar xvf <DOWNLOAD_FOLDER>.tar.gz
```
3. Create a volume from the respective backup.
```
docker volume create --name my_test_volume --opt type=none --opt device=/home/cristu/rancher/var/lib/rancher --opt o=bind
```

4. Run the rancher container with the volume.
```
docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --privileged --mount source=my_test_volume,target=/var/lib/rancher rancher/rancher:latest
```
