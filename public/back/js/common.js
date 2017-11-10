//进度环
NProgress.configure({
    showSpinner: false
});
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
});

//页面一加载，先发送一个判断用户是否登录的请求，如果登录，不做任何的使用，如果没登录，跳转到登录页面。
//非登陆页发送这个ajax请求
if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (data) {
        if(data.error === 400){
          location.href = "login.html";
        }
      }
    });
  
  }



//二级菜单显示隐藏  
$(".nav-child").prev().on("click", function () {
    $(this).next().slideToggle();
});

//侧边栏显示隐藏
$(".btn-left").on("click", function () {
    $(".lt-left").toggleClass("now");
    $(".lt-mian").toggleClass("now");
});

//  退出登录
$('.btn-out').on('click', function () {
    $('#outuser').modal("show");

    $(".btn_confirm").off().on("click", function () { 
        //给服务器发送ajax请求，让服务器清除session
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            success: function (data) { 
                if (data.success) {
                    location.href = "login.html";
                }
            }
        });

    });
})

//非登陆页发送这个ajax请求
if (location.href.indexOf("login.html") == -1) {
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        success: function (data) {
            if (data.error === 400) {
                location.href = "login.html";
            }
        }
    });

}