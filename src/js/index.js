const btnAdicionar = document.getElementById('btn-add');
const btnEnviarForm = document.getElementById('btn-enviar')
const formulario = document.getElementById('container-formulario');
const td = document.querySelectorAll('.td')
const tabela = document.getElementById('tabela-animes');
const tr = document.getElementById('tr')

const dadosAnime = {
    nome: document.getElementById('anime'),
    genero: document.getElementById('genero'),
    episodios: document.getElementById('episodios'),
}

console.log(dadosAnime.nome)

// document.addEventListener('DOMContentLoaded', ()=>{
   

//     formulario.classList.add('escondido')
    
// });

btnAdicionar.addEventListener('click', ()=>{
    formulario.style.display = 'block';

    mostrarFormulario()
})

function mostrarFormulario() {
    if(formulario.style.display == 'block') {
        btnAdicionar.classList.add('escondido');
    }
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
        // const cellEditar = novaLinha.insertCell(3);
        // let btnEditar = document.querySelector('#botaoEditar button');
        // cellEditar.appendChild(btnEditar);

        // const cellExcluir = novaLinha.insertCell(4);
        // const btnExcluir = document.querySelector('#botaoExcluir button');
        // cellExcluir.appendChild(btnExcluir)
    }
    
}

btnEnviarForm.addEventListener('click', ()=>{
    const novoAnime = new Anime (
        dadosAnime.nome.value,
        dadosAnime.genero.value,
        dadosAnime.episodios.value
    )

    dadosAnime.nome.value = '';
    dadosAnime.genero.value = '';
    dadosAnime.episodios.value = '';

    formulario.style.display = 'none';
    btnAdicionar.classList.remove('escondido');


    let btnEditar = document.createElement('td');
    btnAdicionar.innerHTML = `<td id="botaoEditar">
                            <button class="btn-icon"><img src="src/images/edit.svg" alt=""></button>
                        </td>`;

    tr.appendChild(btnEditar)
    novoAnime.mostrar()
    console.log(novoAnime)
})