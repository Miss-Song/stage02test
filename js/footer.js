$(function(){
    $("#footer").load("../html/footer.html",function(){
        $("footer figure").on("click",function(){
            $(this).addClass("ck")
            .siblings().removeClass("ck");
        });
    });
});