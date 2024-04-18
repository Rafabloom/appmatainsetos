var audioFundo = document.getElementById('audioFundo');
var audioSpray = document.getElementById('audioSpray');
var fundoIniciado = false;
var somAtivado = true;

// Configuração do áudio de fundo para loop, se o som estiver ativado
if (somAtivado) {
    audioFundo.loop = true;
}

// Ícone do botão de volume com base no estado inicial do som
var icone = document.getElementById('toggleSoundButton').querySelector('i');
icone.classList.toggle('fa-volume-up', somAtivado);
icone.classList.toggle('fa-volume-off', !somAtivado);

// Evento de clique ao documento para reproduzir o áudio de spray
document.documentElement.addEventListener('mousedown', function () {
    if (somAtivado) {
        audioSpray.play();
    }
    document.documentElement.classList.add('clicked');
});

// Evento de clique ao documento para remover a classe 'clicked'
document.documentElement.addEventListener('mouseup', function () {
    document.documentElement.classList.remove('clicked');
});

// Evento de clique ao botão de volume para alternar o som
document.getElementById('toggleSoundButton').addEventListener('click', function () {
    if (somAtivado) {
        audioFundo.pause();
        audioSpray.pause();
        somAtivado = false;
    } else {
        audioFundo.play();
        somAtivado = true;
    }
    var icone = this.querySelector('i');
    icone.classList.toggle('fa-volume-up', somAtivado);
    icone.classList.toggle('fa-volume-off', !somAtivado);
});

var playPromise = audioFundo.play();

if (playPromise !== undefined) {
    playPromise.then(_ => {
        // Reprodução automática iniciada
    })
    .catch(error => {
        // A reprodução automática foi impedida
    });
}

// Verifica se a página atual é a 'app.html' para iniciar a música de fundo
if (window.location.pathname === '/app.html') {
    audioFundo.play();
}

// Função para realizar o fade-in do áudio de fundo
function fadeInFundo() {
    fundoIniciado = true;
    audioFundo.volume = 0;
    audioFundo.play();
    var fadeInterval = setInterval(function () {
        if (audioFundo.volume < 1) {
            var newVolume = audioFundo.volume + 0.05;
            audioFundo.volume = Math.min(newVolume, 1);
        } else {
            clearInterval(fadeInterval);
        }
    }, 200);
}