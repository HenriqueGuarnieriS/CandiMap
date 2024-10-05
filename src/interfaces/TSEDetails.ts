interface Bem {
  ordem: number;
  descricao: string;
  descricaoDeTipoDeBem: string;
  valor: number;
  dataUltimaAtualizacao: string;
}

interface Cargo {
  codigo: number;
  sigla: string | null;
  nome: string;
  codSuperior: number;
  titular: boolean;
  contagem: number;
}

interface Partido {
  numero: number;
  sigla: string;
  nome: string;
  sqPrestadorConta: string | null;
}

interface EleicaoAnterior {
  nrAno: number;
  id: string;
  nomeUrna: string;
  nomeCandidato: string;
  idEleicao: string;
  sgUe: string;
  local: string;
  cargo: string;
  partido: string;
  situacaoTotalizacao: string;
  txLink: string;
}

interface Arquivo {
  idArquivo: number;
  nome: string;
  url: string;
  tipo: string;
  codTipo: string;
  fullFilePath: string | null;
  fileInputStream: any;
  fileByteArray: any;
}

interface InfoComplementar {
  generoPublicavel: boolean;
  orientacaoSexualPublicavel: boolean;
  identidadeGenero: string;
  orientacaoSexual: string;
  dsTipoEtniaIndigena: string;
  quilombola: string;
  nmEncarregadoDados: string;
  txCanalComunicacao: string;
  tpEncarregadoDados: string;
}

interface Legenda {
  sgUeSuperior: string | null;
  sgUe: string | null;
  sqDrap: string | null;
  nomeLegenda: string | null;
  legenda: string | null;
  tpPartido: string | null;
  telefones: string | null;
  emails: string | null;
  nmEncarregadoDados: string;
  txCanalComunicacao: string;
  tpEncarregadoDados: string;
}

export interface CandidateDetails {
  id: number;
  nomeUrna: string;
  numero: number;
  idCandidatoSuperior: number;
  nomeCompleto: string;
  descricaoSexo: string;
  dataDeNascimento: string;
  tituloEleitor: string;
  cpf: string | null;
  descricaoEstadoCivil: string;
  descricaoCorRaca: string;
  descricaoSituacao: string;
  nacionalidade: string;
  grauInstrucao: string;
  ocupacao: string;
  gastoCampanha1T: number;
  gastoCampanha2T: number;
  sgUfNascimento: string;
  nomeMunicipioNascimento: string;
  localCandidatura: string;
  ufCandidatura: string;
  ufSuperiorCandidatura: string;
  codigoSituacaoCandidatoSuperior: number;
  dataUltimaAtualizacao: string;
  fotoUrl: string;
  fotoUrlPublicavel: boolean;
  fotoDataUltimaAtualizacao: string | null;
  descricaoTotalizacao: string;
  nomeColigacao: string;
  composicaoColigacao: string;
  descricaoTipoDrap: string;
  numeroProcessoDrap: string;
  numeroProcessoDrapEncrypt: string;
  numeroProcesso: string;
  numeroProcessoEncrypt: string;
  numeroProcessoPrestContas: string;
  numeroProcessoPrestContasEncrypt: string;
  numeroProtocolo: string | null;
  cargo: Cargo;
  bens: Bem[];
  totalDeBens: number;
  vices: any;
  partido: Partido;
  eleicao: {
    id: number;
    siglaUF: string | null;
    localidadeSgUe: string | null;
    ano: number;
    codigo: string | null;
    nomeEleicao: string | null;
    tipoEleicao: string | null;
    turno: string | null;
    tipoAbrangencia: string | null;
    dataEleicao: string | null;
    codSituacaoEleicao: string | null;
    descricaoSituacaoEleicao: string | null;
    descricaoEleicao: string;
  };
  emails: string | null;
  sites: string[];
  arquivos: Arquivo[];
  eleicoesAnteriores: EleicaoAnterior[];
  substituto: any;
  motivos: any;
  motivoSituacao: any;
  codigoSituacaoCandidato: number;
  descricaoSituacaoCandidato: string;
  isCandidatoInapto: boolean;
  codigoSituacaoPartido: string;
  descricaoSituacaoPartido: string;
  isCandFechado: boolean;
  infoComplementar: InfoComplementar;
  cdSituacaoCassacao: number;
  cdSituacaoDiploma: number;
  legenda: Legenda;
  st_MOTIVO_COMPRA_VOTO: boolean;
  st_MOTIVO_CONDUTA_VEDADA: boolean;
  st_MOTIVO_GASTO_ILICITO: boolean;
  ds_MOTIVO_OUTROS: string | null;
  st_MOTIVO_AUSENCIA_REQUISITO: boolean;
  st_MOTIVO_IND_PARTIDO: boolean;
  st_DIVULGA: boolean;
  st_DIVULGA_BENS: boolean;
  st_REELEICAO: boolean;
  st_DIVULGA_ARQUIVOS: boolean;
  candidatoApto: boolean;
  cnpjcampanha: string;
  gastoCampanha: number;
  st_SUBSTITUIDO: boolean;
  st_MOTIVO_FICHA_LIMPA: boolean;
  st_MOTIVO_ABUSO_PODER: boolean;
  descricaoNaturalidade: string;
}
