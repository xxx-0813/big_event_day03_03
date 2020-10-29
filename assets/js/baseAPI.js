    // 开发环境地址
    var baseUrl = "http://ajax.frontend.itheima.net"
        // 测试环境地址
        // var baseUrl = "http://ajax.frontend.itheima.net"
        // 生产环境地址
        // var baseUrl = "http://ajax.frontend.itheima.net"

    $.ajaxPrefilter(function(options) {
        // console.log(options);
        // console.log(options.url);
        options.url = baseUrl + options.url
            // console.log(options.url);

        //统一配置headers属性options.url.indexOf('/my/') !== -1说明存在/my/字符
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }

        }

        // console.log(options.headers);
        // 拦截所有ajax请求， 判断是否需要身份认证
        options.complete = function(res) {
            console.log(res.responseJSON);
            console.log(res);
            var obj = res.responseJSON
            if (obj.status !== 1 && obj.message !== '身份认证失败！') {
                // 清空本地token
                localStorage.removeItem('token')

                // 跳转页面
                location.href = '/login.html'

            }
        }

    })