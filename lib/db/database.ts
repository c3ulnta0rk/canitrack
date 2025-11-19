// In-memory database layer for Canitrack
// This can be easily replaced with Prisma or another ORM later

import {
  Human,
  Dog,
  Team,
  Race,
  Result,
  TeamWithDetails,
  ResultWithDetails,
  RaceWithResults,
} from "./types";
import {
  humans as seedHumans,
  dogs as seedDogs,
  teams as seedTeams,
  races as seedRaces,
  results as seedResults,
} from "./seed";

// In-memory storage
let humans: Human[] = [...seedHumans];
let dogs: Dog[] = [...seedDogs];
let teams: Team[] = [...seedTeams];
let races: Race[] = [...seedRaces];
let results: Result[] = [...seedResults];

// Helper functions
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
};

// Database functions

// Humans
export const getHumans = (): Human[] => humans;
export const getHumanById = (id: string): Human | undefined =>
  humans.find((h) => h.id === id);

// Dogs
export const getDogs = (): Dog[] => dogs;
export const getDogById = (id: string): Dog | undefined =>
  dogs.find((d) => d.id === id);

// Teams
export const getTeams = (): Team[] => teams;
export const getTeamById = (id: string): Team | undefined =>
  teams.find((t) => t.id === id);

export const getTeamWithDetails = (id: string): TeamWithDetails | undefined => {
  const team = getTeamById(id);
  if (!team) return undefined;

  const human = getHumanById(team.humanId);
  const dog = getDogById(team.dogId);

  if (!human || !dog) return undefined;

  return {
    ...team,
    human,
    dog,
  };
};

export const getTeamsWithDetails = (): TeamWithDetails[] => {
  return teams
    .map((team) => getTeamWithDetails(team.id))
    .filter((t): t is TeamWithDetails => t !== undefined);
};

// Races
export const getRaces = (): Race[] => races;
export const getRaceById = (id: string): Race | undefined =>
  races.find((r) => r.id === id);

export const getRaceWithResults = (id: string): RaceWithResults | undefined => {
  const race = getRaceById(id);
  if (!race) return undefined;

  const raceResults = results
    .filter((r) => r.raceId === id)
    .map((result) => {
      const team = getTeamWithDetails(result.teamId);
      if (!team) return null;

      return {
        ...result,
        race,
        team,
      };
    })
    .filter((r): r is ResultWithDetails => r !== null)
    .sort((a, b) => (a.position || 999) - (b.position || 999));

  return {
    ...race,
    results: raceResults,
  };
};

export const getRacesWithResults = (): RaceWithResults[] => {
  return races
    .map((race) => getRaceWithResults(race.id))
    .filter((r): r is RaceWithResults => r !== undefined)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Results
export const getResults = (): Result[] => results;
export const getResultById = (id: string): Result | undefined =>
  results.find((r) => r.id === id);

export const getResultsByTeam = (teamId: string): ResultWithDetails[] => {
  return results
    .filter((r) => r.teamId === teamId)
    .map((result) => {
      const race = getRaceById(result.raceId);
      const team = getTeamWithDetails(result.teamId);
      if (!race || !team) return null;

      return {
        ...result,
        race,
        team,
      };
    })
    .filter((r): r is ResultWithDetails => r !== null)
    .sort((a, b) => b.race.date.getTime() - a.race.date.getTime());
};

export const getResultsByRace = (raceId: string): ResultWithDetails[] => {
  return results
    .filter((r) => r.raceId === raceId)
    .map((result) => {
      const race = getRaceById(result.raceId);
      const team = getTeamWithDetails(result.teamId);
      if (!race || !team) return null;

      return {
        ...result,
        race,
        team,
      };
    })
    .filter((r): r is ResultWithDetails => r !== null)
    .sort((a, b) => (a.position || 999) - (b.position || 999));
};

// Statistics
export const getTeamStats = (teamId: string) => {
  const teamResults = getResultsByTeam(teamId);

  if (teamResults.length === 0) {
    return null;
  }

  const totalRaces = teamResults.length;
  const wins = teamResults.filter((r) => r.position === 1).length;
  const podiums = teamResults.filter((r) => r.position && r.position <= 3).length;

  const avgTime =
    teamResults.reduce((sum, r) => sum + r.timeSeconds, 0) / totalRaces;

  const bestTime = Math.min(...teamResults.map((r) => r.timeSeconds));
  const bestRace = teamResults.find((r) => r.timeSeconds === bestTime);

  return {
    totalRaces,
    wins,
    podiums,
    avgTime,
    avgTimeFormatted: formatTime(Math.round(avgTime)),
    bestTime,
    bestTimeFormatted: formatTime(bestTime),
    bestRace: bestRace?.race,
  };
};

// Utility export
export { formatTime };
