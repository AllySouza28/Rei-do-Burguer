const cardapio = [
  {
    id: 1,
    nome: "X-Tudo",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, molho especial, bacon, ovo, presunto, alface e cheddar no pão macio.",
    preco: 22.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-tudo.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 2,
    nome: "X-Burguer",
    descricao: "Hambúrguer artesanal (80g), queijo e molho especial no pão fofinho.",
    preco: 15.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-burguer.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 3,
    nome: "Hambúrguer",
    descricao: "Hambúrguer artesanal (80g), tomate, alface e molho especial no pão macio.",
    preco: 13.0,
    categoria: "Hamburguer Tradicional",
    imagem: "hamburguer.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 4,
    nome: "X-Salada",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, alface e molho especial no pão fofinho.",
    preco: 15.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-salada.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 5,
    nome: "X-EGG",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, ovo, alface, cheddar e molho especial.",
    preco: 16.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-egg.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 6,
    nome: "X-EGG BACON",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, ovo, bacon, alface, cheddar e molho especial.",
    preco: 18.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-egg-bacon.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 7,
    nome: "X-Bacon",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 17.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-bacon.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 8,
    nome: "X-REAL",
    descricao: "Hambúrguer artesanal (160g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 24.0,
    categoria: "Hamburguer Premium",
    imagem: "x-real.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 9,
    nome: "X-REAL DUPLO",
    descricao: "2X Hambúrguer artesanal (160g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 32.0,
    categoria: "Hamburguer Premium",
    imagem: "x-real-duplo.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 10,
    nome: "X-PRINCIPE",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 17.0,
    categoria: "Hamburguer Premium",
    imagem: "x-principe.jpg", // Adicione o nome da imagem aqui
  },
  {
    id: 11,
    nome: "X-PRINCIPE DUPLO",
    descricao: "2X Hambúrguer artesanal (80g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 23.0,
    categoria: "Hamburguer Premium",
    imagem: "x-principe-duplo.jpg", // Adicione o nome da imagem aqui
  },
];

let carrinho = [];
let produtoSelecionado = null;

// Função para gerar um ID aleatório no formato REI00PD
function gerarIdPedido() {
  const numeros = Math.floor(Math.random() * 100).toString().padStart(2, "0"); // Gera 2 números aleatórios
  const letras = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + // Gera uma letra aleatória (A-Z)
                 String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Gera outra letra aleatória (A-Z)
  return `REI${numeros}${letras}`; // Formato: REI00PD
}

// Exibe o cardápio
function exibirCardapio() {
  const cardapioDiv = document.getElementById("cardapio");
  const categorias = [...new Set(cardapio.map((item) => item.categoria))]; // Remove categorias duplicadas

  categorias.forEach((categoria) => {
    const categoriaDiv = document.createElement("div");
    categoriaDiv.className = "categoria";
    categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;

    const itensCategoria = cardapio.filter((item) => item.categoria === categoria);
    itensCategoria.forEach((item) => {
      categoriaDiv.innerHTML += `
        <div class="item" onclick="abrirPopup(${item.id})">
          <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='placeholder.jpg';">
          <div>
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <p>R$ ${item.preco.toFixed(2)}</p>
          </div>
        </div>
      `;
    });

    cardapioDiv.appendChild(categoriaDiv);
  });
}

// Abre o popup de detalhes do produto
function abrirPopup(id) {
  produtoSelecionado = cardapio.find((item) => item.id === id);
  document.getElementById("popup-nome").innerText = produtoSelecionado.nome;
  document.getElementById("popup-descricao").innerText = produtoSelecionado.descricao;
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popup").classList.add("active");

  // Exibe os acréscimos
  const listaAcrescimos = document.getElementById("lista-acrescimos");
  listaAcrescimos.innerHTML = produtoSelecionado.acrescimos
    .map(
      (acrescimo) => `
      <label>
        ${acrescimo.nome} (+ R$ ${acrescimo.preco.toFixed(2)})
        <input type="checkbox" value="${acrescimo.nome}" data-preco="${acrescimo.preco}">
      </label>
    `
    )
    .join("");
}

