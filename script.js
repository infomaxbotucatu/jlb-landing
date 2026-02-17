fetch("/api/viagens")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("viagens");

    data
      .filter(v => v.Ativo === "SIM")
      .forEach(viagem => {

        const imagemPrincipal = viagem["Imagem Principal"]?.trim() !== ""
          ? viagem["Imagem Principal"]
          : "/imagens/padrao.jpg";

        const galeriaArray = viagem["Galeria"]
          ? viagem["Galeria"].split(",").map(img => img.trim())
          : [];

        const galeriaHTML = galeriaArray.map(img => `
          <img src="${img}" class="miniatura">
        `).join("");

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${imagemPrincipal}" class="principal" alt="${viagem.Destino}">
          <h2>${viagem.Destino}</h2>
          <p>${viagem["Descrição Curta"]}</p>
          <div class="galeria">
            ${galeriaHTML}
          </div>
          <a href="https://wa.me/SEUNUMERO?text=${encodeURIComponent(viagem["Mensagem WhatsApp"])}" target="_blank">
            Falar no WhatsApp
          </a>
        `;

        container.appendChild(card);
      });
  });
