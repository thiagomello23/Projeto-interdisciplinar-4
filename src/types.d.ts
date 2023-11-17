type CadastroForm = {
  nome: string;
  sobrenome: string;
  telefone: string;
  idade: string;
  procedimento: string;
  data: string;
  horario: string;
}

type RelatorioForm = {
  dataInicial: string;
  dataFinal: string
  horario: string;
  procedimento: string;
  filtro: 'Ascendente'|'Descendente';
  nome: boolean;
  sobrenome: boolean;
  idade: boolean;
  procedimento: boolean;
  horario: boolean;
  valor: boolean;
  telefone: boolean;
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
  // valor: string;
}

type ProcedimentoData = {
  id: string;
  nome: string;
  valor: string;
  usuarioId: string;
}

type ProcedimentoSubmit = {nomeProcesso: string, valor: string}

type ProcedimentoEdit = {editNomeProcesso: string, editValueProcesso: string}