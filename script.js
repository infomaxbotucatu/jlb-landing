async function carregarViagens() {
  try {
    const response = await fetch("/api/viagens");
    const viagens = await response.json();

    const container = document.getElementById("viagens-container");
    container.innerHTML = "";

    viagens
      .filter(v => v["Ativo"]?.toLowerCase() === "sim")
      .forEach(viagem => {

        const destaqueBadge = viagem["Destaque"]?.toLowerCase() === "sim"
          ? `<span class="badge">Destaque</span>`
          : "";

        const whatsappNumero = "55SEUNUMEROAQUI"; // coloque o número fixo da agência
        const mensagem = encodeURIComponent(viagem["Mensagem WhatsApp"] || `Olá! Tenho interesse em ${viagem["Destino"]}`);

        const card = `
          <div class="card">
            ${destaqueBadge}
            <img src="${viagem["Imagem Principal"]}" alt="${viagem["Destino"]}" />
            <h3>${viagem["Destino"]}</h3>
            <p>${viagem["Descrição Curta"]}</p>
            <small>${viagem["Data Início"]} - ${viagem["Data Fim"]}</small>
            <a class="botao" href="https://wa.me/${whatsappNumero}?text=${mensagem}" target="_blank">
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
