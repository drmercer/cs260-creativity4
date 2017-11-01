angular.module('app', [])
  .factory('GameApi', gameapiFactory)
  .controller('appCtrl', appCtrl)

function appCtrl($scope, GameApi) {
  const api = new GameApi(cp4_global_uid);
	$scope.username = cp4_global_uid;
  $scope.games = [];

  $scope.createGame = () => api.createGame()
    .then(() => api.listGames())
    .then(games => $scope.games = games);
}

//======================================================================
//      Game API factory

function gameapiFactory($http) {
  const API_ROOT = 'api/game/';

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

    getGame: function(gameId) {
      return $http.get(API_ROOT+"get/"+gameId)
        .then(resp => resp.data);
    },
  };

  return GameApi;
}
