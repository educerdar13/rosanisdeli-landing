import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const MAX_SLOTS_PER_DAY = 3

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase()
    const resend = getResend()
    const body = await req.json()
    const { name, email, phone, date, time, guests, event_type, notes } = body

    if (!name || !email || !phone || !date || !time || !guests || !event_type) {
      return NextResponse.json({ error: 'Campos requeridos incompletos' }, { status: 400 })
    }

    // Check slot availability
    const { count } = await supabase
      .from('reservations')
      .select('*', { count: 'exact', head: true })
      .eq('date', date)
      .neq('status', 'cancelled')

    if ((count ?? 0) >= MAX_SLOTS_PER_DAY) {
      return NextResponse.json({ error: 'No hay cupos disponibles para esa fecha' }, { status: 409 })
    }

    // Insert reservation
    const { data, error } = await supabase
      .from('reservations')
      .insert([{ name, email, phone, date, time, guests, event_type, notes, status: 'pending', payment_status: 'pending' }])
      .select()
      .single()

    if (error) throw error

    // Email to client
    await resend.emails.send({
      from: 'Rosani\'s Deli <onboarding@resend.dev>',
      to: email,
      subject: 'Recibimos tu solicitud — Rosani\'s Deli',
      html: `
        <div style="font-family: Georgia, serif; background: #0F0E0B; color: #E8E0D0; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #C9A96E; font-size: 28px; margin-bottom: 8px;">Rosani's Deli</h1>
          <p style="color: #8B3A2A; font-size: 14px; margin-bottom: 32px; letter-spacing: 2px;">EXPERIENCIAS GASTRONÓMICAS</p>
          <h2 style="color: #E8E0D0; font-size: 20px;">Hola ${name},</h2>
          <p style="color: #C9A96E; line-height: 1.8;">Recibimos tu solicitud. En menos de 24 horas te confirmamos disponibilidad y te enviamos los detalles del anticipo.</p>
          <div style="background: #1A1815; border-left: 3px solid #C9A96E; padding: 24px; margin: 32px 0; border-radius: 4px;">
            <p style="margin: 4px 0; color: #E8E0D0;"><strong style="color: #C9A96E;">Fecha:</strong> ${date}</p>
            <p style="margin: 4px 0; color: #E8E0D0;"><strong style="color: #C9A96E;">Hora:</strong> ${time}</p>
            <p style="margin: 4px 0; color: #E8E0D0;"><strong style="color: #C9A96E;">Evento:</strong> ${event_type}</p>
            <p style="margin: 4px 0; color: #E8E0D0;"><strong style="color: #C9A96E;">Invitados:</strong> ${guests}</p>
          </div>
          <p style="color: #6B6459; font-size: 13px;">¿Preguntas? Escríbenos a rosanisdeli@gmail.com o al (81) 8189 7529</p>
        </div>
      `,
    })

    // Email notification to owner
    const whatsappMsg = encodeURIComponent(
      `🔔 *Nueva reserva — Rosani's Deli*\n\n👤 ${name}\n📱 ${phone}\n📧 ${email}\n📅 ${date} — ${time}\n🎉 ${event_type}\n👥 ${guests} personas\n📝 ${notes || 'Sin notas'}\n\nID: ${data.id}`
    )
    const waLink = `https://wa.me/${process.env.BUSINESS_WHATSAPP}?text=${whatsappMsg}`

    await resend.emails.send({
      from: 'Rosani\'s Deli Sistema <onboarding@resend.dev>',
      to: process.env.BUSINESS_EMAIL!,
      subject: `🔔 Nueva reserva: ${name} — ${date}`,
      html: `
        <div style="font-family: Georgia, serif; padding: 32px; max-width: 600px;">
          <h2 style="color: #8B3A2A;">Nueva solicitud de reserva</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nombre</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Teléfono</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Fecha</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${date}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Hora</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${time}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Evento</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${event_type}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Invitados</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${guests}</td></tr>
            <tr><td style="padding: 8px;"><strong>Notas</strong></td><td style="padding: 8px;">${notes || '—'}</td></tr>
          </table>
          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <a href="${waLink}" style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Abrir en WhatsApp</a>
          </div>
          <p style="color: #999; margin-top: 24px; font-size: 13px;">Confirma o cancela desde el <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin">panel de administración</a></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Reservation error:', err)
    return NextResponse.json({ error: 'Error al procesar la reserva' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase()
  // Simple admin auth check via header
  const auth = req.headers.get('x-admin-token')
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('date', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
