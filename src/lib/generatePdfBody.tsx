import dayjs from "dayjs"

export default function generatePdfBody(data: any) {

  const body = []

  for(let i = 0; i < data.length; i++) {
    const rows = []

    // Validação necessária para gerar campos dinamicos nos relatórios
    if(data[i].nome)
      rows.push(data[i].nome)

    if(data[i].sobrenome)
      rows.push(data[i].sobrenome)

    if(data[i].idade)
      rows.push(data[i].idade)

    if(data[i].procedimento)
      rows.push(data[i].procedimento)

    if(data[i].horario)
      rows.push(data[i].horario)

    if(data[i].valor)
      rows.push(data[i].valor)

    if(data[i].telefone)
      rows.push(data[i].telefone)

    // Transforma a data
    const newDate = dayjs(data[i].data).format("D/M/YYYY")

    rows.push(newDate)

    body.push(rows)
  }

  return body;
}