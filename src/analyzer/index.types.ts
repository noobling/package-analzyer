export interface NpmsResult {
  analyzedAt: Date;
  collected: Collected;
  evaluation: Evaluation;
  score: Score;
}

export interface Collected {
  metadata: Metadata;
  npm: Npm;
  source: Source;
}

export interface Metadata {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: Date;
  publisher: Publisher;
  maintainers: Publisher[];
  repository: Repository;
  links: Links;
  license: string;
  dependencies: {
    [key: string]: string;
  };
  releases: Release[];
  hasSelectiveFiles: boolean;
  readme: string;
}

export interface Links {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

export interface Publisher {
  username: string;
  email: string;
}

export interface Release {
  from: Date;
  to: Date;
  count: number;
}

export interface Repository {
  type: string;
  url: string;
  directory: string;
}

export interface Npm {
  downloads: Release[];
  dependentsCount: number;
  starsCount: number;
}

export interface Source {
  files: Files;
  badges: Badge[];
  linters: string[];
  coverage: number;
}

export interface Badge {
  urls: Urls;
  info: Info;
}

export interface Info {
  service: string;
  type: string;
  modifiers?: Modifiers;
}

export interface Modifiers {
  type: string;
}

export interface Urls {
  original: string;
  shields: string;
  content: string;
  service?: string;
}

export interface Files {
  readmeSize: number;
  testsSize: number;
  hasChangelog: boolean;
}

export interface Evaluation {
  quality: Quality;
  popularity: Popularity;
  maintenance: Maintenance;
}

export interface Maintenance {
  releasesFrequency: number;
  commitsFrequency: number;
  openIssues: number;
  issuesDistribution: number;
}

export interface Popularity {
  communityInterest: number;
  downloadsCount: number;
  downloadsAcceleration: number;
  dependentsCount: number;
}

export interface Quality {
  carefulness: number;
  tests: number;
  health: number;
  branding: number;
}

export interface Score {
  final: number;
  detail: Detail;
}

export interface Detail {
  quality: number;
  popularity: number;
  maintenance: number;
}
