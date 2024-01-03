var loopStatus = 0;
var startTimePoint = 0;
var endTimePoint = 0;
var loopText;
var v;
var styleStr;

//var loopKeyCode = 65; // Key 'a' Debug purpose 
var loopKeyCode = 124;  // F13

var backColorStyle = 'background: rgba(0, 0, 0, 0.3)';


window.onload = function() {
    setTimeout(function() {
        loadVideo()
    }, 1000)
};

function loadVideo() {
	console.log('loadvideo');
	
    var url = window.location.host;
    if (url == "www.bilibili.com") {
        styleStr = "display:none;text-align: center;padding: 0 10px;height: 20px;z-index: 999;position: absolute;right: 0;color:wheat;font-size: medium;vParent.insertBefore();";
        styleStr += backColorStyle;

        v = document.querySelector("video") || document.querySelector("bwp-video");
        if (!v) {
            v = ($(".t-video-switch")[0].contentWindow).document.querySelector("bwp-video") || ($(".t-video-switch")[0]).contentWindow.document.querySelector("video")
        }
    } else if (url == "www.youtube.com"   ||
               url == "www.domestika.org" ||
               url == "www.udemy.com"     ) {
        v = document.querySelector("video");
        styleStr = "display:none;text-align: center;padding: 0 10px;height: 20px;z-index: 999;position: relative;float: right;color:wheat;font-size: medium;vParent.insertBefore();"
        styleStr += backColorStyle;
    }

	if (v == null) {
        console.error('video tag not found on url : '+ url);
        return;
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
    if (keyNum == loopKeyCode) {

        if (v == null) {
            loadVideo();
        }

        console.debug('Loop Key Pressed');
        if (loopStatus == 0) {
            loopText.style.display = "inline";
            startTimePoint = v.currentTime;
            loopText.textContent = "Loop Start:" + durationTrans(startTimePoint);
            loopStatus = 1;
            showAnimation(v, "LOOP<br>START", false);
        } else {
            if (loopStatus == 1 && v.currentTime > startTimePoint) {
                loopText.style.display = "inline";
                endTimePoint = v.currentTime;
                loopText.textContent = "Loop Start:" + durationTrans(startTimePoint) + " → Loop End:" + durationTrans(endTimePoint);
                loopStatus = 2;
                showAnimation(v, "LOOP<br>END", false);
            } else {
                if (loopStatus == 2) {
                    loopText.style.display = "none";
                    loopStatus = 0;
                    showAnimation(v, "LOOP<br>CLEAR", false);
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

function showAnimation(parent, text, materialIcon){
    var circleRadius = 55;

    boundingVideo = parent.getBoundingClientRect();
    videoCenterX = boundingVideo.left + ((boundingVideo.right - boundingVideo.left) / 2);
    videoCenterY = boundingVideo.y + ((boundingVideo.bottom - boundingVideo.y) / 2);

    let animationCircle = document.createElement("div")
    animationCircle.style.zIndex = '999999'
    animationCircle.style.width = (circleRadius * 2) + 'px'
    animationCircle.style.height = (circleRadius * 2) + 'px'
    animationCircle.style.position = 'absolute'

    animationCircle.style.top = (videoCenterY - circleRadius) + 'px';
    animationCircle.style.left = (videoCenterX - circleRadius) + 'px';
    
    animationCircle.style.margin = 'auto'
    animationCircle.style.backgroundColor = 'rgba(0, 0, 0, .4)'
    animationCircle.style.borderRadius = '50%'
    animationCircle.style.display = 'flex'
    animationCircle.style.flexDirection = 'column'
    animationCircle.style.justifyContent = 'space-evenly'

    let animationCircleText = document.createElement("div")
    animationCircleText.style.cssText = 'font-size:26px !important';
    if (materialIcon){
        animationCircleText.classList.add('material-icons');
        animationCircleText.style.cssText = 'font-size:120px !important';
    }
    animationCircleText.style.color = 'white'
    animationCircleText.style.width = '100%'
    animationCircleText.style.webkitUserSelect = 'none'
    animationCircleText.style.textAlign = 'center'
    animationCircleText.innerHTML = text

    animationCircle.appendChild(animationCircleText);

    animationCircle.classList.add('myFade-out');
    document.body.appendChild(animationCircle);
    setTimeout(function(){
        animationCircle.remove();
    },1000);
}