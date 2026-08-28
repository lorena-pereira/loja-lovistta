const vitrine = document.getElementById('vitrine-produtos');
const sistemaBusca = document.getElementById('busca');
const filtroCategoria = document.getElementById('filtro-categoria');

let produtosCatalogo = []; 
let carrinhoDeCompras = [];

async function carregarProdutos() {
    try {
        const resposta = await fetch('./json/products.json');
        produtosCatalogo = await resposta.json();

        exibirProdutos(produtosCatalogo);
    }
    catch (erro) {
        console.error("Erro ao carregar o catálogo:", erro);
    }
}

function exibirProdutos(listaProdutos) {
    vitrine.innerHTML = '';

    listaProdutos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <img src="${produto.imagem}" alt="Imagem de ${produto.nome}" class="produto-img">
            <h3>${produto.nome}</h3>
            <p><small>${produto.categoria}</small></p>
            <p><small>${produto.descricao}</small></p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
        `;
        vitrine.appendChild(divProduto);
    });
}

sistemaBusca.addEventListener('input', (evento) => {
    const textoDigitado = evento.target.value.toLowerCase();
    const produtosFiltrados = produtosCatalogo.filter(produto =>
        produto.nome.toLowerCase().includes(textoDigitado)
    );

    exibirProdutos(produtosFiltrados);
});

filtroCategoria.addEventListener('change', (evento) => {
    const categoriaSelecionada = evento.target.value;

    if(categoriaSelecionada === 'todas') {
        exibirProdutos(produtosCatalogo);
    }
    else {
        const produtosFiltrados = produtosCatalogo.filter(produto =>
            produto.categoria === categoriaSelecionada
        );
        exibirProdutos(produtosFiltrados);
    }
});

function adicionarAoCarrinho(idProduto) {
    const produtoEscolhido = produtosCatalogo.find(produto => produto.id === idProduto);    

    if(produtoEscolhido) {
        carrinhoDeCompras.push(produtoEscolhido);
        alert(`Produto adicionado ao carrinho: ${produtoEscolhido.nome}`);
    }
}

carregarProdutos();