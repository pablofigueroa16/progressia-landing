function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function buildWaitlistEmailText(name: string) {
  return `Hola ${name} 👋,
Gracias por registrarte en la waiting list de Progressia 🚀
No es casualidad que estés aquí. Estás entrando antes que la mayoría.

🧠 El problema real (respaldado por datos)
Hoy, la falta de educación financiera no es una opinión, es un problema global comprobado:

📊 OCDE & Banco Mundial
Más del 65% de los adultos no entiende conceptos básicos como interés compuesto, riesgo o diversificación.

📉 Estudios de la FINRA (EE.UU.)
El 70% de los nuevos traders pierde dinero en sus primeros meses, no por falta de capital, sino por falta de educación estructurada.

📚 Harvard & Stanford (learning studies)
Las personas olvidan hasta el 90% de lo que aprenden si no lo practican de forma repetitiva y progresiva.

❌ Cursos largos
❌ Información desordenada
❌ Gurús y promesas irreales

El resultado es siempre el mismo: confusión, malas decisiones y frustración.

💡 Por eso nace Progressia
Progressia no es un curso tradicional.
No es una academia más.
Y no es contenido infinito sin dirección.

Progressia está diseñada para enseñar trading y educación financiera como realmente aprende el cerebro humano:
✅ Lecciones cortas
✅ Aprendizaje diario
✅ Práctica constante
✅ Progreso visible
✅ Menos teoría, más comprensión

Aprender poco.
Pero todos los días.
Y avanzar de verdad 📈

🏆 Ser early adopter importa (mucho)
Estar en esta lista significa que:
✨ Tendrás acceso anticipado antes del lanzamiento público
✨ Recibirás beneficios exclusivos que no existirán después
✨ Podrás influir en cómo evoluciona la plataforma
✨ Formarás parte del núcleo fundador de la comunidad

Las mejores plataformas no se construyen solo con tecnología.
Se construyen con personas que creen en la visión desde el inicio.

🌍 Progressia también es una causa
Un porcentaje de lo que generemos será destinado a educación financiera para niños y jóvenes en Latinoamérica.

Porque aprender a manejar el dinero:
No debería ser un privilegio 💙

Debería ser una base desde temprana edad

Al apoyar Progressia, no solo inviertes en ti.
También aportas a cambiar el futuro financiero de miles de personas.

📲 Próximo paso (muy importante)
Toda la información clave — avances, accesos anticipados, anuncios y decisiones importantes — se compartirán primero en nuestra comunidad privada de Telegram 👇
👉 Únete aquí: https://t.me/progressiaes

Mantente atento a tu correo 📩
`
}

export function buildWaitlistEmailHtml(name: string) {
  const text = buildWaitlistEmailText(name)
  const safe = escapeHtml(text)
  const html = safe
    .replaceAll('\n', '<br/>')
    .replaceAll('https://t.me/progressiaes', '<a href="https://t.me/progressiaes">https://t.me/progressiaes</a>')
  return `<div style="font-family:Arial,sans-serif;line-height:1.6">${html}</div>`
}

export async function sendWaitlistWelcomeEmail(params: { to: string; name: string }) {
  const apiKey = requireEnv('RESEND_API_KEY')
  const from = requireEnv('MAIL_ADMIN')
  const subject = 'Bienvenido a la waiting list de Progressia 🚀'
  const text = buildWaitlistEmailText(params.name)
  const html = buildWaitlistEmailHtml(params.name)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend error (${res.status}): ${body || 'unknown'}`)
  }
}


