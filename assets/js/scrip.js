const monedaSelect = document.getElementById("moneda");
        const cantidadInput = document.getElementById("cantidad");
        const resultadoDiv = document.getElementById("resultado");
        const convertirBtn = document.getElementById("convertirBtn");

        // Realizar una solicitud a la API para obtener los datos JSON
        fetch("https://mindicador.cl/api/")
            .then(response => response.json())
            .then(apiData => {
                // Llenar el selector de moneda 
                for (const moneda in apiData) {
                    if (apiData.hasOwnProperty(moneda) && apiData[moneda].valor !== undefined) {
                        const opcion = document.createElement("option");
                        opcion.value = moneda;
                        opcion.textContent = `${apiData[moneda].nombre} `;
                        monedaSelect.appendChild(opcion);
                    }
                }

                // Agregar evento al botón
                convertirBtn.addEventListener("click", () => {
                    const cantidad = parseFloat(cantidadInput.value);
                    const moneda = monedaSelect.value;

                    if (isNaN(cantidad)) {
                        resultadoDiv.innerHTML = "Ingrese una cantidad válida.";
                        return;
                    }

                    // conversión de la moneda seleccionada
                    const valorConversion = apiData[moneda].valor;

                    // Realizar la conversión
                    const conversion = cantidad / valorConversion;

                    resultadoDiv.innerHTML = `Resultado: ${conversion.toFixed(2)} ${moneda}`;
                });
            });

            