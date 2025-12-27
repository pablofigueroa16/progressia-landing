'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  Users,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronRight,
  BarChart3,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers'
import { cn } from '@/lib/utils'

// Admin dashboard for managing content
export default function AdminPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [stats, setStats] = useState({
    levels: 5,
    units: 10,
    lessons: 50,
    questions: 200,
    users: 1250,
    proUsers: 85,
  })

  useEffect(() => {
    if (!isLoading && user?.role !== 'ADMIN') {
      router.push('/learn')
    }
  }, [user, isLoading, router])

  if (isLoading || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-dark-950 to-dark-950 pointer-events-none" />
        <div className="relative z-10 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    )
  }

  const menuItems = [
    {
      title: 'Niveles',
      icon: Layers,
      href: '/admin/levels',
      count: stats.levels,
      color: 'text-brand-500',
      bgColor: 'bg-brand-500/20',
    },
    {
      title: 'Unidades',
      icon: BookOpen,
      href: '/admin/units',
      count: stats.units,
      color: 'text-accent-purple',
      bgColor: 'bg-accent-purple/20',
    },
    {
      title: 'Lecciones',
      icon: FileText,
      href: '/admin/lessons',
      count: stats.lessons,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Preguntas Quiz',
      icon: HelpCircle,
      href: '/admin/questions',
      count: stats.questions,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20',
    },
    {
      title: 'Usuarios',
      icon: Users,
      href: '/admin/users',
      count: stats.users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
    },
  ]

  return (
    <div className="min-h-screen bg-dark-950 pb-24 md:pb-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/10 via-dark-950 to-dark-950 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-gray-400">Gestiona el contenido educativo de Progressia</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Usuarios Totales', value: stats.users, icon: Users },
            { label: 'Usuarios Pro', value: stats.proUsers, icon: BarChart3 },
            { label: 'Lecciones', value: stats.lessons, icon: FileText },
            { label: 'Preguntas', value: stats.questions, icon: HelpCircle },
          ].map((stat, i) => (
            <Card key={i} className="bg-dark-800 border-dark-700 hover:border-dark-600 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Management */}
        <h2 className="text-lg font-semibold text-white mb-4">Gestión de Contenido</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {menuItems.map((item) => (
            <Card
              key={item.title}
              interactive
              className="bg-dark-800 border-dark-700"
              onClick={() => router.push(item.href)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', item.bgColor)}>
                    <item.icon className={cn('w-6 h-6', item.color)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.count} elementos</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-dark-800 border-dark-700">
            <CardHeader>
              <CardTitle className="text-base">Crear Nuevo Contenido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-dark-600 gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Nivel
              </Button>
              <Button variant="outline" className="w-full justify-start border-dark-600 gap-2">
                <Plus className="w-4 h-4" />
                Nueva Unidad
              </Button>
              <Button variant="outline" className="w-full justify-start border-dark-600 gap-2">
                <Plus className="w-4 h-4" />
                Nueva Lección
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-dark-800 border-dark-700">
            <CardHeader>
              <CardTitle className="text-base">Contenido Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Velas Japonesas', type: 'Lección', status: 'published' },
                  { title: 'Quiz de Tendencias', type: 'Quiz', status: 'draft' },
                  { title: 'Análisis Técnico', type: 'Nivel', status: 'published' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-dark-700/50">
                    <div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.type}</div>
                    </div>
                    <Badge
                      variant={item.status === 'published' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.status === 'published' ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

