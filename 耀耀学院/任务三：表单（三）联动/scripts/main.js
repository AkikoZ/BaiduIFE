/**
 * Created by ZZQ on 2017/3/21.
 */
(function() {
    let schoolMap = new Map([["beijing", ["北京大学", "清华大学"]], ["shanghai", ["复旦大学", "交通大学"]]]);
    let citySelect = document.getElementById("city");
    let schoolSelect = document.getElementById("school");
    
    document.getElementById("inSchool").onclick = changeSchoolState;
    document.getElementById("outSchool").onclick = changeSchoolState;
    citySelect.onchange = changeCity;
    changeCity();
    
    function changeSchoolState() {
        document.getElementById(this.value == "in" ? "outSchoolInputs" : "inSchoolInputs").style.display = "none";
        document.getElementById(this.value == "in" ? "inSchoolInputs" : "outSchoolInputs").style.display = "block";
    }
    
    function changeCity() {
        let schools = schoolMap.get(citySelect.options[citySelect.selectedIndex].value);
        while (schoolSelect.children.length)
            schoolSelect.removeChild(schoolSelect.lastElementChild);
        for (let school of schools) {
            let option = document.createElement("option");
            option.innerText = school;
            schoolSelect.appendChild(option);
        }
    }
}());