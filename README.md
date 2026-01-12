# Progressia 🚀

Plataforma educativa de trading gamificada, inspirada en Duolingo. Aprende trading de forma interactiva con lecciones, quizzes, retos con amigos y un sistema de gamificación completo.

![Progressia](./apps/web/public/logo2.png)

## ✨ Características

### 📚 Aprendizaje
- Estructura de niveles → unidades → lecciones
- Contenido en Markdown con formato enriquecido
- Quizzes interactivos (opción múltiple, verdadero/falso, ordenar, escenarios)
- Progreso visual estilo Duolingo

### 🎮 Gamificación
- **XP System**: Gana puntos por completar lecciones y quizzes
- **Rachas (Streaks)**: Mantén tu racha diaria
- **Insignias**: Desbloquea logros
- **Ligas semanales**: Compite en Bronce, Plata, Oro y Diamante
- **Metas diarias**: 5, 10 o 15 minutos

### 👥 Social
- Sistema de amigos
- Retos 1v1 (duelos)
- Retos grupales (hasta 10 participantes)
- Leaderboard semanal

### 💎 Suscripción Pro
- Todos los niveles desbloqueados
- Retos ilimitados
- Estadísticas avanzadas
- Journal de trading (próximamente)
- Coach AI (próximamente)

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: PostgreSQL + Prisma
- **Autenticación**: JWT con sessions
- **Pagos**: Stripe
- **UI Components**: Radix UI, Framer Motion

## 📁 Estructura del Proyecto

```
progressia/
├── apps/
│   └── web/                 # Aplicación Next.js
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # Componentes React
│       │   └── lib/         # Utilidades y servicios
│       └── public/          # Assets estáticos
├── packages/
│   ├── db/                  # Prisma schema y cliente
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── index.ts
│   │       └── seed.ts
│   └── shared/              # Tipos y validaciones compartidas
│       └── src/
│           ├── schemas/     # Zod schemas
│           ├── types.ts
│           └── constants.ts
├── src/                     # Core components & utilities
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── lightswind.css
└── package.json             # Workspace root
```

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/progressia.git
cd progressia
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp apps/web/.env.example apps/web/.env
```

Edita `apps/web/.env`:

```env
# Database
DATABASE_URL="postgresql://usuario:password@localhost:5432/progressia"

# Auth
JWT_SECRET="tu-jwt-secret-seguro"

# Stripe (opcional para desarrollo)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Configurar la base de datos

```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:push

# Poblar con datos iniciales
npm run db:seed
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📖 API Endpoints

### Auth
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/verify-email` - Verificar email
- `GET /api/me` - Obtener usuario actual

### Learning
- `GET /api/levels` - Obtener niveles con progreso
- `GET /api/units/:id` - Obtener unidad con lecciones
- `GET /api/lessons/:id` - Obtener lección completa
- `POST /api/lessons/:id/complete` - Marcar lección como completada
- `POST /api/quizzes/:lessonId/submit` - Enviar respuestas del quiz

### Gamification
- `GET /api/progress` - Obtener progreso del usuario
- `GET /api/leaderboard` - Obtener ranking
- `POST /api/daily-goal` - Configurar meta diaria

### Social
- `GET /api/users/search` - Buscar usuarios
- `POST /api/friends/request` - Enviar solicitud de amistad
- `POST /api/friends/accept` - Aceptar solicitud
- `POST /api/friends/reject` - Rechazar solicitud
- `GET /api/friends` - Obtener lista de amigos

### Challenges
- `POST /api/challenges` - Crear reto
- `GET /api/challenges` - Obtener retos activos
- `POST /api/challenges/:id/join` - Unirse a reto
- `POST /api/challenges/:id/leave` - Abandonar reto

### Billing
- `POST /api/billing/create-checkout-session` - Crear sesión de pago
- `POST /api/billing/webhook` - Webhook de Stripe

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests con cobertura
npm run test:coverage
```

## 🔒 Seguridad

- Contraseñas hasheadas con PBKDF2 (compatible con Edge runtime)
- Rate limiting en endpoints críticos
- Validación de entrada con Zod
- Sessions seguras con JWT
- Protección contra brute force

## ⚠️ Disclaimer

Progressia es una plataforma educativa. El contenido proporcionado es únicamente con fines informativos y educativos. **NO constituye asesoría financiera, de inversión o de trading.** Operar en mercados financieros conlleva riesgos significativos y puede resultar en la pérdida de capital. Consulta siempre con un asesor financiero profesional antes de tomar decisiones de inversión.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE)

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---

Hecho con ❤️ para la comunidad de traders hispanohablantes.

