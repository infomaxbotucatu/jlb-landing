const viagensContainer = document.getElementById('viagens-container');

// Substitua pelo link JSON da sua planilha
const PLANILHA_JSON = "https://spreadsheets.google.com/feeds/list/1IEcz1DiCJlTOrx1PCpUYFf9DzugD2YI6z0g4U50ERK0/od6/public/values?alt=json";

async function carregarViagens() {
  try {
    const response = await fetch(PLANILHA_JSON);
    const data = await response.json();

    // A API retorna os valores em feed.entry
    const entries = data.feed.entry;

    const viagens = entries.map(e => ({
      ID: e.gsx$id.$t,
      Ativo: e.gsx$ativo.$t,
      Categoria: e.gsx$categoria.$t,
      Destino: e.gsx$destino.$t,
      DataInicio: e.gsx$datainicio.$t,
      DataFim: e.gsx$datafim.$t,
      Descricao: e.gsx$descricaocurta.$t,
      Imagem: e.gsx$imagemprincipal.$t,
      Galeria: e.gsx$galeria.$t,
      MensagemWhatsApp: e.gsx$mensagemwhatsapp.$t,
      Destaque: e.gsx$destaque.$t
    }));

    viagens.forEach(createCard);

  } catch (error) {
    console.error("Erro ao carregar os pacotes:", error);
    viagensContainer.innerHTML = "<p>Não foi possível carregar os pacotes no momento.</p>";
  }
}

function createCard(viagem) {
  if (viagem.Ativo !== "SIM") return;

  const card = document.createElement('div');
  card.classList.add('viagem-card');

  card.innerHTML = `
    <img src="${viagem.Imagem}" alt="${viagem.Destino}">
    <div class="info">
      <h2>${viagem.Destino}</h2>
      <p>${viagem.Descricao}</p>
      <p>${viagem.DataInicio} - ${viagem.DataFim}</p>
      <a href="https://wa.me/55${viagem.MensagemWhatsApp}" target="_blank" class="whatsapp-btn">WhatsApp</a>
    </div>
  `;

  viagensContainer.appendChild(card);
}

// Carrega as viagens automaticamente
carregarViagens();
