export interface Plant {
  id: string;
  name: string;
  otherNames: string[];
  scientific: string;
  family: string;
  type: string;
  biome: string;
  region: string;
  climate: string;
  light: string;
  watering: string;
  fertilizing: string;
  soilType: string;
  height: string;
  flowerColor: string;
  leafType: string;
  uses: string[];
  tags: string[];
  description: string;
  culturalNote: string;
  wikiUrl: string;
  imageCredit: string;
  imageUrl?: string;
  altText?: string;
}

export interface Essay {
  id: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  excerpt: string;
  content: string;
  tags?: string[];
  imageUrl?: string;
}
