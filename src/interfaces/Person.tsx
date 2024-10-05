export default interface Person {
  name: string;
  image: string;
  banner?: string;
  number: string;
  username: string;
  city: string;
  coordinates: [number, number];

  tseUrls?: {
    candiInfo: string;
    candiContas: string;
  };
}
