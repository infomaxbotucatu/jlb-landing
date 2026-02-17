async function carregarViagens() {
  try {
    const response = await fetch("/api/viagens");
    const viagens = await response.json();

    const container = document.getElementById("viagens-container");
    container.innerHTML = "";

    viagens
      .filter(v => v["Ativo"]?.toLowerCase() === "sim")
      .forEach(viagem => {
        const imagem = viagem["Imagem Principal"]?.trim() || "/imagens/padrao.jpg";
        const mensagem = encodeURIComponent(viagem["Mensagem WhatsApp"] || `Tenho interesse em ${viagem["Destino"]}`);

        const card = `
          <div class="card">
            <img src="${imagem}" alt="${viagem["Destino"]}">
            <h3>${viagem["Destino"]}</h3>
            <p>${viagem["Descrição Curta"]}</p>
            <p><strong>${viagem["Data Início"]} - ${viagem["Data Fim"]}</strong></p>
            <a href="https://wa.me/${viagem["Mensagem WhatsApp"]}?text=${mensagem}" class="botao" target="_blank">
              Falar no WhatsApp
            </a>
          </div>
        `;
        container.innerHTML += card;
      });

  } catch (error) {
    console.error("Erro ao carregar viagens:", error);
  }
}

carregarViagens();
