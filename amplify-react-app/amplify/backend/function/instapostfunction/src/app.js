/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios')


// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const apiBaseUrl = 'https://bismarck.sdsu.edu/api/instapost-query/';
app.get('/service-calls', function(req, res) {  
  // const response = {"service-calls": 0}
  // const apiEndpoint = apiBaseUrl + 'service-calls';
  const temp = 'https://bismarck.sdsu.edu/api/instapost-query/service-calls';
  axios.get(temp).then(response => {
    console.log('response----->>>',response.data)
    const serviceCalls = response.data['service-calls']
    res.json({serviceCalls})
  }).catch(err => res.json({ error: err }))
  // const serviceCalls  = 0
  // res.json({serviceCalls});
});

app.get('/nicknames', function(req, res) {    
  const apiEndpoint= apiBaseUrl + 'nicknames';
  axios.get(apiEndpoint).then(response => {
    // res.json({nicknames:response.nicknames})    
    const nicknames = response.data['nicknames']
    res.json({nicknames})
  }).catch(err => res.json({ error: err }))
});
app.get('/hashtags', function(req, res) {  
  // const hashtags = [ "HASHTAG1", "HASHTAG2"];
  // res.json({hashtags});
  const apiEndpoint= apiBaseUrl + 'hashtags';
  axios.get(apiEndpoint).then(response => {
    // res.json({hashtags:response.hashtags})
    const hashtags = response.data['hashtags']
    res.json({hashtags})
  }).catch(err => res.json({ error: err }))
  
});
/****************************
* Example post method *
****************************/

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
