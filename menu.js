function abrirMenu() {
  const modal = new bootstrap.Modal(document.getElementById("ecoMenuModal"));
  modal.show();
}

function mostrarEstadisticas() {
  const contenedor = document.getElementById("contenidoExtra");

  contenedor.innerHTML = `
    <h5>♻ Impacto del Reciclaje</h5>
    <canvas id="graficoReciclaje" height="200"></canvas>

    <div class="mt-4">
      <h6>🌍 Datos clave:</h6>
      <ul>
        <li>🧴 Cada tonelada de plástico reciclado ahorra 685 litros de petróleo.</li>
        <li>📦 1 tonelada de papel reciclado ahorra 17 árboles y 26,500 litros de agua.</li>
        <li>🔋 1 pila contamina 600,000 litros de agua si no se recicla.</li>
        <li>⚡ Reciclar una lata de aluminio ahorra energía para 3 horas de TV.</li>
      </ul>
    </div>
  `;

  // Esperar a que el canvas exista en el DOM
  setTimeout(() => {
    const ctx = document.getElementById("graficoReciclaje").getContext("2d");

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Plástico', 'Papel/Cartón', 'Vidrio', 'Orgánico', 'Peligroso'],
        datasets: [{
          label: 'Porcentaje reciclado (aproximado)',
          data: [9, 68, 33, 50, 5],
          backgroundColor: [
            '#fdd835', // amarillo
            '#42a5f5', // azul
            '#66bb6a', // verde
            '#8d6e63', // marrón
            '#ef5350'  // rojo
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: context => `${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    });
  }, 100); // ligeramente retardado para asegurar render
}


function irAJuego() {
  window.location.href = "juego.html";
}