$(function(){
   
    $("#login").on("click",function(){
        var $name=$("#username").val();
        var $pw=$("#pw").val();
        $.post("http://47.104.244.134:8080/userlogin.do", { "name": $name, "password": $pw }, function (data) {
            if (data["msg"].toLowerCase() != "ok") {
               alert("用户名或密码有错误，请重新输入");
            } else {
                if (getCookie("name") != $name) {
                    setCookie("name", $name, 7);
                    setCookie("pw",$pw,7);
                }
                setCookie("token",data["data"]["token"]);
                console.log(getCookie("token"));
               location.href = "../html/index.html";
            }
        });
    });
   // var email = /^\w+@\w+(\.\w+)+$/;
    $("#regist").click(function(){
        var $name=$("#username").val();
        var $pw=$("#pw").val();
        $.get("http://47.104.244.134:8080/username.do", { "username": $name }, function (data) {
            if (data["msg"] != "成功") {
                var aa = "";
                /* if (email.test($name)) {
                    aa = $name;
                } else {
                    aa = $name + "@163.com";
                } */
                var dd=Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10)+"@163.com";
                $.get("http://47.104.244.134:8080/useremail.do", { "email": aa }, function (data) {
                    if(data["msg"]!="成功"){
                        $.post("http://47.104.244.134:8080/usersave.do", { "username": $name, "password": $pw, email: dd, sex: "男" }, function (data) {
                           if(data["msg"]!="失败")
                           {alert("注册失败");}
                           else{
                               alert("注册成功");
                           // location.href("../html/mine.html");
                           }
                        });
                    }
                });
               
            } else {
                alert("已存在本用户，请重新命名");//成功代表已经存在本用户名，不能重名
            }

        });
    });

});