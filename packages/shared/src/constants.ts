// Constantes de la aplicación

export const APP_NAME = 'TradeX Academy'
export const APP_DESCRIPTION = 'Aprende trading de forma gamificada'

export const TIMEZONES = [
  { value: 'America/Mexico_City', label: 'Ciudad de México (GMT-6)' },
  { value: 'America/Bogota', label: 'Bogotá (GMT-5)' },
  { value: 'America/Lima', label: 'Lima (GMT-5)' },
  { value: 'America/Santiago', label: 'Santiago (GMT-4)' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
  { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
  { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
  { value: 'America/New_York', label: 'Nueva York (GMT-5)' },
  { value: 'America/Los_Angeles', label: 'Los Ángeles (GMT-8)' },
] as const

export const COUNTRIES = [
  { code: 'MX', name: 'México' },
  { code: 'CO', name: 'Colombia' },
  { code: 'AR', name: 'Argentina' },
  { code: 'PE', name: 'Perú' },
  { code: 'CL', name: 'Chile' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'ES', name: 'España' },
  { code: 'US', name: 'Estados Unidos' },
  { code: 'BR', name: 'Brasil' },
] as const

export const AVATAR_PRESETS = [
  'default',
  'trader-bull',
  'trader-bear',
  'crypto-whale',
  'diamond-hands',
  'chart-master',
  'rocket',
  'moon',
] as const

export const DAILY_GOALS = [
  { value: 5, label: '5 min', description: 'Casual' },
  { value: 10, label: '10 min', description: 'Regular' },
  { value: 15, label: '15 min', description: 'Intensivo' },
] as const

export const EXPERIENCE_LEVELS = [
  { value: 'BEGINNER', label: 'Principiante', description: 'Nuevo en el mundo del trading' },
  { value: 'INTERMEDIATE', label: 'Intermedio', description: 'Conozco los conceptos básicos' },
  { value: 'PRO', label: 'Avanzado', description: 'Tengo experiencia operando' },
] as const

export const OBJECTIVES = [
  { value: 'LEARN', label: 'Aprender', description: 'Quiero entender cómo funciona el trading' },
  { value: 'OPERATE', label: 'Operar', description: 'Quiero aprender a hacer trading activo' },
  { value: 'COPY', label: 'Copy Trading', description: 'Quiero copiar a traders exitosos' },
] as const

export const BADGES = {
  ROOKIE: {
    code: 'ROOKIE',
    name: 'Novato',
    description: 'Completaste tu primera lección',
  },
  FIRST_UNIT: {
    code: 'FIRST_UNIT',
    name: 'Primera Unidad',
    description: 'Completaste tu primera unidad',
  },
  STREAK_7: {
    code: 'STREAK_7',
    name: 'Racha de 7 días',
    description: 'Mantuviste una racha de 7 días consecutivos',
  },
  STREAK_30: {
    code: 'STREAK_30',
    name: 'Racha de 30 días',
    description: 'Mantuviste una racha de 30 días consecutivos',
  },
  QUIZ_MASTER: {
    code: 'QUIZ_MASTER',
    name: 'Maestro de Quizzes',
    description: 'Completaste 10 quizzes perfectos',
  },
  CONSISTENCY: {
    code: 'CONSISTENCY',
    name: 'Consistente',
    description: 'Completaste 10 días en un período de 14',
  },
  TEAM_PLAYER: {
    code: 'TEAM_PLAYER',
    name: 'Jugador de Equipo',
    description: 'Participaste y completaste un reto grupal',
  },
  FIRST_LEVEL: {
    code: 'FIRST_LEVEL',
    name: 'Nivel Completado',
    description: 'Completaste tu primer nivel',
  },
} as const

export const RISK_DISCLAIMER = `
⚠️ AVISO IMPORTANTE: TradeX Academy es una plataforma educativa. 
El contenido proporcionado es únicamente con fines informativos y educativos. 
NO constituye asesoría financiera, de inversión o de trading. 
Operar en mercados financieros conlleva riesgos significativos y puede resultar en la pérdida de capital. 
Consulta siempre con un asesor financiero profesional antes de tomar decisiones de inversión.
`

export const RATE_LIMITS = {
  LOGIN: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 intentos cada 15 min
  REGISTER: { requests: 3, windowMs: 60 * 60 * 1000 }, // 3 registros por hora
  API: { requests: 100, windowMs: 60 * 1000 }, // 100 requests por minuto
  FRIEND_REQUEST: { requests: 10, windowMs: 60 * 60 * 1000 }, // 10 solicitudes por hora
} as const

