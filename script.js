const viagensContainer = document.getElementById("viagens-container");
const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];

// Buscar dados da planilha (API)
fetch("/api/viagens.js")
  .then(res => res.json())
  .then(data => {
    data.forEach(viagem => {
      if(viagem.Ativo === "SIM"){
        const card = document.createElement("div");
        card.classList.add("viagem-card");

        // Imagem principal
        const img = document.createElement("img");
        img.src = viagem["Imagem Principal"];
        img.alt = viagem.Destino;
        img.onclick = () => openModal(viagem["Galeria"].split(",")[0]);
        card.appendChild(img);

        // Conteúdo
        const title = document.createElement("h3");
        title.textContent = viagem.Destino;
        card.appendChild(title);

        const desc = document.createElement("p");
        desc.textContent = viagem["Descrição Curta"];
        card.appendChild(desc);

        const btn = document.createElement("a");
        btn.href = `https://wa.me/5514?text=${encodeURIComponent(viagem["Mensagem WhatsApp"])}`;
        btn.target = "_blank";
        btn.classList.add("whatsapp-btn");
        btn.textContent = "WhatsApp";
        card.appendChild(btn);

        viagensContainer.appendChild(card);
      }
    });
  });

// Modal
function openModal(imgSrc){
  modal.style.display = "block";
  modalImg.src = imgSrc;
}
span.onclick = function() { modal.style.display = "none"; }
window.onclick = function(event) { if(event.target == modal){ modal.style.display = "none"; } }
