(function (angular) {
	'use strict';
	angular
		.module('todoApp',[])
		.controller('todoController',['$scope', TodoController])
	
		function TodoController($scope){
			// Your starting point. Enjoy the ride!
			//1 展示列表
			var vm =$scope;
			var todoList=[
				{ id:1, name: '预习', isCompleted:true},
				{ id:2, name: '学习Angular', isCompleted:false},
				{ id:3, name: '代码练习', isCompleted:false},
				{ id:4, name: '复习', isCompleted:false},
			];
			vm.todoList=todoList;

			//2 添加任务
			vm.taskName='';
			vm.add=function(){
				if(vm.taskName.trim()===''){
					return;
				}
				var id,length=todoList.length;
				if(length<=0){
					id=1;
				}else{
					id=todoList[length-1]+1;
				}
				todoList.push({ id:id, name:vm.taskName, isCompleted:false });
				vm.taskName='';
			}
		}
})(angular);
