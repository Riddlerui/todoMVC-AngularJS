(function(angular){
    'user strict';
    //
    angular
    .module('todoApp.service',[])
    .service('TodoSrv',['$window', function ($scope){
        var todoList=[
				{ id:1, name: '预习', isCompleted:true},
				{ id:2, name: '学习Angular', isCompleted:false},
				{ id:3, name: '代码练习', isCompleted:false},
				{ id:4, name: '复习', isCompleted:false},
			];

        // 从localStorage中获取数据
        var localStorage=$window.localStorage;
        var todoList=JSON.parse(localStorage.getItem('todo'))||[];
        //保存数据
        this.save=function(){
            localStorage.setItem('todo',JSON.stringify(todoList));
        };

        var that=this;    
        
        //获取数据的方法
        this.getData=function(){
            return todoList;
        }

        //添加数据
        this.add=function(taskName){
			var id,length=todoList.length;
			if(length<=0){
				id=1;
			}else{
				id=todoList[todoList.length-1].id+1;
			}

			todoList.push({ id:id, name:taskName, isCompleted:false });
			
            that.save();
			};


    }]);

    
   
})(angular);