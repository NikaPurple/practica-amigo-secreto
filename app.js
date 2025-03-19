let listaAmigos = [];
let amigosSorteados = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (!nombre) {
        alert("Por favor, inserte un nombre.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        input.value = "";
        return;
    }

    listaAmigos.push(nombre);
    input.value = "";
    actualizarListaAmigos();
    actualizarEstadoBotonOtroSorteo();
}

// Función para actualizar la lista visible en la página
function actualizarListaAmigos() {
    const listaElement = document.getElementById('listaAmigos');
    listaElement.innerHTML = listaAmigos
        .map(amigo => `<li role="listitem">${amigo}</li>`)
        .join('');
}

// Función recursiva para realizar el sorteo aleatorio
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("La lista está vacía. Por favor, añade al menos un nombre.");
        return;
    }

    if (amigosSorteados.length === listaAmigos.length) {
        alert("Todos los amigos ya han sido sorteados.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const amigoSorteado = listaAmigos[indiceAleatorio];

    // Verificar si el amigo ya fue sorteado
    if (!amigosSorteados.includes(amigoSorteado)) {
        amigosSorteados.push(amigoSorteado);

        const resultadoElement = document.getElementById('resultado');
        resultadoElement.innerHTML += `<li>El amigo secreto es: <strong>${amigoSorteado}</strong></li>`;

        actualizarEstadoBotonOtroSorteo();
    } else {
        sortearAmigo(); // Llamada recursiva controlada
    }
}

// Función para reiniciar el sorteo
function reiniciarSorteo() {
    listaAmigos = [];
    amigosSorteados = [];
    document.getElementById('listaAmigos').innerHTML = ""; // Limpiar la lista de amigos
    document.getElementById('resultado').innerHTML = ""; // Limpiar los resultados
    alert("¡El sorteo ha sido reiniciado!");
    actualizarEstadoBotonOtroSorteo();
}

// Función para habilitar o deshabilitar el botón "Otro sorteo"
function actualizarEstadoBotonOtroSorteo() {
    const botonOtroSorteo = document.getElementById('botonOtroSorteo');
    botonOtroSorteo.disabled = amigosSorteados.length === 0;
}
