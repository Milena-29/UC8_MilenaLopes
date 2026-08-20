# Mundo Disney — Integração com API

## Autor

* **Nome:** Milena Lopes do Nascimento
* **Ano:** 2026

## 1. Identificação do projeto

* **Nome do projeto:** Missão 117: Meu Disney
* **Instituição de ensino:** SENAc ES: Vila Velha
* **Unidade curricular:** UC8 - Desenvolver Aplicações Mobile
* **Professor(a):** Rafaela Pessin

---

## 2. Sobre o projeto

> O projeto Meu Disney é uma aplicação web mobile responsiva desenvolvida para consultar e exibir personagens do universo Disney. 

## 3. Estrutura do projeto

Apresente a organização dos arquivos e pastas do seu projeto.

```text
missao_117/
│
├── manisfest.json
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── script.js
```

### Descrição dos arquivos

| Arquivo           | Descrição                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------   |
| `index.html`      | Estrutura principal da página com o cabeçalho, contadores, container dos cards e controles.                                      |
| `style.css`       | Arquivo de estilos contendo a paleta de cores, grid responsivo, animações e regras de hover.                                     |
| `script.js`       | Código JavaScript responsável por fazer a requisição à API, manipular o JSON e renderizar os cards.                              |
| `README.md`       | Documentação completa com detalhes da implementação, tecnologias e instruções do projeto.                                        |
| `manisfest.json`  | Arquivo de configuração Web App Manifest que fornece metadados (nome, ícones, cor de fundo) para transformar a aplicação em PWA. |    

> **Caso seu projeto possua outras pastas ou arquivos, apresente-os também na estrutura acima.**

---

## 💻 4. Tecnologias utilizadas

Liste as tecnologias utilizadas no desenvolvimento do projeto.

* Item 1: Html 
* Item 2: CSS3
* Item 3: JavaScript
* Item 4: Disney API
* Item 5: Vs Code
* Item 6: Json
* Item 7: Postman

---

## 5. API utilizada

### Nome da API

**Disney API**

### Endpoint utilizado

```text
[https://api.disneyapi.dev/character](https://api.disneyapi.dev/character)
```

### Para que a API foi utilizada?

> A API foi utilizada para buscar os dados dos personagens da Disney de forma dinâmica e paginada, permitindo que a aplicação exiba as informações sem a necessidade de um banco de dados próprio.

### Quais informações foram consumidas?

> Foram consumidos o nome do personagem, a imagem oficial para a montagem do card e os metadados da requisição para controle do total de itens exibidos.

---

##  6. Como executar o projeto

### Pré-requisitos

Para executar o projeto e testar todas as suas funcionalidades sem bloqueios de segurança por protocolo local (file://), recomenda-se utilizar um navegador moderno (como Google Chrome) e o editor VS Code com a extensão Live Server instalada.

### Passo a passo

* Passo 1: Baixe ou clone a pasta do projeto missao_117 para o seu computador.
* Passo 2: Abra a pasta raiz do projeto no VS Code.
* Passo 3: Clique com o botão direito sobre o arquivo index.html e selecione a opção "Open with Live Server" (ou abra diretamente o arquivo no navegador de sua preferência).

---

## 7. Como funciona a integração

Explique de forma objetiva e em até 10 passos como sua aplicação se comunica com a API.

1. Ao abrir a página, o script executa automaticamente a função carregarPersonagens().
2. A URL de requisição é montada concatenando o endpoint base com os parâmetros de página (page) e o limite de 50 itens (pageSize).
3. O método fetch() realiza uma requisição HTTP do tipo GET para a Disney API.
4. O servidor devolve a resposta da consulta que é convertida em um objeto navegável usando .json().
5. Os dados convertidos são enviados ao console.log() para inspeção técnica e depuração.
6. A propriedade data contendo o array de personagens é percorrida utilizando o método .forEach().
7. Para cada item do array, a função criarCard() gera a estrutura DOM da div.card contendo a imagem e o nome.
8. Um ouvinte de evento error é anexado à tag <img> para substituir o link por uma imagem fallback padrão caso a URL original retorne erro.
9. O card é anexado ao container principal (#container) e os contadores de página e de total de personagens são atualizados na tela.
10. Ao clicar no botão "Carregar mais", a variável paginaAtual é incrementada e uma nova consulta busca os próximos 50 personagens mantendo os anteriores na tela. 

## 8. Desafios encontrados

Registre pelo menos um problema ou dificuldade que você encontrou durante o desenvolvimento e como resolveu

### Desafio encontrado

**Problema:**

> Algumas URLs de imagens retornadas pela API pública apresentavam erro HTTP 404 ou estavam offline, o que fazia com que o card ficasse com espaço em branco ou imagem quebrada. Além disso, fotos em proporções variadas ficavam cortadas com object-fit: cover.

**Como identifiquei o problema:**

> Inspecionei a página através do Console do Desenvolvedor (F12 no navegador) e notei erros de carregamento de recursos de mídia, além de identificar visualmente que o enquadramento de alguns rostos estava cortado na interface.

**Como resolvi:**

> No JavaScript, criei um listener para o evento error na imagem criada que substitui a imagem quebrada por um vetor SVG padrão inline (data:image/svg+xml). No CSS, mudei o enquadramento para object-fit: contain com um fundo neutro suave, preservando a proporção original de qualquer imagem.

---

## 9. Aprendizados


> Com este projeto, saí da teoria e vi como as API's funcionam na web. Aprendi a buscar dados assíncronos com fetch, manipular o DOM com JavaScript e organizar uma paginação fluida. Enfrentar desafios reais, como tratar links de fotos quebradas (teve umas 3) me ensinou a pensar na experiência do usuário antes de tudo para que página não fique feia. 

---
