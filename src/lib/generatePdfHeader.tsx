
export default function generatePdfHeader(fields: any) {

  const header = []

  if(fields.nome)
    header.push("Nome")

  if(fields.sobrenome)
    header.push("Sobrenome")

  if(fields.idade)
    header.push("Idade")

  if(fields.procedimento)
    header.push("Procedimento")

  if(fields.horario)
    header.push("Horario")

  if(fields.valor)
    header.push("Valor")

  if(fields.telefone)
    header.push("Telefone")

  header.push("Data")

  return header;
}

// nome: d.nome,
// sobrenome: d.sobrenome,
// idade: d.idade,
// procedimento: d.procedimento,
// horario: d.horario,
// valor: d.valor,
// telefone: d.telefone,