/**
var OAuthAccessTokensSchema = new Schema({
  accessToken: { type: String, required: true, unique: true },
  clientId: String,
  userId: { type: String, required: true },
  expires: Date
});

var OAuthRefreshTokensSchema = new Schema({
  refreshToken: { type: String, required: true, unique: true },
  clientId: String,
  userId: { type: String, required: true },
  expires: Date
});

var OAuthClientsSchema = new Schema({
  clientId: String,
  clientSecret: String,
  redirectUri: String
});

**/

var Bookshelf = require('bookshelf').mysqlAuth;

var OAuthAccessToken = Bookshelf.Model.extend({
    tableName: 'oauth_access_tokens'
});
var OAuthRefreshToken = Bookshelf.Model.extend({
    tableName: 'oauth_refresh_tokens'
});
var OAuthClient = Bookshelf.Model.extend({
    tableName: 'oauth_clients'
});

Bookshelf.model('OAuthRefreshToken', OAuthRefreshToken);
Bookshelf.model('OAuthAccessToken', OAuthAccessToken);
Bookshelf.model('OAuthClient', OAuthClient);

var oauth = {

    /**** Always Required ****/
    getAccessToken: function(bearerToken, callback) {
        OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
    },

    /**** Always Required ****/
    saveAccessToken: function(token, clientId, expires, userId, callback) {
      var fields = {
        clientId: clientId,
        userId: userId,
        expires: expires
      };
      OAuthAccessTokensModel.update({ accessToken: token }, fields, { upsert: true }, function(err) {
        if (err) {
          console.error(err);
        }

        callback(err);
      });
    },

    /**** Always Required ****/
    getClient: function(clientId, clientSecret, callback){
        var params = { clientId: clientId };
        if (clientSecret != null) {
            params.clientSecret = clientSecret;
        }
        OAuthClientsModel.findOne(params, callback);
    },
    /**** Always Required ****/
    grantTypeAllowed: function (clientId, grantType, callback) {
        var authorizedClientIds = ['web', 'app'];
        if (grantType === 'password' || grantType === 'authorization_code') {
            return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
        }
        callback(false, true);
    },

    /****Required for [password] grant type ***/
    getUser: function(username, password, callback) {
      //校验用户名和密码是否正确
      OAuthUsersModel.authenticate(username, password, function(err, user) {
        if (err || !user) return callback(err);
        callback(null, user.username);
      });
    }),

    /****Required for [refresh_token] grant type ***/
    getRefreshToken:  function(refreshToken, callback) {
      OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, function(err, token) {
        // node-oauth2-server defaults to .user or { id: userId }, but { id: userId} doesn't work
        // This is in node-oauth2-server/lib/grant.js on line 256
        if (token) {
          token.user = token.userId;
        }
        callback(err, token);
      });
    },
    /****Required for [refresh_token] grant type ***/
    saveRefreshToken: function(token, clientId, expires, userId, callback) {
      if (userId.id) {
        userId = userId.id;
      }

      var refreshToken = new OAuthRefreshTokensModel({
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
      });

      refreshToken.save(callback);
    },

    /****Required for [authorization_code] grant type ***/
    getAuthCode:  function(authCode, callback) {
        OAuthAuthCodeModel.findOne({ authCode: authCode }, callback);
    },
    /****Required for [authorization_code] grant type ***/
    saveAuthCode: function(code, clientId, expires, userId, callback) {
        var fields = {
            clientId: clientId,
            userId: userId,
            expires: expires
        };

        OAuthAuthCodeModel.update({ authCode: code }, fields, { upsert: true }, function(err) {
            if (err) {
              console.error(err);
            }
            callback(err);
        });
    }
}

module.exports = auth;