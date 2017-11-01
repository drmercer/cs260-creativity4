angular.module('app', [])
  .controller('playCtrl', playCtrl)

function playCtrl($scope, GameApi) {
  const api = new GameApi(cp4_global_uid);

  $scope.game = cp4_game;

  // Set up the initial state of the error banner
  var intervalId;
  hideErr();

  function refreshGame() {
    api.getGame($scope.game.id)
      .then(game => $scope.game = game)
      .then(hideErr)
      .catch(showErr);
  }

  function showErr() {
    if (!$scope.connectionErr) {
      $scope.connectionErr = true;
      // When connection is bad, increase the ping interval
      clearInterval(intervalId);
      intervalId = setInterval(refreshGame, 5000);
    }
  }

  function hideErr() {
    if ($scope.connectionErr !== false) {
      $scope.connectionErr = false;
      // Refresh game every few hundred milliseconds
      clearInterval(intervalId);
      intervalId = setInterval(refreshGame, 900);
    }
  }
}
