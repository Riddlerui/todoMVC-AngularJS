(function (angular) {
	'user strict';
	//
	angular
		.module('todoApp.service', [])
		.service('TodoSrv', ['$window', function ($window) {
			// var todoList=[
			// 		{ id:1, name: '预习', isCompleted:true},
			// 		{ id:2, name: '学习Angular', isCompleted:false},
			// 		{ id:3, name: '代码练习', isCompleted:false},
			// 		{ id:4, name: '复习', isCompleted:false},
			// ];

			// 从localStorage中获取数据
			var localStorage = $window.localStorage;
			var todoList = JSON.parse(localStorage.getItem('todo')) || [];
			// 保存数据
			this.save = function () {
				localStorage.setItem('todo', JSON.stringify(todoList));
			};

			var that = this;

			//获取数据的方法
			this.getData = function () {
				return todoList;
			}

			//添加数据
			this.add = function (taskName) {
				var id, length = todoList.length;
				if (length === 0) {
					id = 1;
				} else {
					id = todoList[todoList.length - 1].id + 1;
				}

				todoList.push({
					id: id,
					name: taskName,
					isCompleted: false
				});

				that.save();
			};

			//删除一条任务
			this.del = function (id) {
				for (var i = 0; i < todoList.length; i++) {
					if (todoList[i].id === id) {
						todoList.splice(i, 1);
						break;
					}
				}
				that.save();
			};

			//单选
			this.checked=function(isCompleted){
				isCompleted=!isCompleted;
				that.save();
			}
			//全选
			this.checkAll = function (isCheckedAll) {
				for (var i = 0; i < todoList.length; i++) {
					todoList[i].isCompleted = isCheckedAll;
				}
				that.save();
			};

			//清除已完成的任务
			this.delCompleted = function () {
				var tempArr = [];
				for (var i = 0; i < todoList.length; i++) {
					if (!todoList[i].isCompleted) {
						tempArr.push(todoList[i]);
					}
				}		
				//清空数组
				todoList.length = 0;
				[].push.apply(todoList, tempArr);

				that.save();
			};

			//清除按钮的显示与隐藏
			this.isShow = function () {
				var ret = false;
				for (var i = 0; i < todoList.length; i++) {
					if (todoList[i].isCompleted) {
						ret = true;
						break;
					}
				}
				return ret;
			};

			//显示未完成任务数
			this.getCount = function () {
				var count = 0;
				for (var i = 0; i < todoList.length; i++) {
					if (!todoList[i].isCompleted) {
						count++;
					}
				}
				return count;
			};
		}]);

})(angular);
