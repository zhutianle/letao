// //进度环
// NProgress.configure({
//     showSpinner: false
// });
// $(document).ajaxStart(function () {
//     NProgress.start();
// });
// $(document).ajaxStop(function () {
//     setTimeout(function () {
//         NProgress.done();
//     }, 500);
// });




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
$('.btn-out').on('click',function () {
    $('#outuser').modal("show")
})