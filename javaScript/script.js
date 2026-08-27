const vitrine = document.getElementById('vitrine-produtos');
const sistemaBusca = document.getElementById('busca');

let produtosCatalogo = []; 

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

carregarProdutos();