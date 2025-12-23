'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Gamepad2,
  Trophy,
  Users,
  User,
  Settings,
  LogOut,
  Flame,
  Star,
  Crown,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth, useTheme } from '@/components/providers'
import { UserAvatar } from '@/components/ui/avatar'
import { Badge, XPBadge, StreakBadge, LeagueBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Aprender', href: '/learn', icon: BookOpen },
  { name: 'Jugar', href: '/play', icon: Gamepad2 },
  { name: 'Ranking', href: '/leaderboard', icon: Trophy },
  { name: 'Amigos', href: '/friends', icon: Users },
  { name: 'Perfil', href: '/profile', icon: User },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    )
  }

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  // Ocultar navbar durante las lecciones (pantalla completa)
  const isLessonPage = pathname.includes('/learn/lesson/')

  if (isLessonPage) {
    return <div className="min-h-screen bg-dark-950">{children}</div>
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/learn" className="flex items-center gap-2">
              <Image
                src="/progressia.png"
                alt="Progressia"
                width={200}
                height={80}
                className="h-20 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-brand-500/20 text-brand-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Right side - Stats & Profile */}
            <div className="flex items-center gap-4">
              {/* Stats badges */}
              <div className="hidden sm:flex items-center gap-2">
                <StreakBadge streak={7} />
                <XPBadge xp={1250} />
              </div>

              {/* Pro badge */}
              {user.isPro && (
                <Badge variant="pro" className="hidden sm:flex gap-1">
                  <Crown className="w-3 h-3" />
                  PRO
                </Badge>
              )}

              {/* Profile dropdown */}
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={user.avatarUrl}
                  name={user.displayName}
                  size="sm"
                />
                <div className="hidden lg:block">
                  <div className="text-sm font-medium text-white">{user.displayName}</div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark-900 border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                      isActive
                        ? 'bg-brand-500/20 text-brand-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
              <hr className="border-white/10 my-4" />
              <div className="flex items-center gap-2 mb-4">
                <StreakBadge streak={7} />
                <XPBadge xp={1250} />
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-t border-white/5 safe-bottom">
        <div className="flex items-center justify-around h-16">
          {navigation.slice(0, 5).map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all',
                  isActive ? 'text-brand-400' : 'text-gray-500'
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

