angular.module('app', [])
  .controller('appCtrl', appCtrl)

function appCtrl($scope, GameApi) {
  const api = new GameApi(cp4_global_uid);
	$scope.username = cp4_global_uid;
  $scope.games = [];

  refreshGames();

  $scope.createGame = () => api.createGame()
    .then(refreshGames)

  $scope.joinGame = form => api.joinGame(form.id)
    .then(refreshGames)
    .catch(err => alert(err.data.msg));

  $scope.startGame = id => api.startGame(id)
    .then(() => api.listGames())
    .then(games => $scope.games = games);

  function refreshGames() {
    return api.listGames()
      .then(games => $scope.games = games);
  }
}
