// 入口函数，调用获取用户个人信息函数
$(function() {
    getUserInfo()

    // 用户退出功能
    $('#btnLogout').on('click', function() {
        // alert(1)
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')

            // 跳转到登录页
            location.href = '/login.html'

            // 关闭询问框
            layer.close(index);

        });
    })
})

// 外部封装获取个人信息函数
function getUserInfo() {
    // 发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        // 注意这里是设置有权限的接口
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            // 这里执行渲染头像的函数
            renderAvatar(res.data)
        }
    })
}

// 封装渲染头像的函数
function renderAvatar(user) {
    // 判断是否有用户昵称
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 判断是否有头像
    // 有头像
    // console.log(user);
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
            // 设置src属性


    } else {
        // 无头像
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(name[0].toUpperCase())
            // console.log(name[0].toUpperCase());
    }




}