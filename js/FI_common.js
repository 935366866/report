$(function(){
    //打开时根据窗口大小选择
    checkWindowSize(".change_box");
    //变动时根据浏览器大小选择样式
    $(window).resize(checkWindowSize);

    //导航下拉菜单
    var nav_list_all = ["nav1_list1","nav2_list1","nav2_list2"];
    for(var i in nav_list_all){
        var name = nav_list_all[i];
        $("."+name).mouseover(function(){
            $(this).addClass("listshow");
        });
        $("."+name).mouseout(function(){
            $(this).removeClass("listshow");
        });
    };
});

//===========================函数========================
//1.根据浏览器大小选择样式
function checkWindowSize(){
    var id=".change_box";
    if($(window).width()>=1200){
        $(id).addClass("bigbox_1200");
        $(id).removeClass("bigbox");
    }else{
        $(id).addClass("bigbox");
        $(id).removeClass("bigbox_1200");
    };
};
