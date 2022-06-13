function onUploadStart() {
    document.getElementById("dxp-btn").setAttribute("disabled", "disabled");
    document.getElementById("loadingimg").style.display = "block";
}
function onUploadEnd() {
    document.getElementById("dxp-btn").removeAttribute("disabled");
    document.getElementById("loadingimg").style.display = "none";
}

window.onload = function () {
    var loadingimg = document.createElement("img");
    loadingimg.id = "loadingimg";
    loadingimg.src = "https://maimai.pages.dev/loading.gif";
    loadingimg.style = "border-radius:4px;position:fixed;bottom:1.4rem;right:1.4rem;width:3rem;height:3rem;z-index:514;\
    display:none;background-color: #33333333;padding:0.3rem;";
    document.body.appendChild(loadingimg);

    var button = document.createElement("Button");
    button.id = "dxp-btn"
    button.innerHTML = "上传</br>成绩";
    button.style = "width:3rem;height:3rem;border-radius:4px;bottom:1.4rem;right:1.4rem;position:fixed;z-index: 114;\
    background-color: #ffffffbb;box-shadow:1px 2px 6px rgba(0,0,0,0.2);\
    backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(5px);\
    font-size:0.8rem;";
    button.onclick = function () {
        var r = confirm("确定上传成绩到查分器吗？\n(上传需要一点时间，请勿离开页面)");
        if (r == true) {
            onUploadStart();
            c = "";
            [0, 1, 2, 3, 4].forEach((diff) => {
                $.ajax({
                    url: "https://maimai.wahlap.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=" + diff,
                    type: "GET",
                    async: false,
                    success: (res) => {
                        $.ajax({
                            url: "https://www.diving-fish.com/api/pageparser/page",
                            type: "POST",
                            async: false,
                            data: "<login><u>" + window.u + "</u><p>" + window.p + "</p></login>" + res.match(/<html.*>([\s\S]*)<\/html>/)[1].replace(/\s+/g, " "),
                            contentType: "text/plain",
                            success: (res) => window.c += "diff" + diff + ": " + res.message + "\n"
                        });
                    }
                });
            });
            alert(window.c);
            onUploadEnd();
        }
    }
    document.body.appendChild(button);
}