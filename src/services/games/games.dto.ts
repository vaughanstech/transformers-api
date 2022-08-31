export class GamesGetSchema {
  name: string = 'The Transformers';
  description: string =
    'In the game, the Autobots are searching for four parts of an energon cube which have been scattered around a city, which consists of a number of platforms and ladders. The Decepticons are also seeking the energon cube, and will destroy the Autobots in order to retrieve it.';
  release_date: string = '1986-08-08';
  developers: string = 'Denton Designs';
  platforms: string[] = ['Sinclair Spectrum', 'Commodore 64'];
}

export class GamesPutSchema {
  description: string =
    'In the game, the Autobots are searching for four parts of an energon cube which have been scattered around a city, which consists of a number of platforms and ladders. The Decepticons are also seeking the energon cube, and will destroy the Autobots in order to retrieve it.';
  release_date: string = '1986-08-08';
  developers: string = 'Denton Designs';
  platforms: string[] = ['Sinclair Spectrum', 'Commodore 64'];
}
