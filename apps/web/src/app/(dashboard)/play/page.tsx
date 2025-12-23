'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Swords,
  Users,
  Plus,
  Clock,
  Target,
  Trophy,
  Zap,
  ChevronRight,
  Crown,
  BookOpen,
  Star,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge, XPBadge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

// Demo data
const activeChallenges = [
  {
    id: '1',
    type: 'DUEL',
    title: 'Duelo de XP',
    goalType: 'XP_EARNED',
    goalTarget: 100,
    status: 'ACTIVE',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    opponent: {
      username: 'trader_pro',
      displayName: 'Carlos M.',
      avatarUrl: null,
      progress: 45,
    },
    myProgress: 62,
  },
  {
    id: '2',
    type: 'GROUP',
    title: 'Reto Semanal',
    goalType: 'TOTAL_XP',
    goalTarget: 1000,
    status: 'ACTIVE',
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    members: [
      { username: 'trader_pro', progress: 180 },
      { username: 'crypto_king', progress: 220 },
      { username: 'tu', progress: 250, isMe: true },
      { username: 'forex_master', progress: 150 },
    ],
    totalProgress: 800,
  },
]

const pendingInvites = [
  {
    id: '3',
    type: 'DUEL',
    title: 'Completa 5 lecciones',
    from: {
      username: 'maria_trades',
      displayName: 'María L.',
    },
    endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
  },
]

const challengeTypes = [
  {
    type: 'DUEL',
    icon: Swords,
    title: 'Duelo 1v1',
    description: 'Desafía a un amigo',
    color: 'from-accent-orange to-red-500',
  },
  {
    type: 'GROUP',
    icon: Users,
    title: 'Reto Grupal',
    description: 'Hasta 10 participantes',
    color: 'from-accent-purple to-brand-500',
  },
]

const goalTypes = [
  { value: 'LESSONS_COMPLETE', label: 'Completar lecciones', icon: BookOpen },
  { value: 'XP_EARNED', label: 'Ganar XP', icon: Star },
  { value: 'PERFECT_QUIZZES', label: 'Quizzes perfectos', icon: Trophy },
]

function timeRemaining(date: Date): string {
  const diff = date.getTime() - Date.now()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h`
  return `${hours}h`
}

export default function PlayPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/10 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Jugar</h1>
            <p className="text-gray-400">Desafía a tus amigos y gana recompensas</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2">
            <Plus className="w-5 h-5" />
            Nuevo Reto
          </Button>
        </div>

        {/* Create Challenge Options */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {challengeTypes.map((type) => (
            <Card
              key={type.type}
              interactive
              className="bg-dark-800 border-dark-700 overflow-hidden group"
              onClick={() => setShowCreateModal(true)}
            >
              <div className={cn(
                'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity',
                type.color
              )} />
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center',
                    type.color
                  )}>
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">{type.title}</h3>
                    <p className="text-gray-400 text-sm">{type.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Invites */}
        {pendingInvites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Invitaciones Pendientes</h2>
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <Card key={invite.id} className="bg-dark-800 border-dark-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                        <Swords className="w-6 h-6 text-accent-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{invite.title}</h3>
                        <p className="text-sm text-gray-400">
                          De @{invite.from.username} • {timeRemaining(invite.endsAt)} restantes
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-dark-600">
                          Rechazar
                        </Button>
                        <Button size="sm">Aceptar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Active Challenges */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Retos Activos</h2>
          <div className="space-y-4">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id} className="bg-dark-800 border-dark-700 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        challenge.type === 'DUEL'
                          ? 'bg-accent-orange/20'
                          : 'bg-accent-purple/20'
                      )}>
                        {challenge.type === 'DUEL' ? (
                          <Swords className={cn(
                            'w-5 h-5',
                            'text-accent-orange'
                          )} />
                        ) : (
                          <Users className="w-5 h-5 text-accent-purple" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base">{challenge.title}</CardTitle>
                        <p className="text-sm text-gray-400">
                          {challenge.goalTarget} {challenge.goalType === 'XP_EARNED' ? 'XP' : 'lecciones'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {timeRemaining(challenge.endsAt)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {challenge.type === 'DUEL' && challenge.opponent && (
                    <div className="space-y-4">
                      {/* My progress */}
                      <div className="flex items-center gap-4">
                        <UserAvatar src={null} name="Tú" size="sm" />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-white">Tú</span>
                            <span className="text-brand-400">{challenge.myProgress} XP</span>
                          </div>
                          <Progress 
                            value={(challenge.myProgress / challenge.goalTarget) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                      {/* Opponent progress */}
                      <div className="flex items-center gap-4">
                        <UserAvatar 
                          src={challenge.opponent.avatarUrl} 
                          name={challenge.opponent.displayName} 
                          size="sm" 
                        />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-300">
                              @{challenge.opponent.username}
                            </span>
                            <span className="text-gray-400">{challenge.opponent.progress} XP</span>
                          </div>
                          <Progress 
                            value={(challenge.opponent.progress / challenge.goalTarget) * 100}
                            className="h-2"
                            indicatorClassName="bg-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {challenge.type === 'GROUP' && challenge.members && (
                    <div className="space-y-4">
                      {/* Total progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progreso del equipo</span>
                          <span className="text-brand-400">
                            {challenge.totalProgress} / {challenge.goalTarget} XP
                          </span>
                        </div>
                        <Progress 
                          value={(challenge.totalProgress! / challenge.goalTarget) * 100}
                          className="h-3"
                        />
                      </div>
                      {/* Members */}
                      <div className="grid grid-cols-2 gap-2">
                        {challenge.members.map((member) => (
                          <div 
                            key={member.username}
                            className={cn(
                              'flex items-center gap-2 p-2 rounded-lg',
                              member.isMe ? 'bg-brand-500/10' : 'bg-dark-700/50'
                            )}
                          >
                            <span className="text-sm font-medium text-gray-300">
                              @{member.username}
                            </span>
                            <span className="text-sm text-gray-500 ml-auto">
                              {member.progress} XP
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {activeChallenges.length === 0 && pendingInvites.length === 0 && (
          <Card className="bg-dark-800 border-dark-700">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No tienes retos activos
              </h3>
              <p className="text-gray-400 mb-6">
                Crea un nuevo reto o espera a que te inviten
              </p>
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="w-5 h-5" />
                Crear Reto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

