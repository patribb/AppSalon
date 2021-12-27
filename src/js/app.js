let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  id: '',
  nombre: '',
  fecha: '',
  hora: '',
  servicios = []
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // muestra y oculta las secciones
  tabs(); // cambia la sesion al presionar los tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();

  consultarAPI(); // Consulta la API en el backend de PHP

  idCliente();
  nombreCliente(); // Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); // Añade la fecha al objeto de cita
  seleccionarHora(); // Añade la hora al objeto de cita
  mostrarResumen();
}

function mostrarSeccion() {
  // ocultar la seccion con clase mostrar
  const seccionAnterior = document.querySelector(".mostrar");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }
  // seleccionar la sesion con el paso
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrar");

  // Quita la clase de actual
  const tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  // Resalta tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const botones = document.querySelectorAll(".tabs button");
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      paso = parseInt(e.target.dataset.paso);
      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paginaAnterior = document.querySelector("#anterior");
  const paginaSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.add("ocultar");
    mostrarResumen();
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", function () {
    if (paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", function () {
    if (paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}

async function consultarAPI() {
  try {
    const url = 'http://localhost:3000/api/servicios';
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach(servicio => {
    const {id, nombre, precio} = servicio;

    const nombreServicio = document.createElement('P');
    nombreServicio.classList.add('nombre-servicio');
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement('P');
    precioServicio.classList.add('precio-servicio');
    precioServicio.textContent = `${precio} €`;

    const servicioDiv = document.createElement('DIV');
    servicioDiv.classList.add('servicio');
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = function(){
      seleccionarServicio(servicio);
    };

    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    document.querySelector('#servicios').appendChild(servicioDiv);
  })
}

function seleccionarServicio(servicio) {
  const {id} = servicio;
  const {servicios} = cita;
  // Identificar el elemento al que se le da click
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  // Comprobar si un servicio ya fue agregado 
  if(servicios.some(agregado => agregado.id === id)) {
    // eliminar si ya esta agregado
    cita.servicios = servicios.filter(agregado => agregado.id !== id);
    divServicio.classList.remove('seleccionado');
  } else {
    // Agregarlo si no lo estaba
    cita.servicios = [...servicios, servicio];
    divServicio.classList.add('seleccionado');
  }
}

function idCliente() {
  cita.id = document.querySelector('#id').value;
}

function nombreCliente() {
  cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector('#fecha');
  inputFecha.addEventListener("input", function (e) {
    const dia = new Date(e.target.value).getUTCDay();
    if([0].includes(dia)) {
      e.target.value = '';
      mostrarAlerta('🔐Domingos cerrado.', 'error', '.formulario');
    } else {
      cita.fecha = e.target.value;
    }
  })
}

function seleccionarHora() {
  const inputHora = document.querySelector('#hora');
  inputHora.addEventListener("input", function (e) {
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    if(hora < 9 || hora > 20) {
      e.target.value = '';
      mostrarAlerta('🔐Horario no válido.', 'error', '.formulario');
    } else {
      cita.hora = e.target.value;
    }
  })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  
  // Previene que se generen multiples alertas
  const alertaPrevia = document.querySelector('.alerta');
  if(alertaPrevia) {
    alertaPrevia.remove();
  }

  // Scripting para crear la alerta
  const alerta = document.createElement('DIV');
  alerta.textContent = mensaje;
  alerta.classList.add('alerta');
  alerta.classList.add(tipo);
  
  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  if(desaparece) {
// Eliminar la alerta despiés de tres segundos
setTimeout(() => {
  alerta.remove();
}, 3000);
  }
}

function mostrarResumen() {
  const resumen = document.querySelector('.contenido-resumen');

    // Limpiar el Contenido de Resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

  if(Object.values(cita).includes('') || cita.servicios.length === 0) {
    mostrarAlerta('✋Faltan datos de Servicios, fecha u hora', 'error', '.contenido-resumen', false);
    return;
  } 

  // Formatear el div de resumen
  const {nombre, fecha, hora, servicios} = cita;

  // Heading para servicios en resumen
  const headingServicios = document.createElement('H3');
  headingServicios.textContent = 'Servicios elegidos';
  resumen.appendChild(headingServicios);

  // Iterando y mostrando los servicios
  servicios.forEach(servicio => {
    const {id, precio, nombre} = servicio;

    const contenedorServicio = document.createElement('DIV');
    contenedorServicio.classList.add('contenedor-servicio');
    const textoServicio = document.createElement('P');
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement('P');
    precioServicio.innerHTML = `<span>Precio:</span> ${precio} €`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  })

  // Heading para resumen datos cita
  const headingCita = document.createElement('H3');
  headingCita.textContent = 'Datos de su cita';
  resumen.appendChild(headingCita);

  const nombreCliente = document.createElement('P');
  nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

  // Formatear la fecha en español
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const year = fechaObj.getFullYear();

  const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const fechaUTC = new Date(Date.UTC(year, mes, dia));
  const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones);

  const fechaCita = document.createElement('P');
  fechaCita.innerHTML = `<span>Fecha: </span> ${fechaFormateada}`;

  const horaCita = document.createElement('P');
  horaCita.innerHTML = `<span>Hora: </span> ${hora}`;

  // Boton para crear una cita
  const botonReservar = document.createElement('BUTTON');
  botonReservar.classList.add('boton');
  botonReservar.textContent = 'Reservar Cita';
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);

  resumen.appendChild(botonReservar);
}

async function reservarCita() {
  const {fecha, hora, servicios, id} = cita;
  const idServicios = servicios.map(servicio => servicio.id);

  const datos = new FormData();
  
  datos.append('fecha', fecha);
  datos.append('hora', hora);
  datos.append('usuarioId', id);
  datos.append('servicios', idServicios);

  // console.log([...datos]);

  try {
    // Petición hacia la API
  const url = 'http://localhost:3000/api/citas'
  const respuesta = await fetch(url, {
    method: 'POST',
    body: datos
  });
  
  const resultado = await respuesta.json();
  console.log(resultado.resultado);

  if(resultado.resultado) {
    Swal.fire({
      icon: 'success',
      title: 'Cita reservada👌',
      text: 'La cita ha sido creada y guardada con éxito.',
      button: 'OK'
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...😌',
      text: 'Algo salió mal al guardar tu cita.',
    });
  }
}
