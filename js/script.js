// ==================== NEWSLETTER ====================
const botaoNewsletter = document.getElementById("btnNewsletter");

if (botaoNewsletter) {
    botaoNewsletter.addEventListener("click", () => {
        const emailInput = document.getElementById("emailNewsletter");
        const email = emailInput.value.trim();

        if (!email) {
            alert("Por favor, digite seu e-mail!");
            return;
        }

        localStorage.setItem("newsletterEmail", email);
        alert("E-mail cadastrado com sucesso! Agora você vai receber promoções e novidades.");
        emailInput.value = "";
    });
}

// ==================== CARROSSEL ====================
const imagens = document.querySelectorAll('.imagens-slide img');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const containerIndicadores = document.getElementById('indicadores');
const carrossel = document.querySelector('.carrossel-container');

let indiceAtual = 0;
let autoPlay;

if (
    imagens.length > 0 &&
    btnPrev &&
    btnNext &&
    containerIndicadores &&
    carrossel
) {
    function criarIndicadores() {
        imagens.forEach((_, index) => {
            const bolinha = document.createElement('div');
            bolinha.classList.add('bolinha');

            if (index === 0) {
                bolinha.classList.add('ativa');
            }

            bolinha.addEventListener('click', () => {
                indiceAtual = index;
                atualizar();
                resetAutoPlay();
            });

            containerIndicadores.appendChild(bolinha);
        });
    }

    function atualizar() {
        imagens.forEach(img => img.classList.remove('ativa'));
        imagens[indiceAtual].classList.add('ativa');

        const bolinhas = document.querySelectorAll('.bolinha');
        bolinhas.forEach(b => b.classList.remove('ativa'));
        bolinhas[indiceAtual].classList.add('ativa');
    }

    function next() {
        indiceAtual = (indiceAtual + 1) % imagens.length;
        atualizar();
    }

    function prev() {
        indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
        atualizar();
    }

    function startAutoPlay() {
        autoPlay = setInterval(next, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlay);
        startAutoPlay();
    }

    btnNext.addEventListener('click', () => {
        next();
        resetAutoPlay();
    });

    btnPrev.addEventListener('click', () => {
        prev();
        resetAutoPlay();
    });

    carrossel.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carrossel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    criarIndicadores();
    startAutoPlay();
}

// ==================== SERVICE WORKER ====================
 if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch((error) => {
                console.error('Falha ao registrar Service Worker:', error);
            });
    });
}
// ==================== PLANOS & PAGAMENTO ====================
document.addEventListener("DOMContentLoaded", function () {
    const dadosPlanos = {
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

    const params = new URLSearchParams(window.location.search);
    const planoSelecionado = params.get("plano");

    if (planoSelecionado && dadosPlanos[planoSelecionado]) {
        const info = dadosPlanos[planoSelecionado];

        const imgEl = document.getElementById("resumoImg");
        const nomeEl = document.getElementById("resumoNome");
        const valorEl = document.getElementById("resumoValor");
        const totalEl = document.getElementById("resumoTotal");

        if (imgEl) imgEl.src = info.imagem;
        if (nomeEl) nomeEl.innerText = info.nome;
        if (valorEl) valorEl.innerText = info.preco;
        if (totalEl) totalEl.innerText = info.preco;
    }
});

// Alterna entre cartão, pix e boleto
function mostrarPagamento(tipo, elemento) {
    const metodos = document.querySelectorAll(".Metodo");
    metodos.forEach(item => item.classList.remove("ativo"));

    if (elemento) {
        elemento.classList.add("ativo");
    }
}

// Finaliza o pagamento e redireciona
function finalizarPagamento() {
    localStorage.setItem("aluno", "true");
}

// Alterna entre cartão, pix e boleto
function mostrarPagamento(tipo, elemento) {
    // Atualiza a classe ativa nos botões
    const metodos = document.querySelectorAll(".Metodo");
    metodos.forEach(item => item.classList.remove("ativo"));

    if (elemento) {
        elemento.classList.add("ativo");
    }

    // Oculta todas as seções de pagamento
    const conteudos = document.querySelectorAll(".conteudoPagamento");
    conteudos.forEach(conteudo => conteudo.style.display = "none");

    // Exibe apenas a seção selecionada
    if (tipo === 'cartao') {
        document.getElementById("formCartao").style.display = "block";
    } else if (tipo === 'pix') {
        document.getElementById("formPix").style.display = "block";
    } else if (tipo === 'boleto') {
        document.getElementById("formBoleto").style.display = "block";
    }
}

// Função para copiar o código Pix para a área de transferência
function copiarPix() {
    const inputPix = document.getElementById("codigoPix");
    inputPix.select();
    inputPix.setSelectionRange(0, 99999); // Para dispositivos móveis

    navigator.clipboard.writeText(inputPix.value);
    alert("Código Pix copiado para a área de transferência!");
}

function gerarBoleto() {
    alert("Boleto gerado com sucesso! O código de barras foi copiado para a área de transferência.");
    navigator.clipboard.writeText("34191.09008 61713.917307 71621.145008 3 95200000012990");
}

let currentStep = 1;
const totalSteps = 6;

const formData = {
  objetivo: 'Ganhar massa muscular',
  objetivoIcon: 'img/treinamento-de-forca.png',

  peso: '75',
  altura: '178',
  idade: '28',

  experiencia: 'Intermediário',
  experienciaIcon: 'img/grafico-de-barras.png',

  frequencia: '4 dias',
  prioridade: 'Peito'
};

const mapaImagensCorpo = {
  'Peito': 'img/musculosPeito.png',
  'Costas': 'img/musculosCostas.png',
  'Ombros': 'img/musculosOmbros.png',
  'Braços': 'img/musculosBracos.png',
  'Abdômen': 'img/musculosAbdomen.png',
  'Pernas': 'img/musculosPernas.png',
  'Glúteos': 'img/musculosGluteos.png',
};

function updateUI() {
  document.querySelectorAll('.secao').forEach(section => {
    section.classList.remove('ativo');
  });
  
  const currentSection = document.getElementById(`step-${currentStep}`);
  if (currentSection) {
    currentSection.classList.add('ativo');
  }

  const progressPercent = (currentStep / totalSteps) * 100;
  const progressLine = document.getElementById('progress-line');
  const stepText = document.getElementById('step-text');

  if (progressLine) progressLine.style.width = `${progressPercent}%`;
  if (stepText) stepText.innerText = `Etapa ${currentStep} de ${totalSteps}`;

  document.querySelectorAll('.passo').forEach((item, index) => {
    if (index + 1 <= currentStep) {
      item.classList.add('ativo');
    } else {
      item.classList.remove('ativo');
    }
  });

  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.style.display = currentStep === 1 ? 'none' : 'inline-flex';
  }

  const btnNext = document.getElementById('btn-next');
  if (btnNext) {
    if (currentStep === totalSteps) {
      btnNext.innerHTML = 'Gerar Meus Treinos <i class="fa-solid fa-check"></i>';
    } else {
      btnNext.innerHTML = 'Próximo Passo <i class="fa-solid fa-arrow-right"></i>';
    }
  }
}

