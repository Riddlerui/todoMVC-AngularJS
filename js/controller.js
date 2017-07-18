(function (angular) {
	'user strict';

	angular
		.module('todoApp.ctrl', [])
		.controller('todoController', ['$scope', '$location', 'TodoSrv', TodoController])

	function TodoController($scope, $location, TodoSrv) {
		// Your starting point. Enjoy the ride!

		var vm = $scope;

		//1 展示列表
		var todoList = TodoSrv.getData();
		vm.todoList = todoList;

		//2 添加任务
		vm.taskName = '';
		vm.add = function () {
			if (vm.taskName.trim() === '') {
				return;
			}

			TodoSrv.add(vm.taskName);

			vm.taskName = '';
		};

		// 3.删除一条任务
		vm.del = TodoSrv.del;


		// 4 修改任务
		vm.editingId = -1;
		vm.edit = function (id) {
			vm.editingId = id;

		};
		vm.editSave = function () {
			vm.editingId = -1;
			TodoSrv.save();
		};

		//5 切换任务选中状态(批量)
		vm.isCheckedAll = false;
		//单个
		// vm.checked=function(isCompleted){
		// 	isCompleted=!isCompleted;
		// 	TodoSrv.save();
		// };
		vm.checked=TodoSrv.checked;
		//批量
		vm.checkAll = function () {
			TodoSrv.checkAll(vm.isCheckedAll);
		};

		//6 清除已完成的任务
		//保留未完成的任务
		vm.delCompleted = TodoSrv.delCompleted;

		//6.1 控制清除任务按钮的展示和隐藏
		vm.isShow = TodoSrv.isShow;

		// 7 显示未完成任务数
		vm.getCount = TodoSrv.getCount;

		// 8 显示不同状态的任务 以及当前任务高亮处理
		vm.status = false;
		// vm.selectedAll=function(){
		// 	vm.status=undefined;
		// };
		// vm.selectedActive=function(){
		// 	vm.status=false;
		// };
		// vm.selectedCompleted=function(){
		// 	vm.status=true;
		// };

		// 9 根据URL变化显示相应任务
		vm.location = $location;
		vm.$watch('location.url()', function (newVal, oldVal) {
			console.log(newVal);
			switch (newVal) {
				case '/active':
					vm.status = false;
					break;
				case '/completed':
					vm.status = true;
					break;
				default:
					vm.status = undefined;
					break;
			}

		});
	}
})(angular);
