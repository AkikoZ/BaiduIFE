/**
 * Created by ZZQ on 2017/3/21.
 */
(function() {
    let input = document.getElementById("name");
    let message = document.getElementById("message");
    
    document.getElementById("validate").onclick = function () {
        if (/^.{4,16}$/.test(input.value)) {
            input.className = "success";
            message.className = "success";
            message.innerText = "名称格式正确";
        } else {
            input.className = "fail";
            message.className = "fail";
            message.innerText = "名称格式错误";
        }
    }
}());