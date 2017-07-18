(function (angular) {
	'use strict';
	angular
		.module('todoApp',['todoApp.ctrl','todoApp.service']);
		//todoApp.ctrl和todoApp.service都是todoApp这个主模块的子模块
})(angular);
