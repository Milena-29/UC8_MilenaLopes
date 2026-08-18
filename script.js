// ====================================================================================================================================================================================
// FASE 1: Alterar o texto dentro da caixinha
// COMPORTAMENTO: 
// --> A tela inicia com o texto “O JavaScript pode alterar o conteúdo de um elemento HTML”. 
// --> Ao clicar no botão “Alterar texto” o texto deve ser alterado para “Olá, JavaScript! O texto foi trocado!”. 
// --> O botão “Resetar” volta o resultado para o texto inicial.

// >>> CRIE AS FUNÇÕES PARA ALTERAR O TEXTO E RESETAR O TEXTO DO BOX 1 <<<
// ====================================================================================================================================================================================
const demo1 = document.getElementById('demo1');
const botaoAlterarTexto = document.getElementById('botao-alterar-texto');
const botaoResetarDemo1 = document.getElementById('botao-resetar-demo1');

const textoOriginal = demo1.innerHTML;


function alterarConteudo() {

  // Essa linha pega o elemento demo1 e altera o conteúdo do texto.
  demo1.innerHTML = 'Olá, JavaScript! O texto foi trocado!';

}


function resetarConteudo() {

  // Essa linha pega o texto original e coloca novamente dentro do elemento.
  demo1.innerHTML = textoOriginal;

}

  botaoAlterarTexto.addEventListener('click', alterarConteudo);
  botaoResetarDemo1.addEventListener('click', resetarConteudo);
// ====================================================================================================================================================================================
// FASE 2: LIGAR E DESLIGAR LÂMPADA
// COMPORTAMENTO: 
// --> A tela inicia com a lâmpada desligada. 
// --> Ao clicar no botão “Ligar a luz” a lâmpada deve ligar.
// --> Quando clicar em “Desligar a luz” a lâmpada deve desligar.

// >>> CRIE AS FUNÇÕES PARA LIGAR E DESLIGAR A LÂMPADA DO BOX 2 <<<
// ====================================================================================================================================================================================
const lampada = document.getElementById('lamp');
const botaoLigar = document.getElementById('botao-ligar');
const botaoDesligar = document.getElementById('botao-desligar');
const lampadaStatus = document.getElementById('lamp-status');
const lampadaLigada = document.getElementById('lamp-on');
const lampadaDesligada = document.getElementById('lamp-off');



function ligarLampada() {
  // escreva a sua solução aqui

  lampada.style.display = 'block';
  lampadaStatus.textContent = 'Lâmpada ligada';
  lampadaLigada.style.display = 'block';
  lampadaDesligada.style.display = 'none';

}


function desligarLampada() {
  // escreva a sua solução aqui

  lampada.style.display = 'block';
  lampadaStatus.textContent = 'Lâmpada desligada';
  lampadaLigada.style.display = 'none';
  lampadaDesligada.style.display = 'block';
}

  botaoLigar.addEventListener('click', ligarLampada);
  botaoDesligar.addEventListener('click', desligarLampada);
// ====================================================================================================================================================================================
// FASE 3: Alterar os estilos do texto
// COMPORTAMENTO: 
// --> A tela inicia com o texto “O JavaScript pode alterar o estilo visual de qualquer elemento”, sem nenhum estilo aplicado.
// --> Ao clicar no botão “Aumentar fonte”, o tamanho da letra deve aumentar para 25px.
// --> Ao clicar no botão “Mudar cor”, a cor do texto deve ficar verde. Ao clicar no botão “Negrito”, o texto fica em negrito.
// --> Ao clicar no botão “Fundo”, é aplicado um fundo com transparência no texto. 
// --> O botão “Resetar” volta o resultado para o texto inicial.

// >>> CRIE AS FUNÇÕES PARA AUMENTAR TAMANHO DA FONTE, MUDAR A COR, APLICAR NEGRITO, APLICAR FUNDO E RESETAR A DEMONSTRAÇÃO DO BOX 3 <<<
// ====================================================================================================================================================================================

const demo3 = document.getElementById('demo3');
const botaoAumentarFonte = document.getElementById('botao-aumentar-fonte');
const botaoMudarCor = document.getElementById('botao-mudar-cor');
const botaoNegrito = document.getElementById('botao-negrito');
const botaoFundo = document.getElementById('botao-fundo');
const botaoResetarDemo3 = document.getElementById('botao-resetar-demo3');

const textoInicial = demo3.textContent;


function aumentarFonte() {
  // escreva a sua solução aqui

  //Essa linha pega a variavel demo3 (que é o id do texto no html) e aumenta o tamanho da letra
  demo3.style.fontSize = '25px';
}


function mudarCor() {
  // escreva a sua solução aqui

  //Essa linha pega a variavel demo3 (que é o id do texto no html) e muda a cor do texto
  demo3.style.color = '#00d4aa';
}


function aplicarNegrito() {
  // escreva a sua solução aqui

  //Essa linha pega a variavel demo3 (que é o id do texto no html) e deixa o texto em negrito
  demo3.style.fontWeight = 'bold';
}


