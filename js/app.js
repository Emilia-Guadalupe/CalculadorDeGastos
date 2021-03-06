//Variables
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



//Clases
//Clase de presupuesto

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }

}

//Clase de Interfaz, maneja todo lo relacionado con el html

class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');   

        //Insertar al HTML el presupuesto y el monto restante
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-sucess');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));

        //Insertar texto en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el alert después de 3 segundos
        setTimeout(function(){
            document.querySelector('.alert').remove();
            formulario.reset();
        }, 3000);
    }
    //Inserta los gastos en la lista 
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');
        
        //Crear un li
        const li = document.createElement('li');
        li.className = 'li-list-group-item d-flex justify-content-between align-items-center';
        //Insertar el gasto 
        li.innerHTML = `
        ${nombre}
        <span class="badge badge-primary badge-pill"> $${cantidad} </span>
        `;

        //Insertar al HTML
        gastosListado.appendChild(li);
    }

    //Comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('#restante');
        //Leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `
        ${presupuestoRestanteUsuario}
        `;

        this.comprobarPresupuesto();
    }
    //Cambia de color el presupuesto restante 
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //Comprobar el 25% del gasto
        if((presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-sucess', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-sucess');
            restante.classList.add('alert-warning');
        }
    } 
}



//Event Listeners
document.addEventListener('DOMContentLoaded', function(){
        if(presupuestoUsuario === null || presupuestoUsuario === ''){
            window.location.reload();
        } else {
            //Instanciar un presupuesto
            cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
            //Instanciar la clase de interfaz
            const ui = new Interfaz();
            ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
            
        }
})

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //Leer del formulario los campos de cantidad y gasto
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instanciar la Interfaz
    const ui = new Interfaz();

    //Comprobar que los campos no estén vacíos
    if(nombreGasto === '' || cantidadGasto === ''){
        ui.imprimirMensaje('hubo un error', 'error');
    } else {
        //Insertar en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
})

