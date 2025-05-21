const cores = ["vermelho", "verde", "amarelo", "azul"];
let sequenciaJogo = [];
let sequenciaJogador = [];
let nivel = 0;
let podeClicar = false;

// Sons
const sons = {
  vermelho: new Audio("sounds/red.mp3"),
  verde: new Audio("sounds/green.mp3"),
  azul: new Audio("sounds/blue.mp3"),
  amarelo: new Audio("sounds/yellow.mp3"),
  erro: new Audio("sounds/error.mp3")
};

function iniciarJogo() {
  nivel = 0;
  sequenciaJogo = [];
  document.getElementById("nivel").textContent = "Rodada 1";
  gerarProximaCor();
}

function gerarProximaCor() {
  podeClicar = false;
  sequenciaJogador = [];
  const corAleatoria = cores[Math.floor(Math.random() * 4)];
  sequenciaJogo.push(corAleatoria);
  nivel++;
  document.getElementById("nivel").textContent = `Rodada ${nivel}`;
  mostrarSequencia();
}

function mostrarSequencia() {
  let i = 0;
  const intervalo = setInterval(() => {
    const cor = sequenciaJogo[i];
    animarBotao(cor);
    tocarSom(cor);
    i++;
    if (i >= sequenciaJogo.length) {
      clearInterval(intervalo);
      podeClicar = true;
    }
  }, 700);
}

function verificarClique(cor) {
  if (!podeClicar) return;

  sequenciaJogador.push(cor);
  animarBotao(cor);
  tocarSom(cor);

  const indice = sequenciaJogador.length - 1;
  if (sequenciaJogador[indice] !== sequenciaJogo[indice]) {
    tocarSom("erro");
    document.getElementById("nivel").textContent = "Errou! Clique em Iniciar Jogo.";
    podeClicar = false;
    return;
  }

  if (sequenciaJogador.length === sequenciaJogo.length) {
    setTimeout(gerarProximaCor, 1000);
  }
}

function animarBotao(cor) {
  const botao = document.getElementById(cor);
  botao.classList.add("ativa");
  setTimeout(() => {
    botao.classList.remove("ativa");
  }, 300);
}

function tocarSom(cor) {
  sons[cor].currentTime = 0;
  sons[cor].play();
}