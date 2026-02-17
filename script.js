// ===========================
// Carregar viagens da API
// ===========================
async function carregarViagens() {
  try {
    const response = await fetch("/api/viagens");
    const viagens = await response.json();

    const container = document.getElementById("viagens-container");
    container.innerHTML = "";

    viagens
      .filter(v => v["Ativo"]?.toLowerCase() === "sim")
      .forEach(viagem => {

        // Imagem principal
        const imagemPrincipal = viagem["Imagem Principal"]?.trim() || "/imagens/padrao.jpg";

        // Galeria
        const galeriaArray = viagem["Galeria"]
          ? viagem["Galeria"].split(",").map(img => img.trim())
          : [];

        // Todas as imagens (principal + galeria)
        const todasImagens = [imagemPrincipal, ...galeriaArray];

        // HTML das miniaturas
        const galeriaHTML = todasImagens.map((img, index) => `
          <img src="${img}" 
               class="miniatura" 
               onclick="abrirModal(${index}, ${JSON.stringify(todasImagens).replace(/"/g, '&quot;')})">
        `).join("");

        // Montar card
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${imagemPrincipal}" class="principal" alt="${viagem["Destino"]}">
          <h2>${viagem["Destino"]}</h2>
          <p>${viagem["Descrição Curta"]}</p>
          <div class="galeria">${galeriaHTML}</div>
          <a href="https://wa.me/?text=${encodeURIComponent(viagem["Mensagem WhatsApp"] || `Tenho interesse em ${viagem["Destino"]}`)}" target="_blank" class="botao">
            Falar no WhatsApp
          </a>
        `;

        container.appendChild(card);
      });

  } catch (error) {
    console.error("Erro ao carregar viagens:", error);
  }
}

// ===========================
// Modal de Galeria
// ===========================
let imagensModal = [];
let indiceAtual = 0;

function abrirModal(indice, imagens) {
  imagensModal = imagens;
  indiceAtual = indice;
  const modal = document.getElementById("modal");
  document.getElementById("modal-img").src = imagensModal[indiceAtual];
  modal.style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function proximaImagem() {
  indiceAtual = (indiceAtual + 1) % imagensModal.length;
  document.getElementById("modal-img").src = imagensModal[indiceAtual];
}

function imagemAnterior() {
  indiceAtual = (indiceAtual - 1 + imagensModal.length) % imagensModal.length;
  document.getElementById("modal-img").src = imagensModal[indiceAtual];
}

// ===========================
// Executar carregamento
// ===========================
carregarViagens();
