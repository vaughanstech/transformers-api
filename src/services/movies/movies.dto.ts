export class MoviesGetSchema {
  name: string = 'The Transformers: The Movie';
  director: string = 'Nelson Shin';
  description: string =
    "The film's storyline follows the same continuity as the Transformers cartoon. It introduces a planet-sized Transformer called Unicron who eats other planets, and is approaching Cybertron. As part of their continuing wars, the Autobots and Decepticons have a fierce battle on Earth which sees both Optimus Prime and Megatron mortally wounded. Prime passes the Matrix of Leadership to Ultra Magnus and dies, and Megatron is transformed by Unicron into Galvatron. Starscream (briefly) assumes leadership of the Decepticons, but is killed when Galvatron arrives at Cybertron. Galvatron then chases the surviving Autobots on Earth across space, splitting them up and taking the Matrix. The Autobots find their way back to each other, and follow Galvatron to Cybertron just as Unicron transforms into robot mode and begins to eat their world. Travelling inside Unicron, Hot Rod recovers the Matrix, transforms into Rodimus Prime, and uses the Matrix to destroy Unicron.";
  release_date: Date = new Date('1986-09-08');
}

export class MoviesPutSchema {
  director: string = 'Nelson Shin';
  description: string =
    "The film's storyline follows the same continuity as the Transformers cartoon. It introduces a planet-sized Transformer called Unicron who eats other planets, and is approaching Cybertron. As part of their continuing wars, the Autobots and Decepticons have a fierce battle on Earth which sees both Optimus Prime and Megatron mortally wounded. Prime passes the Matrix of Leadership to Ultra Magnus and dies, and Megatron is transformed by Unicron into Galvatron. Starscream (briefly) assumes leadership of the Decepticons, but is killed when Galvatron arrives at Cybertron. Galvatron then chases the surviving Autobots on Earth across space, splitting them up and taking the Matrix. The Autobots find their way back to each other, and follow Galvatron to Cybertron just as Unicron transforms into robot mode and begins to eat their world. Travelling inside Unicron, Hot Rod recovers the Matrix, transforms into Rodimus Prime, and uses the Matrix to destroy Unicron.";
  release_date: Date = new Date('1986-09-08');
}
