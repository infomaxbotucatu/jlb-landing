const viagensContainer = document.getElementById('viagens-container');

// Criação do modal
const modal = document.createElement('div');
const modalImg = document.createElement('img');
const closeBtn = document.createElement('span');

modal.id = "gallery-modal";
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.zIndex = "1000";
modal.style.left = "0";
modal.style.top = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.overflow = "auto";
modal.style.backgroundColor = "rgba(0,0,0,0.8)";
modal.style.paddingTop = "60px";

modalImg.style.display = "block";
modalImg.style.margin = "0 auto";
modalImg.style.maxWidth = "90%";
modalImg.style.maxHeight = "80%";

closeBtn.innerHTML = "&times;";
closeBtn.style.position = "absolute";
closeBtn.style.top = "20px";
closeBtn.style.right = "35px";
closeBtn.style.color = "#fff";
closeBtn.style.fontSize = "40px";
closeBtn.style.cursor = "pointer";

modal.appendChild(modalImg);
modal.appendChild(closeBtn);
document.body.appendChild(modal);

// Fechar modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target === modal) modal.style.display = "none"; }

// ID da planilha Google
const PLANILHA_JSON = "https://spreadsheets.google.com/feeds/list/1IEcz1DiCJlTOrx1PCpUYFf9DzugD2YI6z0g4U50ERK0/od6/public/values?alt=json";

// Função para criar os cards
function createCard(viagem){
  if(viagem.Ativo !== "SIM") return;

  const card = document.createElement('div');
  card.classList.add('viagem-card');

  card.innerHTML = `
    <img src="${viagem.Imagem}" alt="${viagem.Destino}">
    <h3>${viagem.Destino}</h3>
    <p>${viagem.Descricao}</p>
    <p>${viagem.DataInicio} - ${viagem.DataFim}</p>
    <a href="https://wa.me/55?text=${encodeURIComponent(viagem.MensagemWhatsApp)}" target="_blank">WhatsApp</a>
  `;

  // Abrir modal com primeira imagem da galeria
  card.querySelector('img').onclick = () => {
    const galeria = viagem.Galeria ? viagem.Galeria.split(",") : [viagem.Imagem];
    modalImg.src = galeria[0];
    modal.style.display = "block";
  }

  viagensContainer.appendChild(card);
}

// Carregar dados da planilha
async function carregarViagens(){
  try {
    const response = await fetch(PLANILHA_JSON);
    if(!response.ok) throw new Error("Erro ao acessar a planilha");
    const data = await response.json();

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

  } catch(error) {
    console.error("Não foi possível carregar os pacotes da planilha:", error);
    viagensContainer.innerHTML = "<p>Não foi possível carregar os pacotes da planilha. Mostrando exemplos locais:</p>";

    // fallback local
    const exemplos = [
      {
        Ativo: "SIM",
        Destino: "Turquia & Grécia",
        Descricao: "Istambul, Capadócia e Ilhas Gregas",
        DataInicio: "03/05/2026",
        DataFim: "17/05/2026",
        Imagem: "imagens/turquia-1.jpg",
        Galeria: "imagens/turquia-1.jpg,imagens/turquia-2.jpg,imagens/turquia-3.jpg",
        MensagemWhatsApp: "Tenho interesse em Turquia & Grécia"
      },
      {
        Ativo: "SIM",
        Destino: "Natal Luz",
        Descricao: "Gramado e Serra Gaúcha",
        DataInicio: "08/11/2026",
        DataFim: "17/11/2026",
        Imagem: "imagens/gramado-1.jpg",
        Galeria: "imagens/gramado-1.jpg,imagens/gramado-2.jpg",
        MensagemWhatsApp: "Quero informações sobre Natal Luz"
      }
    ];
    exemplos.forEach(createCard);
  }
}

// Executa ao carregar a página
carregarViagens();
