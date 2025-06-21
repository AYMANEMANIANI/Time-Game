icon_music=document.getElementById("icon_music")
audio=document.getElementById("audio")
icon_music.onclick = function(){
    if(audio.paused){
        audio.play()
        icon_music.setAttribute("class","fa-sharp fa-regular fa-circle-pause")
    }
    else{
        audio.pause()
        icon_music.setAttribute("class","fa-regular fa-circle-play")
    }
}
// alert language
const alert_lang = document.getElementById("alert_lang");

function alt_lang() {
    if (alert_lang) {
        alert_lang.style.visibility = "visible";
        alert_lang.style.top = "50%";
        alert_lang.style.transform = "translate(-50%, -50%) scale(1)";
    }
}

function alert_btn() {
    if (alert_lang) {
        alert_lang.style.visibility = "hidden";
        // On réinitialise les propriétés pour que l'animation puisse se rejouer
        alert_lang.style.top = "0%";
        alert_lang.style.transform = "translate(-50%, -50%) scale(0.1)";
    }
}

// titre1 animation
const text = document.getElementById("titre1");
if (text) { // On vérifie si l'élément existe
index=1
titre1="heure facile"
function titre1_animation(){
    text.innerHTML=titre1.slice(0,index)
    index+=1
    if(index>titre1.length){
        index=1
    }
    setTimeout(titre1_animation,700)
}
titre1_animation()
}