function nextScreen() {
  saveStepData();

  if (currentStep < totalSteps) {
    currentStep++;
    if (currentStep === totalSteps) {
      updateSummary();
    }
    updateUI();
  } else {
    finishForm();
  }
}

function prevScreen() {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
}

function selectOption(key, value, element) {
  const parent = element.parentElement;

  parent.querySelectorAll('.cartao').forEach(card => {
    card.classList.remove('ativo');
  });

  element.classList.add('ativo');
  formData[key] = value;

  if (key === 'prioridade') {
    const avatarEl = document.getElementById('avatar-musculo');
    if (avatarEl && mapaImagensCorpo[value]) {
      avatarEl.src = mapaImagensCorpo[value];
    }
  }

  const img = element.querySelector('img');
  if (img) {
    if (key === 'objetivo') formData.objetivoIcon = img.getAttribute('src');
    if (key === 'experiencia') formData.experienciaIcon = img.getAttribute('src');
  }
}

function saveStepData() {
  if (currentStep === 2) {
    const pesoInput = document.getElementById('input-peso');
    const alturaInput = document.getElementById('input-altura');
    const idadeInput = document.getElementById('input-idade');

    if (pesoInput) formData.peso = pesoInput.value;
    if (alturaInput) formData.altura = alturaInput.value;
    if (idadeInput) formData.idade = idadeInput.value;
  }
}

function updateSummary() {
  const objEl = document.getElementById('sum-objetivo');
  const pesoEl = document.getElementById('sum-peso');
  const altEl = document.getElementById('sum-altura');
  const idadeEl = document.getElementById('sum-idade');
  const expEl = document.getElementById('sum-experiencia');
  const freqEl = document.getElementById('sum-frequencia');
  const prioEl = document.getElementById('sum-prioridade');

  const objIcon = document.getElementById('sum-objetivo-icon');
  const expIcon = document.getElementById('sum-experiencia-icon');

  if (objEl) objEl.innerText = formData.objetivo;
  if (pesoEl) pesoEl.innerText = `${formData.peso} kg`;
  if (altEl) altEl.innerText = `${formData.altura} cm`;
  if (idadeEl) idadeEl.innerText = `${formData.idade} anos`;
  if (expEl) expEl.innerText = formData.experiencia;
  if (freqEl) freqEl.innerText = `${formData.frequencia} por semana`;
  if (prioEl) prioEl.innerText = formData.prioridade;

  if (objIcon && formData.objetivoIcon) objIcon.src = formData.objetivoIcon;
  if (expIcon && formData.experienciaIcon) expIcon.src = formData.experienciaIcon;
}

function finishForm() {
  localStorage.setItem('dadosTreino', JSON.stringify(formData));
  localStorage.setItem('questionarioConcluido', 'true');
  window.location.href = 'treino.html';
}

document.addEventListener('DOMContentLoaded', () => {
  updateUI();
});

// ==================== AUTENTICAÇÃO (CADASTRO E LOGIN) ====================

