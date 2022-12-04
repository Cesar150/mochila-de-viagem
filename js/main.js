const formulario = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(elemento => {
    criaElemento(elemento);
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemExiste = itens.find((elemento) => { return elemento.nome === nome.value })

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

    if (itemExiste) {
        itemAtual.id = itemExiste.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === itemExiste.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual)
    }



    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";

})

function criaElemento(ObjItem) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = ObjItem.quantidade;
    numeroItem.dataset.id = ObjItem.id;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += ObjItem.nome;

    novoItem.appendChild(botaoDeleta(ObjItem.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(ObjItem) {
    document.querySelector("[data-id='" + ObjItem.id + "']").innerHTML = ObjItem.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}