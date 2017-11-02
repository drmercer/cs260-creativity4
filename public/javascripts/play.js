angular.module('app', [])
  .controller('playCtrl', playCtrl)

function playCtrl($scope, GameApi) {
  const api = new GameApi(cp4_global_uid);

  $scope.game = cp4_game;
  const gameId = cp4_game.id;

  $scope.dice = [1,2,3,4,5];

  $scope.showObjection = false;

  $scope.takeTurn = function(guess) {
    if (!guess) {
      // Call their bluff
      $scope.showObjection = true;
      setTimeout(function(){ $scope.showObjection = false}, 2500);
      api.callBluff(gameId)
        .then(game => $scope.game = game)
        .catch(err => alert(err.data.msg));
    } else {
      const parts = guess.split(/\s+/);
      const qty = parseInt(parts[0]);
      const side = parseInt(parts[1]);
      // Make a guess
      api.makeGuess(gameId, {qty, side})
        .then(game => $scope.game = game)
        .catch(err => alert(err.data.msg));
    }
  }

  //======================================================================
  //      Refresh and 'connection error' banner

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
