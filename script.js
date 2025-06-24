let residuosData = {};

// Tips mejorados aleatorios
const tipsAvanzados = {
  papel: [
    "📚 ¡Dale una segunda vida al papel! Cada hoja reciclada salva árboles 🌳.",
    "📦 Las cajas limpias también se reciclan. Aplástalas para ahorrar espacio.",
    "📝 El papel mojado no se puede reciclar. ¡Evítalo!"
  ],
  plastico: [
    "🧴 Enjuaga tus botellas antes de reciclar. Evitas olores y contaminantes.",
    "♻️ Cada botella reciclada ahorra energía para 6 horas de luz LED.",
    "💡 Reutiliza los envases antes de desecharlos."
  ],
  vidrio: [
    "🍾 El vidrio se recicla infinitamente. Separa los colores si es posible.",
    "🛑 No incluyas espejos ni cerámica: no son reciclables como vidrio.",
    "🧼 Lava los frascos de vidrio antes de llevarlos al punto de reciclaje."
  ],
  organico: [
    "🌱 Haz compost con tus residuos orgánicos y crea abono natural.",
    "🍌 Las cáscaras y restos vegetales nutren la tierra.",
    "🌿 Menos residuos, más vida. Reduce la basura generando compost."
  ],
  peligroso: [
    "⚠️ Llévalos a centros de acopio. No los botes con residuos comunes.",
    "🔋 Una pila puede contaminar hasta 600 mil litros de agua.",
    "☣️ Los medicamentos vencidos deben desecharse en farmacias responsables."
  ]
};

// Iconos por tipo
const iconos = {
  papel: "fa-file-lines",
  plastico: "fa-bottle-water",
  vidrio: "fa-glass-whiskey",
  organico: "fa-leaf",
  peligroso: "fa-skull-crossbones"
};

// Cargar datos del JSON
fetch("residuos.json")
  .then(res => res.json())
  .then(data => {
    residuosData = data;
  })
  .catch(err => console.error("Error al cargar residuos.json:", err));

function clasificar() {
  const input = document.getElementById("userInput").value.toLowerCase();
  const chat = document.getElementById("chat-log");
  if (!input.trim()) return;

  const userMsg = document.createElement("p");
  userMsg.className = "message-user fade-in";
  userMsg.innerHTML = `<strong>Tú:</strong> ${input}`;
  chat.appendChild(userMsg);

  let respuesta = "🤖 EcoBot: No reconozco ese residuo. Intenta con otro nombre.";

  for (let tipo in residuosData) {
    const { items, tacho } = residuosData[tipo];
    if (items.some(p => input.includes(p))) {
      const consejos = tipsAvanzados[tipo];
      const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
      respuesta = `
        <div class="eco-card eco-${tipo}">
          <div class="eco-header">
            <i class="fa-solid ${iconos[tipo]} fa-2x"></i>
            <strong>${tipo.charAt(0).toUpperCase() + tipo.slice(1)} reciclable</strong>
          </div>
          <img src="img/tips/${tipo}.jpg" alt="${tipo}" class="tip-img" />
          <p>${tacho}</p>
          <p>💡 <em>${consejoAleatorio}</em></p>
        </div>`;
      break;
    }
  }

  const botMsg = document.createElement("p");
  botMsg.className = "message-bot fade-in";
  botMsg.innerHTML = respuesta;
  chat.appendChild(botMsg);

  document.getElementById("userInput").value = "";
  chat.scrollTop = chat.scrollHeight;
  document.getElementById("sugerencias").innerHTML = "";
}

function obtenerTodasLasPalabras() {
  return Object.values(residuosData).flatMap(obj => obj.items);
}

let sugerenciaIndex = -1;

function mostrarSugerencias() {
  const input = document.getElementById("userInput");
  const valor = input.value.toLowerCase();
  const sugerencias = document.getElementById("sugerencias");
  sugerencias.innerHTML = "";
  sugerenciaIndex = -1;

  if (!valor.trim() || !residuosData) return;

  const palabras = obtenerTodasLasPalabras();
  const coincidencias = palabras.filter(p => p.includes(valor)).slice(0, 5);
  if (coincidencias.length === 0) return;

  coincidencias.forEach((coincidencia, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action", "fade-in");
    li.textContent = coincidencia;
    li.dataset.index = index;
    li.onclick = () => {
      input.value = coincidencia;
      sugerencias.innerHTML = "";
      clasificar();
    };
    sugerencias.appendChild(li);
  });

  // Acomodo dinámico
  const inputRect = input.getBoundingClientRect();
  const espacioAbajo = window.innerHeight - inputRect.bottom;
  const alturaLista = Math.min(200, coincidencias.length * 48);

  if (espacioAbajo < alturaLista + 10 || coincidencias.length <= 1) {
    sugerencias.style.bottom = `${input.offsetHeight}px`;
    sugerencias.style.top = "auto";
  } else {
    sugerencias.style.top = `${input.offsetHeight}px`;
    sugerencias.style.bottom = "auto";
  }

  sugerencias.style.display = "block";
}

// Navegar con teclado
document.getElementById("userInput").addEventListener("keydown", (e) => {
  const sugerencias = document.getElementById("sugerencias");
  const items = sugerencias.querySelectorAll("li");
  if (items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    sugerenciaIndex = (sugerenciaIndex + 1) % items.length;
    actualizarSeleccion(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    sugerenciaIndex = (sugerenciaIndex - 1 + items.length) % items.length;
    actualizarSeleccion(items);
  } else if (e.key === "Enter" && sugerenciaIndex >= 0) {
    e.preventDefault();
    items[sugerenciaIndex].click();
  }
});

function actualizarSeleccion(items) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === sugerenciaIndex);
  });
}
