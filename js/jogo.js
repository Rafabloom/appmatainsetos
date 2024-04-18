//browser tamanho
var altura = 0;
var largura = 0;

var jogoPronto = false; // Definindo jogoPronto globalmente

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura);
}

//variavel das vidas
var vidas = 1;

//variavel tempo (cronometro)
var tempo = 25;

//variavel niveis e tempo do mosquito
var tempoMosquito = 2000;

var nivel = window.location.search 
nivel = nivel.replace("?", "")

if(nivel === "facil") {
    //2000
    tempoMosquito = 2000;
} else if (nivel === "medio") {
    //1500
    tempoMosquito = 1500;
} else if (nivel === "dificil") {
    //1000
    tempoMosquito = 1000;
} else if (nivel === "modoexpert") {
    //750
    tempoMosquito = 750;
}

// Chama a função para ajustar o tamanho do palco do jogo assim que a página carregar
ajustaTamanhoPalcoJogo();

//variavel cronometro
var cronometro;

function iniciarCronometro() {
    cronometro = setInterval(function() {
        tempo -= 1;

        if(tempo < 0) {
            clearInterval(cronometro);
            clearInterval(criaMosquito);
            window.location.href = "vitoria.html";
        } else {
            document.getElementById("cronometro").innerHTML = tempo;

        }

    }, 1000);
}

// Função para adicionar o evento de clique ao botão "Estou Pronto"
function adicionarEventoBotaoInicio() {
    // Encontra o botão "Estou Pronto" pelo seu id
    var botaoInicio = document.getElementById("startGameButton");

    // Adiciona um evento de clique ao botão "Estou Pronto"
    botaoInicio.addEventListener("click", function() {
        // Oculta o botão "Estou Pronto" quando clicado
        botaoInicio.style.display = "none";
        
        // Inicia o cronômetro apenas quando o botão for clicado
        if (!jogoPronto) {
            jogoPronto = true; // Atualiza o status do jogo para pronto
            iniciarCronometro();
        }
    });
}

// Adicionar evento de clique ao botão "Estou Pronto" após o carregamento do DOM
window.addEventListener('DOMContentLoaded', adicionarEventoBotaoInicio);

// Função para criar mosquitos em posições aleatórias
function criaMosquito() {
    // Verifica se o jogo está pronto para começar
    if (!jogoPronto) {
        return; // Retorna sem criar mosquitos se o jogo não estiver pronto
    }

    //remover o mosquito anterior (caso exista)
    if(document.getElementById("mosquito")) {
        document.getElementById("mosquito").remove();

        //mecânica do jogo (perder vidas = perder 3 = game over)
        if(vidas > 3) {
            window.location.href = "fim_de_jogo.html";
        } else {
            document.getElementById("v" + vidas).src = "Imagens/coracao_vazio.png";
            vidas++;
        }
    }

    // Margem de segurança
    var margem = 80;

    //mosquitos em posições randômicas
    var posicaoX = Math.floor(Math.random() * (largura - margem * 2)) + margem;
    var posicaoY = Math.floor(Math.random() * (altura - margem * 2)) + margem;

    //criar elemento HTML e adicionar ao corpo do documento
    var mosquito = document.createElement("img");
    mosquito.onclick = function() {
        this.remove();
    }
    mosquito.src = "Imagens/inseto.png";
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + "px";
    mosquito.style.top = posicaoY + "px";
    mosquito.style.position = "absolute";
    mosquito.id = "mosquito";
    document.body.appendChild(mosquito);

    // Chama a função para alternar a imagem do mosquito em um intervalo de tempo
    criaMosquito.intervalo = setInterval(alternarImagemMosquito, tempoMosquito);
}

// Função para criar mosquitos em posições aleatórias
function posicaoRandomica() {
    // Verifica se o jogo está pronto para começar
    if (!jogoPronto) {
        return; // Retorna sem criar mosquitos se o jogo não estiver pronto
    }

    //remover o mosquito anterior (caso exista)
    if(document.getElementById("mosquito")) {
        document.getElementById("mosquito").remove();

        //mecânica do jogo (perder vidas = perder 3 = game over)
        if(vidas > 3) {
            window.location.href = "fim_de_jogo.html";
        } else {
            document.getElementById("v" + vidas).src = "Imagens/coracao_vazio.png";
            vidas++;
        }
    }

    //mosquitos em posições randômicas
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    //criar elemento HTML
    var mosquito = document.createElement("img");

    // Adiciona um evento de clique ao mosquito para removê-lo
    mosquito.onclick = function() {
        this.remove();
    }

    mosquito.src = "Imagens/inseto.png";
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + "px";
    mosquito.style.top = posicaoY + "px";
    mosquito.style.position = "absolute";
    mosquito.id = "mosquito";

    document.body.appendChild(mosquito);

    // Chama a função para alternar a imagem do mosquito em um intervalo de tempo
    criaMosquito.intervalo = setInterval(alternarImagemMosquito, tempoMosquito);
}


// Função para alternar a imagem do mosquito
function alternarImagemMosquito() {
    var mosquito = document.getElementById("mosquito");
    if (mosquito) {
        var imagens = [
            "Imagens/inseto.png",
            "Imagens/inseto2.png",
            "Imagens/inseto3.png",
            "Imagens/inseto4.png",
            "Imagens/inseto5.png",
            "Imagens/inseto6.png",
            "Imagens/inseto7.png"
        ];
        var indice = Math.floor(Math.random() * imagens.length);
        mosquito.src = imagens[indice];
    }
}

//mosquitos em TAMANHOS aleatórios
function tamanhoAleatorio () {
    var classe = Math.floor(Math.random() * 3);

    switch(classe) {
        case 0:
            return "mosquito1";
        case 1:
            return "mosquito2";
        case 2:
            return "mosquito3";
    }
    
}

//mosquitos em LADOS aleatórios
function ladoAleatorio () {
    var classe = Math.floor(Math.random() * 2);

    switch(classe) {
        case 0:
            return "ladoA";
        case 1:
            return "ladoB";
    }
}