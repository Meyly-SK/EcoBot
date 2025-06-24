const residuos = {
  plastico: ['botella', 'envase', 'pet', 'tapa', 'bolsa'],
  papel: ['hoja', 'cuaderno', 'cartulina', 'papel', 'revista'],
  vidrio: ['frasco', 'vaso', 'botella de vidrio'],
  organico: ['cáscara', 'comida', 'pan', 'fruta', 'verdura'],
  noReciclable: ['pañal', 'servilleta', 'chicle', 'colilla']
};

const tips = {
  plastico: 'Recuerda enjuagar los envases antes de reciclar.',
  papel: 'El papel debe estar limpio y seco.',
  vidrio: 'No mezcles vidrio roto con otros residuos.',
  organico: 'Puedes usar esto para compostaje.',
  noReciclable: 'Reduce el uso de productos no reciclables.'
};

const tachos = {
  plastico: '🟡 Tacho AMARILLO – Plástico reciclable',
  papel: '🔵 Tacho AZUL – Papel reciclable',
  vidrio: '🟢 Tacho VERDE – Vidrio reciclable',
  organico: '🟢 Tacho VERDE – Orgánico',
  noReciclable: '🔴 Tacho ROJO – No reciclable'
};

function clasificar() {
  const input = document.getElementById("userInput").value.toLowerCase();
  const chat = document.getElementById("chat-log");

  if (!input.trim()) return;

  // Mensaje del usuario
  chat.innerHTML += `<p class="message-user"><strong>Tú:</strong> ${input}</p>`;

  let respuesta = "🤖 EcoBot: No reconozco ese residuo. Intenta con otro nombre.";

  for (let tipo in residuos) {
    if (residuos[tipo].some(p => input.includes(p))) {
      respuesta = `🤖 EcoBot: ${tachos[tipo]}<br><em>${tips[tipo]}</em>`;
      break;
    }
  }

  // Respuesta del bot
  chat.innerHTML += `<p class="message-bot">${respuesta}</p>`;
  document.getElementById("userInput").value = "";
  chat.scrollTop = chat.scrollHeight;
}

function obtenerTodasLasPalabras() {
  return Object.values(residuos).flat();
}

function mostrarSugerencias() {
  const input = document.getElementById("userInput").value.toLowerCase();
  const sugerencias = document.getElementById("sugerencias");
  sugerencias.innerHTML = "";

  if (!input.trim()) return;

  const palabras = obtenerTodasLasPalabras();
  const coincidencias = palabras.filter(p => p.includes(input)).slice(0, 5); // máximo 5

  coincidencias.forEach(coincidencia => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "list-group-item-action");
    li.textContent = coincidencia;
    li.onclick = () => {
      document.getElementById("userInput").value = coincidencia;
      sugerencias.innerHTML = "";
      clasificar();
    };
    sugerencias.appendChild(li);
  });
}