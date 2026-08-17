const gravador = document.getElementById('btn-gravador');
const statusGravacao = document.getElementById('status-gravacao');
const playerAudio = document.getElementById('player-audio');

let gravando;
let audio = [];

// Começar a gravar
function iniciarGravacao() {

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {

        audio = [];

        gravando = new MediaRecorder(stream);

        gravando.ondataavailable = function(event) {
            audio.push(event.data);
        };

        gravando.onstop = function() {

            let arquivo = new Blob(audio);

            playerAudio.src = URL.createObjectURL(arquivo);
            playerAudio.style.display = 'block';

            statusGravacao.textContent = 'Status: Gravação concluída!';

            stream.getTracks()[0].stop();
        };

        gravando.start();

        statusGravacao.textContent = 'Status: Capturando áudio...';
        gravador.style.backgroundColor = '#e74c3c';
    });
}

// Parar de gravar
function pararGravacao() {

    if (gravando) {
        gravando.stop();

        gravador.innerHTML = '🎤 Clique e Segure para Gravar';
        gravador.style.backgroundColor = '#3498db';
    }
}

gravador.addEventListener('mousedown', iniciarGravacao);
gravador.addEventListener('mouseup', pararGravacao);

gravador.addEventListener('touchstart', iniciarGravacao);
gravador.addEventListener('touchend', pararGravacao);