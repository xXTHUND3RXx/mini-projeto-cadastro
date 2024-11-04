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


class Anime {
    constructor(nome, genero, episodios, editar, excluir) {
        this.nome = nome;
        this.genero = genero;
        this.episodios = episodios;
        this.editar = editar;
        this.excluir = excluir;
    }

    

    mostrar(){
        // td[0].innerHTML = this.nome;
        // td[1].innerHTML = this.genero;
        // td[2].innerHTML = this.episodios;

        const novaLinha = tabela.insertRow(); // Adiciona uma nova linha na tabela
        novaLinha.insertCell(0).innerHTML = this.nome;
        novaLinha.insertCell(1).innerHTML = this.genero;
        novaLinha.insertCell(2).innerHTML = this.episodios;

        //Clonando os botões editar e excluir
        const cellEditar = novaLinha.insertCell(3);
        const novoBtnEditar = btnEditar.cloneNode(true);
        cellEditar.appendChild(novoBtnEditar);
        
        novoBtnEditar.addEventListener('click', ()=>{
            mostrarFormulario()
          
            mostrarFormularioParaEdicao(this, novaLinha)
        })
        

        const cellExcluir = novaLinha.insertCell(4);
        const novoBtnExcluir = btnExcluir.cloneNode(true);
        cellExcluir.appendChild(novoBtnExcluir)

        novoBtnExcluir.addEventListener('click', ()=>{
            tabela.deleteRow(novaLinha);
        });
    }
    
}

function retirarDados() {
    
}

function mostrarFormularioParaEdicao(anime, linha) {
    formulario.classList.remove('escondido');
    dadosAnime.nome.value = anime.nome;
    dadosAnime.genero.value = anime.genero;
    dadosAnime.episodios.value = anime.episodios;
    animeParaEditar = {anime, linha};
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

        animeParaEditar = null; // Limpa a variável após edição
    } else {
        // Se estamos adicionando um novo anime
        const novoAnime = new Anime(
            dadosAnime.nome.value,
            dadosAnime.genero.value,
            dadosAnime.episodios.value
        );
        novoAnime.mostrar()
    }
    dadosAnime.nome.value = '';
    dadosAnime.genero.value = '';
    dadosAnime.episodios.value = '';

    formulario.classList.add('escondido');
    btnAdicionar.classList.remove('escondido');
    
})



