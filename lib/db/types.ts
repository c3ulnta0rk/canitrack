// Database types for Canitrack

export interface Human {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "M" | "F";
  createdAt: Date;
  updatedAt: Date;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: "M" | "F";
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  humanId: string;
  dogId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Race {
  id: string;
  name: string;
  date: Date;
  location: string;
  distance: number; // in kilometers
  elevationGain?: number; // in meters
  courseType: "trail" | "road" | "mixed";
  weather?: string;
  temperature?: number; // in Celsius
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  id: string;
  raceId: string;
  teamId: string;
  timeSeconds: number; // race time in seconds
  position?: number; // finishing position
  categoryPosition?: number; // position in category
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extended types for API responses
export interface TeamWithDetails extends Team {
  human: Human;
  dog: Dog;
}

export interface ResultWithDetails extends Result {
  race: Race;
  team: TeamWithDetails;
}

export interface RaceWithResults extends Race {
  results: ResultWithDetails[];
}
