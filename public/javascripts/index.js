angular.module('app', [])
  .controller('appCtrl', appCtrl)

function appCtrl($scope) {
	$scope.username = 'Potato';
}
