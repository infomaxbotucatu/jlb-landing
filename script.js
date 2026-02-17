fetch("/api/viagens")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("viagens-container");


    data
      .filter(v => v.Ativo === "SIM")
      .forEach(viagem => {

        const imagemPrincipal = viagem["Imagem Principal"]?.trim() !== ""
          ? viagem["Imagem Principal"]
          : "/imagens/padrao.jpg";

        const galeriaArray = viagem["Galeria"]
          ? viagem["Galeria"].split(",").map(img => img.trim())
          : [];

        const todasImagens = [imagemPrincipal, ...galeriaArray];

        const galeriaHTML = todasImagens.map((img, index) => `
          <img src="${img}" 
               class="miniatura" 
               onclick="abrirModal(${index}, ${JSON.stringify(todasImagens).replace(/"/g, '&quot;')})">
        `).join("");

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${imagemPrincipal}" class="principal">
          <h2>${viagem.Destino}</h2>
          <p>${viagem["Descrição Curta"]}</p>
          <div class="galeria">${galeriaHTML}</div>
        `;

        container.appendChild(card);
      });
  });


// ===== MODAL =====

let imagensModal = [];
let indiceAtual = 0;

function abrirModal(indice, imagens) {
  imagensModal = imagens;
  indiceAtual = indice;
  document.getElementById("modal-img").src = imagensModal[indiceAtual];
  document.getElementById("modal").style.display = "flex";
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
