angular
.module('app')
.factory('GameApi', function($http) {
  const API_ROOT = '/api/game/';

  function GameApi(username) {
    this._user = username;
  }

  GameApi.prototype = {
    createGame: function() {
      return $http.get(API_ROOT+"new/"+this._user)
        .then(resp => resp.data);
    },

    listGames: function() {
      return $http.get(API_ROOT+"list/"+this._user)
        .then(resp => resp.data);
    },

    joinGame: function(id) {
      return $http.get(API_ROOT+"join/" + this._user + "/" + id)
        .then(resp => resp.data);
    },

    startGame: function(gameId) {
      return $http.get(API_ROOT+"start/"+gameId)
        .then(resp => resp.data);
    },

    getGame: function(gameId) {
      return $http.get(API_ROOT+"get/"+gameId)
        .then(resp => resp.data);
    },
  };

  return GameApi;
})
