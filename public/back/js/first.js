$(function () {
    // 自定义默认属性
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页的数量
    // 封装一个ajax  渲染页面
    function render() {
        // 发送ajax数据
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('tpl', data));
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
    //  添加框
    $(".btn_add").on("click", function () {

        $("#addbrand").modal("show");

    });

    //表单校验
    var $form = $("form");
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }, 
        fields: {
            categoryName: { 
                validators: {
                    //非空
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                } 
            }
        }
    });

    // 校验成功
    $form.on("success.form.bv", function (e) {
        //阻止默认提交
        e.preventDefault();
      
        // 发送ajax进行提交
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (data) {
               if(data.success){
                   //隐藏添加框
                 $("#addbrand").modal("hide");  
                 currentPage = 1;
                 render();
                //  重置表单
                 $form.data("bootstrapValidator").resetForm();
                 $form[0].reset();//数据
                 
               } 
                
            }
        })
      })


})