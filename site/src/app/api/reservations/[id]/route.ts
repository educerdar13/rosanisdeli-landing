import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = req.headers.get('x-admin-token')
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const { status } = await req.json()

  const { data: reservation, error: fetchError } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !reservation) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 })
  }

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // WhatsApp message to client
  const waMsg = status === 'confirmed'
    ? encodeURIComponent(`¡Hola ${reservation.name}! 🎉 Tu evento del *${reservation.date}* está *confirmado* con Rosani's Deli. Para asegurar la fecha, realizaremos el cobro del 50% de anticipo. Te enviaremos el link de pago a la brevedad. Cualquier duda: (81) 8189 7529`)
    : encodeURIComponent(`Hola ${reservation.name}, lamentablemente no tenemos disponibilidad para tu evento del ${reservation.date}. Contáctanos al (81) 8189 7529 para buscar otra fecha. — Rosani's Deli`)

  const clientPhone = reservation.phone.replace(/\D/g, '')
  const fullPhone = clientPhone.startsWith('52') ? clientPhone : `52${clientPhone}`
  const waLink = `https://wa.me/${fullPhone}?text=${waMsg}`

  // Email to client
  if (status === 'confirmed') {
    await resend.emails.send({
      from: 'Rosani\'s Deli <onboarding@resend.dev>',
      to: reservation.email,
      subject: '✅ Tu evento está confirmado — Rosani\'s Deli',
      html: `
        <div style="font-family: Georgia, serif; background: #0F0E0B; color: #E8E0D0; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #C9A96E; font-size: 28px;">Rosani's Deli</h1>
          <h2 style="color: #E8E0D0;">¡Evento confirmado, ${reservation.name}!</h2>
          <p style="color: #C9A96E; line-height: 1.8;">Nos da gusto tenerte. Para asegurar la fecha, te pedimos el 50% de anticipo. En breve recibes el link de pago por WhatsApp.</p>
          <div style="background: #1A1815; border-left: 3px solid #C9A96E; padding: 24px; margin: 32px 0; border-radius: 4px;">
            <p style="margin: 4px 0;"><strong style="color: #C9A96E;">Fecha:</strong> ${reservation.date}</p>
            <p style="margin: 4px 0;"><strong style="color: #C9A96E;">Hora:</strong> ${reservation.time}</p>
            <p style="margin: 4px 0;"><strong style="color: #C9A96E;">Evento:</strong> ${reservation.event_type}</p>
            <p style="margin: 4px 0;"><strong style="color: #C9A96E;">Invitados:</strong> ${reservation.guests}</p>
          </div>
          <p style="color: #6B6459; font-size: 13px;">rosanisdeli@gmail.com · (81) 8189 7529</p>
        </div>
      `,
    })
  }

  return NextResponse.json({ success: true, waLink })
}
