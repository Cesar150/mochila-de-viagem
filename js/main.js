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

        itens[itemExiste.id] = itemAtual
    } else {
        itemAtual.id = itens.length;

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

    lista.appendChild(novoItem);
}

function atualizaElemento(ObjItem){
    document.querySelector("[data-id='"+ObjItem.id+"']").innerHTML = ObjItem.quantidade;
}