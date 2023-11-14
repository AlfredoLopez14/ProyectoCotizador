document.addEventListener('DOMContentLoaded', function() {
    var sumarButton = document.getElementById('sumar');
    var resetButton = document.getElementById('reset');
    var resumenCompraDiv = document.getElementById('resumenCompra');
    
    sumarButton.addEventListener('click', function() {
        var opcionesSeleccionadas = [];
        var total = 0;
        var opciones = document.querySelectorAll('input[type=radio]:checked, input[type=checkbox]:checked');

        opciones.forEach(function(opcion) {
            if (opcion.value) {
                total += parseInt(opcion.value);
                opcionesSeleccionadas.push(opcion.parentNode.textContent.trim());
            }
        });

        var selectBox = document.getElementById('capitalseleccion1');
        var selectedOption = selectBox.options[selectBox.selectedIndex];

        if (selectedOption.value) {
            total += parseInt(selectedOption.value);
            opcionesSeleccionadas.push(selectedOption.textContent);
        }

        var iva = total * 0.16;
        var subtotal = total;
        total += iva;

        if (opcionesSeleccionadas.length > 0) {
            var opcionesTexto = opcionesSeleccionadas.join(', ');
            var resumenCompra = `Productos seleccionados: ${opcionesTexto}\nSubtotal: $${subtotal} | IVA (16%): $${iva.toFixed(2)} | Total: $${total.toFixed(2)}`;
            document.getElementById('textosalida').textContent = resumenCompra;
            resumenCompraDiv.textContent = resumenCompra;
        } else {
            document.getElementById('textosalida').textContent = 'Por favor, selecciona al menos un producto.';
            resumenCompraDiv.textContent = '';
        }
    });

    resetButton.addEventListener('click', function() {
        var opciones = document.querySelectorAll('input[type=radio], input[type=checkbox]');
        opciones.forEach(function(opcion) {
            opcion.checked = false;
        });

        var selectBox = document.getElementById('capitalseleccion1');
        selectBox.selectedIndex = 0;

        document.getElementById('textosalida').textContent = '';
        resumenCompraDiv.textContent = '';
    });
});
