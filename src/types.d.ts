type CadastroForm = {
  nome: string;
  sobrenome: string;
  telefone: string;
  idade: string;
  procedimento: string;
  data: string;
  horario: string;
}

type DashboardData = {
  id: string;
  nome: string;
  data: string;
  idade: string;
  horario: string;
  procedimento: string;
  sobrenome: string;
  telefone: string;
  usuarioId: string;
  // Não existe "valor" em paciente
  valor: string;
}

type ProcedimentoData = {
  id: string;
  nome: string;
  valor: string;
  usuarioId: string;
}

type ProcedimentoSubmit = {nomeProcesso: string, valor: string}

type ProcedimentoEdit = {editNomeProcesso: string, editValueProcesso: string}