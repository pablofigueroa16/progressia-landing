'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown, Medal, TrendingUp, ChevronUp, ChevronDown, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge, LeagueBadge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/ui/avatar'
import { cn, formatXP, getRankEmoji } from '@/lib/utils'

// Demo data
const leaderboardData = [
  { rank: 1, username: 'crypto_master', displayName: 'Alejandro R.', xp: 2450, change: 0, league: 'DIAMOND' },
  { rank: 2, username: 'trader_elena', displayName: 'Elena M.', xp: 2280, change: 1, league: 'DIAMOND' },
  { rank: 3, username: 'forex_king', displayName: 'Carlos P.', xp: 1890, change: -1, league: 'DIAMOND' },
  { rank: 4, username: 'stocks_pro', displayName: 'María L.', xp: 1650, change: 2, league: 'DIAMOND' },
  { rank: 5, username: 'trading_guru', displayName: 'Juan S.', xp: 1520, change: 0, league: 'DIAMOND' },
  { rank: 6, username: 'bull_market', displayName: 'Ana G.', xp: 1380, change: -2, league: 'DIAMOND' },
  { rank: 7, username: 'bear_hunter', displayName: 'Pedro V.', xp: 1250, change: 3, league: 'DIAMOND', isCurrentUser: true },
  { rank: 8, username: 'chart_wizard', displayName: 'Laura T.', xp: 1180, change: -1, league: 'DIAMOND' },
  { rank: 9, username: 'candle_reader', displayName: 'Miguel A.', xp: 1050, change: 0, league: 'DIAMOND' },
  { rank: 10, username: 'trend_follower', displayName: 'Sofia R.', xp: 980, change: 1, league: 'GOLD' },
]

const leagues = [
  { name: 'Diamante', value: 'DIAMOND', icon: '💎', color: 'text-accent-diamond', threshold: '1000+ XP' },
  { name: 'Oro', value: 'GOLD', icon: '🥇', color: 'text-accent-gold', threshold: '500-999 XP' },
  { name: 'Plata', value: 'SILVER', icon: '🥈', color: 'text-accent-silver', threshold: '200-499 XP' },
  { name: 'Bronce', value: 'BRONZE', icon: '🥉', color: 'text-accent-bronze', threshold: '0-199 XP' },
]

const currentUserStats = {
  rank: 7,
  totalRanked: 1250,
  weeklyXP: 1250,
  league: 'DIAMOND',
  percentile: 15,
}

export default function LeaderboardPage() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)

  const filteredData = selectedLeague
    ? leaderboardData.filter((u) => u.league === selectedLeague)
    : leaderboardData

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-gold/5 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Ranking</h1>
          <p className="text-gray-400">Compite con los mejores traders de la semana</p>
        </div>

        {/* My Stats Card */}
        <Card className="bg-gradient-to-r from-dark-800 to-dark-900 border-dark-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <UserAvatar src={null} name="Tú" size="xl" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-dark-900 flex items-center justify-center text-lg">
                    {getRankEmoji(currentUserStats.rank) || `#${currentUserStats.rank}`}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Tu posición</div>
                  <div className="text-3xl font-bold text-white">#{currentUserStats.rank}</div>
                  <div className="text-sm text-gray-500">
                    Top {currentUserStats.percentile}% de traders
                  </div>
                </div>
              </div>
              <div className="h-16 w-px bg-dark-600 hidden sm:block" />
              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="text-center sm:text-left">
                  <div className="text-sm text-gray-400">XP Semanal</div>
                  <div className="text-2xl font-bold text-brand-400">{formatXP(currentUserStats.weeklyXP)}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm text-gray-400">Liga Actual</div>
                  <LeagueBadge league={currentUserStats.league} className="mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leagues Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedLeague === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedLeague(null)}
            className={selectedLeague !== null ? 'border-dark-600' : ''}
          >
            Todos
          </Button>
          {leagues.map((league) => (
            <Button
              key={league.value}
              variant={selectedLeague === league.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLeague(league.value)}
              className={cn(
                'gap-1.5',
                selectedLeague !== league.value && 'border-dark-600'
              )}
            >
              <span>{league.icon}</span>
              {league.name}
            </Button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <Card className="bg-dark-800 border-dark-700 overflow-hidden">
          <CardHeader className="border-b border-dark-700 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ranking Semanal</CardTitle>
              <div className="text-sm text-gray-400">
                Reinicia en 3 días
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-dark-700">
              {filteredData.map((user, index) => (
                <motion.div
                  key={user.username}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-4 p-4 transition-colors',
                    user.isCurrentUser && 'bg-brand-500/10'
                  )}
                >
                  {/* Rank */}
                  <div className="w-12 flex items-center justify-center">
                    {user.rank <= 3 ? (
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-xl',
                        user.rank === 1 && 'bg-accent-gold/20',
                        user.rank === 2 && 'bg-accent-silver/20',
                        user.rank === 3 && 'bg-accent-bronze/20'
                      )}>
                        {user.rank === 1 && '🥇'}
                        {user.rank === 2 && '🥈'}
                        {user.rank === 3 && '🥉'}
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-400">
                        {user.rank}
                      </span>
                    )}
                  </div>

                  {/* Change indicator */}
                  <div className="w-6 flex items-center justify-center">
                    {user.change > 0 && (
                      <ChevronUp className="w-4 h-4 text-green-500" />
                    )}
                    {user.change < 0 && (
                      <ChevronDown className="w-4 h-4 text-red-500" />
                    )}
                    {user.change === 0 && (
                      <Minus className="w-4 h-4 text-gray-500" />
                    )}
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <UserAvatar src={null} name={user.displayName} size="sm" />
                    <div className="min-w-0">
                      <div className={cn(
                        'font-medium truncate',
                        user.isCurrentUser ? 'text-brand-400' : 'text-white'
                      )}>
                        {user.displayName}
                        {user.isCurrentUser && ' (Tú)'}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        @{user.username}
                      </div>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <div className="font-bold text-brand-400">{formatXP(user.xp)}</div>
                    <div className="text-xs text-gray-500">XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leagues Info */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4">Ligas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leagues.map((league) => (
              <Card key={league.value} className="bg-dark-800 border-dark-700">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{league.icon}</div>
                  <h3 className={cn('font-semibold', league.color)}>{league.name}</h3>
                  <p className="text-sm text-gray-500">{league.threshold}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

