let puntos = 0;

let tiempo = 30;

let nivel = 1;

let combo = 0;

let record = localStorage.getItem("recordValecorp") || 0;

let juegoActivo = false;

let intervaloTiempo;

let intervaloFrutas;

let velocidadFrutas;


const frutasBuenas = [

    "🍎",
    "🍌",
    "🍊",
    "🥝",
    "🍐"

];


const elementosMalos = [

    "💥",
    "🍎",
    "🧊"

];


document.getElementById("record").textContent = record;


function iniciarJuego() {

    puntos = 0;

    tiempo = 30;

    nivel = 1;

    combo = 0;

    juegoActivo = true;


    document.getElementById("puntos").textContent = puntos;

    document.getElementById("tiempo").textContent = tiempo;

    document.getElementById("nivel").textContent = nivel;

    document.getElementById("combo").textContent = combo;

    document.getElementById("resultado").innerHTML = "";


    document.getElementById("mensaje-inicio").style.display = "none";


    velocidadFrutas = 800;


    intervaloTiempo = setInterval(contarTiempo, 1000);


    crearFrutaAutomaticamente();

}


function contarTiempo() {

    if (!juegoActivo) {

        return;

    }


    tiempo--;


    actualizarNivel();


    document.getElementById("tiempo").textContent = tiempo;


    if (tiempo <= 0) {

        terminarJuego();

    }

}


function actualizarNivel() {

    let nuevoNivel;


    if (tiempo > 20) {

        nuevoNivel = 1;

    }

    else if (tiempo > 10) {

        nuevoNivel = 2;

    }

    else {

        nuevoNivel = 3;

    }


    if (nuevoNivel !== nivel) {

        nivel = nuevoNivel;

        document.getElementById("nivel").textContent = nivel;

        mostrarMensajeNivel();

    }


    if (nivel === 1) {

        velocidadFrutas = 800;

    }

    else if (nivel === 2) {

        velocidadFrutas = 600;

    }

    else {

        velocidadFrutas = 400;

    }

}


function mostrarMensajeNivel() {

    const mensaje = document.createElement("div");

    mensaje.classList.add("mensaje-nivel");

    mensaje.textContent = "🔥 NIVEL " + nivel;

    document.getElementById("juego").appendChild(mensaje);


    setTimeout(function() {

        mensaje.remove();

    }, 1000);

}


function crearFrutaAutomaticamente() {

    if (!juegoActivo) {

        return;

    }


    crearFruta();


    intervaloFrutas = setTimeout(

        crearFrutaAutomaticamente,

        velocidadFrutas

    );

}


function crearFruta() {

    if (!juegoActivo) {

        return;

    }


    const elemento = document.createElement("div");


    elemento.classList.add("fruta-juego");


    const probabilidad = Math.random();


    if (probabilidad < 0.65) {

        elemento.textContent =
            frutasBuenas[
                Math.floor(
                    Math.random() * frutasBuenas.length
                )
            ];

        elemento.dataset.tipo = "buena";

    }

    else if (probabilidad < 0.85) {

        elemento.textContent =
            elementosMalos[
                Math.floor(
                    Math.random() * elementosMalos.length
                )
            ];

        elemento.dataset.tipo = "mala";

    }

    else {

        elemento.textContent = "🧊";

        elemento.dataset.tipo = "hielo";

    }


    elemento.style.left =
        Math.random() * 88 + "%";


    elemento.style.top =
        Math.random() * 82 + "%";


    elemento.onclick = function(event) {

        event.stopPropagation();


        if (!juegoActivo) {

            return;

        }


        if (elemento.dataset.tipo === "buena") {

            frutaBuena(elemento);

        }

        else if (elemento.dataset.tipo === "mala") {

            frutaMala(elemento);

        }

        else {

            hielo(elemento);

        }

    };


    document
        .getElementById("juego")
        .appendChild(elemento);


    setTimeout(function() {

        if (elemento.parentNode) {

            elemento.remove();

        }

    }, 1300);

}


function frutaBuena(elemento) {

    combo++;


    let puntosGanados = 10;


    if (combo >= 5) {

        puntosGanados += 5;

    }


    if (combo >= 10) {

        puntosGanados += 10;

    }


    puntos += puntosGanados;


    document.getElementById("puntos").textContent = puntos;

    document.getElementById("combo").textContent = combo;


    elemento.classList.add("atrapada");


    mostrarPuntos("+" + puntosGanados, elemento);


    setTimeout(function() {

        elemento.remove();

    }, 200);

}


function frutaMala(elemento) {

    puntos -= 15;


    if (puntos < 0) {

        puntos = 0;

    }


    combo = 0;


    document.getElementById("puntos").textContent = puntos;

    document.getElementById("combo").textContent = combo;


    elemento.classList.add("mala");


    mostrarPuntos("-15", elemento);


    document
        .getElementById("juego")
        .classList.add("sacudida");


    setTimeout(function() {

        document
            .getElementById("juego")
            .classList.remove("sacudida");

        elemento.remove();

    }, 400);

}


function hielo(elemento) {

    puntos -= 20;


    if (puntos < 0) {

        puntos = 0;

    }


    combo = 0;


    document.getElementById("puntos").textContent = puntos;

    document.getElementById("combo").textContent = combo;


    mostrarPuntos("-20 🧊", elemento);


    elemento.remove();

}


function mostrarPuntos(texto, elemento) {

    const mensaje = document.createElement("div");


    mensaje.classList.add("puntos-flotantes");


    mensaje.textContent = texto;


    mensaje.style.left = elemento.style.left;

    mensaje.style.top = elemento.style.top;


    document
        .getElementById("juego")
        .appendChild(mensaje);


    setTimeout(function() {

        mensaje.remove();

    }, 700);

}


function terminarJuego() {

    juegoActivo = false;


    clearInterval(intervaloTiempo);

    clearTimeout(intervaloFrutas);


    document
        .querySelectorAll(".fruta-juego")
        .forEach(function(fruta) {

            fruta.remove();

        });


    if (puntos > record) {

        record = puntos;

        localStorage.setItem(
            "recordValecorp",
            record
        );

        document.getElementById("record").textContent = record;

    }


    let mensaje;


    if (puntos >= 250) {

        mensaje =

            "🏆 ¡GANADOR DEL RETO!<br><br>" +

            "Puntuación: <strong>" +
            puntos +
            "</strong><br><br>" +

            "🔥 ¡Excelente trabajo!";

    }

    else if (puntos >= 150) {

        mensaje =

            "🥳 ¡MUY BUENA PUNTUACIÓN!<br><br>" +

            "Puntuación: <strong>" +
            puntos +
            "</strong>";

    }

    else {

        mensaje =

            "🎮 ¡RETO TERMINADO!<br><br>" +

            "Puntuación: <strong>" +
            puntos +
            "</strong><br><br>" +

            "¡Intenta superar tu récord!";

    }


    document.getElementById("resultado").innerHTML = mensaje;


    document.getElementById("mensaje-inicio").style.display = "block";


    document
        .querySelector("#mensaje-inicio h2")
        .textContent = "¿Quieres volver a jugar?";

}