(function(angular){
    'user strict';

    angular
    .module('todoApp.ctrl',[])
    .controller('todoController',['$scope','$location','todoSrv', TodoController])
	
		function TodoController($scope,$location,todoSrv){
			// Your starting point. Enjoy the ride!
		
			var vm =$scope;
			
			//1 展示列表
            var todoList=todoSrv.getData();
			vm.todoList=todoList;

			//2 添加任务
			vm.taskName='';
			vm.add=function(){
				if(vm.taskName.trim()===''){
					return;
				}

                todoSrv.add(vm.taskName);

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

			//6 清除已完成的任务
			//保留未完成的任务
			vm.delCompleted=function(){
				var tempArr=[];
				for(var i=0; i<todoList.length;i++){
					if(!todoList[i].isCompleted){
						tempArr.push(todoList[i]);
					}
				}

				//赋值
				// vm.todoList=todoList=tempArr;

				//清空数组
				todoList.length=0;
				[].push.apply(todoList,tempArr);
			};
			//6.1 控制清除任务按钮的展示和隐藏
			vm.isShow = function(){
				var ret=false;
				for(var i=0;i<todoList.length;i++){
					if(todoList[i].isCompleted){
						ret=true;
						break;
					}
				}
				// ret=todoList.some(function(v){
				// 	v.isCompleted==true;
				// 	break;
				// })
				return ret;
			}

			// 7 显示未完成任务数
			vm.getCount=function(){
				var count=0;
				for(var i=0;i<todoList.length; i++){
					if(!todoList[i].isCompleted){
						count++;
					}
				}
				return count;
			};

			// 8 显示不同状态的任务 以及当前任务高亮处理
			vm.status=false;
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
			vm.location=$location;
			vm.$watch('location.url()',function(newVal,oldVal){
				console.log(newVal);
				switch(newVal){
					case '/active':
						vm.status=false;
						break;
					case '/completed':
						vm.status=true;
						break;
					default:
						vm.status=undefined;
						break;
				}
			});
		}
})(angular);