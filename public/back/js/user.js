$(function () {
    // 自定义默认属性
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页的数量
    // 封装一个ajax  渲染页面
    function render() {
        // 发送ajax数据
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data); 
                $('tbody').html(template('tpl1', data));
                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentPage, //当前页
                    totalPages: Math.ceil(data.total / pageSize), // 总页数
                    // 前三个参数可以不传,但是要写
                    onPageClicked: function (a, b, c, page) {
                        //点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })
            }
        })
    }
    // 调用函数
    render();

    // 更改用户状态弹出模态框
    //禁用启用功能，需要注册委托事件
    $("tbody").on('click', '.btn', function () {
        //   模态框
        $("#userModal").modal("show");
        //获取到当前按钮对应的id
        var id = $(this).parent().data("id");
        //获取是禁用还是启用, 如果是禁用按钮，发送0，否则发送1
        var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        //给确定按钮注册点击事件之前先清空绑定的事件  off()
        $(".btn_edit").off().on("click", function () {
            //发送ajax请求
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },

                success: function (data) {
                    if (data.success) {
                        //操作成功
                        //模态框关闭
                        $("#userModal").modal("hide");
                        //重新调用函数 渲染页面
                        render();
                    }
                }
            });
        });

    })
})