const painelLog = document.getElementById('log-painel');

function registrarLog(mensagem) {

    const novaLinha = document.createElement('div');
    novaLinha.textContent = `[${new Date().toLocaleTimeString()}] ${mensagem}`;
    painelLog.appendChild(novaLinha);
}

// 1. EVENTOS DE MOUSE
const btnClique = document.getElementById('btn-clique');
const areaMouse = document.getElementById('area-mouse');

btnClique.addEventListener('click', function() {
    registrarLog("[Click] Evento de mouse: Evento 'click' disparado");

});

// 1.1 EVENTOS DE MOUSE: mouseenter
areaMouse.addEventListener('mouseenter', function() {
    areaMouse.textContent = 'Mouse entrou na área!';
    areaMouse.style.backgroundColor = '#0b810b';
    registrarLog("[Mouse entrou] Evento de mouse: Evento 'mouseenter' disparado");
});

// 1.2 EVENTOS DE MOUSE: mouseleave
areaMouse.addEventListener('mouseleave', function() {
    areaMouse.textContent = 'Mouse saiu da área!';
    areaMouse.style.backgroundColor = '#e74c3c';
    registrarLog("[Mouse saiu] Evento de mouse: Evento 'mouseleave' disparado");
});


// 2. EVENTOS DE TECLADO
const campoTeclado = document.getElementById('campo-teclado');

campoTeclado.addEventListener('keydown', function(event) {
    registrarLog(`[Tecla Pressionada] Evento de teclado: Evento 'keydown' disparado`);
});

// 2.1 EVENTOS DE TECLADO: keyup                                             
campoTeclado.addEventListener('keyup', function(event) {
    registrarLog(`[Tecla Liberada] Evento de teclado: Evento 'keyup' disparado`);
});