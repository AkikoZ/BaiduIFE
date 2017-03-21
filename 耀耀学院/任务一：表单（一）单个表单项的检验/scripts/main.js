/**
 * Created by ZZQ on 2017/3/21.
 */
(function() {
    let input = document.getElementById("name");
    let message = document.getElementById("message");
    
    document.getElementById("validate").onclick = function () {
        let pass = /^.{4,16}$/.test(input.value);
        input.className = pass ? "success" : "fail";
        message.className = pass ? "success" : "fail";
        message.innerText = pass ? "名称格式正确" : "名称格式错误";
    }
}());