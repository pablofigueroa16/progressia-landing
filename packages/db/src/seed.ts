import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n')

  // ==================== BADGES ====================
  console.log('📛 Creando insignias...')
  const badges = [
    { code: 'ROOKIE', name: 'Novato', description: 'Completaste tu primera lección', imageUrl: '/badges/rookie.svg' },
    { code: 'FIRST_UNIT', name: 'Primera Unidad', description: 'Completaste tu primera unidad', imageUrl: '/badges/first-unit.svg' },
    { code: 'STREAK_7', name: 'Racha de 7 días', description: 'Mantuviste una racha de 7 días consecutivos', imageUrl: '/badges/streak-7.svg' },
    { code: 'STREAK_30', name: 'Racha de 30 días', description: 'Mantuviste una racha de 30 días consecutivos', imageUrl: '/badges/streak-30.svg' },
    { code: 'QUIZ_MASTER', name: 'Maestro de Quizzes', description: 'Completaste 10 quizzes perfectos', imageUrl: '/badges/quiz-master.svg' },
    { code: 'CONSISTENCY', name: 'Consistente', description: 'Completaste 10 días en un período de 14', imageUrl: '/badges/consistency.svg' },
    { code: 'TEAM_PLAYER', name: 'Jugador de Equipo', description: 'Participaste y completaste un reto grupal', imageUrl: '/badges/team-player.svg' },
    { code: 'FIRST_LEVEL', name: 'Nivel Completado', description: 'Completaste tu primer nivel', imageUrl: '/badges/first-level.svg' },
  ]

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: badge,
      create: badge,
    })
  }
  console.log(`   ✅ ${badges.length} insignias creadas\n`)

  // ==================== LEVEL 1 ====================
  console.log('📚 Creando Nivel 1: Fundamentos del Trading...')
  
  const level1 = await prisma.level.upsert({
    where: { number: 1 },
    update: {},
    create: {
      number: 1,
      title: 'Fundamentos del Trading',
      description: 'Conceptos básicos que todo trader debe conocer antes de operar',
      imageUrl: '/levels/level-1.svg',
      xpRequired: 0,
      isPublished: true,
      isPro: false,
      order: 1,
    },
  })

  // Unidad 1.1
  const unit1_1 = await prisma.unit.upsert({
    where: { levelId_number: { levelId: level1.id, number: 1 } },
    update: {},
    create: {
      levelId: level1.id,
      number: 1,
      title: 'Introducción al Trading',
      description: '¿Qué es el trading y cómo funciona el mercado?',
      isPublished: true,
      order: 1,
    },
  })

  // Lecciones Unidad 1.1
  const lessons1_1 = [
    {
      number: 1,
      title: '¿Qué es el Trading?',
      description: 'Comprende los fundamentos del trading financiero',
      content: `
# ¿Qué es el Trading?

El **trading** es la actividad de comprar y vender activos financieros con el objetivo de obtener beneficios de las fluctuaciones en sus precios.

## Conceptos Clave

### Activos Financieros
Los activos que puedes tradear incluyen:
- **Acciones**: Participaciones en empresas (Apple, Tesla, Amazon)
- **Forex**: Pares de divisas (EUR/USD, GBP/JPY)
- **Criptomonedas**: Bitcoin, Ethereum, etc.
- **Commodities**: Oro, petróleo, plata
- **Índices**: S&P 500, NASDAQ, DAX

### ¿Cómo se Gana Dinero?

La idea es simple: **comprar barato y vender caro** (o viceversa).

> 💡 Ejemplo: Compras una acción a $100 y la vendes cuando sube a $120. Tu ganancia es de $20 por acción (20%).

### Trading vs. Inversión

| Trading | Inversión |
|---------|-----------|
| Corto plazo (minutos a meses) | Largo plazo (años) |
| Más operaciones | Menos operaciones |
| Mayor riesgo | Menor riesgo |
| Requiere más tiempo | Más pasivo |

## ¿Es el Trading para Ti?

El trading requiere:
- ✅ Disciplina
- ✅ Control emocional
- ✅ Tiempo para aprender
- ✅ Capital que puedas permitirte perder

⚠️ **Advertencia**: El trading conlleva riesgos significativos. Nunca inviertas dinero que no puedas permitirte perder.
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 2,
      title: 'Tipos de Mercados',
      description: 'Conoce los diferentes mercados donde puedes operar',
      content: `
# Tipos de Mercados Financieros

Existen varios mercados donde puedes hacer trading. Cada uno tiene características únicas.

## 1. Mercado de Acciones (Bolsa)

El mercado más conocido. Aquí compras y vendes participaciones en empresas.

**Características:**
- Horario limitado (9:30 - 16:00 en NYSE)
- Regulado por entidades gubernamentales
- Miles de empresas disponibles

**Ejemplos de bolsas:**
- NYSE (Nueva York)
- NASDAQ (Tecnología)
- BMV (México)

## 2. Mercado Forex

El mercado de divisas es el más grande del mundo, con más de $6 trillones de volumen diario.

**Características:**
- Abierto 24/5 (lunes a viernes)
- Alta liquidez
- Apalancamiento disponible

**Pares populares:**
- EUR/USD (Euro vs Dólar)
- GBP/USD (Libra vs Dólar)
- USD/JPY (Dólar vs Yen)

## 3. Mercado de Criptomonedas

El mercado más nuevo y volátil.

**Características:**
- Abierto 24/7
- Alta volatilidad
- Sin regulación tradicional

## 4. Mercado de Commodities

Materias primas como oro, petróleo, plata.

**Características:**
- Influenciado por factores geopolíticos
- Útil para diversificación
- Incluye futuros y CFDs

## ¿Cuál Elegir?

Para principiantes, recomendamos empezar con **acciones** o **forex** en cuenta demo antes de arriesgar dinero real.
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 3,
      title: 'Participantes del Mercado',
      description: '¿Quiénes mueven los mercados?',
      content: `
# Participantes del Mercado

Entender quiénes participan en el mercado te ayudará a comprender por qué los precios se mueven.

## Tipos de Participantes

### 1. Traders Retail (Minoristas)
Somos nosotros: individuos que operan con su propio capital.

- Representan ~5-10% del volumen
- Operan a través de brokers
- Capital pequeño a mediano

### 2. Inversores Institucionales

Grandes fondos que mueven billones de dólares:

- **Fondos de inversión**: Blackrock, Vanguard
- **Fondos de pensiones**: CalPERS
- **Hedge funds**: Bridgewater, Citadel
- **Bancos de inversión**: Goldman Sachs, JP Morgan

> 💡 Los institucionales representan ~80% del volumen. Sus movimientos pueden mover mercados.

### 3. Market Makers

Proveedores de liquidez que siempre están dispuestos a comprar o vender.

- Ganan con el spread (diferencia entre compra y venta)
- Mantienen el mercado fluido
- Ejemplos: Citadel Securities, Virtu

### 4. Bancos Centrales

Influyen en los mercados a través de política monetaria:

- **Fed** (EE.UU.)
- **BCE** (Europa)
- **Banxico** (México)

Sus decisiones sobre tasas de interés mueven TODOS los mercados.

## ¿Por Qué Importa?

Entender a los participantes te ayuda a:
- Identificar tendencias institucionales
- Evitar operar contra "dinero inteligente"
- Entender los movimientos del mercado
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 4,
      title: 'Horarios de Trading',
      description: 'Cuándo están abiertos los mercados y las mejores horas para operar',
      content: `
# Horarios de Trading

Saber cuándo operar es tan importante como saber qué operar.

## Horarios por Mercado

### Forex (24/5)
El mercado forex opera 24 horas de lunes a viernes, dividido en sesiones:

| Sesión | Horario (GMT-6) | Características |
|--------|-----------------|-----------------|
| Sydney | 17:00 - 02:00 | Baja volatilidad |
| Tokio | 19:00 - 04:00 | Pares con JPY activos |
| Londres | 02:00 - 11:00 | Mayor volatilidad |
| Nueva York | 08:00 - 17:00 | Alta liquidez |

> 💡 **Mejor momento**: Cuando se solapan Londres y Nueva York (08:00 - 11:00 GMT-6)

### Acciones
Cada bolsa tiene su horario:

- **NYSE/NASDAQ**: 8:30 - 15:00 (hora México)
- **BMV**: 8:30 - 15:00
- **Europa**: 02:00 - 10:30

### Criptomonedas (24/7)
¡Nunca cierran! Pero hay momentos de mayor actividad:
- Mayor volumen cuando EE.UU. está despierto
- Fines de semana suelen tener menor liquidez

## Mejores Horas para Operar

### ✅ Mejores momentos:
- Apertura de mercados (primeros 30-60 min)
- Solapamiento de sesiones
- Anuncios económicos importantes

### ❌ Evitar:
- Fines de semana (crypto)
- Días festivos
- Antes de noticias importantes si no tienes experiencia

## Tu Zona Horaria

Como trader, debes ajustar estos horarios a tu zona. La mayoría de plataformas muestran la hora del servidor, ¡tenlo en cuenta!
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 5,
      title: 'Tu Primera Operación',
      description: 'Paso a paso para realizar tu primera operación',
      content: `
# Tu Primera Operación

Veamos los pasos para realizar una operación de trading.

## Paso 1: Elegir un Broker

El broker es el intermediario entre tú y el mercado.

**Criterios para elegir:**
- ✅ Regulado (SEC, FCA, CNBV)
- ✅ Spreads competitivos
- ✅ Plataforma fácil de usar
- ✅ Buenas reseñas

## Paso 2: Abrir una Cuenta Demo

**NUNCA** empieces con dinero real. Practica primero en demo.

> 🎯 Una cuenta demo usa dinero virtual pero mercado real. Perfecto para aprender.

## Paso 3: Analizar el Mercado

Antes de operar, debes:
1. Identificar la tendencia
2. Encontrar niveles de soporte/resistencia
3. Definir tu entrada y salida

## Paso 4: Colocar la Orden

### Tipos de órdenes básicas:

**Orden de Mercado**
- Se ejecuta inmediatamente al precio actual
- Útil cuando quieres entrar YA

**Orden Límite**
- Se ejecuta solo si el precio llega a tu nivel
- Útil para obtener mejor precio

**Stop Loss**
- Cierra tu posición si el precio va en tu contra
- SIEMPRE usa stop loss

**Take Profit**
- Cierra tu posición cuando alcanzas tu objetivo
- Asegura tus ganancias

## Paso 5: Gestionar la Operación

Una vez dentro:
- No muevas tu stop loss para "darle más espacio"
- Respeta tu plan original
- Mantén la calma

## Ejemplo Práctico

1. Analizas EUR/USD y crees que subirá
2. Precio actual: 1.0800
3. Colocas: Compra a 1.0800, Stop Loss a 1.0750, Take Profit a 1.0900
4. Riesgo: 50 pips, Recompensa: 100 pips (ratio 1:2)

¡Felicidades! Acabas de aprender lo básico. Ahora practica en demo.
`,
      xpReward: 10,
      duration: 5,
    },
  ]

  for (const lessonData of lessons1_1) {
    const lesson = await prisma.lesson.upsert({
      where: { unitId_number: { unitId: unit1_1.id, number: lessonData.number } },
      update: lessonData,
      create: { ...lessonData, unitId: unit1_1.id, isPublished: true },
    })

    // Create quiz questions for each lesson
    await createQuizQuestions(lesson.id, lessonData.number)
  }

  // Unidad 1.2
  const unit1_2 = await prisma.unit.upsert({
    where: { levelId_number: { levelId: level1.id, number: 2 } },
    update: {},
    create: {
      levelId: level1.id,
      number: 2,
      title: 'Análisis de Gráficos',
      description: 'Aprende a leer e interpretar gráficos de precios',
      isPublished: true,
      order: 2,
    },
  })

  const lessons1_2 = [
    {
      number: 1,
      title: 'Tipos de Gráficos',
      description: 'Los diferentes tipos de gráficos que usarás',
      content: `
# Tipos de Gráficos

Los gráficos son la herramienta fundamental del trader. Veamos los tipos principales.

## 1. Gráfico de Líneas

El más simple: una línea que conecta los precios de cierre.

**Ventajas:**
- Fácil de leer
- Muestra la tendencia general
- Ideal para principiantes

**Desventajas:**
- Poca información
- No muestra máximos/mínimos del período

## 2. Gráfico de Barras (OHLC)

Cada barra muestra 4 datos:
- **O**pen (Apertura)
- **H**igh (Máximo)
- **L**ow (Mínimo)
- **C**lose (Cierre)

## 3. Gráfico de Velas Japonesas

El más popular y el que usaremos principalmente.

Cada vela muestra:
- Cuerpo: diferencia entre apertura y cierre
- Mechas: máximo y mínimo
- Color: verde (subió), rojo (bajó)

> 💡 Las velas japonesas son el estándar de la industria porque ofrecen la mayor cantidad de información visual.

## Temporalidades

Los gráficos pueden mostrarse en diferentes períodos:

| Temporalidad | Uso |
|--------------|-----|
| 1 minuto (M1) | Scalping |
| 5 minutos (M5) | Day trading |
| 1 hora (H1) | Swing trading |
| Diario (D1) | Position trading |
| Semanal (W1) | Inversión |

## ¿Cuál Usar?

Para empezar, recomendamos:
- **Velas japonesas** (más información)
- **Temporalidad H1 o H4** (menos ruido)
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 2,
      title: 'Velas Japonesas',
      description: 'Domina el arte de leer velas japonesas',
      content: `
# Velas Japonesas: El Lenguaje del Precio

Las velas japonesas son una de las herramientas más importantes del análisis técnico.

## Anatomía de una Vela

Cada vela tiene dos componentes:

1. **Cuerpo**: La parte rectangular
   - Muestra apertura y cierre
   - Verde/blanco = alcista (subió)
   - Rojo/negro = bajista (bajó)

2. **Mechas/Sombras**: Las líneas
   - Superior: máximo del período
   - Inferior: mínimo del período

## Patrones de Vela Individual

### Velas Alcistas Fuertes
- Cuerpo grande verde
- Mechas pequeñas
- Indica fuerte presión compradora

### Velas Bajistas Fuertes
- Cuerpo grande rojo
- Mechas pequeñas
- Indica fuerte presión vendedora

### Doji
- Cuerpo muy pequeño (apertura ≈ cierre)
- Indica indecisión
- Posible cambio de tendencia

### Martillo
- Cuerpo pequeño arriba
- Mecha inferior larga
- Señal alcista después de caída

### Estrella Fugaz
- Cuerpo pequeño abajo
- Mecha superior larga
- Señal bajista después de subida

## Interpretación

> 🎯 Las velas nos cuentan una historia: quién ganó la batalla entre compradores y vendedores en ese período.

Una vela verde con mecha inferior larga nos dice:
"Los vendedores intentaron bajar el precio, pero los compradores fueron más fuertes y lo subieron."

## Práctica

Observa los gráficos y trata de "leer" la historia de cada vela antes de pasar a la siguiente.
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 3,
      title: 'Tendencias',
      description: 'Identifica la dirección del mercado',
      content: `
# Tendencias del Mercado

"La tendencia es tu amiga" es una de las reglas más importantes del trading.

## ¿Qué es una Tendencia?

Una tendencia es la dirección general en la que se mueve el precio.

## Tipos de Tendencia

### 1. Tendencia Alcista (Bullish)
- Máximos más altos
- Mínimos más altos
- El precio sube en general

### 2. Tendencia Bajista (Bearish)
- Máximos más bajos
- Mínimos más bajos
- El precio baja en general

### 3. Rango/Lateral
- Sin dirección clara
- El precio oscila entre niveles
- Evitar operar aquí si eres principiante

## Cómo Identificar Tendencias

### Método Visual
Simplemente observa:
- ¿Los picos son cada vez más altos?
- ¿Los valles son cada vez más altos?
→ Tendencia alcista

### Líneas de Tendencia
Dibuja una línea conectando:
- Mínimos sucesivos (alcista)
- Máximos sucesivos (bajista)

### Medias Móviles
- Precio sobre la media = alcista
- Precio bajo la media = bajista

## Regla de Oro

> 💡 Opera a favor de la tendencia, nunca en contra.

Si la tendencia es alcista → busca compras
Si la tendencia es bajista → busca ventas

## Cambios de Tendencia

Las tendencias no duran para siempre. Señales de cambio:
- Rotura de línea de tendencia
- Máximos/mínimos que fallan
- Patrones de reversión
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 4,
      title: 'Soportes y Resistencias',
      description: 'Los niveles clave que todo trader debe conocer',
      content: `
# Soportes y Resistencias

Los niveles de soporte y resistencia son fundamentales para cualquier estrategia de trading.

## ¿Qué es un Soporte?

Un **soporte** es un nivel de precio donde la demanda es lo suficientemente fuerte para detener la caída.

- El precio "rebota" al llegar
- Los compradores entran con fuerza
- Actúa como un "piso"

## ¿Qué es una Resistencia?

Una **resistencia** es un nivel donde la oferta es lo suficientemente fuerte para detener la subida.

- El precio "rebota" hacia abajo
- Los vendedores entran con fuerza
- Actúa como un "techo"

## Cómo Identificarlos

### Busca:
1. **Zonas con múltiples toques**: Cuantas más veces el precio respete un nivel, más fuerte es
2. **Números redondos**: $100, $50, 1.0000 en forex
3. **Máximos/mínimos anteriores**: Niveles históricos importantes

## Principio Clave

> 🔄 Cuando un soporte se rompe, se convierte en resistencia (y viceversa)

Este principio es muy poderoso para identificar entradas.

## Cómo Operar con S/R

### En Soporte:
- Busca señales de compra
- Coloca stop loss debajo del soporte

### En Resistencia:
- Busca señales de venta
- Coloca stop loss encima de la resistencia

### En Rotura:
- Espera confirmación (cierre de vela)
- Opera en dirección de la rotura

## Errores Comunes

❌ Trazar demasiados niveles
❌ Usar líneas exactas en vez de zonas
❌ Ignorar el contexto (tendencia)

Enfócate solo en los niveles más claros y respetados.
`,
      xpReward: 10,
      duration: 5,
    },
    {
      number: 5,
      title: 'Patrones Básicos',
      description: 'Patrones de precio que señalan oportunidades',
      content: `
# Patrones de Precio Básicos

Los patrones son formaciones que se repiten y pueden predecir movimientos futuros.

## Patrones de Continuación

Indican que la tendencia continuará.

### Bandera
- Pequeña consolidación contra la tendencia
- Rompe en dirección de la tendencia original
- Muy común y fiable

### Triángulo
- El precio se comprime
- Rompe con fuerza
- Puede ser alcista o bajista

## Patrones de Reversión

Indican posible cambio de tendencia.

### Doble Techo
- Dos máximos al mismo nivel
- Indica debilidad compradora
- Señal bajista

### Doble Suelo
- Dos mínimos al mismo nivel
- Indica debilidad vendedora
- Señal alcista

### Hombro-Cabeza-Hombro
- Tres picos: medio más alto
- Patrón de reversión clásico
- Muy fiable cuando se confirma

## Patrones de Velas (Múltiples)

### Envolvente Alcista
- Vela verde que "envuelve" la roja anterior
- Señal de reversión alcista

### Envolvente Bajista
- Vela roja que "envuelve" la verde anterior
- Señal de reversión bajista

### Estrella de la Mañana
- Tres velas: roja, doji, verde
- Señal alcista fuerte

## Cómo Operar Patrones

1. **Identifica** el patrón claramente
2. **Espera** confirmación (rotura de nivel clave)
3. **Entra** con stop loss definido
4. **Objetivo**: mide el tamaño del patrón

> ⚠️ No todos los patrones funcionan. Usa siempre stop loss y gestión de riesgo.

¡Felicidades! Has completado la Unidad de Análisis de Gráficos.
`,
      xpReward: 10,
      duration: 5,
    },
  ]

  for (const lessonData of lessons1_2) {
    const lesson = await prisma.lesson.upsert({
      where: { unitId_number: { unitId: unit1_2.id, number: lessonData.number } },
      update: lessonData,
      create: { ...lessonData, unitId: unit1_2.id, isPublished: true },
    })

    await createQuizQuestions(lesson.id, lessonData.number + 5)
  }

  console.log(`   ✅ Nivel 1 creado con 2 unidades y 10 lecciones\n`)

  // ==================== LEVEL 2 ====================
  console.log('📚 Creando Nivel 2: Análisis Técnico...')
  
  const level2 = await prisma.level.upsert({
    where: { number: 2 },
    update: {},
    create: {
      number: 2,
      title: 'Análisis Técnico',
      description: 'Herramientas avanzadas para analizar el mercado',
      imageUrl: '/levels/level-2.svg',
      xpRequired: 200,
      isPublished: true,
      isPro: false,
      order: 2,
    },
  })

  // Create placeholder units for Level 2
  await prisma.unit.upsert({
    where: { levelId_number: { levelId: level2.id, number: 1 } },
    update: {},
    create: {
      levelId: level2.id,
      number: 1,
      title: 'Indicadores Técnicos',
      description: 'RSI, MACD, Medias Móviles y más',
      isPublished: true,
      order: 1,
    },
  })

  await prisma.unit.upsert({
    where: { levelId_number: { levelId: level2.id, number: 2 } },
    update: {},
    create: {
      levelId: level2.id,
      number: 2,
      title: 'Fibonacci y Ondas',
      description: 'Retrocesos de Fibonacci y teoría de Elliott',
      isPublished: true,
      order: 2,
    },
  })

  console.log(`   ✅ Nivel 2 creado (contenido placeholder)\n`)

  // ==================== LEVELS 3-5 (PRO) ====================
  console.log('📚 Creando Niveles 3-5 (Pro)...')
  
  const proLevels = [
    { number: 3, title: 'Gestión de Riesgo', description: 'Protege tu capital como un profesional' },
    { number: 4, title: 'Psicología del Trading', description: 'Domina tus emociones para operar mejor' },
    { number: 5, title: 'Estrategias Avanzadas', description: 'Sistemas de trading probados' },
  ]

  for (const levelData of proLevels) {
    await prisma.level.upsert({
      where: { number: levelData.number },
      update: {},
      create: {
        ...levelData,
        imageUrl: `/levels/level-${levelData.number}.svg`,
        xpRequired: levelData.number * 200,
        isPublished: true,
        isPro: true,
        order: levelData.number,
      },
    })
  }

  console.log(`   ✅ Niveles Pro creados (coming soon)\n`)

  // ==================== DEMO USER ====================
  console.log('👤 Creando usuario de demostración...')
  
  // Note: In a real app, you'd hash the password properly
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@tradex.academy' },
    update: {},
    create: {
      email: 'demo@tradex.academy',
      passwordHash: 'demo-hash-not-for-production',
      emailVerified: true,
      role: 'USER',
      profile: {
        create: {
          displayName: 'Trader Demo',
          username: 'traderdemo',
          country: 'MX',
          timezone: 'America/Mexico_City',
          experience: 'BEGINNER',
          objective: 'LEARN',
          bio: '¡Hola! Soy un usuario de demostración.',
          dailyGoal: 10,
        },
      },
      streak: {
        create: {
          currentStreak: 7,
          longestStreak: 14,
          lastActiveAt: new Date(),
        },
      },
      subscription: {
        create: {
          plan: 'FREE',
          status: 'ACTIVE',
        },
      },
    },
  })

  console.log(`   ✅ Usuario demo creado: demo@tradex.academy\n`)

  console.log('✨ ¡Seed completado exitosamente!\n')
}

async function createQuizQuestions(lessonId: string, lessonNumber: number) {
  const quizData: Record<number, any[]> = {
    1: [ // ¿Qué es el Trading?
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Cuál es el objetivo principal del trading?',
        options: ['Ahorrar dinero en un banco', 'Obtener beneficios de las fluctuaciones de precios', 'Coleccionar acciones', 'Evitar pagar impuestos'],
        correctAnswer: 1,
        explanation: 'El trading busca obtener beneficios comprando y vendiendo activos aprovechando los cambios en sus precios.',
      },
      {
        type: 'TRUE_FALSE',
        question: 'El trading es lo mismo que la inversión a largo plazo.',
        correctAnswer: false,
        explanation: 'El trading es a corto plazo con más operaciones, mientras que la inversión es a largo plazo y más pasiva.',
      },
    ],
    2: [ // Tipos de Mercados
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Cuál es el mercado más grande del mundo por volumen?',
        options: ['Mercado de acciones', 'Mercado Forex', 'Mercado de criptomonedas', 'Mercado de commodities'],
        correctAnswer: 1,
        explanation: 'El mercado Forex mueve más de $6 trillones diarios, siendo el más grande del mundo.',
      },
      {
        type: 'TRUE_FALSE',
        question: 'El mercado de criptomonedas cierra los fines de semana.',
        correctAnswer: false,
        explanation: 'El mercado de criptomonedas opera 24/7, nunca cierra.',
      },
    ],
    3: [ // Participantes del Mercado
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Qué porcentaje del volumen del mercado representan aproximadamente los inversores institucionales?',
        options: ['10%', '30%', '50%', '80%'],
        correctAnswer: 3,
        explanation: 'Los inversores institucionales representan aproximadamente el 80% del volumen del mercado.',
      },
    ],
    4: [ // Horarios de Trading
      {
        type: 'BEST_DECISION',
        question: '¿Cuál es el mejor momento para operar en Forex si buscas alta volatilidad?',
        options: ['Durante la sesión de Sydney', 'Cuando se solapan Londres y Nueva York', 'Los fines de semana', 'Durante la noche (hora local)'],
        correctAnswer: 1,
        explanation: 'El solapamiento entre Londres y Nueva York ofrece la mayor liquidez y volatilidad.',
      },
    ],
    5: [ // Tu Primera Operación
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Qué tipo de orden se ejecuta inmediatamente al precio actual?',
        options: ['Orden límite', 'Orden de mercado', 'Stop loss', 'Take profit'],
        correctAnswer: 1,
        explanation: 'Una orden de mercado se ejecuta inmediatamente al mejor precio disponible.',
      },
      {
        type: 'TRUE_FALSE',
        question: 'Es recomendable empezar a operar directamente con dinero real sin practicar en cuenta demo.',
        correctAnswer: false,
        explanation: 'Siempre debes practicar primero en cuenta demo antes de arriesgar dinero real.',
      },
    ],
    6: [ // Tipos de Gráficos
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Qué tipo de gráfico es el más utilizado por los traders profesionales?',
        options: ['Gráfico de líneas', 'Gráfico de barras', 'Velas japonesas', 'Gráfico de puntos'],
        correctAnswer: 2,
        explanation: 'Las velas japonesas son el estándar de la industria porque ofrecen la mayor cantidad de información visual.',
      },
    ],
    7: [ // Velas Japonesas
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Qué indica una vela Doji?',
        options: ['Fuerte tendencia alcista', 'Fuerte tendencia bajista', 'Indecisión en el mercado', 'Error en el gráfico'],
        correctAnswer: 2,
        explanation: 'Un Doji se forma cuando apertura y cierre son casi iguales, indicando indecisión.',
      },
      {
        type: 'TRUE_FALSE',
        question: 'Una vela verde indica que el precio cerró por debajo de donde abrió.',
        correctAnswer: false,
        explanation: 'Una vela verde indica que el precio cerró por ENCIMA de donde abrió (subió).',
      },
    ],
    8: [ // Tendencias
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Qué caracteriza a una tendencia alcista?',
        options: ['Máximos más bajos', 'Mínimos más bajos', 'Máximos y mínimos más altos', 'Precio estático'],
        correctAnswer: 2,
        explanation: 'Una tendencia alcista se caracteriza por máximos más altos y mínimos más altos.',
      },
    ],
    9: [ // Soportes y Resistencias
      {
        type: 'TRUE_FALSE',
        question: 'Cuando un soporte se rompe, se convierte en resistencia.',
        correctAnswer: true,
        explanation: 'Este es un principio fundamental: los niveles cambian de rol cuando se rompen.',
      },
    ],
    10: [ // Patrones Básicos
      {
        type: 'MULTIPLE_CHOICE',
        question: '¿Qué indica un patrón de Doble Techo?',
        options: ['Continuación alcista', 'Posible reversión bajista', 'Alta volatilidad', 'Bajo volumen'],
        correctAnswer: 1,
        explanation: 'El Doble Techo es un patrón de reversión bajista que indica debilidad compradora.',
      },
    ],
  }

  const questions = quizData[lessonNumber] || []
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    // Asegurar que siempre haya options (requerido por el schema)
    const options = q.options || (q.type === 'TRUE_FALSE' ? ['Verdadero', 'Falso'] : [])
    
    const questionData = {
      type: q.type,
      question: q.question,
      options: options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }
    
    await prisma.quizQuestion.upsert({
      where: {
        id: `quiz-${lessonId}-${i}`,
      },
      update: questionData,
      create: {
        id: `quiz-${lessonId}-${i}`,
        lessonId,
        ...questionData,
        order: i,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

