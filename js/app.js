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
					id=todoList[length-1].id+1;
				}
				todoList.push({ id:id, name:vm.taskName, isCompleted:false });
				vm.taskName='';
			}

			// 3.删除一条任务
			vm.del=function(id){
				for(var i=0;i<todoList.length;i++){
					if(todoList[i].id===id){
						todoList.splice(i,1);
						break;
					}
				}
			}
			

			// 4 修改任务
			vm.editingId=-1;
			vm.edit=function(id){
				vm.editingId=id;
			};
			vm.editSave=function(){
				vm.editingId=-1;
			};

			//5 切换任务选中状态(批量)
			vm.isCheckedAll=false;
			vm.checkAll=function(){
				console.log(1)
				for(var i=0;i<todoList.length;i++){
					todoList[i].isCompleted=vm.isCheckedAll;
				}
			};

			
		}
})(angular);
