angular.module('app', [])
  .controller('appCtrl', appCtrl)

function appCtrl($scope) {
	$scope.username = 'Potato';

	$scope.uid = cp4_global_uid;
}
