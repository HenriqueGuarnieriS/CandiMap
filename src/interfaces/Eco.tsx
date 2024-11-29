export interface Indicador {
  id: string;
  variavel: string;
  unidade: string;
  resultados: Resultado[];
}

interface Resultado {
  classificacoes: any[]; // Especificar o tipo correto se conhecido
  series: Serie[];
}

interface Serie {
  localidade: Localidade;
  serie: { [anoMes: string]: string }; // Exemplo: { "202311": "0.33" }
}

interface Localidade {
  id: string;
  nivel: Nivel;
  nome: string;
}

interface Nivel {
  id: string;
  nome: string;
}
