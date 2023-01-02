document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
}); 

function iniciarApp() {
    mostrarServicios();
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

            //Insertar precio y nombre al div de servicio
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            console.log(servicioDiv);
            document.querySelector('#servicios').appendChild(servicioDiv);
        });
    } catch (error) { 
        console.log(error);
    }
} 