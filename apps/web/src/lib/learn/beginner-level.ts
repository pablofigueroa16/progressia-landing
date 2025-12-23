export type MultipleChoiceQuestion = {
  id: string
  question: string
  options: string[]
  /** índice en `options` */
  correctAnswer: number
  explanation?: string
}

export type BeginnerLesson = {
  /** usado en la ruta `/learn/lesson/[id]` */
  id: string
  /** etiqueta visual, ej: "1.1" */
  sublevel: string
  title: string
  content: string
  quiz: MultipleChoiceQuestion[]
  xpReward: number
  quizXP: number
  perfectBonus: number
}

export type BeginnerLevel = {
  id: 'beginner'
  label: string
  objective: string
  lessons: BeginnerLesson[]
}

export const BEGINNER_LEVEL: BeginnerLevel = {
  id: 'beginner',
  label: '✅ NIVEL: PRINCIPIANTE (ESTUDIANTE)',
  objective:
    'Aprender los fundamentos del trading, los mercados, las velas, los gráficos, la psicología y la gestión del riesgo.',
  lessons: [
    {
      id: '1-1',
      sublevel: '1.1',
      title: 'Introducción al Trading',
      content: `
# Subnivel 1.1: Introducción al Trading

Responde este quiz para reforzar los conceptos base antes de avanzar.
      `.trim(),
      quiz: [
        {
          id: 'b-1-1-q1',
          question: '¿Qué es el trading?',
          options: [
            'Jugar con dinero',
            'Comprar y vender activos para obtener beneficio',
            'Guardar dinero en el banco',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-1-q2',
          question: '¿Quién es un trader?',
          options: [
            'Un banquero',
            'Un jugador profesional',
            'Una persona que opera en mercados financieros',
          ],
          correctAnswer: 2,
        },
        {
          id: 'b-1-1-q3',
          question: '¿El trading garantiza ganancias?',
          options: ['Sí, si estudias', 'No', 'Solo para expertos'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-1-q4',
          question: '¿Qué se necesita para operar con éxito?',
          options: ['Emoción', 'Disciplina y conocimiento', 'Instinto'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-1-q5',
          question: '¿Qué mercado abre 24/5 y mueve billones al día?',
          options: ['Acciones', 'Forex', 'Cripto'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-1-q6',
          question: '¿Qué significa “apalancamiento”?',
          options: [
            'Aumentar tu exposición con menos dinero',
            'Ganancia fija',
            'Préstamo de emergencia',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-1-q7',
          question: '¿Qué es el objetivo principal de un principiante?',
          options: ['Ganar rápido', 'Sobrevivir y aprender', 'Copiar señales'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-1-q8',
          question: '¿Cuándo debes empezar a operar en real?',
          options: [
            'Después de practicar y tener plan',
            'Inmediatamente',
            'Cuando alguien te diga',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-1-q9',
          question: '¿Cuál de estos es un error común?',
          options: ['Aprender antes de operar', 'Overtrading', 'Tener estrategia'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-1-q10',
          question: '¿Cuál es la mejor actitud ante el mercado?',
          options: ['Adivinar', 'Seguir el plan', 'Operar con corazonadas'],
          correctAnswer: 1,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-2',
      sublevel: '1.2',
      title: 'Tipos de Mercados y Activos',
      content: `
# Subnivel 1.2: Tipos de Mercados y Activos

Identifica qué se opera en cada mercado y los conceptos esenciales.
      `.trim(),
      quiz: [
        {
          id: 'b-1-2-q11',
          question: '¿Qué se opera en Forex?',
          options: ['Empresas', 'Pares de divisas', 'Acciones'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-2-q12',
          question: '¿Qué es un par de divisas?',
          options: ['Dos monedas operadas juntas', 'Una acción', 'Un índice'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-2-q13',
          question: '¿Qué representa EUR/USD?',
          options: ['Euro contra Dólar', 'Bitcoin', 'Dólar contra oro'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-2-q14',
          question: '¿Cuál es el activo refugio más tradicional?',
          options: ['Oro', 'Cripto', 'Petróleo'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-2-q15',
          question: '¿Qué mercado es más volátil?',
          options: ['Forex', 'Acciones', 'Criptomonedas'],
          correctAnswer: 2,
        },
        {
          id: 'b-1-2-q16',
          question: '¿Qué activo representa el índice SP500?',
          options: [
            '500 acciones líderes de EE.UU',
            '50 empresas de Europa',
            '100 bancos',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-2-q17',
          question: '¿Cuál de estos es un commodity?',
          options: ['EUR/USD', 'Oro', 'Netflix'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-2-q18',
          question: '¿Qué hace un broker?',
          options: ['Ofrece cursos', 'Intermedia entre tú y el mercado', 'Opera por ti'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-2-q19',
          question: '¿Qué es un spread?',
          options: [
            'Diferencia entre precio de compra y venta',
            'Tipo de gráfico',
            'Comisión fija',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-2-q20',
          question:
            '¿Puedes operar con cuentas demo antes de arriesgar dinero real?',
          options: ['No', 'Solo si pagas', 'Sí'],
          correctAnswer: 2,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-3',
      sublevel: '1.3',
      title: 'Velas Japonesas',
      content: `
# Subnivel 1.3: Velas Japonesas

Aprende a leer una vela: apertura, cierre, máximo, mínimo y patrones básicos.
      `.trim(),
      quiz: [
        {
          id: 'b-1-3-q21',
          question: '¿Qué muestra una vela japonesa?',
          options: [
            'Solo dirección del precio',
            'Precio de apertura, cierre, máximo y mínimo',
            'Nombre del activo',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-3-q22',
          question: '¿Una vela verde indica?',
          options: ['Precio bajó', 'Precio subió', 'Precio lateral'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-3-q23',
          question: '¿Una vela roja indica?',
          options: ['Subida', 'Bajada', 'Noticias'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-3-q24',
          question: '¿Qué parte de la vela es la mecha?',
          options: ['Cuerpo', 'Extremos superior e inferior', 'Centro'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-3-q25',
          question: '¿Qué representa el cuerpo de la vela?',
          options: [
            'Emoción',
            'Movimiento neto entre apertura y cierre',
            'Spread',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-3-q26',
          question: '¿Qué es un doji?',
          options: ['Vela sin cuerpo', 'Vela muy grande', 'Error del gráfico'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-3-q27',
          question: '¿Qué representa una vela martillo?',
          options: ['Reversión alcista', 'Tendencia bajista', 'Consolidación'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-3-q28',
          question: '¿Qué significa una vela envolvente bajista?',
          options: ['Posible bajada', 'Compra segura', 'Velocidad de mercado'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-3-q29',
          question:
            '¿Qué vela aparece tras una caída con sombra larga inferior?',
          options: ['Martillo', 'Doji', 'Envolvente alcista'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-3-q30',
          question: '¿Cuál es la vela más representativa de indecisión?',
          options: ['Doji', 'Martillo', 'Pinbar'],
          correctAnswer: 0,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-4',
      sublevel: '1.4',
      title: 'Tipos de Gráfico',
      content: `
# Subnivel 1.4: Tipos de Gráfico

Aprende qué muestra cada tipo de gráfico y cómo elegir timeframe.
      `.trim(),
      quiz: [
        {
          id: 'b-1-4-q31',
          question: '¿Qué es un gráfico de líneas?',
          options: ['Solo muestra precios de cierre', 'Tiene velas', 'Muestra volumen'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-4-q32',
          question: '¿Qué muestra el gráfico de barras?',
          options: ['Precio, volumen y RSI', 'Apertura, cierre, máximo y mínimo', 'Solo color'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-4-q33',
          question: '¿Cuál es el gráfico más usado por traders?',
          options: ['Velas japonesas', 'Líneas', 'Mapas de calor'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-4-q34',
          question: '¿Qué timeframe es más usado para scalping?',
          options: ['4H', '1M', 'Diario'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-4-q35',
          question: '¿Cuál es la ventaja del gráfico de velas?',
          options: ['Muestra emociones del mercado', 'Solo color', 'Es más bonito'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-4-q36',
          question: '¿Qué es un “timeframe”?',
          options: ['Horario del mercado', 'Intervalo de tiempo por vela', 'Modo de pago'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-4-q37',
          question: '¿Qué timeframe muestra mejor la tendencia general?',
          options: ['Diario o semanal', '1 minuto', '5 segundos'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-4-q38',
          question:
            '¿El gráfico puede mostrar zonas de soporte y resistencia?',
          options: ['Sí', 'No', 'Solo con IA'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-4-q39',
          question: '¿Qué significa que el gráfico esté “plano”?',
          options: ['Tendencia fuerte', 'Rango', 'Ruptura inminente'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-4-q40',
          question: '¿Puedes cambiar de timeframe según tu estilo?',
          options: ['No', 'Sí', 'Solo en demo'],
          correctAnswer: 1,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-5',
      sublevel: '1.5',
      title: 'Glosario Esencial',
      content: `
# Subnivel 1.5: Glosario Esencial

Conceptos que debes dominar para leer y ejecutar un plan de trading.
      `.trim(),
      quiz: [
        {
          id: 'b-1-5-q41',
          question: '¿Qué es un pip?',
          options: ['Unidad mínima de movimiento de precio', 'Tipo de orden', 'Spread'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-5-q42',
          question: '¿Qué es el lotaje?',
          options: ['Tamaño de la operación', 'Comisiones', 'Capital mínimo'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-5-q43',
          question: '¿Qué es un Stop Loss?',
          options: ['Herramienta para limitar pérdida', 'Herramienta para ganar más', 'Tipo de gráfico'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-5-q44',
          question: '¿Qué es un Take Profit?',
          options: ['Límite de ganancia', 'Señal de entrada', 'Apalancamiento'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-5-q45',
          question: '¿Qué es apalancamiento?',
          options: ['Riesgo sin límites', 'Multiplicador de exposición', 'Comisión por entrada'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-5-q46',
          question: '¿Qué significa “backtesting”?',
          options: [
            'Analizar el pasado para validar estrategia',
            'Comprar en retroceso',
            'Perder trades antiguos',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-5-q47',
          question: '¿Qué es una tendencia?',
          options: ['Ruido de mercado', 'Movimiento sostenido en una dirección', 'Velas pequeñas'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-5-q48',
          question: '¿Qué es análisis técnico?',
          options: [
            'Analizar fundamentales',
            'Analizar gráficamente el comportamiento del precio',
            'Ver el sentimiento en redes',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-5-q49',
          question: '¿Qué es un indicador?',
          options: ['Herramienta visual para apoyar decisiones', 'Precio', 'Emoción'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-5-q50',
          question: '¿Qué es volatilidad?',
          options: ['Movimiento e intensidad de los precios', 'Volumen', 'Gráfico plano'],
          correctAnswer: 0,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-6',
      sublevel: '1.6',
      title: 'Psicología del Trading',
      content: `
# Subnivel 1.6: Psicología del Trading

Entiende las emociones y hábitos que separan a un principiante de un profesional.
      `.trim(),
      quiz: [
        {
          id: 'b-1-6-q51',
          question: '¿Qué es la aversión a la pérdida?',
          options: [
            'Preferencia por asumir riesgo',
            'Reacción emocional ante perder dinero',
            'Control emocional',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q52',
          question: '¿Qué emoción lleva al sobreoperar (overtrading)?',
          options: ['Miedo', 'Codicia', 'Paciencia'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q53',
          question: '¿Qué es disciplina en trading?',
          options: [
            'Actuar con base en intuición',
            'Ejecutar tu plan sin emociones',
            'Esperar que otros te digan qué hacer',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q54',
          question: '¿Qué suele causar más errores?',
          options: ['Falta de señal', 'Emociones no gestionadas', 'Usar demo'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q55',
          question: '¿Qué es FOMO?',
          options: [
            'Análisis técnico',
            'Miedo a perderse una oportunidad',
            'Tipo de indicador',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q56',
          question: '¿Qué es resiliencia?',
          options: [
            'Cambiar de estrategia rápido',
            'Soportar pérdidas y seguir aprendiendo',
            'Hacer siempre lo mismo',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q57',
          question: '¿Cuál es una buena mentalidad para empezar?',
          options: [
            '“Hoy me hago rico”',
            '“Aprendo de cada operación”',
            '“Solo opero en demo siempre”',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q58',
          question: '¿Qué es el ego en el trading?',
          options: ['Un aliado', 'Lo que impide aceptar errores', 'Nombre de una estrategia'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q59',
          question: '¿Cuál de estas actitudes es más profesional?',
          options: [
            'Adivinar y correr riesgos',
            'Seguir reglas y aprender de errores',
            'Copiar señales sin entender',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-6-q60',
          question: '¿Qué es la paciencia en trading?',
          options: ['No operar nunca', 'Esperar el mejor setup', 'Operar sin presión'],
          correctAnswer: 1,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-7',
      sublevel: '1.7',
      title: 'Gestión de Riesgo',
      content: `
# Subnivel 1.7: Gestión de Riesgo

Tu prioridad es **sobrevivir**: controla cuánto puedes perder en cada operación.
      `.trim(),
      quiz: [
        {
          id: 'b-1-7-q61',
          question: '¿Qué es gestionar el riesgo?',
          options: ['Elegir brokers', 'Controlar cuánto puedes perder', 'Operar más veces'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q62',
          question: '¿Qué % de capital es recomendable arriesgar por operación?',
          options: ['10%', '1-2%', '25%'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q63',
          question: '¿Qué pasa si arriesgas mucho en cada trade?',
          options: ['Mayor control', 'Riesgo de quiebra', 'Más tiempo para aprender'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q64',
          question: '¿Qué ayuda a evitar grandes pérdidas?',
          options: ['Stop Loss', 'Apalancamiento', 'Lotaje grande'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-7-q65',
          question: '¿Qué significa R:R 1:2?',
          options: ['Pierdes 2, ganas 1', 'Riesgo 1, ganancia potencial 2', 'Ratio entre lotes'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q66',
          question: '¿Una estrategia con buena gestión de riesgo puede perder?',
          options: ['No', 'Sí, pero controladamente', 'Solo en demo'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q67',
          question: '¿Qué es drawdown?',
          options: [
            'Ganancia máxima',
            'Caída desde pico de capital hasta mínimo',
            'Spread fijo',
          ],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q68',
          question: '¿Qué debes hacer si una operación va mal?',
          options: ['Eliminar el stop', 'Seguir el plan y aceptar la pérdida', 'Doblar la posición'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q69',
          question: '¿Cómo afecta el apalancamiento al riesgo?',
          options: ['Lo disminuye', 'Lo aumenta', 'No cambia nada'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-7-q70',
          question: '¿Es buena práctica arriesgar todo en una sola operación?',
          options: ['Sí', 'No', 'Depende de la suerte'],
          correctAnswer: 1,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-8',
      sublevel: '1.8',
      title: 'Órdenes y Ejecución',
      content: `
# Subnivel 1.8: Tipos de órdenes y ejecución

Entiende cómo se ejecutan las órdenes y por qué SL/TP importan.
      `.trim(),
      quiz: [
        {
          id: 'b-1-8-q71',
          question: '¿Qué es una orden de mercado?',
          options: [
            'Orden ejecutada al mejor precio disponible',
            'Orden pendiente',
            'Orden limitada a ganancias',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-8-q72',
          question: '¿Qué es una orden limitada (limit)?',
          options: ['Ejecuta al precio exacto o mejor', 'Siempre entra al mercado', 'Solo existe en demo'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-8-q73',
          question: '¿Qué es una orden stop?',
          options: [
            'Se activa cuando se toca un precio específico',
            'Siempre queda abierta',
            'Cierra el mercado',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-8-q74',
          question: '¿Qué es slippage?',
          options: [
            'Diferencia entre precio esperado y real de ejecución',
            'Spread fijo',
            'Nombre de vela',
          ],
          correctAnswer: 0,
        },
        {
          id: 'b-1-8-q75',
          question: '¿Qué significa “cerrar manualmente”?',
          options: ['Dejar la operación sin stop', 'Cerrar por decisión propia', 'Cerrar automáticamente con ganancias'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-8-q76',
          question: '¿Qué pasa si dejas una operación sin SL ni TP?',
          options: ['Ganas seguro', 'Riesgo ilimitado', 'El broker te protege'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-8-q77',
          question: '¿Qué es un break even?',
          options: ['Ganancia mínima', 'Punto sin pérdida ni ganancia', 'Apalancamiento fijo'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-8-q78',
          question: '¿Qué es trailing stop?',
          options: ['Stop que sigue al precio para asegurar ganancias', 'Orden oculta', 'Nueva tendencia'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-8-q79',
          question:
            '¿Qué tipo de orden usarías si quieres comprar solo si baja a cierto precio?',
          options: ['Orden limitada de compra', 'Orden de mercado', 'Stop loss'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-8-q80',
          question: '¿Cuál es la ventaja de tener SL y TP definidos?',
          options: ['Operar menos', 'Control de pérdidas y ganancias', 'Comisiones más bajas'],
          correctAnswer: 1,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-9',
      sublevel: '1.9',
      title: 'Estilos de Trading',
      content: `
# Subnivel 1.9: Estilos de Trading

Elige un estilo alineado a tu tiempo, personalidad y objetivos.
      `.trim(),
      quiz: [
        {
          id: 'b-1-9-q81',
          question: '¿Qué es scalping?',
          options: ['Operaciones rápidas en minutos', 'Operaciones mensuales', 'Inversión a largo plazo'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-9-q82',
          question: '¿Qué es day trading?',
          options: ['Operaciones que duran semanas', 'Operaciones que se abren y cierran el mismo día', 'Holding'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-9-q83',
          question: '¿Qué es swing trading?',
          options: ['Mantener posiciones varios días o semanas', 'Invertir a 10 años', 'Scalping avanzado'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-9-q84',
          question: '¿Qué tipo de trading requiere más tiempo en pantalla?',
          options: ['Swing', 'Scalping', 'Inversión'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-9-q85',
          question: '¿Qué estilo permite más análisis pausado?',
          options: ['Swing', 'Scalping', 'Intradía'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-9-q86',
          question: '¿Cuál es el ideal para aprender sin presión al inicio?',
          options: ['Scalping', 'Day trading', 'Swing trading'],
          correctAnswer: 2,
        },
        {
          id: 'b-1-9-q87',
          question: '¿Qué estilo se adapta a quienes trabajan todo el día?',
          options: ['Swing', 'Scalping', 'News trading'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-9-q88',
          question: '¿Cuál requiere más rapidez mental?',
          options: ['Inversión', 'Scalping', 'Position trading'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-9-q89',
          question: '¿Qué factor debe coincidir con el estilo?',
          options: ['Emociones', 'Capital disponible', 'Tu disponibilidad de tiempo'],
          correctAnswer: 2,
        },
        {
          id: 'b-1-9-q90',
          question: '¿Debes probar todos los estilos al inicio?',
          options: ['No, enfócate en uno', 'Sí, al mismo tiempo', 'Solo sigue señales'],
          correctAnswer: 0,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
    {
      id: '1-10',
      sublevel: '1.10',
      title: 'Errores Comunes',
      content: `
# Subnivel 1.10: Errores comunes

Reconoce los errores típicos para evitarlos desde el día 1.
      `.trim(),
      quiz: [
        {
          id: 'b-1-10-q91',
          question: '¿Qué es overtrading?',
          options: ['Operar demasiado sin plan', 'Mantener una operación ganadora', 'Backtesting'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-10-q92',
          question: '¿Qué pasa si operas sin estrategia?',
          options: ['Mejoras con la práctica', 'Te expones al azar', 'Aprendes más rápido'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q93',
          question: '¿Qué es revenge trading?',
          options: ['Venganza del mercado', 'Operar por emoción después de una pérdida', 'Stop loss ajustado'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q94',
          question: '¿Qué sucede al mover el SL para evitar pérdida?',
          options: ['Reduces el riesgo', 'Aumentas el riesgo', 'Cierra en ganancia'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q95',
          question: '¿Cuál es una creencia falsa sobre el éxito en trading?',
          options: ['Requiere disciplina', 'Es fácil y rápido', 'Se aprende con práctica'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q96',
          question: '¿Es malo no aceptar una pérdida?',
          options: ['No, puedes recuperarte', 'Sí, agrava el problema', 'Solo si usas demo'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q97',
          question: '¿Qué pasa si cambias de estrategia constantemente?',
          options: ['Ganas más', 'No aprendes ni validas nada', 'Te adaptas mejor'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q98',
          question: '¿El miedo a entrar a una operación es normal?',
          options: ['Sí', 'No', 'Solo en demo'],
          correctAnswer: 0,
        },
        {
          id: 'b-1-10-q99',
          question: '¿Qué debes evitar en una mala racha?',
          options: ['Pausar y revisar', 'Aumentar lotaje por impulso', 'Revisar tu journal'],
          correctAnswer: 1,
        },
        {
          id: 'b-1-10-q100',
          question: '¿Cuál es el error más destructivo?',
          options: ['No tener mentor', 'No aceptar responsabilidad', 'Usar cuenta demo'],
          correctAnswer: 1,
        },
      ],
      xpReward: 10,
      quizXP: 10,
      perfectBonus: 5,
    },
  ],
}

export function getBeginnerLessonById(id: string): BeginnerLesson | undefined {
  return BEGINNER_LEVEL.lessons.find((l) => l.id === id)
}


