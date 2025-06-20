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
alert_lang=document.getElementById("alert_lang")
function alt_lang(){
    alert_lang.style.visibility="visible"
    alert_lang.style.transform="scale(1)"
    alert_lang.style.transform="translate(-50%,-50%) "
    alert_lang.style.top="50%"
    alert_lang.style.left="50%"
}
function alert_btn(){
    alert_lang.style.visibility="hidden"
}
// titre1 animation
index=1
text= document.getElementById("titre1")
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
