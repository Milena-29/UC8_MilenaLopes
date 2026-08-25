// ==================== MENU HAMBÚRGUER ====================

const btnMenu = document.getElementById("btnMenu");
const menuNav = document.getElementById("menuNav");

if (btnMenu && menuNav) {
    btnMenu.addEventListener("click", function() {
        menuNav.classList.toggle("ativo");
    });
}


// ==================== NEWSLETTER ====================

const botaoNewsletter = document.getElementById("btnNewsletter");

if (botaoNewsletter) {

    botaoNewsletter.addEventListener("click", function() {

        const emailInput = document.getElementById("emailNewsletter");
        const email = emailInput.value;

        if (email == "") {
            alert("Por favor, digite seu e-mail!");
            return;
        }

        localStorage.setItem("newsletterEmail", email);

        alert("E-mail cadastrado com sucesso! Agora você vai receber promoções e novidades.");

        emailInput.value = "";
    });
}


// ==================== CARROSSEL ====================

const imagens = document.querySelectorAll(".imagens-slide img");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const indicadores = document.getElementById("indicadores");
const carrossel = document.querySelector(".carrossel-container");

let imagemAtual = 0;
let intervalo;

// Variáveis usadas no toque do celular
let inicioToque = 0;
let fimToque = 0;


// Verifica se o carrossel existe
if (
    imagens.length > 0 &&
    btnPrev &&
    btnNext &&
    indicadores &&
    carrossel
) {

    // Cria as bolinhas do carrossel
    function criarIndicadores() {

        for (let i = 0; i < imagens.length; i++) {

            const bolinha = document.createElement("div");

            bolinha.classList.add("bolinha");

            if (i == 0) {
                bolinha.classList.add("ativa");
            }

            bolinha.addEventListener("click", function() {

                imagemAtual = i;

                atualizarCarrossel();

                reiniciarCarrossel();
            });

            indicadores.appendChild(bolinha);
        }
    }


    // Atualiza a imagem que aparece
    function atualizarCarrossel() {

        for (let i = 0; i < imagens.length; i++) {
            imagens[i].classList.remove("ativa");
        }

        imagens[imagemAtual].classList.add("ativa");


        // Atualiza as bolinhas
        const bolinhas = document.querySelectorAll(".bolinha");

        for (let i = 0; i < bolinhas.length; i++) {
            bolinhas[i].classList.remove("ativa");
        }

        bolinhas[imagemAtual].classList.add("ativa");
    }


    // Vai para a próxima imagem
    function proximaImagem() {

        imagemAtual++;

        if (imagemAtual >= imagens.length) {
            imagemAtual = 0;
        }

        atualizarCarrossel();
    }


    // Volta para a imagem anterior
    function imagemAnterior() {

        imagemAtual--;

        if (imagemAtual < 0) {
            imagemAtual = imagens.length - 1;
        }

        atualizarCarrossel();
    }


    // Começa a troca automática
    function iniciarCarrossel() {

        intervalo = setInterval(function() {
            proximaImagem();
        }, 4000);
    }


    // Reinicia o carrossel automático
    function reiniciarCarrossel() {

        clearInterval(intervalo);

        iniciarCarrossel();
    }


    // Botão próximo
    btnNext.addEventListener("click", function() {

        proximaImagem();

        reiniciarCarrossel();
    });


    // Botão anterior
    btnPrev.addEventListener("click", function() {

        imagemAnterior();

        reiniciarCarrossel();
    });


    // Para o carrossel quando o mouse entra
    carrossel.addEventListener("mouseenter", function() {
        clearInterval(intervalo);
    });


    // Volta o carrossel quando o mouse sai
    carrossel.addEventListener("mouseleave", function() {
        iniciarCarrossel();
    });


    // ==================== TOQUE NO CELULAR ====================

    carrossel.addEventListener("touchstart", function(event) {

        inicioToque = event.touches[0].clientX;

        clearInterval(intervalo);
    });


    carrossel.addEventListener("touchmove", function(event) {

        fimToque = event.touches[0].clientX;
    });


    carrossel.addEventListener("touchend", function() {

        const distancia = inicioToque - fimToque;


        // Arrastou para a esquerda
        if (distancia > 50) {

            proximaImagem();
        }


        // Arrastou para a direita
        if (distancia < -50) {

            imagemAnterior();
        }


        iniciarCarrossel();
    });


    criarIndicadores();

    iniciarCarrossel();
}


// ==================== SERVICE WORKER ====================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker.register("./sw.js")

        .then(function(registro) {

            console.log(
                "Service Worker registrado com sucesso:",
                registro.scope
            );

        })

        .catch(function(erro) {

            console.log(
                "Erro ao registrar Service Worker:",
                erro
            );

        });
    });
}


// ==================== PLANOS ====================

document.addEventListener("DOMContentLoaded", function() {

    const planos = {

        basico: {
            nome: "Básico",
            preco: "R$ 99,90",
            imagem: "img/PlanoBasico.png"
        },

        premium: {
            nome: "Premium+",
            preco: "R$ 129,90",
            imagem: "img/PlanoPremium+.png"
        },

        vip: {
            nome: "VIP+",
            preco: "R$ 199,90",
            imagem: "img/PlanoVIP+.png"
        }
    };


    // Pega o plano que veio pela URL
    const url = new URLSearchParams(window.location.search);

    const planoEscolhido = url.get("plano");


    if (planoEscolhido && planos[planoEscolhido]) {

        const plano = planos[planoEscolhido];


        const imagem = document.getElementById("resumoImg");
        const nome = document.getElementById("resumoNome");
        const valor = document.getElementById("resumoValor");
        const total = document.getElementById("resumoTotal");


        if (imagem) {
            imagem.src = plano.imagem;
        }

        if (nome) {
            nome.innerText = plano.nome;
        }

        if (valor) {
            valor.innerText = plano.preco;
        }

        if (total) {
            total.innerText = plano.preco;
        }
    }

});


// ==================== FORMAS DE PAGAMENTO ====================

function mostrarPagamento(tipo, elemento) {

    // Remove o ativo dos métodos
    const metodos = document.querySelectorAll(".Metodo");

    for (let i = 0; i < metodos.length; i++) {
        metodos[i].classList.remove("ativo");
    }


    // Coloca ativo no método escolhido
    if (elemento) {
        elemento.classList.add("ativo");
    }


    // Esconde os formulários
    const conteudos = document.querySelectorAll(".conteudoPagamento");

    for (let i = 0; i < conteudos.length; i++) {
        conteudos[i].style.display = "none";
    }


    // Mostra o formulário escolhido
    if (tipo == "cartao") {

        document.getElementById("formCartao").style.display = "block";

    } else if (tipo == "pix") {

        document.getElementById("formPix").style.display = "block";

    } else if (tipo == "boleto") {

        document.getElementById("formBoleto").style.display = "block";
    }
}


// ==================== FINALIZAR PAGAMENTO ====================

function finalizarPagamento() {

    localStorage.setItem("aluno", "true");

    alert("Pagamento finalizado!");
}


// ==================== COPIAR PIX ====================

function copiarPix() {

    const codigo = document.getElementById("codigoPix");

    if (codigo) {

        codigo.select();

        codigo.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(codigo.value);

        alert("Código Pix copiado!");
    }
}


// ==================== BOLETO ====================

function gerarBoleto() {

    const codigoBoleto =
        "34191.09008 61713.917307 71621.145008 3 95200000012990";

    navigator.clipboard.writeText(codigoBoleto);

    alert("Boleto gerado com sucesso! O código foi copiado.");
}