// Função para cadastrar o usuário no localStorage
function cadastrarUsuario(event) {
    if (event) event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const dataNascimento = document.getElementById("dataNascimento")?.value;
    const email = document.getElementById("email")?.value.trim();
    const telefone = document.getElementById("telefone")?.value.trim();
    const senha = document.getElementById("senha")?.value;
    const plano = document.getElementById("plano")?.value;
    const pagamento = document.getElementById("pagamento")?.value;

    // Validação básica dos campos obrigatórios
    if (!nome || !email || !senha || !plano || !pagamento) {
        alert("Por favor, preencha todos os campos obrigatórios para criar sua conta!");
        return;
    }

    // Busca a lista de usuários salvos no localStorage (ou inicia uma lista vazia)
    const usuarios = JSON.parse(localStorage.getItem("usuariosMoveAcademy") || "[]");

    // Verifica se já existe um usuário cadastrado com o mesmo e-mail
    const usuarioExistente = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado. Faça login para continuar!");
        window.location.href = "tela_login.html";
        return;
    }

    // Cria o objeto do novo usuário
    const novoUsuario = {
        nome,
        dataNascimento,
        email,
        telefone,
        senha,
        plano,
        pagamento
    };

    // Adiciona e grava no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuariosMoveAcademy", JSON.stringify(usuarios));

    alert("Conta criada com sucesso! Redirecionando para o login...");
    window.location.href = "tela_login.html";
}

// Função para validar o login do usuário
function fazerLogin(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailLogin")?.value.trim();
    const senha = document.getElementById("senhaLogin")?.value;

    if (!email || !senha) {
        alert("Por favor, informe o e-mail e a senha!");
        return;
    }

    // Busca a lista de usuários no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuariosMoveAcademy") || "[]");

    // Autentica as credenciais
    const usuarioValido = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);

    if (usuarioValido) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
        localStorage.setItem("aluno", "true");
        alert(`Seja bem-vindo(a), ${usuarioValido.nome}!`);
        window.location.href = "questionario.html";
    } else {
        alert("E-mail ou senha incorretos! Tente novamente.");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    gerarCalendarioReal();
    carregarDadosUsuario();
});

// Função para calcular os 7 dias da semana real e formatar o calendário
function gerarCalendarioReal() {
    const container = document.getElementById('calendario-semana');
    const mesAnoEl = document.getElementById('mes-ano-atual');
    if (!container) return;

    const diasSiglas = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const mesesNomes = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const hoje = new Date();
    const diaSemanaHoje = hoje.getDay(); // 0 (Domingo) a 6 (Sábado)

    // Atualiza o mês e ano do topo
    if (mesAnoEl) {
        mesAnoEl.innerText = `${mesesNomes[hoje.getMonth()]} ${hoje.getFullYear()}`;
    }

    container.innerHTML = '';

    // Gera de Domingo (0) até Sábado (6) da semana atual
    for (let i = 0; i < 7; i++) {
        const dataDia = new Date(hoje);
        dataDia.setDate(hoje.getDate() - diaSemanaHoje + i);

        const ehHoje = i === diaSemanaHoje;

        const diaBox = document.createElement('div');
        diaBox.className = 'dia-item';
        diaBox.style.cssText = `
            flex: 1;
            padding: 12px 8px;
            border-radius: 10px;
            background: ${ehHoje ? '#00295C' : 'rgba(255, 255, 255, 0.03)'};
            border: 1px solid ${ehHoje ? '#3a86ff' : 'rgba(255, 255, 255, 0.08)'};
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        `;

        diaBox.innerHTML = `
            <span style="font-size: 12px; opacity: 0.6; font-weight: bold;">${diasSiglas[i]}</span>
            <span style="font-size: 18px; font-weight: bold; color: ${ehHoje ? '#ffffff' : 'inherit'};">${dataDia.getDate()}</span>
            ${ehHoje ? '<span style="font-size: 10px; background: #3a86ff; color: #fff; padding: 2px 6px; border-radius: 10px; margin-top: 2px;">Hoje</span>' : ''}
        `;

        container.appendChild(diaBox);
    }
}

// Carrega os dados salvos durante o cadastro / formulário de treino
function carregarDadosUsuario() {
    // 1. Nome do Aluno
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    const nomeEl = document.getElementById('nome-aluno');
    if (nomeEl && usuarioLogado.nome) {
        nomeEl.innerText = usuarioLogado.nome.split(' ')[0]; // Pega o primeiro nome
    }

    // 2. Dados do Treino Gerado
    const dadosTreino = JSON.parse(localStorage.getItem('dadosTreino') || '{}');
    const nomeTreinoEl = document.getElementById('dash-nome-treino');
    const infoTreinoEl = document.getElementById('dash-info-treino');

    if (dadosTreino.prioridade && nomeTreinoEl) {
        nomeTreinoEl.innerText = `Treino A - ${dadosTreino.prioridade}`;
    }

    if (dadosTreino.objetivo && infoTreinoEl) {
        infoTreinoEl.innerText = `Foco: ${dadosTreino.objetivo} • 45 min`;
    }
}
