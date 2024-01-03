var loopStatus = 0;
var startTimePoint = 0;
var endTimePoint = 0;
var loopText;
var v;
var styleStr;



window.onload = function() {
    setTimeout(function() {
        loadVideo()
    }, 1000)
};

function loadVideo() {
	console.log('loadvideo');
	
    var url = window.location.host;
    if (url == "www.bilibili.com") {
        styleStr = "display:none;text-align: center;padding: 0 10px;height: 20px;z-index: 999;position: absolute;right: 0;color:wheat;background: black;font-size: medium;vParent.insertBefore()";
        v = document.querySelector("video") || document.querySelector("bwp-video");
        if (!v) {
            v = ($(".t-video-switch")[0].contentWindow).document.querySelector("bwp-video") || ($(".t-video-switch")[0]).contentWindow.document.querySelector("video")
        }
    } else {
        if (url == "www.youtube.com") {
            v = document.querySelector("video");
            styleStr = "display:none;text-align: center;padding: 0 10px;height: 20px;z-index: 999;position: relative;float: right;color:wheat;background: black;font-size: medium;vParent.insertBefore()"
        }
    }
	
    v.ontimeupdate = function(event) {
        if (loopStatus != 2) {
            return
        }
        var currenttime = v.currentTime;
        if (currenttime >= endTimePoint) {
            v.currentTime = startTimePoint;
            return false
        }
    };
    loopText = document.createElement("div");
    loopText.id = "loopText";
    loopText.style = styleStr;
    v.before(loopText)
}

function durationTrans(a) {
    var b = "";
    var h = parseInt(a / 3600),
        m = parseInt(a % 3600 / 60),
        s = parseInt(a % 3600 % 60);
    if (h > 0) {
        h = h < 10 ? "0" + h : h;
        b += h + ":"
    }
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    b += m + ":" + s;
    return b
}
document.onkeydown = function(e) {
    var keyNum = window.event ? e.keyCode : e.which;
    console.info(keyNum);
    if (keyNum == 124) {
        if (loopStatus == 0) {
            loopText.style.display = "inline";
            startTimePoint = v.currentTime;
            loopText.textContent = "Loop begins:" + durationTrans(startTimePoint);
            loopStatus = 1
        } else {
            if (loopStatus == 1 && v.currentTime > startTimePoint) {
                loopText.style.display = "inline";
                endTimePoint = v.currentTime;
                loopText.textContent = "Loop begins:" + durationTrans(startTimePoint) + "→loop end:" + durationTrans(endTimePoint);
                loopStatus = 2
            } else {
                if (loopStatus == 2) {
                    loopText.style.display = "none";
                    loopStatus = 0
                }
            }
        }
    }
};

function allPrpos(obj) {
    var props = "";
    for (var p in obj) {
        console.info(p)
    }
};