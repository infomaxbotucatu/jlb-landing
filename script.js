async function carregarViagens() {
  try {
    const response = await fetch("/api/viagens");
    const viagens = await response.json();

    const container = document.getElementById("viagens-container");
    container.innerHTML = "";

    viagens
      .filter(v => v["Ativo"]?.toLowerCase() === "sim")
      .forEach(viagem => {

        const whatsappNumero = "5514999999999"; // coloque o número real aqui
        const mensagem = encodeURIComponent(viagem["Mensagem WhatsApp"]);

        const card = `
          <div class="card">
            <img src="${viagem["Imagem Principal"]}" alt="${viagem["Destino"]}" />
            <h3>${viagem["Destino"]}</h3>
            <p>${viagem["Descrição Curta"]}</p>
            <p><strong>${viagem["Data Início"]} - ${viagem["Data Fim"]}</strong></p>
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
