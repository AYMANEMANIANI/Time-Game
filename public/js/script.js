// ####################################################################################

// obtenir les aiguilles 
hour=document.getElementById("hour");
min=document.getElementById("min");

// générer l'heure de question aléatoire
// Math.random()=>nombre aleatoir entre l'interval ]0,1[
hour_question=document.getElementsByTagName("span")[0]
arrayHour=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
gererHourRandom=Math.floor( Math.random()*arrayHour.length)  //traiter l'index entre 0-->23
houRandom=arrayHour[gererHourRandom]     //arrayMin[0]="00" --> arrayMin[23]="23"
hour_question.innerHTML=houRandom     // metter dans le document html (span)

// générer le minute de question aléatoire
min_question=document.getElementsByTagName("span")[1]
arrayMin=["05","10","15","20","25","30","35","40","45","50","55","00"]
gererMinRandom=Math.floor( Math.random()* arrayMin.length)  //traiter l'index entre 0-->11
minRandom=arrayMin[gererMinRandom]    //arrayMin[0]="05" --> arrayMin[11]="00"
min_question.innerHTML=minRandom    // metter dans le document html (span)

// $$$$$$$$$$$$$$$$$$$$$$$



// %%%%%%%%%%%%%%%%%%%%%%%%%%%
// changer heure préparer  en deg
questionHeureDeg = (houRandom%12 ) * 30 + (minRandom/5)* 30/12 
questionminuteDeg = (minRandom/60) * 360 // 1min = 6deg

// générer deplacement des aiguilles a gauche "button negatif"
btn1=document.getElementById("btn btn1")
i=0
btn1.addEventListener("click",function(){
    min.style.transform += `rotate(-30deg)`
    hour_rotate=-30/12 // l'aiguiller d'heure il dois deplacer l'aiguiller de minute 12 fois pour arriver à 30deg
    hour.style.transform += `rotate(${hour_rotate}deg)`
    i++
    auguillesSaisir()
})

// générer rotate des aiguilles a droite "button positif"
btn2=document.getElementById("btn btn2")
j=0
btn2.addEventListener("click",function(){
    min.style.transform += `rotate(30deg)`
    hour_rotate=30/12 
    hour.style.transform += `rotate(${hour_rotate}deg)`
    j++
    auguillesSaisir()
})
// ########################################

btn3=document.getElementById("btn btn3")
k=0
btn3.addEventListener("click",function(){
    hour.style.transform += `rotate(30deg)`
    k++
    auguillesSaisir()
})
btn4=document.getElementById("btn btn4")
g=0
btn4.addEventListener("click",function(){
    hour.style.transform += `rotate(-30deg)`
    g++
    auguillesSaisir()
})
function auguillesSaisir(){
    //negatif btn
    N_nbrRotation_heure=-i%144 //pour garantir max 360deg
    N_nbrRotation_minute=-i%12
    //positif btn
    P_nbrRotation_heure=j%144
    P_nbrRotation_minute=j%12 
    minuteFINALE = (P_nbrRotation_minute + N_nbrRotation_minute)* 30
    heureFINALE = (P_nbrRotation_heure + N_nbrRotation_heure)* 30/12
    // btn3
    P_nbrRotation_heure2=k%12
    // btn4
    P_nbrRotation_heure3=-g%12

    heureFINALE2 = (P_nbrRotation_heure2+P_nbrRotation_heure3)* 30
    heurFin = heureFINALE + heureFINALE2 

    // assurer que les deg positif
    if(minuteFINALE >= 0){
        minuteFINALE = minuteFINALE
    }else{
        minuteFINALE = minuteFINALE + 360
    }
    // assurer que les deg positif
    if(heurFin >= 0){
        heurFin = heurFin
    }else{
        heurFin = heurFin + 360
    } 
}

function virification(){
    // audio
    audio_succ=document.getElementById("audio_succ")
    audio_fail=document.getElementById("audio_fail")
    auguillesSaisir()
    resultat = document.getElementById("resultat")
    btn_continue = document.getElementById("continue")
    if(questionHeureDeg == heurFin && questionminuteDeg == minuteFINALE){
        audio_succ.play()
        resultat.innerHTML = "l'heure est valide"
        resultat.style.color = "#07f64f"
        btn_continue.innerHTML = "<button id='btn_continue' onclick='refresh()'>continue</button>"
    }else{
        audio_fail.play()
        resultat.innerHTML="l'heure est non valide"
        resultat.style.color = "#d10f0f"
    }
    évaluation()
    // vider div_progression
    if(progresse_value > 590){
        localStorage.clear()
        div_progresse.style.width=`0px`
    }
    // appler fonction scroller
    scroller()
}
progresse_value=0
cpt=0
load()
function évaluation(){
    div_progresse=document.getElementById("progresse")
    auguillesSaisir()
    if(questionHeureDeg === heurFin && questionminuteDeg === minuteFINALE){
        // parce que en n'appler pas load avons pour convertir en entier
        // lorsque obtenir progresse_value dans le localstorage en str il doit changer en number
        progresse_value=parseInt(progresse_value)+590/5
        div_progresse.style.width=`${parseInt(progresse_value)}px`
        incrementCounter()
    }
    save()
    
}

function save(){
    progresse_value=JSON.stringify(parseInt(progresse_value))
    localStorage.setItem("progresse",parseInt(progresse_value))
}
// load progresse at localstorage
function load(){
    localstorage_value=localStorage.getItem("progresse")
    progresse_value=JSON.parse(localstorage_value)
    div_progresse=document.getElementById("progresse")
    div_progresse.style.width=`${parseInt(progresse_value)}px`
    incrementCounter()
}

function incrementCounter() {
    btn_vider=document.getElementById("vider")
    btn_vider.innerHTML = `vider ${(Math.ceil(progresse_value/ 590 * 5))}/5`;
}

// fonction de refresh pour changer valeur de random
function refresh(){
    location.reload()
    save()
    load()
}
// fonction les niveaux alert
function alert_Niveaux(){
    
}
// fonction de filécitation
function filécitation(){
    if(progresse_value==590){
        sec_jeu=document.querySelector("section")
        video_win=document.getElementById("win")
        body=document.body
        video_win.play()
        sec_jeu.setAttribute("id","sec_jeu")
        body.style.background="#fdfcfc"
        // body.style.display="inline"
        progresse_value=0
        setTimeout(refresh,4200)
    }else{
        parent_win=document.querySelector("header ~ div")
        parent_win.setAttribute("id","parent_win")
    }
}

// l'appel de function de filecitation
filécitation()


// scroll function 
function scroller(){
    scrollTo({
        top:200,
        behavior:"smooth"
    })
}

// localStorage.clear()
function f(){
    confirm("vous_etes sur d'avoir supprimer la progression?")
    if(confirm){
        localStorage.clear()
        location.reload()
    }
}

