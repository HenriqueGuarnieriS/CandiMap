// Interface para o campo 'id'
interface IdInfo {
  id: string;
  username: string;
  display_name: string;
}

// Interface para o campo 'branding' dentro de 'general'
interface Branding {
  avatar: string;
  website: string;
}

// Interface para os itens de 'recent' dentro de 'media' em 'general'
interface RecentMedia {
  id: string;
  time: number;
  type: string;
  post_url: string;
}

// Interface para 'media' dentro de 'general'
interface Media {
  recent: RecentMedia[];
}

// Interface para 'general'
interface General {
  branding: Branding;
  media: Media;
}

// Interface para o campo 'total' dentro de 'statistics'
interface TotalStatistics {
  media: number;
  followers: number;
  following: number;
  engagement_rate: number;
}

// Interface para o campo 'average' dentro de 'statistics'
interface AverageStatistics {
  likes: number;
  comments: number;
}

// Interface para o crescimento de 'followers' ou 'media' em 'statistics'
interface GrowthData {
  1: number;
  3: number;
  7: number;
  14: number;
  30: number;
  60: number;
  90: number;
  180: number;
  365: number;
}

// Interface para 'growth' dentro de 'statistics'
interface Growth {
  followers: GrowthData;
  media: GrowthData;
}

// Interface para 'statistics'
interface Statistics {
  total: TotalStatistics;
  average: AverageStatistics;
  growth: Growth;
}

// Interface para 'misc'
interface Misc {
  grade: {
    color: string;
    grade: string;
  };
  sb_verified: boolean;
}

// Interface para 'ranks'
interface Ranks {
  sbrank: number;
  followers: number;
  following: number;
  media: number;
  engagement_rate: number;
}

// Interface para o campo 'daily' que é um array
interface Daily {
  date: string;
  followers: number;
  following: number;
  media: number;
  avg_likes: number;
  avg_comments: number;
}

// Interface principal para o objeto completo
interface InstagramProfile {
  id: IdInfo;
  general: General;
  statistics: Statistics;
  misc: Misc;
  ranks: Ranks;
  daily: Daily[];
}

export default InstagramProfile;
