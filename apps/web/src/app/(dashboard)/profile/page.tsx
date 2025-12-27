'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  Edit2,
  LogOut,
  Crown,
  Flame,
  Trophy,
  Target,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Star,
  Lock,
  ChevronRight,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge, XPBadge, StreakBadge, LeagueBadge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/components/providers'
import { cn, formatXP } from '@/lib/utils'
import { UpgradeSuccessModal } from '@/components/billing/upgrade-success-modal'

// Demo data
const userStats = {
  totalXP: 4850,
  currentStreak: 7,
  longestStreak: 21,
  lessonsCompleted: 42,
  unitsCompleted: 8,
  levelsCompleted: 1,
  perfectQuizzes: 15,
  weeklyXP: 1250,
  league: 'DIAMOND',
  joinedAt: '2024-01-15',
  daysActive: 45,
}

const badges = [
  { code: 'ROOKIE', name: 'Novato', description: 'Primera lección completada', earned: true, earnedAt: '2024-01-15' },
  { code: 'FIRST_UNIT', name: 'Primera Unidad', description: 'Completaste tu primera unidad', earned: true, earnedAt: '2024-01-20' },
  { code: 'STREAK_7', name: 'Racha de 7 días', description: 'Mantuviste 7 días consecutivos', earned: true, earnedAt: '2024-02-01' },
  { code: 'STREAK_30', name: 'Racha de 30 días', description: 'Mantuviste 30 días consecutivos', earned: false },
  { code: 'QUIZ_MASTER', name: 'Maestro de Quizzes', description: '10 quizzes perfectos', earned: true, earnedAt: '2024-02-10' },
  { code: 'CONSISTENCY', name: 'Consistente', description: '10 días en 14', earned: false },
  { code: 'TEAM_PLAYER', name: 'Jugador de Equipo', description: 'Completaste un reto grupal', earned: false },
  { code: 'FIRST_LEVEL', name: 'Nivel Completado', description: 'Completaste tu primer nivel', earned: true, earnedAt: '2024-02-15' },
]

