$(function(){
  
   /*   var $img = {
        0: "../img/jd1.jpg",
        1: "../img/jd2.jpg",
        2: "../img/jd3.jpg",
    }
    var str = "";
    for (var i in $img) {
        str += "<li><a href='javascript:void(0)'><img src='" + $img[i] + "' width='1920' height='550' border='0'/></a></li>";
    }
    $(".scroll_cons").html(str);
 $(".scroll_cons").html(str);
    var count = 0;
    var timer = setInterval(dd, 2000);
    function dd() {
        var all = $(".scroll_cons").children().length;
        count++;
        if (count == all) {
            count = 0;
        }
        $(".scroll_nav li").eq(count).addClass("on").siblings().removeClass("on");
        $(".scroll_cons li").eq(count).fadeIn()
            .siblings().fadeOut();
    }
    $("#focus").hover(function(){
         clearInterval(timer);
    },function(){
        timer=setInterval(dd,2000);
    });
    $(".scroll_nav li").mouseover(function () {
        $(this).addClass("on").siblings().removeClass("on");
        var index = $(this).index();
        $(".scroll_cons li").eq(index).fadeIn()
        .siblings().fadeOut();
        count = index;
    }); */




//左右轮播  透明度（显示隐藏）  上下轮播
			var oBannerBox = document.getElementById("bannerBox");
			var oBannerList = document.getElementById("bannerList");
			var aList = oBannerList.children;
			var oNum = document.getElementById("nums");
			var aNums = oNum.children;
			aNums[0].className = "hover";
			var perWidth = aList[0].offsetWidth;
			var oBtn = document.getElementById("btns");
			var oPrev = oBtn.children[0];
			var oNext = oBtn.children[1];
			oBannerList.style.width = perWidth*aList.length/100+"rem";
			var i = 0;
			var timer = setInterval(function(){
				move();
			},3000);
			
			function move(){
				i++;
				//123 123 临界值
				if(i==aList.length){
					oBannerList.style.left = 0;
					i = 1;
				}
				//321321 临界值
				if(i==-1){
					oBannerList.style.left = - perWidth * (aList.length-1)/100+"rem";
					i = aList.length - 2;
				}
				
				//控制角标，让其和展示图片对应
				//先请后加
				for(var j = 0; j < aNums.length; j++){
					aNums[j].className = "";
				}
				if(i==aNums.length){
					//图片在最后一张（对应第一张）角标的特殊处理
					aNums[0].className = "hover";
				}else{
					aNums[i].className = "hover";
				}
                
                $(oBannerList).animate({"left":-6.4*i+"rem"},1000);
				/* startMove(oBannerList,{"left":-perWidth*i}); */
			}
			
			//鼠标移入轮播区域 清除定时器
			oBannerBox.onmouseover = function(){
				clearInterval(timer);
			}
			//移出开启
			oBannerBox.onmouseout = function(){
				timer = setInterval(function(){
					move();
				},3000);
				
			}
			
			//点击两个按钮
			oNext.onclick = function(){
				move();
			}
			oPrev.onclick = function(){
				i-=2;//i值变小，抵消move（）内部i++
				move();
			}
			
			//角标 鼠标移入到1，2，3那个数字上，展现对应的图片
			for(let j = 0; j < aNums.length; j++){
				aNums[j].onmouseover = function(){
					i = j-1;
					move();
				}
			}
    function $bj(index) {
        var index1=10+index;
        console.log(index1);
        $.get("http://47.104.244.134:8080/goodsbytid.do",
            { tid: 13, page: index1, limit: 50 },
            function (data) {
                var data1 = data["data"];
                var str = "";
                for (var i in data1) {
                    var $id = data1[i]["id"];//商品编号
                    var $name = data1[i]["name"];
                    var $picurl = "http:" + data1[i]["picurl"];
                    if ($picurl == "http:") {
                        $picurl = "http://img14.360buyimg.com/n7/s230x230_jfs/t19096/309/1654762601/156092/454f26aa/5ad16775N272af0e3.jpg";
                    }
                    var $price = data1[i]["price"] / 100;
                    
                    str += "<a href='../html/detail.html' data-id='" + $id + "'><img src='" + $picurl + "' width='230' height='230'><div><h2>" + $name + "</h2><p class='price'>￥" + $price + "</p></div></a>"; 
                }
                $("#mainti").html("");
                $("#mainti").html(str);
                $("#mainti a").on("click",function(){
                    var $did=$(this).attr("data-id");
                    setCookie("dataid",$did,7);
                });
            }
        );
    }
    $bj(0);
   
    




});