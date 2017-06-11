$(document).ready(function() {
    $("#register").click(function() {
        var info = document.getElementsByName("info");
        $.ajax({
            url: "https://api.seeonce.cn/chicken/public/user/new",
            method: "post",
            data: {
                username: info[0].value,
                password: info[1].value,
                nickname: info[2].value
            }
        }).done(function(data) {
            if (data.code == 200) {
                alert("操作成功");
            }
            if (data.code == 400) {
                alert("操作失败");
            }
        }).fail(function() {

        });
        console.log({
            url: "https://api.seeonce.cn/chicken/public/user/new",
            method: "post",
            data: {
                username: info[0].value,
                password: info[1].value,
                nickname: info[2].value
            }
        });
    })
});
