function doUpload() {
    [0, 1, 2, 3, 4].forEach((diff) => {
        $.ajax({
            url: "https://maimai.wahlap.com/maimai-mobile/record/musicGenre/search/?genre=99&diff=" + diff,
            type: "GET",
            async: false,
            success: (res) => {
                $.ajax({
                    url: "https://www.diving-fish.com/api/pageparser/page",
                    type: "POST",
                    async: true,
                    data: "<login><u>" + window.u + "</u><p>" + window.p + "</p></login>" + res.match(/<html.*>([\s\S]*)<\/html>/)[1].replace(/\s+/g, " "),
                    contentType: "text/plain",
                    success: (res) => document.getElementById("info-box").innerHTML += "diff" + diff + ": " + JSON.stringify(res) + "<br>"
                });
            }
        });
    });
}

window.onload = function () {
    var box = document.createElement("div");
    box.id = "info-box";
    box.style = "position:fixed;bottom:4.8rem;right:1.4rem;z-index:514;overflow:scroll;\
    width:calc(100% - 2.8rem);height:10rem;max-width:320px;border-radius:4px;\
    padding:1rem;background-color:#ffffffbb;box-shadow:1px 2px 6px rgba(0,0,0,0.2);\
    backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(5px);";
    box.innerHTML = "";

    var button = document.createElement("Button");
    button.id = "dxp-btn"
    button.innerHTML = "上传<br>成绩";
    button.style = "width:3rem;height:3rem;border-radius:4px;bottom:1.4rem;right:1.4rem;position:fixed;z-index: 114;\
    background-color: #ffffffbb;box-shadow:1px 2px 6px rgba(0,0,0,0.2);\
    backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(5px);\
    font-size:0.8rem;";
    button.onclick = function () {
        var r = confirm("确定上传成绩到查分器吗？\n(上传需要一点时间，请勿离开页面)");
        if (r == true) {
            document.body.appendChild(box);
            document.getElementById("dxp-btn").setAttribute("disabled", "disabled");
            doUpload();
            document.getElementById("dxp-btn").removeAttribute("disabled");
        }
    }
    document.body.appendChild(button);
}