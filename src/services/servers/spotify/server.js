var request = require('request'); // "Request" library
var express = require('express'); // Express web server framework
var cors = require('cors');
var querystring = require('querystring');

var token = require('../socket/require');

var app = express();

var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret
var redirect_uri = 'http://localhost:8888/callback/'; // Your redirect uri
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(express.static(__dirname + '/public'))
   .use(cors())

app.get('/login', async function(req, res) {
  var state = generateRandomString(16);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
  );
});

app.get('/callback', function (req, res){
  var code = req.query.code || null;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      await token.receiveSocketId(data => {
        console.log(data._socket)
        token.emit(body)
      })

    /** var access_token = body.access_token,
      refresh_token = body.refresh_token;

       var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      request.get(options, function(error, response, body) {
        return body;
      });
      */
    }
  })

})

console.log('Listening on 8888');
app.listen(8888);
