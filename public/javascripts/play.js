angular.module('app', [])
  .controller('playCtrl', playCtrl)

function playCtrl($scope, GameApi) {
  const api = new GameApi(cp4_global_uid);

  $scope.game = cp4_game;
  $scope.connectionErr = false;

  // Refresh game every few hundred milliseconds
  setInterval(refreshGame, 900);

  function refreshGame() {
    api.getGame($scope.game.id)
      .then(game => $scope.game = game)
      .then(hideErr)
      .catch(showErr);
  }

  function showErr() {
    $scope.connectionErr = true;
  }

  function hideErr() {
    $scope.connectionErr = false;
  }
}
