$(function() {
    // 1.注册登录表单的切换
    $('.link_reg').on('click', function() {
        $('.login_box').hide().next().show()
    })
    $('.link_login').on('click', function() {
        $('.reg_box').hide().prev().show()
    })

    // 2.自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }

        }
    })

    // 3.注册提交功能
    $('#reg_form').on('submit', function(e) {
        e.preventDefault()

        //3.1 ajax提交
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                    // 通过注册：清空表单，跳转登录界面
                $('#reg_form')[0].reset()
                    // 自动触发点击事件
                $('.link_login').trigger('click')
            }
        })
    })

    // 4. 登录表单提交事件
    $('#login_form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()

        // 发送ajax登录请求
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $('#login_form').serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)

                // 登录成功
                layer.msg(res.message)

                // 跳转到index首页
                location.href = '/index.html'

                // 保存token，后面接口需要使用
                localStorage.setItem('token', res.token)
            }
        })

    })


})