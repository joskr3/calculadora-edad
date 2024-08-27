// @ts-nocheck

// Variables que seleccionan los elementos del DOM para manipularlos
var diaInput = document.getElementById( 'dia' );
var mesInput = document.getElementById( 'mes' );
var anhoInput = document.getElementById( 'anho' );
var labelDia = document.getElementById( 'label-dia' );
var labelMes = document.getElementById( 'label-mes' );
var labelAnho = document.getElementById( 'label-anho' );
var formulario = document.getElementById( 'formulario' );
var botonResultado = document.getElementById( 'boton-resultado' );

// Función para agregar estilos de error a un input y su etiqueta asociada
function agregarEstilosError( input, label ) {
  input.classList.add( 'border-[#FF5757]' ); // Agrega un borde rojo al input
  input.classList.remove( 'border-[#DBDBDB]' ); // Elimina el borde gris original
  label.classList.add( 'text-[#FF5757]' ); // Cambia el color del texto de la etiqueta a rojo
  label.classList.remove( 'text-[#716F6F]' ); // Elimina el color de texto gris original
}

// Función para quitar los estilos de error y restaurar los estilos predeterminados
function quitarEstilosError( input, label ) {
  input.classList.remove( 'border-[#FF5757]' ); // Elimina el borde rojo
  input.classList.add( 'border-[#DBDBDB]' ); // Restaura el borde gris original
  label.classList.remove( 'text-[#FF5757]' ); // Elimina el color de texto rojo
  label.classList.add( 'text-[#716F6F]' ); // Restaura el color de texto gris original
}

// Función para validar el campo de día
function validarDia() {
  if ( isNaN( diaInput.value ) || diaInput.value < 1 || diaInput.value > 31 ) {
    agregarEstilosError( diaInput, labelDia ); // Aplica estilos de error si la validación falla
    return false;
  } else {
    quitarEstilosError( diaInput, labelDia ); // Restaura los estilos originales si la validación es exitosa
    return true;
  }
}

// Función para validar el campo de mes
function validarMes() {
  if ( isNaN( mesInput.value ) || mesInput.value < 1 || mesInput.value > 12 ) {
    agregarEstilosError( mesInput, labelMes ); // Aplica estilos de error si la validación falla
    return false;
  } else {
    quitarEstilosError( mesInput, labelMes ); // Restaura los estilos originales si la validación es exitosa
    return true;
  }
}

// Función para validar el campo de año
function validarAnho() {
  const anhoActual = new Date().getFullYear(); // Obtiene el año actual
  if ( isNaN( anhoInput.value ) || anhoInput.value < 1 || anhoInput.value > anhoActual ) {
    agregarEstilosError( anhoInput, labelAnho ); // Aplica estilos de error si la validación falla
    return false;
  } else {
    quitarEstilosError( anhoInput, labelAnho ); // Restaura los estilos originales si la validación es exitosa
    return true;
  }
}

// Función principal para calcular la edad
function calcularEdad() {
  // Solo procede al cálculo si todas las validaciones son exitosas
  if ( validarDia() && validarMes() && validarAnho() ) {
    const dia = parseInt( diaInput.value ); // Convierte el valor del día a un número entero
    const mes = parseInt( mesInput.value ); // Convierte el valor del mes a un número entero
    const anho = parseInt( anhoInput.value ); // Convierte el valor del año a un número entero

    const fechaNacimiento = new Date( anho, mes - 1, dia ); // Crea un objeto Date con la fecha de nacimiento
    const fechaActual = new Date(); // Crea un objeto Date con la fecha actual

    let edadAnhos = fechaActual.getFullYear() - fechaNacimiento.getFullYear(); // Calcula la diferencia de años
    let edadMeses = fechaActual.getMonth() - fechaNacimiento.getMonth(); // Calcula la diferencia de meses
    let edadDias = fechaActual.getDate() - fechaNacimiento.getDate(); // Calcula la diferencia de días

    // Si los días son negativos, se ajusta restando un mes y sumando los días del mes anterior
    if ( edadDias < 0 ) {
      edadMeses--;
      edadDias += new Date( fechaActual.getFullYear(), fechaActual.getMonth(), 0 ).getDate();
    }

    // Si los meses son negativos, se ajusta restando un año y sumando 12 meses
    if ( edadMeses < 0 ) {
      edadAnhos--;
      edadMeses += 12;
    }

    mostrarResultado( edadAnhos, edadMeses, edadDias ); // Muestra el resultado final
  }
}

// Función para mostrar el resultado del cálculo en la interfaz de usuario
function mostrarResultado( anhos, meses, dias ) {
  document.getElementById( 'resultado-anhos' ).textContent = anhos; // Actualiza el campo de años
  document.getElementById( 'resultado-meses' ).textContent = meses; // Actualiza el campo de meses
  document.getElementById( 'resultado-dias' ).textContent = dias; // Actualiza el campo de días
}

// Función debouncer para limitar la frecuencia de ejecución de calcularEdad
function debouncer( func, delay ) {
  let timeout;
  return function ( ...args ) {
    clearTimeout( timeout ); // Cancela el temporizador anterior
    timeout = setTimeout( () => func.apply( this, args ), delay ); // Configura un nuevo temporizador
  };
}

// Aplica el debouncer a la función calcularEdad para ejecutarla 1 segundo después de la última entrada
const debouncedCalcularEdad = debouncer( calcularEdad, 1000 );

// Agrega event listeners para cada input que disparan la función debouncedCalcularEdad al modificar su valor
diaInput.addEventListener( 'input', debouncedCalcularEdad );
mesInput.addEventListener( 'input', debouncedCalcularEdad );
anhoInput.addEventListener( 'input', debouncedCalcularEdad );

// Event listener para el formulario que previene el comportamiento por defecto y calcula la edad
formulario.addEventListener( 'submit', ( evento ) => {
  evento.preventDefault(); // Previene el envío del formulario
  calcularEdad(); // Llama a la función para calcular la edad
} );

// Event listener para el botón de resultado que también calcula la edad al hacer clic
botonResultado.addEventListener( 'click', ( event ) => {
  event.preventDefault(); // Previene cualquier acción predeterminada
  calcularEdad(); // Llama a la función para calcular la edad
} );