function aplicarFundo() {
  // escreva a sua solução aqui

  //Essa linha pega a variavel demo3 (que é o id do texto no html) e muda o fundo do texto
  demo3.style.backgroundColor = '#ffffff49';
}


function resetarDemonstracao() {
  // escreva a sua solução aqui

  // Essas linhas remove o tamanho da fonte, cor, fonte e fundo do texto.
  demo3.style.fontSize = '';
  demo3.style.color = '';
  demo3.style.fontWeight = '';
  demo3.style.backgroundColor = '';
}

  botaoAumentarFonte.addEventListener('click', aumentarFonte);
  botaoMudarCor.addEventListener('click', mudarCor);
  botaoNegrito.addEventListener('click', aplicarNegrito);
  botaoFundo.addEventListener('click', aplicarFundo);
  botaoResetarDemo3.addEventListener('click', resetarDemonstracao);


// ====================================================================================================================================================================================
// FASE 4: Ocultar o texto
// COMPORTAMENTO: 
// --> A tela inicia com o texto “Este parágrafo vai sumir quando você clicar no botão abaixo.”.
// --> Ao clicar no botão “Ocultar elemento”, o texto deve sumir. 
// --> O botão “Resetar” volta o resultado para o texto inicial.

// >>> CRIE AS FUNÇÕES PARA OCULTAR ELEMENTO E MOSTRAR ELEMENTO DO BOX 4 <<<
// ======================================================================================================================================================================================
const demo4 = document.getElementById('demo4');
const botaoOcultar = document.getElementById('botao-ocultar');
const botaoMostrar = document.getElementById('botao-mostrar');

const fenix = demo4.textContent;

function ocultarElemento() {
  // escreva a sua solução aqui

  // Essa linha oculta o texto do elemento.
  demo4.style.display = 'none'
}


function mostrarElemento() {
  // escreva a sua solução aqui

  // Essa linha muda o texto do elemento para o texto original.
  demo4.style.display = 'block'
  demo4.textContent = fenix;
}

  botaoOcultar.addEventListener('click', ocultarElemento);
  botaoMostrar.addEventListener('click', mostrarElemento);

// ====================================================================================================================================================================================
// FASE 5: Exibir o texto
// COMPORTAMENTO: 
// --> A tela inicia com um texto oculto. 
// --> Ao clicar no botão “Revelar elemento”, o texto deve aparecer. 
// --> O botão “Resetar” volta o resultado para o texto inicial.

// >>> CRIE AS FUNÇÕES PARA MOSTRAR TEXTO E OCULTAR TEXTO DO BOX 5 <<<
// ====================================================================================================================================================================================
const textoEscondido = document.getElementById('hidden-text');
const botaoRevelar = document.getElementById('botao-revelar');
const botaoEsconder = document.getElementById('botao-esconder');
const texto1 = document.getElementById('demo5-hint');


function exibirTexto() {

  // Essa linha mostra o texto escondido.
  textoEscondido.style.display = 'block';

  // Essa linha esconde a mensagem que aparece antes de revelar o texto.
  texto1.style.display = 'none';

}


function esconderTexto() {

  // Essa linha esconde novamente o texto que foi revelado.
  textoEscondido.style.display = 'none';

  // Essa linha mostra novamente a mensagem inicial.
  texto1.style.display = 'block';

}

  botaoRevelar.addEventListener('click', exibirTexto);
  botaoEsconder.addEventListener('click', esconderTexto);

// ====================================================================================================================================================================================
// FASE 6: Iniciar a aplicação
// COMPORTAMENTO:
// --> O index.html será executado 
// --> Em seguida, a linha "document.addEventListener('DOMContentLoaded', iniciarAplicacao);" vai chamar a função iniciarAplicacao()
// --> A função será executada e dentro dela terá outras chamadas de função (as que você criou ali em cima - FASE 1 a 5)
// --> Essas chamadas de função devem executar as funções que você programou na sua página

// >>> CRIE A FUNÇÃO PARA INICIAR A APLICAÇÃO, QUE SERÁ CHAMADA PELA LINHA document.addEventListener('DOMContentLoaded', iniciarAplicacao); <<<
// ====================================================================================================================================================================================

function iniciarAplicacao() {
  // --------------------------------------------------------
  // FASE 1: Configure e chame as funções que irão alterar 
  // e resetar o texto dentro da caixinha
  // --------------------------------------------------------

  resetarConteudo();


  // --------------------------------------------------------
  // FASE 2: Configure e chame as funções que irão ligar e
  // desligar a lâmpada
  // --------------------------------------------------------

  desligarLampada();


  // --------------------------------------------------------
  // FASE 3: Configure e chame as funções que irão alterar
  // os estilos do texto
  // --------------------------------------------------------

  resetarDemonstracao();


  // --------------------------------------------------------
  // FASE 4: Configure e chame as funções que irão ocultar e
  // mostrar o elemento
  // --------------------------------------------------------

  mostrarElemento();


  // --------------------------------------------------------
  // FASE 5: Configure e chame as funções que irão ocultar e
  // mostrar o texto
  // --------------------------------------------------------

  esconderTexto();
}

document.addEventListener('DOMContentLoaded', iniciarAplicacao);
