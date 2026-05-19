let player = document.getElementById("player");
let latex = document.getElementById("latex");
let machine = document.getElementById("machine");
let waste = document.getElementById("waste");

let scoreText = document.getElementById("score");
let mission = document.getElementById("mission");
let phase = document.getElementById("phase");

let progressBar = document.getElementById("progressBar");

let winScreen = document.getElementById("winScreen");

let x = 100;

let pontos = 0;

let carrying = false;

let processed = false;

let progress = 0;

/* MOVIMENTO */

function left(){

    x -= 25;

    if(x < 0){
        x = 0;
    }

    player.style.left = x + "px";

    collision();
}

function right(){

    x += 25;

    if(x > window.innerWidth - 70){
        x = window.innerWidth - 70;
    }

    player.style.left = x + "px";

    collision();
}

/* COLISÕES */

function collision(){

    let p = player.getBoundingClientRect();

    let l = latex.getBoundingClientRect();

    let m = machine.getBoundingClientRect();

    let w = waste.getBoundingClientRect();

    /* PEGAR LÁTEX */

    if(
        p.left < l.right &&
        p.right > l.left &&
        p.top < l.bottom &&
        p.bottom > l.top &&
        !carrying
    ){

        carrying = true;

        player.style.background = "yellow";

        latex.style.display = "none";

        mission.innerHTML = "Missão: levar para máquina";

        phase.innerHTML = "Fase 2 - Processamento";
    }

    /* RESÍDUO */

    if(
        p.left < w.right &&
        p.right > w.left &&
        p.top < w.bottom &&
        p.bottom > w.top
    ){

        pontos -= 2;

        if(pontos < 0){
            pontos = 0;
        }

        scoreText.innerHTML = "Pontos: " + pontos;
    }
}

/* BOTÃO DE AÇÃO */

function action(){

    let p = player.getBoundingClientRect();

    let m = machine.getBoundingClientRect();

    /* PROCESSAR */

    if(
        carrying &&
        p.left < m.right &&
        p.right > m.left
    ){

        progress += 20;

        progressBar.style.width = progress + "%";

        if(progress >= 100){

            carrying = false;

            processed = true;

            pontos += 10;

            scoreText.innerHTML = "Pontos: " + pontos;

            mission.innerHTML = "Missão concluída";

            phase.innerHTML = "Produção Finalizada";

            player.style.background = "lime";

            setTimeout(()=>{

                winScreen.style.display = "block";

            },1000);
        }
    }
}

/* REINICIAR */

function restartGame(){

    location.reload();
}
