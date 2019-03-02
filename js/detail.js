$(function(){
    window.onload=function(){
        $("#backshou").on("click",function(){
            location.href="../html/index.html";
    
        });
        var dataid=getCookie("dataid");
    
        
        var $div=$("section div");

        $.get("http://47.104.244.134:8080/goodsbyid.do", { "id": dataid },
        function (data) {    
           $div.html( data["name"]);
        });



        $(".goshop").click(function () {
    
            $.get("http://47.104.244.134:8080/cartlist.do", { "token": getCookie("token") },
                function (data) {    
                    var count=false;
                    for (var i in data) {
                        var $gid = data[i]["gid"];
                        var $id = data[i]["id"];
                        
                        if ($gid == dataid) {
                           count=true;
                            break;
                        }
                    }
                    if(count){
                        $.get("http://47.104.244.134:8080/cartupdate.do", { "id": $id, "gid":$gid , "num": 1, "token": getCookie("token") },
                               function (data) {//在控制台中执行cartupdate.do方法，虽然能执行成功，但是如果购物车中本来没有该物件，执行后查询购物车是不能查询到的
                                   if(data["msg"]!="失败"){
                                       alert("加入购物车成功");
                                       location.href="../html/cart.html";
                                   }
                               });
                    }else{
                       
                  
                            $.get("http://47.104.244.134:8080/cartsave.do", { "gid": dataid, "token": getCookie("token") },
                            function (data) {//cartsave.do方法，每次只能加一，而且只要调用就会加上
                                if(data["msg"]!="失败"){    
                                    alert("加入购物车成功");
                                   location.href="../html/cart.html";
                                }
                            });
                      
                      
                    }
    
                });
         
    
    
        });
    
    }
  



});