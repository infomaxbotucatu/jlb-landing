export default async function handler(req, res) {
  const sheetId = "1IEcz1DiCJlTOrx1PCpUYFf9DzugD2YI6z0g4U50ERK0";
  const sheetName = "Viagens";

  const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar dados da planilha",
      detalhe: error.message
    });
  }
}
