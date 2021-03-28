# cakebookwitter client

This project was written in Typescript/React.js

It displays a list of delicious cakes.
Cakes can be added and removed by calling various APIs from cakebookwitter_client repo project.

## Deployment

To deploy the app locally

Just run ``` npm install ``` and ``` npm start ``` 

to run the app.

If you've got cakebookwitter_client server running already the app will communicate without any additional configuration.
The url variable in the .env file is already pointing at REACT_APP_API_URL=http://localhost:8000 
The other variable is where the server is deployed.
On the deployed app CORS is enabled so your local instance will not be able to talk to it.

