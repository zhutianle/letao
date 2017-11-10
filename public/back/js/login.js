 
$(function () {
    // 验证表单
    var $form = $("form");
    $form.bootstrapValidator({ 
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 12,
                        message: '用户名长度必须在4到12位之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线'
                    },
                    callback: {
                        message: "用户名错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback: {
                        message: "密码错误"
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度必须在6到18位之间'
                    }
                }
            }
        }
        
    });
    //      表单注册一个校验成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:"POST",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function (data){  
                if(data.success){
                    location.href="index.html";
                }
                if(data.error === 1001){ 
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                if(data.error === 1000){ 
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                } 
            }
        })
        
    });

      // 重置功能
  $("[type='reset']").on("click", function () { 
        //获取到validator对象，调用resetForm方法
        $form.data("bootstrapValidator").resetForm(); 
      });
});