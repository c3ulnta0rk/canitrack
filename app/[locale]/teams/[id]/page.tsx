import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTeamWithDetails,
  getResultsByTeam,
  getTeamStats,
  formatTime,
} from "@/lib/db/database";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params;
  const team = getTeamWithDetails(id);

  if (!team) {
    notFound();
  }

  const results = getResultsByTeam(id);
  const stats = getTeamStats(id);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getPositionBadge = (position?: number) => {
    if (!position) return null;

    if (position === 1) {
      return <span className="text-2xl">🥇</span>;
    } else if (position === 2) {
      return <span className="text-2xl">🥈</span>;
    } else if (position === 3) {
      return <span className="text-2xl">🥉</span>;
    }
    return (
      <span className="font-bold text-gray-600 dark:text-gray-400">
        #{position}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/teams"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to Teams
        </Link>

        {/* Team Header */}
        <div className="mb-8 rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
            Team Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Human Info */}
            <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">
                  {team.human.gender === "M" ? "👨" : "👩"}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {team.human.firstName} {team.human.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Runner</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Age:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {team.human.age} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Gender:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {team.human.gender === "M" ? "Male" : "Female"}
                  </span>
                </div>
              </div>
            </div>

            {/* Dog Info */}
            <div className="rounded-lg bg-green-50 dark:bg-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🐕</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {team.dog.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Canine Partner
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Breed:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {team.dog.breed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Age:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {team.dog.age} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Gender:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {team.dog.gender === "M" ? "Male" : "Female"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="mb-8 rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Performance Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stats.totalRaces}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Total Races
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 dark:bg-gray-700 p-6 text-center">
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {stats.wins}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  🥇 Wins
                </div>
              </div>

              <div className="rounded-lg bg-green-50 dark:bg-gray-700 p-6 text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {stats.podiums}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  🏆 Podiums
                </div>
              </div>

              <div className="rounded-lg bg-purple-50 dark:bg-gray-700 p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {((stats.wins / stats.totalRaces) * 100).toFixed(0)}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Win Rate
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg bg-orange-50 dark:bg-gray-700 p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Average Time
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                  {stats.avgTimeFormatted}
                </div>
              </div>

              <div className="rounded-lg bg-red-50 dark:bg-gray-700 p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Best Time
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                  {stats.bestTimeFormatted}
                </div>
                {stats.bestRace && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    at {stats.bestRace.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Race History */}
        <div className="rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Race History
          </h2>

          {results.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No race history available.
            </p>
          ) : (
            <div className="space-y-4">
              {results.map((result) => {
                const paceMinPerKm =
                  result.timeSeconds / 60 / result.race.distance;
                const paceMin = Math.floor(paceMinPerKm);
                const paceSec = Math.round((paceMinPerKm - paceMin) * 60);

                return (
                  <Link
                    key={result.id}
                    href={`/races/${result.raceId}`}
                    className="block"
                  >
                    <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {result.race.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            📍 {result.race.location} • {formatDate(result.race.date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPositionBadge(result.position)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Time
                          </div>
                          <div className="text-lg font-bold font-mono text-gray-900 dark:text-white">
                            {formatTime(result.timeSeconds)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Pace
                          </div>
                          <div className="text-lg font-bold font-mono text-gray-900 dark:text-white">
                            {paceMin}:{String(paceSec).padStart(2, "0")}/km
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Distance
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {result.race.distance}km
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Course
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                            {result.race.courseType}
                          </div>
                        </div>
                      </div>

                      {result.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            📝 {result.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