// Fecha o popup
function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popup").classList.remove("active");
}

// Adiciona o produto ao carrinho
function adicionarAoCarrinho() {
  if (!produtoSelecionado) return;

  const quantidade = parseInt(document.getElementById("quantidade-popup").value);
  const observacoes = document.getElementById("observacoes").value;

  // Obtém os acréscimos selecionados
  const acrescimosSelecionados = [];
  document.querySelectorAll("#lista-acrescimos input[type='checkbox']:checked").forEach((checkbox) => {
    acrescimosSelecionados.push({
      nome: checkbox.value,
      preco: parseFloat(checkbox.dataset.preco),
    });
  });

  const itemCarrinho = {
    ...produtoSelecionado,
    quantidade,
    observacoes,
    acrescimos: acrescimosSelecionados,
  };

  // Verifica se o item já existe no carrinho
  const itemExistente = carrinho.find((item) => 
    item.nome === itemCarrinho.nome &&
    item.observacoes === itemCarrinho.observacoes &&
    JSON.stringify(item.acrescimos) === JSON.stringify(itemCarrinho.acrescimos)
  );

  if (itemExistente) {
    // Se o item já existe, aumenta a quantidade
    itemExistente.quantidade += itemCarrinho.quantidade;
  } else {
    // Se o item não existe, adiciona ao carrinho
    carrinho.push(itemCarrinho);
  }

  atualizarCarrinho();
  fecharPopup();
  alert("Item adicionado ao carrinho!"); // Feedback visual
}

