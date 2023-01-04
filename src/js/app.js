let pagina = 1;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
}); 

function iniciarApp() {
    mostrarServicios();

    //resalta el div actual segun el tabs presionado
    mostrarSeccion()

    //oculta o muestra la seccion segun el tabs presionado
    cambiarSeccion();
}
function mostrarSeccion(){
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion'); 

    //resalta el tab actual 
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault(); 
            pagina = parseInt(e.target.dataset.paso);

            //eliminar mostrar seccion de la seccion anterior 
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

            //agrega mostrar seccion donde dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            //eliminar la clse actual del tabs anterior
            document.querySelector('.tabs .actual').classList.remove('actual');

            //agregar la clase actual en el nuevo tab
            const tab = document.querySelector(`[data-paso="${pagina}"]`);
            tab.classList.add('actual');
        })
    })
}

async function mostrarServicios() {
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const { servicios } = db;

        //generar el html
        servicios.forEach(servicio => {
            const { id, nombre, precio} = servicio;

            // DOM scripting
            //Generar el nombre servicio 
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            //Generar el precio servicio 
            const precioServicio = document.createElement('P');
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add('precio-servicio');

            //generar el DIV contenedor de servicios
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.dataset.idServicio = id;

            //selecciona un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;

            //Insertar precio y nombre al div de servicio
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            //insertarlo en el html
            document.querySelector('#servicios').appendChild(servicioDiv);
        });
    } catch (error) { 
        console.log(error);
    }
} 

function seleccionarServicio(e) {

    let elemento;
    //forzar a que el elemento clickeado sea el div
    if(e.target.tagName === "P") {
        elemento = e.target.parentElement;
    }else {
        elemento = e.target;
    }

    if(elemento.classList.contains('activo')){
        elemento.classList.remove('activo');
    } else{ 
    elemento.classList.add('activo');
    }
}