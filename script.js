let totalIngresos = 0;
let totalGastos = 0;

function agregarIngreso() {
  const tipo = document.getElementById('tipo-ingreso').value;
  const monto = parseFloat(document.getElementById('monto-ingreso').value);

  if (isNaN(monto)) {
    alert('Ingresa un monto válido.');
    return;
  }

  // Agregar fila a la tabla de ingresos
  const tabla = document.getElementById('tabla-ingresos').querySelector('tbody');
  const fila = tabla.insertRow();

  fila.innerHTML = `<td>${tipo}</td><td>₡${monto.toFixed(2)}</td>`;

  // Actualizar total y saldo
  totalIngresos += monto;
  actualizarTotales();

  document.getElementById('monto-ingreso').value = '';
}

function agregarGasto() {
  const tipo = document.getElementById('tipo-gasto').value;
  const descripcion = document.getElementById('descripcion-gasto').value || tipo;
  const monto = parseFloat(document.getElementById('monto-gasto').value);

  if (isNaN(monto)) {
    alert('Ingresa un monto válido.');
    return;
  }

  // Agregar fila a la tabla de gastos
  const tabla = document.getElementById('tabla-gastos').querySelector('tbody');
  const fila = tabla.insertRow();

  fila.innerHTML = `<td>${tipo}</td><td>${descripcion}</td><td>₡${monto.toFixed(2)}</td>`;

  // Actualizar total y saldo (solo suma este tipo de gasto)
  totalGastos += monto;
  actualizarTotales();

  document.getElementById('descripcion-gasto').value = '';
  document.getElementById('monto-gasto').value = '';
}

function actualizarTotales() {
  // Obtener salario pastoral desde el input
  const salarioInput = document.getElementById('salario-pastoral');
  const salarioPastoral = parseFloat(salarioInput?.value) || 0;

  // Calcular ayuda social (4% del total de ingresos)
  const ayudaSocial = totalIngresos * 0.04;
  const ayudaSocialElemento = document.getElementById('ayuda-social-monto');
  if (ayudaSocialElemento) {
    ayudaSocialElemento.textContent = `₡${ayudaSocial.toFixed(2)}`;
  }

  // Total de gastos incluyendo fijos
  const gastosFijos = salarioPastoral + ayudaSocial;
  const totalGastosFinal = totalGastos + gastosFijos;

  // Actualizar valores en pantalla
  document.getElementById('total-ingresos').textContent = totalIngresos.toFixed(2);
  document.getElementById('total-gastos').textContent = totalGastosFinal.toFixed(2);
  document.getElementById('saldo-final').textContent = (totalIngresos - totalGastosFinal).toFixed(2);
}

function agregarFirmante() {
  const select = document.getElementById('select-directivo');
  const nombre = select.value;

  if (!nombre) {
    alert('Seleccione un directivo válido.');
    return;
  }

  const tabla = document.getElementById('tabla-firmas').querySelector('tbody');
  const fila = tabla.insertRow();

  const celdaNombre = document.createElement('td');
  celdaNombre.textContent = nombre;

  const celdaFirma = document.createElement('td');
  celdaFirma.innerHTML = '&nbsp;'; // espacio en blanco para firmar

  fila.appendChild(celdaNombre);
  fila.appendChild(celdaFirma);

  select.selectedIndex = 0; // Reiniciar menú
}
