// Seed data for Canitrack
import { Human, Dog, Team, Race, Result } from "./types";

// Helper to generate IDs
let idCounter = 0;
const generateId = () => `id_${++idCounter}`;

// Humans
export const humans: Human[] = [
  {
    id: generateId(),
    firstName: "Sarah",
    lastName: "Johnson",
    age: 32,
    gender: "F",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: generateId(),
    firstName: "Michael",
    lastName: "Chen",
    age: 28,
    gender: "M",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: generateId(),
    firstName: "Emma",
    lastName: "Martinez",
    age: 35,
    gender: "F",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: generateId(),
    firstName: "David",
    lastName: "Anderson",
    age: 41,
    gender: "M",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: generateId(),
    firstName: "Lisa",
    lastName: "Thompson",
    age: 29,
    gender: "F",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: generateId(),
    firstName: "James",
    lastName: "Wilson",
    age: 38,
    gender: "M",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
];

// Dogs
export const dogs: Dog[] = [
  {
    id: generateId(),
    name: "Luna",
    breed: "Siberian Husky",
    age: 4,
    gender: "F",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: generateId(),
    name: "Max",
    breed: "Alaskan Malamute",
    age: 3,
    gender: "M",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: generateId(),
    name: "Bella",
    breed: "Border Collie",
    age: 5,
    gender: "F",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: generateId(),
    name: "Rocky",
    breed: "German Shepherd",
    age: 6,
    gender: "M",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: generateId(),
    name: "Daisy",
    breed: "Weimaraner",
    age: 2,
    gender: "F",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: generateId(),
    name: "Zeus",
    breed: "Pointer",
    age: 4,
    gender: "M",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
];

// Teams (human-dog pairs)
export const teams: Team[] = [
  {
    id: generateId(),
    humanId: humans[0].id,
    dogId: dogs[0].id,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: generateId(),
    humanId: humans[1].id,
    dogId: dogs[1].id,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: generateId(),
    humanId: humans[2].id,
    dogId: dogs[2].id,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: generateId(),
    humanId: humans[3].id,
    dogId: dogs[3].id,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: generateId(),
    humanId: humans[4].id,
    dogId: dogs[4].id,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: generateId(),
    humanId: humans[5].id,
    dogId: dogs[5].id,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
];

// Races
export const races: Race[] = [
  {
    id: generateId(),
    name: "Spring Mountain Trail 10K",
    date: new Date("2024-03-15"),
    location: "Boulder, Colorado",
    distance: 10,
    elevationGain: 450,
    courseType: "trail",
    weather: "Sunny",
    temperature: 12,
    description: "A challenging mountain trail with stunning views of the Rockies.",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: generateId(),
    name: "Riverside City Run 5K",
    date: new Date("2024-04-20"),
    location: "Portland, Oregon",
    distance: 5,
    elevationGain: 50,
    courseType: "road",
    weather: "Cloudy",
    temperature: 15,
    description: "Fast and flat road race along the beautiful Willamette River.",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: generateId(),
    name: "Forest Adventure 8K",
    date: new Date("2024-05-10"),
    location: "Asheville, North Carolina",
    distance: 8,
    elevationGain: 280,
    courseType: "trail",
    weather: "Partly Cloudy",
    temperature: 18,
    description: "Mixed terrain through beautiful Appalachian forests.",
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
  {
    id: generateId(),
    name: "Summer Classic 10K",
    date: new Date("2024-06-15"),
    location: "Seattle, Washington",
    distance: 10,
    elevationGain: 120,
    courseType: "mixed",
    weather: "Overcast",
    temperature: 16,
    description: "A mix of urban streets and park trails in the heart of Seattle.",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    id: generateId(),
    name: "Highland Trail Challenge 12K",
    date: new Date("2024-07-20"),
    location: "Denver, Colorado",
    distance: 12,
    elevationGain: 580,
    courseType: "trail",
    weather: "Sunny",
    temperature: 20,
    description: "Technical trail running at altitude with significant elevation gain.",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: generateId(),
    name: "Autumn Road Race 5K",
    date: new Date("2024-09-30"),
    location: "Boston, Massachusetts",
    distance: 5,
    elevationGain: 30,
    courseType: "road",
    weather: "Clear",
    temperature: 14,
    description: "Fast urban course through historic Boston neighborhoods.",
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-15"),
  },
];

// Results
export const results: Result[] = [
  // Spring Mountain Trail 10K results
  {
    id: generateId(),
    raceId: races[0].id,
    teamId: teams[0].id,
    timeSeconds: 3240, // 54:00
    position: 1,
    categoryPosition: 1,
    notes: "Great performance on a tough course!",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: generateId(),
    raceId: races[0].id,
    teamId: teams[1].id,
    timeSeconds: 3420, // 57:00
    position: 2,
    categoryPosition: 1,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: generateId(),
    raceId: races[0].id,
    teamId: teams[2].id,
    timeSeconds: 3600, // 1:00:00
    position: 3,
    categoryPosition: 2,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: generateId(),
    raceId: races[0].id,
    teamId: teams[3].id,
    timeSeconds: 3720, // 1:02:00
    position: 4,
    categoryPosition: 2,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },

  // Riverside City Run 5K results
  {
    id: generateId(),
    raceId: races[1].id,
    teamId: teams[4].id,
    timeSeconds: 1380, // 23:00
    position: 1,
    categoryPosition: 1,
    notes: "Perfect weather for a fast time!",
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: generateId(),
    raceId: races[1].id,
    teamId: teams[0].id,
    timeSeconds: 1440, // 24:00
    position: 2,
    categoryPosition: 2,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: generateId(),
    raceId: races[1].id,
    teamId: teams[1].id,
    timeSeconds: 1500, // 25:00
    position: 3,
    categoryPosition: 1,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },
  {
    id: generateId(),
    raceId: races[1].id,
    teamId: teams[5].id,
    timeSeconds: 1560, // 26:00
    position: 4,
    categoryPosition: 2,
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
  },

  // Forest Adventure 8K results
  {
    id: generateId(),
    raceId: races[2].id,
    teamId: teams[2].id,
    timeSeconds: 2280, // 38:00
    position: 1,
    categoryPosition: 1,
    notes: "Beautiful course through the forest!",
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-05-10"),
  },
  {
    id: generateId(),
    raceId: races[2].id,
    teamId: teams[1].id,
    timeSeconds: 2340, // 39:00
    position: 2,
    categoryPosition: 1,
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-05-10"),
  },
  {
    id: generateId(),
    raceId: races[2].id,
    teamId: teams[3].id,
    timeSeconds: 2460, // 41:00
    position: 3,
    categoryPosition: 2,
    createdAt: new Date("2024-05-10"),
    updatedAt: new Date("2024-05-10"),
  },

  // Summer Classic 10K results
  {
    id: generateId(),
    raceId: races[3].id,
    teamId: teams[0].id,
    timeSeconds: 2700, // 45:00
    position: 1,
    categoryPosition: 1,
    notes: "Third win this season!",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    id: generateId(),
    raceId: races[3].id,
    teamId: teams[4].id,
    timeSeconds: 2760, // 46:00
    position: 2,
    categoryPosition: 2,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    id: generateId(),
    raceId: races[3].id,
    teamId: teams[5].id,
    timeSeconds: 2820, // 47:00
    position: 3,
    categoryPosition: 1,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    id: generateId(),
    raceId: races[3].id,
    teamId: teams[2].id,
    timeSeconds: 2880, // 48:00
    position: 4,
    categoryPosition: 3,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },

  // Highland Trail Challenge 12K results
  {
    id: generateId(),
    raceId: races[4].id,
    teamId: teams[1].id,
    timeSeconds: 4200, // 1:10:00
    position: 1,
    categoryPosition: 1,
    notes: "Tough altitude but great performance!",
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-07-20"),
  },
  {
    id: generateId(),
    raceId: races[4].id,
    teamId: teams[0].id,
    timeSeconds: 4320, // 1:12:00
    position: 2,
    categoryPosition: 2,
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-07-20"),
  },
  {
    id: generateId(),
    raceId: races[4].id,
    teamId: teams[3].id,
    timeSeconds: 4560, // 1:16:00
    position: 3,
    categoryPosition: 1,
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-07-20"),
  },

  // Autumn Road Race 5K results
  {
    id: generateId(),
    raceId: races[5].id,
    teamId: teams[4].id,
    timeSeconds: 1350, // 22:30
    position: 1,
    categoryPosition: 1,
    notes: "Personal best on this course!",
    createdAt: new Date("2024-09-30"),
    updatedAt: new Date("2024-09-30"),
  },
  {
    id: generateId(),
    raceId: races[5].id,
    teamId: teams[5].id,
    timeSeconds: 1410, // 23:30
    position: 2,
    categoryPosition: 1,
    createdAt: new Date("2024-09-30"),
    updatedAt: new Date("2024-09-30"),
  },
  {
    id: generateId(),
    raceId: races[5].id,
    teamId: teams[0].id,
    timeSeconds: 1440, // 24:00
    position: 3,
    categoryPosition: 2,
    createdAt: new Date("2024-09-30"),
    updatedAt: new Date("2024-09-30"),
  },
  {
    id: generateId(),
    raceId: races[5].id,
    teamId: teams[2].id,
    timeSeconds: 1500, // 25:00
    position: 4,
    categoryPosition: 3,
    createdAt: new Date("2024-09-30"),
    updatedAt: new Date("2024-09-30"),
  },
];
