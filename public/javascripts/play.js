angular.module('app', [])
  .controller('playCtrl', playCtrl)

function playCtrl($scope, GameApi) {
  const api = new GameApi(cp4_global_uid);
	
}
