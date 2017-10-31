angular.module('app', [])
  .controller('appCtrl', appCtrl)

function appCtrl($scope) {
	$scope.username = cp4_global_uid;
}
