import Link from "next/link";
import {
  getRaces,
  getTeamsWithDetails,
  getResults,
  getTeamStats,
  formatTime,
} from "@/lib/db/database";

export default function StatsPage() {
  const races = getRaces();
  const teams = getTeamsWithDetails();
  const results = getResults();

  // Calculate global statistics
  const totalRaces = races.length;
  const totalTeams = teams.length;
  const totalResults = results.length;
  const totalDistance = races.reduce((sum, race) => sum + race.distance, 0);

  // Get all team stats and sort by wins
  const teamsWithStats = teams
    .map((team) => ({
      team,
      stats: getTeamStats(team.id),
    }))
    .filter((t) => t.stats !== null)
    .sort((a, b) => (b.stats?.wins || 0) - (a.stats?.wins || 0));

  // Top performers
  const topByWins = teamsWithStats.slice(0, 5);
  const topByPodiums = [...teamsWithStats].sort(
    (a, b) => (b.stats?.podiums || 0) - (a.stats?.podiums || 0)
  ).slice(0, 5);

  // Dog breed statistics
  const breedCounts = teams.reduce(
    (acc, team) => {
      acc[team.dog.breed] = (acc[team.dog.breed] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topBreeds = Object.entries(breedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Race type statistics
  const courseTypeCounts = races.reduce(
    (acc, race) => {
      acc[race.courseType] = (acc[race.courseType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Average stats
  const avgRaceDistance =
    races.reduce((sum, race) => sum + race.distance, 0) / races.length;
  const avgElevation =
    races
      .filter((r) => r.elevationGain)
      .reduce((sum, race) => sum + (race.elevationGain || 0), 0) /
    races.filter((r) => r.elevationGain).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            📊 Statistics & Leaderboards
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Performance insights and community rankings
          </p>
        </div>

        {/* Global Stats */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {totalRaces}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Total Races</div>
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {totalTeams}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Active Teams</div>
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {totalResults}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Results
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg text-center">
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {Math.round(totalDistance)}km
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Distance
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Teams by Wins */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🏆 Top Teams by Wins
            </h2>
            <div className="space-y-4">
              {topByWins.map((item, index) => (
                <Link
                  key={item.team.id}
                  href={`/teams/${item.team.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-400 dark:text-gray-500 w-8">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {item.team.human.firstName}{" "}
                          {item.team.human.lastName} & {item.team.dog.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.team.dog.breed}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {item.stats?.wins}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        wins
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Teams by Podiums */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🥇 Top Teams by Podiums
            </h2>
            <div className="space-y-4">
              {topByPodiums.map((item, index) => (
                <Link
                  key={item.team.id}
                  href={`/teams/${item.team.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-400 dark:text-gray-500 w-8">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {item.team.human.firstName}{" "}
                          {item.team.human.lastName} & {item.team.dog.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.team.dog.breed}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {item.stats?.podiums}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        podiums
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Dog Breeds */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              🐕 Popular Dog Breeds
            </h2>
            <div className="space-y-3">
              {topBreeds.map(([breed, count], index) => (
                <div
                  key={breed}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-400 dark:text-gray-500">
                      #{index + 1}
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {breed}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Race Statistics */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📏 Race Statistics
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Average Race Distance
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgRaceDistance.toFixed(1)}km
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Average Elevation Gain
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgElevation.toFixed(0)}m
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 dark:bg-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Course Types
                </div>
                <div className="space-y-2">
                  {Object.entries(courseTypeCounts).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize text-gray-900 dark:text-white">
                        {type}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {count} races
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
