/**
 * Created by ZZQ on 2017/3/21.
 */
(function() {
    let nameInput = document.getElementById("name");
    let nameMessage = document.getElementById("nameMessage");
    let passwordInput = document.getElementById("password");
    let passwordMessage = document.getElementById("passwordMessage");
    let passwordRepeatInput = document.getElementById("passwordRepeat");
    let passwordRepeatMessage = document.getElementById("passwordRepeatMessage");
    let emailInput = document.getElementById("email");
    let emailMessage = document.getElementById("emailMessage");
    let telInput = document.getElementById("tel");
    let telMessage = document.getElementById("telMessage");
    
    function validateName() {
        let pass = /^.{4,16}$/.test(nameInput.value);
        nameInput.className = pass ? "success" : "fail";
        nameMessage.className = pass ? "success" : "fail";
        nameMessage.innerText = pass ? "名称格式正确" : "名称格式错误";
        return pass;
    }
    
    function validatePassword() {
        let pass = passwordInput.value;
        passwordInput.className = pass ? "success" : "fail";
        passwordMessage.className = pass ? "success" : "fail";
        passwordMessage.innerText = pass ? "密码可用" : "密码不得为空 ";
        return pass;
    }
    
    function validatePasswordRepeat() {
        let pass = passwordRepeatInput.value == passwordInput.value;
        passwordRepeatInput.className = pass ? "success" : "fail";
        passwordRepeatMessage.className = pass ? "success" : "fail";
        passwordRepeatMessage.innerText = pass ? "密码输入一致" : "密码输入不一致";
        return pass;
    }
    
    function validateEmail() {
        let pass = /^\w+@\w+(\.\w+)+$/.test(emailInput.value);
        emailInput.className = pass ? "success" : "fail";
        emailMessage.className = pass ? "success" : "fail";
        emailMessage.innerText = pass ? "邮箱格式正确" : "邮箱格式错误";
        return pass;
    }
    
    function validateTel() {
        let pass = /^\d{11}$/.test(telInput.value);
        telInput.className = pass ? "success" : "fail";
        telMessage.className = pass ? "success" : "fail";
        telMessage.innerText = pass ? "手机格式正确" : "手机格式错误";
        return pass;
    }
    
    nameInput.onfocus = function () { nameMessage.style.display = "block"; };
    passwordInput.onfocus = function () { passwordMessage.style.display = "block"; };
    passwordRepeatInput.onfocus = function () { passwordRepeatInput.style.display = "block"; };
    emailInput.onfocus = function () { emailMessage.style.display = "block"; };
    telInput.onfocus = function () { telMessage.style.display = "block"; };
    
    nameInput.onblur = validateName;
    passwordInput.onblur = validatePassword;
    passwordRepeatInput.onblur = validatePasswordRepeat;
    emailInput.onblur = validateEmail;
    telInput.onblur = validateTel;
    
    document.getElementById("submit").onclick = function () {
        alert((validateName() && validatePassword() && validatePasswordRepeat() && validateEmail() && validateTel()) ? "提交成功" : "提交失败");
    }
}());