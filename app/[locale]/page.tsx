import Link from "next/link";
import { useTranslations } from "next-intl";
import { getRacesWithResults } from "@/lib/db/database";

export default function Home() {
  const t = useTranslations();
  const races = getRacesWithResults();

  const formatDate = (date: Date, locale: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            🐕 {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('home.subtitle')}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/teams"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold transition-colors hover:bg-blue-700"
            >
              {t('home.viewTeams')}
            </Link>
            <Link
              href="/stats"
              className="rounded-lg border-2 border-blue-600 px-6 py-3 text-blue-600 font-semibold transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
            >
              {t('home.statistics')}
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {races.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">{t('home.totalRaces')}</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {races.reduce((sum, race) => sum + race.results.length, 0)}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {t('home.totalParticipants')}
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(
                races.reduce((sum, race) => sum + race.distance, 0)
              )}
              km
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {t('home.totalDistance')}
            </div>
          </div>
        </div>

        {/* Races List */}
        <div className="mb-8">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            {t('home.upcomingRaces')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {races.map((race) => (
              <Link
                key={race.id}
                href={`/races/${race.id}`}
                className="group block"
              >
                <div className="h-full rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {race.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        📍 {race.location}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${getCourseTypeColor(race.courseType)}`}
                    >
                      {t(`races.courseTypes.${race.courseType}`)}
                    </span>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        📅 {t('home.date')}:
                      </span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {formatDate(race.date, 'en-US')}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">
                        📏 {t('home.distance')}:
                      </span>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {race.distance}km
                      </div>
                    </div>
                    {race.elevationGain && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          ⛰️ {t('home.elevation')}:
                        </span>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {race.elevationGain}m
                        </div>
                      </div>
                    )}
                    {race.weather && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">
                          ☀️ {t('home.weather')}:
                        </span>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {race.weather}
                          {race.temperature && ` (${race.temperature}°C)`}
                        </div>
                      </div>
                    )}
                  </div>

                  {race.description && (
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      {race.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {race.results.length} {t('home.participants')}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                      {t('common.viewResults')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
