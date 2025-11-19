import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTeamsWithDetails, getTeamStats } from "@/lib/db/database";

export default function TeamsPage() {
  const t = useTranslations();
  const teams = getTeamsWithDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('common.backToHome')}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t('teams.title')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('teams.subtitle')}
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => {
            const stats = getTeamStats(team.id);

            return (
              <Link key={team.id} href={`/teams/${team.id}`} className="group">
                <div className="h-full rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                  {/* Human Info */}
                  <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {team.human.gender === "M" ? "👨" : "👩"}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {team.human.firstName} {team.human.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {team.human.age} {t('races.years')} • {team.human.gender === "M" ? t('teams.male') : t('teams.female')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dog Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🐕</span>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {team.dog.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {team.dog.breed}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {team.dog.age} {t('races.years')} • {team.dog.gender === "M" ? t('teams.male') : t('teams.female')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  {stats && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {stats.totalRaces}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {t('teams.races')}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {stats.wins}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {t('teams.wins')}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {stats.podiums}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {t('teams.podiums')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-center text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                    {t('common.viewProfile')}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
