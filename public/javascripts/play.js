angular.module('app', [])
  .controller('playCtrl', playCtrl)

function playCtrl($scope, GameApi, Poller) {
  const api = new GameApi(cp4_global_uid);

  $scope.game = cp4_game;
  $scope.username = cp4_global_uid;
  const gameId = cp4_game.id;

  $scope.dice = [];

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

  const poller = new Poller(refreshGame);
  poller.start();

  function refreshGame() {
    return api.getGame($scope.game.id)
      .then(game => {
        $scope.game = game;
        return api.getMyDice(gameId);
      })
      .then(dice => $scope.dice = dice)
      .then(hideErr)
      .catch(showErr);
  }

  function showErr() {
    $scope.connectionErr = true;
    poller.setInterval(5000);
  }

  function hideErr() {
    $scope.connectionErr = false;
    poller.setInterval(Poller.DEFAULT_INTERVAL);
  }
}
