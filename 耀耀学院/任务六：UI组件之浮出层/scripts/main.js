/**
 * Created by ZZQ on 2017/4/2.
 */
(function() {
    let modal = document.getElementById("modal");
    let backdrop;

    document.getElementById("show").onclick = showModal;
    document.getElementById("hide").onclick = hideModal;

    function showModal() {
        backdrop = document.createElement("div");
        backdrop.id = "backdrop";
        backdrop.onclick = hideModal;
        document.body.appendChild(backdrop);
        modal.style.cssText = "visibility: visible; opacity: 1; top: 50%; transform: translateY(-50%)";

    }

    function hideModal() {
        modal.style.cssText = "visibility: hidden; opacity: 0; top: -2rem; transform: none";
        document.body.removeChild(backdrop);
    }
}());