var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:3000/projects',
  headers: 
   { 'postman-token': '3a7f9ebb-1958-07b9-8d56-b5dae09159b9',
     'cache-control': 'no-cache',
     autorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q3ZWU3NmM3OWIxNWJiODYwMjkxNCIsImlhdCI6MTUzNTAxNzI3NCwiZXhwIjoxNTM1MTAzNjc0fQ.w5NGBMv2bdU-KSDcdvGwwJ_s0ogKtLkUoQd4eARA5p8' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


var options = { method: 'POST',
  url: 'http://localhost:3000/auth/authenticate',
  headers: 
   { 'postman-token': 'd8372c77-713a-caff-5f85-a75a1012c558',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: { email: 'robertodure13@gmail.com', password: '12345' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
