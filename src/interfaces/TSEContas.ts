export interface DadosConsolidados {
  totalRecebido: number;
  qtdRecebido: number;
  percentualRecebido: number | null;
  totalFinanceiro: number;
  qtdFinanceiro: number;
  percentualFinanceiro: number;
  totalEstimados: number;
  qtdEstimados: number;
  percentualEstimados: number;
  totalReceitaPF: number;
  qtdReceitaPF: number;
  percentualReceitaPF: number;
  totalReceitaPJ: number;
  qtdReceitaPJ: number;
  percentualReceitaPJ: number;
  totalPartidos: number;
  qtdPartidos: number;
  percentualPartidos: number;
  totalInternet: number;
  qtdInternet: number;
  percentualInternet: number;
  totalRoni: number;
  qtdRoni: number;
  percentualRoni: number;
  totalProprios: number;
  qtdProprios: number;
  percentualProprios: number;
  totalReceitaOutCand: number;
  qtdReceitaOutCand: number;
  percentualReceitaOutCand: number;
  totalDoacaoFcc: number;
  qtdDoacaoFcc: number;
  percentualDoacaoFcc: number;
  totalDoacaoDevolvida: number | null;
  qtdDoacaoDevolvida: number;
  percentualDoacaoDevolvida: number;
  totalReceitaComercializacao: number;
  qtDoacaoComercializacao: number;
  percentualDoacaoComercializacao: number;
  totalDoacaoAplicacaoFinanceira: number;
  qtDoacaoAplicacaoFinanceira: number;
  percentualDoacaoAplicacaoFinanceira: number;
  totalDoacaoBensMoveisImoveis: number;
  qtDoacaoBensMoveisImoveis: number;
  percentualDoacaoBensMoveisImoveis: number;
  graphQtdReceitaFin: number;
  graphVrReceitaFin: number;
  graphQtdReceitaFinFundo: number;
  graphVrReceitaFinFundo: number;
  graphPercentReceitaFinFundo: number;
  graphQtdReceitaFinOutros: number;
  graphVrReceitaFinOutros: number;
  graphPercentFinOutros: number;
  graphQtdReceitaFinFefc: number;
  graphVrReceitaFinFefc: number;
  graphPercentFinFefc: number;
  totalFinanceiroComRoni: number;
}

export interface HistoricoEntrega {
  dataEntrega: string;
  tipo: string;
  retificadora: string;
  numeroControle: string;
  idEntrega: string;
  isCompare: boolean;
  temMidia: boolean | null;
  isCargaErro: boolean;
  possibilidadeMidia: boolean;
}

export interface ConcentracaoDespesa {
  dsDRD: string;
  qtdeDespesas: string;
  valor: number;
}

export interface RankingDoadores {
  cpfCnpj: string;
  nome: string;
  qntd: string;
  valor: number;
  stFinanciamentoColetivo: boolean;
}

export interface RankingFornecedores {
  cpfCnpj: string;
  nome: string;
  qntd: string;
  valor: number;
  stFinanciamentoColetivo: boolean | null;
}

export interface ContaBancaria {
  id: number;
  anoReferencia: number;
  prestadorConta: number;
  cnpj: string;
  nrBanco: number;
  nomeBanco: string;
  nrAgencia: number;
  nrConta: string;
  dtAbertura: number;
  valorTotalCredito: number;
  valorTotalDebito: number;
  valorTotalSaldo: number;
  tipoConta: string;
  dsFonteOrigem: string;
  nomeExibicao: string;
}

export interface Qualificacao {
  membro: string;
  codigoFuncao: number;
  funcao: string;
  nrRegistroConselho: string | null;
  dtGestaoInicio: number | null;
  dtGestaoFim: number | null;
}

export interface PrestacaoDeContas {
  idEleicao: number;
  ano: number;
  sgUe: string;
  sgUeSuperior: string;
  nmUe: string;
  nrPartido: number;
  nomePartido: string;
  siglaPartido: string;
  siglaPartidoSemEspaco: string;
  nrCandidato: number;
  idCandidato: string;
  nrProcessoPje: string;
  tpPrestador: string;
  cnpj: string;
  idOrgao: number | null;
  idPrestador: string;
  idPrestadorVice: number | null;
  idUltimaEntrega: string;
  numeroDeControleEntrega: string;
  dataUltimaAtualizacaoContas: string;
  entregaAtual: any; // Pode precisar de ajustes se o tipo for específico
  dadosConsolidados: DadosConsolidados;
  historicoEntregas: HistoricoEntrega[];
  despesas: {
    limiteDeGasto1T: number;
    limiteDeGasto2T: number;
    valorLimiteDeGastos: number;
    totalDespesasContratadas: number;
    totalDespesasPagas: number;
    doacoesOutrosCandidatosPartigos: number;
    fundosPartidarios: number;
    fundoEspecial: number;
    outrosRecursos: number;
    financeiras: number;
    estimaveis: number;
  };
  haveExtratos: boolean;
  haveNfes: boolean;
  concentracaoDespesas: ConcentracaoDespesa[];
  rankingDoadores: RankingDoadores[];
  rankingFornecedores: RankingFornecedores[];
  contasBancarias: ContaBancaria[];
  receitaIndividual: any | null; // Pode precisar de ajustes se o tipo for específico
  qualificacoes: Qualificacao[];
  dividaCampanha: any | null;
  sobraFinanceira: any | null;
  sobraFinanceiraFP: any | null;
  sobraFinanceiraOR: any | null;
  sobraFinanceiraFEFC: any | null;
  sobraEstimavel: any | null;
}
