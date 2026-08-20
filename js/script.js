const apiUrl = 'https://api.disneyapi.dev/character';      // SUBSTITUA PELO ENDPOINT DA API QUE VOCÊ VAI USAR (URL)

// Variáveis para controlar a navegação de páginas e a contagem total acumulada
let paginaAtual = 1;
let totalPersonagens = 0;
const limitePorPagina = 50; // Define a quantidade máxima de itens solicitados por vez

const botaoCarregar = document.getElementById('btnCarregar');    // Botão para carregar mais personagens
const contadorP = document.getElementById('contadorPersonagens'); // Mensagem que mostra o número de personagens carregados
const page = document.getElementById('pagina');                  // Mensagem que mostra a página atual
const div = document.getElementById('container');                // Container para os cards


// FUNÇÃO PARA CARREGAR OS PERSONAGENS
function carregarPersonagens() {

    botaoCarregar.disabled = true;      // Desabilita o botão enquanto a API responde
    
    // Monta a URL concatenando a API base com os parâmetros da página e do limite
    let url = `${apiUrl}?page=${paginaAtual}&pageSize=${limitePorPagina}`;    


    // O FETCH() É UMA FUNÇÃO QUE FAZ UMA REQUISIÇÃO HTTP PARA UM ENDPOINT E RETORNA UMA RESPOSTA
    fetch(url) 

        // O THEN() É UMA FUNÇÃO QUE EXECUTA UM BLOCO DE CÓDIGO QUANDO O FETCH() RETORNA UMA RESPOSTA
        // O RESPOSTA.JSON() VAI CONVERTER A RESPOSTA EM UM OBJETO JSON    
        .then(function (resposta) {     
            return resposta.json();
        })


        // O THEN() É UMA FUNÇÃO QUE EXECUTA UM BLOCO DE CÓDIGO QUANDO O RESPOSTA.JSON() RETORNA UM OBJETO JSON
        // AQUI VAI RECEBER O OBJETO JSON CONVERTIDO COM OS DADOS DA API, E VOCÊ VAI MANIPULAR ESSES DADOS PARA CRIAR OS CARDS COM OS PERSONAGENS
        .then(function (resultado) { 

            // Exibe os dados retornados no console para análise conforme orientações da missão
            console.log('Dados recebidos da API:', resultado);

            // Pega o array de personagens retornado na propriedade 'data' do JSON
            const personagens = resultado.data;

            // Verifica se o resultado é uma lista e percorre cada item enviando para a criação do card
            if (Array.isArray(personagens)) {
                personagens.forEach(function (personagem) {
                    criarCard(personagem);
                });
                totalPersonagens += personagens.length; // Soma o número de itens recebidos ao total
            } else if (personagens) {
                // Tratamento caso a API retorne apenas um único objeto em vez de lista
                criarCard(personagens);
                totalPersonagens += 1;
            }

            // Atualiza as mensagens da tela com o total acumulado e o número da página
            contadorP.textContent = `${totalPersonagens} personagens carregados`;
            page.textContent = `Página ${paginaAtual}`;

            // Incrementa o contador da página para a próxima chamada e reativa o botão
            paginaAtual++;
            botaoCarregar.disabled = false;
        })
        .catch(function (erro) {
            console.error('Erro na requisição:', erro);
            botaoCarregar.disabled = false;
        });
}

// FUNÇÃO PARA CRIAR O CARD DE CADA PERSONAGEM
function criarCard(personagem) {

    // Cria o elemento principal do card
    const card = document.createElement('div');
    card.classList.add('card');

    // Imagem padrão em SVG inline (funciona offline e evita bloqueios de rede)
    const imagemPadrao = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23666666">Sem Imagem</text></svg>';

    // Define a imagem base do JSON ou o fallback
    const imagemUrl = personagem.imageUrl || imagemPadrao;

    // Insere a estrutura interna do card com imagem e nome do personagem
    card.innerHTML = `
        <img src="${imagemUrl}" alt="${personagem.name}">
        <h3>${personagem.name}</h3>
    `;

    // Tratamento dinâmico para URLs de imagem quebradas (404) retornadas pela API
    const imgElemento = card.querySelector('img');
    imgElemento.addEventListener('error', function () {
        this.src = imagemPadrao;
    });

    // Adiciona o card pronto dentro do container HTML
    div.appendChild(card);
}

// ABAIXO VOCÊ DEVE IMPLEMENTAR O EVENTO DE CLIQUE NO BOTÃO PARA CARREGAR MAIS PERSONAGENS, E CHAMAR A FUNÇÃO carregarPersonagens() NOVAMENTE PARA CARREGAR A PRÓXIMA PÁGINA DE PERSONAGENS

// Atribui o evento de clique ao botão para disparar a função
botaoCarregar.addEventListener('click', carregarPersonagens);

// Faz a primeira execução automática assim que o arquivo JS é carregado
carregarPersonagens();