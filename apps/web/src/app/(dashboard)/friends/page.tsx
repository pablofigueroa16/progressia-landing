'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  UserPlus,
  Check,
  X,
  MessageSquare,
  Swords,
  MoreVertical,
  Users,
  Flame,
  Trophy,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge, StreakBadge, LeagueBadge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/ui/avatar'
import { cn, formatXP } from '@/lib/utils'

// Demo data
const friends = [
  {
    id: '1',
    username: 'trader_pro',
    displayName: 'Carlos M.',
    avatarUrl: null,
    streak: 14,
    weeklyXP: 890,
    league: 'GOLD',
    isOnline: true,
  },
  {
    id: '2',
    username: 'crypto_queen',
    displayName: 'María L.',
    avatarUrl: null,
    streak: 7,
    weeklyXP: 650,
    league: 'GOLD',
    isOnline: true,
  },
  {
    id: '3',
    username: 'forex_master',
    displayName: 'Juan P.',
    avatarUrl: null,
    streak: 21,
    weeklyXP: 1250,
    league: 'DIAMOND',
    isOnline: false,
  },
  {
    id: '4',
    username: 'stock_lover',
    displayName: 'Ana G.',
    avatarUrl: null,
    streak: 3,
    weeklyXP: 320,
    league: 'SILVER',
    isOnline: false,
  },
]

const pendingRequests = [
  {
    id: 'r1',
    username: 'new_trader',
    displayName: 'Pedro R.',
    avatarUrl: null,
  },
  {
    id: 'r2',
    username: 'market_watcher',
    displayName: 'Laura S.',
    avatarUrl: null,
  },
]

const searchResults = [
  {
    id: 's1',
    username: 'chart_master',
    displayName: 'Diego F.',
    avatarUrl: null,
    weeklyXP: 780,
    league: 'GOLD',
  },
]

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500))
    setShowSearch(true)
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Amigos</h1>
              <p className="text-gray-400">
                {friends.length} amigos • {friends.filter((f) => f.isOnline).length} en línea
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
                <Users className="w-5 h-5 text-brand-400" />
                <span className="text-brand-300 font-bold">
                  {friends.filter((f) => f.isOnline).length} online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="bg-gradient-to-r from-dark-800 to-dark-900 border-dark-700 mb-8">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Input
                placeholder="Buscar por usuario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                icon={<Search className="w-5 h-5" />}
                className="bg-dark-700 border-dark-600"
              />
              <Button onClick={handleSearch} isLoading={isSearching}>
                Buscar
              </Button>
            </div>

            {/* Search Results */}
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-dark-700"
              >
                <h3 className="text-sm font-medium text-gray-400 mb-3">Resultados</h3>
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-dark-700/50"
                      >
                        <UserAvatar src={user.avatarUrl} name={user.displayName} size="md" />
                        <div className="flex-1">
                          <div className="font-medium text-white">{user.displayName}</div>
                          <div className="text-sm text-gray-400">@{user.username}</div>
                        </div>
                        <LeagueBadge league={user.league} />
                        <Button size="sm" className="gap-2">
                          <UserPlus className="w-4 h-4" />
                          Agregar
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No se encontraron usuarios
                  </p>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Solicitudes Pendientes
              <Badge variant="secondary" className="ml-2">{pendingRequests.length}</Badge>
            </h2>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="bg-dark-800 border-dark-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <UserAvatar src={request.avatarUrl} name={request.displayName} size="md" />
                      <div className="flex-1">
                        <div className="font-medium text-white">{request.displayName}</div>
                        <div className="text-sm text-gray-400">@{request.username}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-brand-500 hover:bg-brand-600">
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Friends List */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Tus Amigos</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-dark-800 border-dark-700 overflow-hidden group hover:border-dark-600 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <UserAvatar
                        src={friend.avatarUrl}
                        name={friend.displayName}
                        size="lg"
                        showStatus
                        isOnline={friend.isOnline}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white truncate">
                            {friend.displayName}
                          </span>
                          {friend.isOnline && (
                            <span className="text-xs text-green-500">En línea</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400 mb-2">@{friend.username}</div>
                        <div className="flex flex-wrap items-center gap-2">
                          <StreakBadge streak={friend.streak} />
                          <LeagueBadge league={friend.league} />
                          <Badge variant="xp" className="gap-1">
                            {formatXP(friend.weeklyXP)} XP
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-dark-700">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-dark-600 gap-2"
                      >
                        <Swords className="w-4 h-4" />
                        Retar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-dark-600"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {friends.length === 0 && (
          <Card className="bg-dark-800 border-dark-700">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Aún no tienes amigos
              </h3>
              <p className="text-gray-400 mb-6">
                Busca usuarios por su nombre de usuario para agregarlos
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