// Atualiza o carrinho
function atualizarCarrinho() {
  const itensCarrinho = document.getElementById("itens-carrinho");
  const subtotalCarrinho = document.getElementById("subtotal-carrinho");
  const valorTaxaEntrega = document.getElementById("valor-taxa-entrega");
  const totalCarrinho = document.getElementById("total-carrinho");

  // Limpa a lista de itens
  itensCarrinho.innerHTML = "";

  // Adiciona cada item do carrinho à lista
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <div class="acrescimos">
        ${item.acrescimos.map((acrescimo) => `
          <div>+ ${acrescimo.nome} - R$ ${acrescimo.preco.toFixed(2)}</div>
        `).join("")}
      </div>
      ${item.observacoes ? `<div class="observacoes">Obs: ${item.observacoes}</div>` : ""}
      <div class="quantidade-container">
        <button onclick="alterarQuantidade(${index}, -1)">-</button>
        <input type="number" id="quantidade-${index}" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${index})">
        <button onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
      <div class="divisoria"></div>
    `;

    itensCarrinho.appendChild(li);
  });

  // Calcula o subtotal
  const subtotal = carrinho.reduce((sum, item) => {
    const valorAcrescimos = item.acrescimos.reduce((sumAcrescimo, acrescimo) => sumAcrescimo + acrescimo.preco, 0);
    return sum + (item.preco + valorAcrescimos) * item.quantidade;
  }, 0);
  subtotalCarrinho.innerText = subtotal.toFixed(2);

  // Calcula a taxa de entrega (R$ 3,00 se for delivery)
  const metodoRetirada = document.getElementById("metodo-retirada").value;
  const taxaEntrega = metodoRetirada === "Receber em Casa" ? 3.0 : 0.0;
  valorTaxaEntrega.innerText = taxaEntrega.toFixed(2);

  // Calcula o total
  const total = subtotal + taxaEntrega;
  totalCarrinho.innerText = total.toFixed(2);

  // Atualiza o contador do carrinho
  atualizarContadorCarrinho();
}

// Altera a quantidade de um item no carrinho
function alterarQuantidade(index, delta) {
  const item = carrinho[index];
  const novaQuantidade = item.quantidade + delta;

  if (novaQuantidade <= 0) {
    // Remove o item do carrinho se a quantidade for 0
    carrinho.splice(index, 1);
  } else {
    item.quantidade = novaQuantidade;
    document.getElementById(`quantidade-${index}`).value = novaQuantidade;
  }

  atualizarCarrinho();
}

// Atualiza a quantidade de um item no carrinho
function atualizarQuantidade(index) {
  const item = carrinho[index];
  const novaQuantidade = parseInt(document.getElementById(`quantidade-${index}`).value);

  if (novaQuantidade <= 0) {
    // Remove o item do carrinho se a quantidade for 0
    carrinho.splice(index, 1);
  } else {
    item.quantidade = novaQuantidade;
  }

  atualizarCarrinho();
}

// Alternar visibilidade do carrinho
function alternarCarrinho() {
  const carrinhoPopup = document.getElementById("carrinho-popup");
  carrinhoPopup.classList.toggle("active");
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  contador.innerText = carrinho.reduce((total, item) => total + item.quantidade, 0);
}

// Alterar quantidade no popup de detalhes
function alterarQuantidadePopup(delta) {
  const quantidadeInput = document.getElementById("quantidade-popup");
  let quantidade = parseInt(quantidadeInput.value);
  quantidade = Math.max(1, quantidade + delta); // Garante que a quantidade não seja menor que 1
  quantidadeInput.value = quantidade;
}

// Abre o popup de finalização do pedido
function finalizarPedido() {
  document.getElementById("finalizar-pedido-popup").style.display = "flex";
  document.getElementById("finalizar-pedido-popup").classList.add("active");
}

// Fecha o popup de finalização do pedido
function fecharFinalizarPedido() {
  document.getElementById("finalizar-pedido-popup").style.display = "none";
  document.getElementById("finalizar-pedido-popup").classList.remove("active");
}

// Salva os dados do usuário no localStorage
function salvarDadosUsuario() {
  const dadosUsuario = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    bairro: document.getElementById("bairro").value,
    metodoPagamento: document.getElementById("metodo-pagamento").value,
    metodoRetirada: document.getElementById("metodo-retirada").value,
  };
  localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
}

// Carrega os dados do usuário do localStorage
function carregarDadosUsuario() {
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  if (dadosUsuario) {
    document.getElementById("nome").value = dadosUsuario.nome;
    document.getElementById("telefone").value = dadosUsuario.telefone;
    document.getElementById("rua").value = dadosUsuario.rua;
    document.getElementById("numero").value = dadosUsuario.numero;
    document.getElementById("bairro").value = dadosUsuario.bairro;
    document.getElementById("metodo-pagamento").value = dadosUsuario.metodoPagamento;
    document.getElementById("metodo-retirada").value = dadosUsuario.metodoRetirada;
  }
}

// Envia o pedido para o WhatsApp
function enviarPedidoWhatsApp() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const endereco = `${rua}, ${numero}, ${bairro}`;

  // Validação dos campos
  if (!nome || !telefone || !rua || !numero || !bairro) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const metodoPagamento = document.getElementById("metodo-pagamento").value;
  const metodoRetirada = document.getElementById("metodo-retirada").value;

  // Gera o ID do pedido
  const idPedido = gerarIdPedido();

  // Monta o pedido para o WhatsApp
  let pedidoTexto = `*Rei do Burguer Pedidos*:\n\n`;
  pedidoTexto += `Meu nome é *${nome}*, Contato: *${telefone}*\n`;
  pedidoTexto += `*ID do Pedido:* ${idPedido}\n\n`; // Adiciona o ID do pedido
  pedidoTexto += `*Pedido:*\n`;

  carrinho.forEach((item) => {
    pedidoTexto += `${item.quantidade}x - ${item.nome}\n`;
    pedidoTexto += `(R$ ${item.preco.toFixed(2)})\n`;
    pedidoTexto += `R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;

    // Adiciona os acréscimos
    if (item.acrescimos.length > 0) {
      pedidoTexto += `  ${item.acrescimos.map((acrescimo) => `${acrescimo.nome}