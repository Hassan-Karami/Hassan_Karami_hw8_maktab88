const submitBtn = document.getElementById("submit");
const userInput = document.getElementById("user");
const userPara = document.getElementById("userPara");
const passInput = document.getElementById("pass");
const passPara = document.getElementById("passPara");
const repassInput = document.getElementById("repass");
const repassPara = document.getElementById("repassPara");
submitBtn.onclick = function() {
    const userName = userInput.value.trim();
    if (userName === "") {
        userPara.textContent = "الزامی";
        userInput.style.border = "2px solid red";
    } else {
        userPara.textContent = "";
        userInput.style.border = "1px solid black";
    }
    const passWordTrimmed = passInput.value.trim();
    const passWord = passInput.value;
    const passLenValid = passWord.length >= 8;
    if (passWordTrimmed === "") {
        passPara.textContent = "الزامی";
        passInput.style.border = "2px solid red";
    } else if (!passLenValid) {
        passPara.textContent = "رمز عبور باید شامل حداقل ۸ کاراکتر و حداقل یک عدد و یک حرف باشد";
        passInput.style.border = "2px solid red";
    } else {
        passPara.textContent = "";
        passInput.style.border = "1px solid black";
    }
    const repassWordTrimmed = repassInput.value.trim();
    const repassWord = repassInput.value;
    if (repassWordTrimmed === "") {
        repassPara.textContent = "الزامی";
        repassInput.style.border = "2px solid red";
    } else if (passWord !== repassWord) {
        repassPara.textContent = " رمزهای وارد شده یکسان نیستند ";
        repassInput.style.border = "2px solid red";
    } else {
        repassPara.textContent = "";
        repassInput.style.border = "1px solid black";
    }
}