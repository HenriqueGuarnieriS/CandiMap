interface EleitosPorEstado {
  sigla_uf: string;
  total_eleitos: number;
}

interface Genero {
  tipo: string;
  count: number;
}

interface Instrucao {
  tipo: string;
  count: number;
}

interface Raca {
  tipo: string;
  count: number;
}

export interface PartidoInterface {
  sigla_partido: string;
  total_eleitos_nacional: number;
  eleitos_por_estado: EleitosPorEstado[];
  genero: Genero[];
  instrucao: Instrucao[];
  media_idade: number;
  raca: Raca[];
}
