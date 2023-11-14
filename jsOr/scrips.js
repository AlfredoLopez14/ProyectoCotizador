function calcularPuntaje() {
    var elementos = document.querySelectorAll('select[name^="capital"]'); // Seleccionar todos los combobox que comienzan con el nombre 'capital'
    var puntajeTotal = 0;

    // Verificar si todas las preguntas están respondidas
    var todasRespondidas = true;
    for (var i = 0; i < elementos.length; i++) {
        var respuesta = parseInt(elementos[i].value); // Obtener el valor del combobox (0 o 1)
        if (isNaN(respuesta) || respuesta < 0) {
            todasRespondidas = false;
            break;
        }
        puntajeTotal += respuesta; // Sumar el valor al puntaje total
    }

    // Mostrar un mensaje si no todas las preguntas están respondidas
    if (!todasRespondidas) {
        document.getElementById('textosalida').textContent = 'Responde las preguntas por favor.';
        return;
    }

    // Cambiar el color de fondo de la respuesta según sea correcta (verde) o incorrecta (rojo)
    for (var i = 0; i < elementos.length; i++) {
        var respuesta = parseInt(elementos[i].value);
        if (respuesta === 1) {
            elementos[i].style.backgroundColor = 'green'; // Respuesta correcta (verde)
        
        } else {
            elementos[i].style.backgroundColor = 'red'; // Respuesta incorrecta (rojo)
        }
    }

    // function GetCorrectAnswer(questionNumber) {
        
    //     switch (questionNumber) {
    //       case 1:
    //         return "Bélgica";
    //       case 2:
    //         return "Buenos Aires";
    //       case 3:
    //         return "Costa Rica";
    //       case 4:
    //         return "Caracas";
    //       case 5:
    //         return "Perú";
    //       case 6:
    //         return "Lima";
    //       case 7:
    //         return "Trinidad y Tobago";
    //       case 8:
    //         return "La Habana";
    //       case 9:
    //         return "Nicaragua";
    //       case 10:
    //         return "Quito";
    //       default:
    //         return "";
    //     }
    //   }



    // Mostrar el resultado debajo del botón de 'Resultado'
    var resultadoTexto = 'Tu puntaje es: ' + puntajeTotal;
    document.getElementById('textosalida').textContent = resultadoTexto;
}

// Asociar la función calcularPuntaje al botón 'sumar'
document.getElementById('sumar').addEventListener('click', calcularPuntaje);

// Limpiar las selecciones y los estilos al hacer clic en 'Borrar'
document.getElementById('reset').addEventListener('click', function() {
    var elementos = document.querySelectorAll('select[name^="capital"]');
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].selectedIndex = 0; 
        elementos[i].style.backgroundColor = ''; 
    }
    document.getElementById('textosalida').textContent = ''; // Limpiar el resultado
});





// Js cuestionario
var preguntasOriginales = []; // Arreglo para almacenar las preguntas originales

// Almacena las preguntas originales al cargar la página
for (var i = 0; i < 10; i++) {
    preguntasOriginales.push(document.getElementById(`p${i}`).innerHTML);
}

function calcularResultado() {
    var respuestasCorrectas = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; 
    var respuestasUsuario = [];

    // Comparar respuestas del usuario con las respuestas correctas y colorear los radio buttons
    for (var i = 0; i < 10; i++) {
        var pregunta = document.querySelector(`input[name="p${i}"]:checked`);
        if (!pregunta) {
            // Mostrar un mensaje si no todas las preguntas están respondidas
            document.getElementById('textosalida').textContent = 'Responde todas las preguntas por favor.';
            return;
        }
        respuestasUsuario.push(parseInt(pregunta.value));

        // Colorear el radio button según sea correcto o incorrecto
        if (respuestasUsuario[i] === respuestasCorrectas[i]) {
            pregunta.parentElement.style.color = 'green'; 
            pregunta.parentElement.innerHTML += ' ✔️'; 
        } else {
            pregunta.parentElement.style.color = 'red'; 
            pregunta.parentElement.innerHTML += ' ❌'; s
        }
    }

    var resultado = respuestasUsuario.reduce((acumulador, valorActual, indice) => {
        return acumulador + (valorActual === respuestasCorrectas[indice]);
    }, 0);

    // Mostrar el puntaje final del usuario
    document.getElementById('textosalida').innerText = `SCORE: ${resultado} / 10`;
}

document.getElementById('sumar').addEventListener('click', function() {
    calcularResultado();
});

document.getElementById('reset').addEventListener('click', function() {
    // Restaurar solo las marcas de verificación y tachas, sin deseleccionar respuestas
    for (var i = 0; i < 10; i++) {
        var seccionPregunta = document.getElementById(`p${i}`);
        seccionPregunta.style.color = 'black';
        seccionPregunta.innerHTML = preguntasOriginales[i]; // Restaurar contenido original
    }

    // Restaurar mensaje predeterminado
    document.getElementById('textosalida').textContent = '¡Responde las preguntas y haz clic en "Resultado" para ver tu puntaje!';
});