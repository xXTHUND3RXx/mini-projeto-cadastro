const btnAdicionar = document.getElementById('btn-add');
const btnEnviarForm = document.getElementById('btn-enviar');
const btnEditar = document.querySelector('#botaoEditar button');
const btnExcluir = document.querySelector('#botaoExcluir button');
const formulario = document.getElementById('container-formulario');
const td = document.querySelectorAll('.td')
const tabela = document.getElementById('tabela-animes');
const tr = document.getElementById('tr')

const dadosAnime = {
    nome: document.getElementById('anime'),
    genero: document.getElementById('genero'),
    episodios: document.getElementById('episodios'),
}


let animeParaEditar = null; // Variável para armazenar o anime que será editado

document.addEventListener('DOMContentLoaded', ()=>{
    const animesSalvos = JSON.parse(localStorage.getItem('animes')) || [];
    animesSalvos.forEach(anime => {
        const novoAnime = new Anime(anime.nome, anime.genero, anime.episodios);
        novoAnime.mostrar();
    });
});

btnAdicionar.addEventListener('click', ()=>{
    mostrarFormulario()

    EsconderBotao()
})

function mostrarFormulario() {
    formulario.classList.remove('escondido')
}

function EsconderBotao() {
    if(formulario.style.display == 'block') {
        btnAdicionar.classList.add('escondido');
    }
}

function mostrarFormularioParaEdicao(anime, linha) {
    formulario.classList.remove('escondido');
    dadosAnime.nome.value = anime.nome;
    dadosAnime.genero.value = anime.genero;
    dadosAnime.episodios.value = anime.episodios;
    animeParaEditar = [anime, linha]; // Armazena o anime e a linha para edição
}

// Função para carregar os animes salvos do localStorage
function carregarAnimesDoLocalStorage() {
    const animesSalvos = JSON.parse(localStorage.getItem('animes')) || [];
    animesSalvos.forEach(anime => {
    });
}

// Carregar os dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarAnimesDoLocalStorage();
});

// Função para salvar os animes no localStorage
function salvarAnimesNoLocalStorage() {
    const animes = [];
    // Iterar sobre as linhas da tabela e pegar os dados
    const linhas = tabela.getElementsByTagName('tr');
    for (let i = 1; i < linhas.length; i++) {
        const nome = linhas[i].cells[0].textContent;
        const genero = linhas[i].cells[1].textContent;
        const episodios = linhas[i].cells[2].textContent;

        animes.push({ nome, genero, episodios });
    }
    localStorage.setItem('animes', JSON.stringify(animes));
}

function mostrarFormularioParaEdicao(anime, linha) {
    formulario.classList.remove('escondido');
    dadosAnime.nome.value = anime.nome;
    dadosAnime.genero.value = anime.genero;
    dadosAnime.episodios.value = anime.episodios;
    animeParaEditar = {anime, linha};
}


class Anime {
    constructor(nome, genero, episodios, editar, excluir) {
        this.nome = nome;
        this.genero = genero;
        this.episodios = episodios;
        this.editar = editar;
        this.excluir = excluir;
    }

    

    mostrar(){
        // Verifique se a tabela já tem cabeçalhos
        const linhasTabela = tabela.getElementsByTagName('tr');

        // Não adicionar linha se já tiver cabeçalho, assumir que a primeira linha é cabeçalho
        const novaLinha = tabela.insertRow(linhasTabela.length > 1 ? linhasTabela.length : 1);

        // const novaLinha = tabela.insertRow(); // Adiciona uma nova linha na tabela
        novaLinha.insertCell(0).innerHTML = this.nome;
        novaLinha.insertCell(1).innerHTML = this.genero;
        novaLinha.insertCell(2).innerHTML = this.episodios;

        //Clonando os botões editar e excluir
        const cellEditar = novaLinha.insertCell(3);
        const novoBtnEditar = btnEditar.cloneNode(true);
        novoBtnEditar.classList.add('btn')
        cellEditar.appendChild(novoBtnEditar);
        
        novoBtnEditar.addEventListener('click', ()=>{
            mostrarFormulario()
          
            mostrarFormularioParaEdicao(this, novaLinha)
        })
        

        const cellExcluir = novaLinha.insertCell(4);
        const novoBtnExcluir = btnExcluir.cloneNode(true);
        novoBtnExcluir.classList.add('btn')
        cellExcluir.appendChild(novoBtnExcluir)


        // Criando a lógica para deletar o conteúdo ao clicar no botão
        novoBtnExcluir.addEventListener('click', ()=>{
            tabela.deleteRow(novaLinha);
            salvarAnimesNoLocalStorage()
        });
    }
    
}

btnEnviarForm.addEventListener('click', ()=>{

    if (animeParaEditar) {
        // Se estamos editando, atualize os dados existentes
        animeParaEditar.anime.nome = dadosAnime.nome.value;
        animeParaEditar.anime.genero = dadosAnime.genero.value;
        animeParaEditar.anime.episodios = dadosAnime.episodios.value;

        // Atualiza a tabela
        animeParaEditar.linha.cells[0].innerHTML = animeParaEditar.anime.nome;
        animeParaEditar.linha.cells[1].innerHTML = animeParaEditar.anime.genero;
        animeParaEditar.linha.cells[2].innerHTML = animeParaEditar.anime.episodios;

        if (animeParaEditar.anime.nome == '' || animeParaEditar.anime.genero == '' || animeParaEditar.anime.episodios == '') {
            alert('Você não pode prosseguir enquanto não digitar');
            return;
        }

        animeParaEditar = null; // Limpa a variável após edição

    } else {
        // Se estamos adicionando um novo anime, verifica os campos
        if (dadosAnime.nome.value === '' || dadosAnime.genero.value === '' || dadosAnime.episodios.value === '') {
            alert('Você não pode prosseguir enquanto não digitar');
            return; // Impede a continuação caso os campos estejam vazios
        }

        const novoAnime = new Anime(
            dadosAnime.nome.value,
            dadosAnime.genero.value,
            dadosAnime.episodios.value
        );
        novoAnime.mostrar()
        salvarAnimesNoLocalStorage()
    }
    dadosAnime.nome.value = '';
    dadosAnime.genero.value = '';
    dadosAnime.episodios.value = '';

    formulario.classList.add('escondido');
    btnAdicionar.classList.remove('escondido');

    salvarAnimesNoLocalStorage()
    
})



