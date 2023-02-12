let cartasDestapadas = 0;
let carta1 = null;
let carta2 = null;
let numeros= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let primeraCarta = null;
let segundaCarta = null;
let movimientos = 0;
let mostrarMovimientos = document.getElementById("movimientos");
let aciertos = 0;
let mostrasAciertos = document.getElementById("aciertos");
let tiempo = false;
let timer = 25;
let timerIni = 25;
let mostratTiempo = document.getElementById("tiempo");
let tiempoOut = null;
numeros = numeros.sort(() => {return Math.random()-0.5});
let win = new Audio(`./sonidos/kirby-super-star-1up.mp3`);
let lose = new Audio(`./sonidos/mario-bros game over.mp3`);
let click = new Audio(`./sonidos/mario-bros-jump.mp3`);
let rigth = new Audio(`./sonidos/mario-bros-1-up.mp3`);
let wrong = new Audio(`./sonidos/mario-bros-firework.mp3`);
let reinicio = document.getElementById("reset");
reinicio.addEventListener("click", _ => {
    location.reload();
});
function contarTiempo(){
    tiempoOut = setInterval(() =>{
        timer --;
        mostratTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoOut);
            bloquear();
            lose.play();
        }
    },1000)
}

function bloquear(){
    for (let i = 0; i <= 15; i++){
        let cartaBloqueada = document.getElementById(i);
        cartaBloqueada.innerHTML = numeros[i];
        cartaBloqueada.disabled = true;
    }
}

function destapar(id){
    if(tiempo == false){
        contarTiempo();
        tiempo = true;
    }
    cartasDestapadas ++;

    if(cartasDestapadas == 1){
        carta1 = document.getElementById(id);
        primeraCarta = numeros[id];
        carta1.innerHTML = primeraCarta;
        carta1.disabled = true;
        click.play();
    }else if (cartasDestapadas == 2){
        carta2 = document.getElementById(id);
        segundaCarta = numeros[id];
        carta2.innerHTML = segundaCarta;
        carta2.disabled = true;
        click.play();
        movimientos ++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primeraCarta == segundaCarta){
            cartasDestapadas = 0
            aciertos ++;
            mostrasAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rigth.play();
        if(aciertos == 8){
            clearInterval(tiempoOut);
            mostrasAciertos.innerHTML = `Aciertos: ${aciertos}🎉🎉🎉`;
            mostrasAciertos.innerHTML = `¡Ganaste! 🎉🎉🎉, en ${timerIni - timer} segundos`;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}👍👍👍`;
            win.play();
        }
        }else{
            setTimeout(()=>{
                carta1.innerHTML = ` `;
                carta2.innerHTML = ` `;
                carta1.disabled = false;
                carta2.disabled = false;
                cartasDestapadas = 0;
            },0500);
            wrong.play();
        }
    }
}