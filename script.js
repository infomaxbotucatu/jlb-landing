const viagensContainer = document.getElementById('viagens-container');

// Modal para galeria
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

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target === modal) modal.style.display = "none"; }

// Função para criar card
function createCard(viagem){
  if(viagem.Ativo !== "SIM") return;

  const card = document.createElement('div');
  card.classList.add('viagem-card');

  card.innerHTML = `
    <img src="imagens/${viagem['Imagem Principal']}" alt="${viagem.Destino}">
    <h3>${viagem.Destino}</h3>
    <p>${viagem['Descrição Curta']}</p>
    <p>${viagem['Data Início']} - ${viagem['Data Fim']}</p>
    <a href="https://wa.me/55?text=${encodeURIComponent(viagem['Mensagem WhatsApp'])}" target="_blank">WhatsApp</a>
  `;

  // Modal da galeria
  card.querySelector('img').onclick = () => {
    const galeria = viagem.Galeria ? viagem.Galeria.split(",") : [viagem['Imagem Principal']];
    modalImg.src = `imagens/${galeria[0].trim()}`;
    modal.style.display = "block";
  }

  viagensContainer.appendChild(card);
}

// Carregar CSV da planilha publicada
async function carregarViagens(){
  try {
    const response = await fetch("https://docs.google.com/spreadsheets/d/1IEcz1DiCJlTOrx1PCpUYFf9DzugD2YI6z0g4U50ERK0/pub?output=csv");
    const csvText = await response.text();
    const linhas = csvText.trim().split("\n");
    const headers = linhas[0].split(",");
    const viagens = linhas.slice(1).map(linha => {
      const cols = linha.split(",");
      const obj = {};
      cols.forEach((v, i) => obj[headers[i]] = v);
      return obj;
    });
    viagens.forEach(createCard);
  } catch (err) {
    console.error("Erro ao carregar os pacotes:", err);
    viagensContainer.innerHTML = "<p>Não foi possível carregar os pacotes da planilha.</p>";
  }
}

carregarViagens();
