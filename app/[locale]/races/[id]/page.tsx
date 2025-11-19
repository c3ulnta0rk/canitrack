import Link from "next/link";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { getRaceWithResults, formatTime } from "@/lib/db/database";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function RacePage({ params }: PageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const t = useTranslations();
  const race = getRaceWithResults(id);

  if (!race) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getCourseTypeColor = (type: string) => {
    switch (type) {
      case "trail":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "road":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "mixed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
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
    return <span className="text-gray-600 dark:text-gray-400">#{position}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('common.backToHome')}
        </Link>

        {/* Race Header */}
        <div className="mb-8 rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                {race.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                📍 {race.location}
              </p>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-lg font-semibold ${getCourseTypeColor(race.courseType)}`}
            >
              {t(`races.courseTypes.${race.courseType}`)}
            </span>
          </div>

          {race.description && (
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {race.description}
            </p>
          )}

          {/* Race Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                📅 {t('home.date')}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatDate(race.date)}
              </div>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-gray-700 p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                📏 {t('home.distance')}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {race.distance}km
              </div>
            </div>
            {race.elevationGain && (
              <div className="rounded-lg bg-orange-50 dark:bg-gray-700 p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ⛰️ {t('home.elevation')}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {race.elevationGain}m
                </div>
              </div>
            )}
            {race.weather && (
              <div className="rounded-lg bg-yellow-50 dark:bg-gray-700 p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ☀️ {t('home.weather')}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {race.weather}
                  {race.temperature && (
                    <span className="text-sm"> ({race.temperature}°C)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            {t('races.raceResults')}
          </h2>

          {race.results.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              {t('races.noResults')}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="pb-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {t('races.position')}
                    </th>
                    <th className="pb-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {t('races.team')}
                    </th>
                    <th className="pb-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {t('races.dog')}
                    </th>
                    <th className="pb-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {t('races.time')}
                    </th>
                    <th className="pb-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {t('races.pace')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {race.results.map((result) => {
                    const paceMinPerKm = result.timeSeconds / 60 / race.distance;
                    const paceMin = Math.floor(paceMinPerKm);
                    const paceSec = Math.round((paceMinPerKm - paceMin) * 60);

                    return (
                      <tr
                        key={result.id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center">
                            {getPositionBadge(result.position)}
                          </div>
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/teams/${result.teamId}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {result.team.human.firstName}{" "}
                              {result.team.human.lastName}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {result.team.human.gender === "M" ? "👨" : "👩"}{" "}
                              {result.team.human.age} {t('races.years')}
                            </div>
                          </Link>
                        </td>
                        <td className="py-4">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {result.team.dog.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {result.team.dog.breed}
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                            {formatTime(result.timeSeconds)}
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <div className="font-mono text-gray-600 dark:text-gray-400">
                            {paceMin}:{String(paceSec).padStart(2, "0")}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {race.results.some(r => r.notes) && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                {t('races.notes')}
              </h3>
              {race.results
                .filter(r => r.notes)
                .map(result => (
                  <div key={result.id} className="mb-2 rounded-lg bg-blue-50 dark:bg-gray-700 p-4">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {result.team.human.firstName} {result.team.human.lastName} & {result.team.dog.name}:
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {result.notes}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
