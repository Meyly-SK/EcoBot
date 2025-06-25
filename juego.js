const residuosJuego = [
  { tipo: "papel", img: "img/juego/papel1.jpg" },
  { tipo: "papel", img: "img/juego/papel2.jpg" },
  { tipo: "papel", img: "img/juego/papel3.jpg" },
  { tipo: "papel", img: "img/juego/papel4.jpg" },
  { tipo: "papel", img: "img/juego/papel5.jpg" },
  { tipo: "plastico", img: "img/juego/plastico1.jpg" },
  { tipo: "plastico", img: "img/juego/plastico2.jpg" },
  { tipo: "plastico", img: "img/juego/plastico3.jpg" },
  { tipo: "plastico", img: "img/juego/plastico4.jpg" },
  { tipo: "plastico", img: "img/juego/plastico5.jpg" },
  { tipo: "vidrio", img: "img/juego/vidrio1.jpg" },
  { tipo: "vidrio", img: "img/juego/vidrio2.jpg" },
  { tipo: "vidrio", img: "img/juego/vidrio3.jpg" },
  { tipo: "vidrio", img: "img/juego/vidrio4.jpg" },
  { tipo: "vidrio", img: "img/juego/vidrio5.jpg" },
  { tipo: "organico", img: "img/juego/organico1.jpg" },
  { tipo: "organico", img: "img/juego/organico2.jpg" },
  { tipo: "organico", img: "img/juego/organico3.jpg" },
  { tipo: "organico", img: "img/juego/organico4.jpg" },
  { tipo: "organico", img: "img/juego/organico5.jpg" },
  { tipo: "peligroso", img: "img/juego/peligroso1.jpg" },
  { tipo: "peligroso", img: "img/juego/peligroso2.jpg" },
  { tipo: "peligroso", img: "img/juego/peligroso3.jpg" },
  { tipo: "peligroso", img: "img/juego/peligroso4.jpg" },
  { tipo: "peligroso", img: "img/juego/peligroso5.jpg" }
];

let tiempo = 60;
let puntaje = 0;
let actual = 0;
let intervalo;
let residuosAleatorios = [];
let juegoActivo = false;
let botonesBloqueados = false;

const tipsFinales = [
  "✨ Cada pequeño gesto cuenta. ¡Gracias por reciclar!",
  "♻️ Reciclar ayuda a reducir la contaminación.",
  "⚡ Una botella reciclada ahorra energía suficiente para encender una bombilla por horas.",
  "🌿 Compostar residuos orgánicos en casa mejora el suelo del jardín."
];

function iniciarJuego() {
  if (juegoActivo) return; // Evitar múltiples inicios
  juegoActivo = true;

  document.getElementById("botonInicio").classList.add("d-none");
  document.getElementById("juegoZona").classList.remove("d-none");
  document.getElementById("juegoFinal").classList.add("d-none");
  puntaje = 0;
  actual = 0;
  tiempo = 60;
  residuosAleatorios = [...residuosJuego].sort(() => Math.random() - 0.5);
  document.getElementById("timer").textContent = "Tiempo: 60s";
  mostrarResiduo();

  intervalo = setInterval(() => {
    tiempo--;
    document.getElementById("timer").textContent = `Tiempo: ${tiempo}s`;
    if (tiempo <= 0) finalizarJuego();
  }, 1000);
}

function mostrarResiduo() {
  const img = document.getElementById("imagenResiduo");
  if (actual < residuosAleatorios.length) {
    img.src = residuosAleatorios[actual].img;
    botonesBloqueados = false;
  } else {
    finalizarJuego();
  }
}

function responder(respuesta) {
  if (!juegoActivo || botonesBloqueados) return;
  botonesBloqueados = true;

  const actualTipo = residuosAleatorios[actual]?.tipo;
  const mensaje = document.getElementById("mensajeRespuesta");

  if (!actualTipo) return finalizarJuego();

  if (respuesta === actualTipo) {
    puntaje++;
    mensaje.textContent = "✅ ¡Correcto!";
    mensaje.className = "text-success mb-3 fs-5";
  } else {
    mensaje.textContent = `❌ Incorrecto. Era: ${actualTipo}`;
    mensaje.className = "text-danger mb-3 fs-5";
  }

  actual++;
  setTimeout(() => {
    mensaje.textContent = "";
    mostrarResiduo();
  }, 800);
}

function finalizarJuego() {
  if (!juegoActivo) return;
  juegoActivo = false;
  clearInterval(intervalo);

  document.getElementById("juegoZona").classList.add("d-none");
  document.getElementById("juegoFinal").classList.remove("d-none");
  document.getElementById("puntajeFinal").textContent = `${puntaje} / ${residuosAleatorios.length}`;
  document.getElementById("tipFinal").textContent = tipsFinales[Math.floor(Math.random() * tipsFinales.length)];
  document.getElementById("imagenResiduo").src = "";
  botonesBloqueados = false;
}