const recentActivity = [
  { type: 'LESSON', title: 'Completaste "Velas Japonesas"', xp: 20, time: 'Hace 2h' },
  { type: 'QUIZ', title: 'Quiz perfecto en "Tendencias"', xp: 15, time: 'Hace 5h' },
  { type: 'STREAK', title: 'Racha de 7 días', xp: 25, time: 'Ayer' },
  { type: 'LEVEL', title: 'Completaste Nivel 1', xp: 100, time: 'Hace 2 días' },
]

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, logout, refresh } = useAuth()
  const [showUpgradeThanks, setShowUpgradeThanks] = useState(false)

  const upgraded = searchParams.get('upgraded') === 'true'

  useEffect(() => {
    if (!upgraded) return
    setShowUpgradeThanks(true)
    refresh()
    const t = setTimeout(() => refresh(), 1500)
    return () => clearTimeout(t)
  }, [upgraded, refresh])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <UpgradeSuccessModal
          open={showUpgradeThanks}
          onClose={() => {
            setShowUpgradeThanks(false)
            refresh()
            router.replace('/profile')
          }}
          onComplete={() => {
            setShowUpgradeThanks(false)
            refresh()
            router.replace('/profile')
          }}
          completeLabel="Ir a mi perfil"
          description="Tu plan Pro fue activado. Ya puedes disfrutar de vidas infinitas y todas las lecciones desbloqueadas."
        />

        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-dark-800 to-dark-900 border-dark-700 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-accent-purple/5" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <UserAvatar src={user.avatarUrl} name={user.displayName} size="xl" />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">{user.displayName}</h1>
                  {user.isPro && (
                    <Badge variant="pro" className="gap-1">
                      <Crown className="w-3 h-3" />
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400 mb-4">@{user.username}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <StreakBadge streak={userStats.currentStreak} />
                  <XPBadge xp={userStats.totalXP} />
                  <LeagueBadge league={userStats.league} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    'border-dark-600 rounded-2xl border-2 border-b-4 transition-all duration-150 ease-out',
                    'active:translate-y-0.5 active:border-b-2 hover:border-dark-500'
                  )}
                >
                  <Settings className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    'border-dark-600 text-red-400 hover:text-red-300 hover:border-red-500/50',
                    'rounded-2xl border-2 border-b-4 transition-all duration-150 ease-out',
                    'active:translate-y-0.5 active:border-b-2'
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'XP Total', value: formatXP(userStats.totalXP), icon: Star, color: 'text-brand-400' },
            { label: 'Racha Actual', value: `${userStats.currentStreak} días`, icon: Flame, color: 'text-accent-orange' },
            { label: 'Lecciones', value: userStats.lessonsCompleted, icon: BookOpen, color: 'text-accent-purple' },
            { label: 'Quizzes Perfectos', value: userStats.perfectQuizzes, icon: Trophy, color: 'text-accent-gold' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-dark-800 border-dark-700">
                <CardContent className="p-4 text-center">
                  <stat.icon className={cn('w-6 h-6 mx-auto mb-2', stat.color)} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Badges */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-gold" />
              Insignias
            </h2>
            <Card className="bg-dark-800 border-dark-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.code}
                      className={cn(
                        'relative aspect-square rounded-xl flex items-center justify-center text-2xl transition-all',
                        badge.earned
                          ? 'bg-gradient-to-br from-accent-gold/20 to-accent-orange/20 cursor-pointer hover:scale-105'
                          : 'bg-dark-700 opacity-40'
                      )}
                      title={badge.earned ? `${badge.name}: ${badge.description}` : `${badge.name} (No obtenida)`}
                    >
                      {!badge.earned && (
                        <Lock className="absolute w-4 h-4 text-gray-500" />
                      )}
                      {badge.code === 'ROOKIE' && '🌟'}
                      {badge.code === 'FIRST_UNIT' && '📚'}
                      {badge.code === 'STREAK_7' && '🔥'}
                      {badge.code === 'STREAK_30' && '🔥👑'}
                      {badge.code === 'QUIZ_MASTER' && '🎯'}
                      {badge.code === 'CONSISTENCY' && '💪'}
                      {badge.code === 'TEAM_PLAYER' && '🤝'}
                      {badge.code === 'FIRST_LEVEL' && '🏆'}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-dark-700">
                  <p className="text-sm text-gray-400 text-center">
                    {badges.filter((b) => b.earned).length} de {badges.length} insignias
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-500" />
              Actividad Reciente
            </h2>
            <Card className="bg-dark-800 border-dark-700">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-dark-700 bg-dark-800/60"
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        activity.type === 'LESSON' && 'bg-brand-500/20 text-brand-400',
                        activity.type === 'QUIZ' && 'bg-accent-purple/20 text-accent-purple',
                        activity.type === 'STREAK' && 'bg-accent-orange/20 text-accent-orange',
                        activity.type === 'LEVEL' && 'bg-accent-gold/20 text-accent-gold'
                      )}>
                        {activity.type === 'LESSON' && <BookOpen className="w-5 h-5" />}
                        {activity.type === 'QUIZ' && <Target className="w-5 h-5" />}
                        {activity.type === 'STREAK' && <Flame className="w-5 h-5" />}
                        {activity.type === 'LEVEL' && <Trophy className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <XPBadge xp={activity.xp} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pro Upgrade Banner (if not pro) */}
        {!user.isPro && (
          <Card className="mt-8 bg-gradient-to-r from-accent-purple/20 to-brand-500/20 border-accent-purple/30 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple to-brand-500 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">Desbloquea Progressia Pro</h3>
                  <p className="text-gray-400">
                    Accede a todos los niveles, retos ilimitados y estadísticas avanzadas
                  </p>
                </div>
                <Button variant="premium" size="lg" className="gap-2">
                  Ver Planes
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

