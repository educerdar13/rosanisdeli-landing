'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, XCircle, Clock, ChevronDown, LogOut, Phone, Mail, Calendar, Users, MessageCircle } from 'lucide-react'

interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  event_type: string
  notes: string
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
}

const STATUS_LABELS = {
  pending: { label: 'Pendiente', color: 'bg-amber-900/30 text-amber-400 border-amber-800' },
  confirmed: { label: 'Confirmado', color: 'bg-emerald-900/30 text-emerald-400 border-emerald-800' },
  cancelled: { label: 'Cancelado', color: 'bg-red-900/30 text-red-400 border-red-800' },
}

const PAYMENT_LABELS = {
  pending: { label: 'Anticipo pendiente', color: 'text-amber-400' },
  paid: { label: '50% pagado', color: 'text-emerald-400' },
  refunded: { label: 'Reembolsado', color: 'text-red-400' },
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [waLink, setWaLink] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchReservations = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/reservations', {
      headers: { 'x-admin-token': password },
    })
    if (res.ok) {
      const data = await res.json()
      setReservations(data)
    }
    setLoading(false)
  }, [password])

  useEffect(() => {
    if (authed) fetchReservations()
  }, [authed, fetchReservations])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'rosanisdeli03') {
      setAuthed(true)
      setPasswordError('')
    } else {
      setPasswordError('Contraseña incorrecta')
    }
  }

  const handleAction = async (id: string, status: 'confirmed' | 'cancelled') => {
    setActionLoading(id + status)
    const res = await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': password,
      },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    if (data.waLink) setWaLink(data.waLink)
    await fetchReservations()
    setActionLoading(null)
  }

  const filtered = reservations.filter(r => filter === 'all' || r.status === filter)

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0F0E0B] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-[#E8E0D0] tracking-widest">ROSANI&apos;S</h1>
            <p className="text-[#8B3A2A] text-xs tracking-[4px] mt-1">PANEL DE ADMINISTRACIÓN</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-[#C9A96E] text-sm mb-2">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1A1815] border border-[#2A2825] text-[#E8E0D0] px-4 py-3 rounded focus:outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="••••••••••••"
              />
              {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#C9A96E] text-[#0F0E0B] py-3 font-medium tracking-widest text-sm hover:bg-[#E8C98A] transition-colors"
            >
              ENTRAR
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0E0B] text-[#E8E0D0]">
      {/* WhatsApp modal */}
      {waLink && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1A1815] border border-[#2A2825] p-8 rounded-lg max-w-md w-full text-center">
            <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-[#C9A96E] mb-2">Enviar mensaje al cliente</h3>
            <p className="text-[#6B6459] text-sm mb-6">Haz clic para abrir WhatsApp con el mensaje listo.</p>
            <div className="flex gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded text-sm font-medium transition-colors"
                onClick={() => setWaLink(null)}
              >
                Abrir WhatsApp
              </a>
              <button
                onClick={() => setWaLink(null)}
                className="flex-1 bg-[#2A2825] text-[#E8E0D0] py-3 rounded text-sm hover:bg-[#3A3835] transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#2A2825] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif text-[#E8E0D0] tracking-widest">ROSANI&apos;S</h1>
          <p className="text-[#6B6459] text-xs tracking-[3px]">PANEL DE RESERVAS</p>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-2 text-[#6B6459] hover:text-[#E8E0D0] transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-[#E8E0D0]' },
            { label: 'Pendientes', value: stats.pending, color: 'text-amber-400' },
            { label: 'Confirmadas', value: stats.confirmed, color: 'text-emerald-400' },
            { label: 'Canceladas', value: stats.cancelled, color: 'text-red-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#1A1815] border border-[#2A2825] p-5 rounded-lg">
              <p className="text-[#6B6459] text-xs tracking-widest mb-1">{stat.label.toUpperCase()}</p>
              <p className={`text-3xl font-serif ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                filter === f
                  ? 'bg-[#C9A96E] text-[#0F0E0B] font-medium'
                  : 'bg-[#1A1815] text-[#6B6459] hover:text-[#E8E0D0] border border-[#2A2825]'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : f === 'confirmed' ? 'Confirmadas' : 'Canceladas'}
            </button>
          ))}
          <button
            onClick={fetchReservations}
            className="ml-auto px-4 py-2 text-sm bg-[#1A1815] border border-[#2A2825] text-[#6B6459] hover:text-[#E8E0D0] rounded transition-colors"
          >
            Actualizar
          </button>
        </div>

        {/* Reservations */}
        {loading ? (
          <div className="text-center py-20 text-[#6B6459]">Cargando reservas...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#6B6459]">No hay reservas en esta categoría.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(r => (
              <div key={r.id} className="bg-[#1A1815] border border-[#2A2825] rounded-lg overflow-hidden">
                {/* Summary row */}
                <button
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-[#2A2825]/30 transition-colors"
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium text-[#E8E0D0]">{r.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_LABELS[r.status].color}`}>
                        {STATUS_LABELS[r.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[#6B6459]">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.date}</span>
                      <span>{r.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.guests} personas</span>
                      <span className="hidden md:block">{r.event_type}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#6B6459] transition-transform ${expandedId === r.id ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded */}
                {expandedId === r.id && (
                  <div className="px-6 pb-6 border-t border-[#2A2825] pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-[#C9A96E]" />
                          <a href={`tel:${r.phone}`} className="text-[#E8E0D0] hover:text-[#C9A96E]">{r.phone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-[#C9A96E]" />
                          <a href={`mailto:${r.email}`} className="text-[#E8E0D0] hover:text-[#C9A96E]">{r.email}</a>
                        </div>
                        {r.notes && (
                          <div className="text-sm text-[#6B6459] mt-2">
                            <span className="text-[#C9A96E]">Notas:</span> {r.notes}
                          </div>
                        )}
                        <div className={`text-xs ${PAYMENT_LABELS[r.payment_status].color}`}>
                          {PAYMENT_LABELS[r.payment_status].label}
                        </div>
                      </div>

                      {r.status === 'pending' && (
                        <div className="flex flex-col gap-3 justify-end">
                          <button
                            onClick={() => handleAction(r.id, 'confirmed')}
                            disabled={!!actionLoading}
                            className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 px-4 rounded text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {actionLoading === r.id + 'confirmed' ? 'Confirmando...' : 'Confirmar evento'}
                          </button>
                          <button
                            onClick={() => handleAction(r.id, 'cancelled')}
                            disabled={!!actionLoading}
                            className="flex items-center justify-center gap-2 bg-[#2A2825] hover:bg-red-900/50 text-[#E8E0D0] py-2.5 px-4 rounded text-sm transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            {actionLoading === r.id + 'cancelled' ? 'Cancelando...' : 'Cancelar'}
                          </button>
                        </div>
                      )}

                      {r.status === 'confirmed' && (
                        <div className="flex flex-col gap-3 justify-end">
                          <div className="flex items-center gap-2 text-emerald-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Evento confirmado
                          </div>
                          <button
                            onClick={() => handleAction(r.id, 'cancelled')}
                            disabled={!!actionLoading}
                            className="flex items-center justify-center gap-2 bg-[#2A2825] hover:bg-red-900/50 text-[#6B6459] hover:text-[#E8E0D0] py-2.5 px-4 rounded text-sm transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancelar
                          </button>
                        </div>
                      )}

                      {r.status === 'cancelled' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm justify-end">
                          <XCircle className="w-4 h-4" />
                          Cancelado
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-xs text-[#3A3835]">
                      ID: {r.id} · {new Date(r.created_at).toLocaleString('es-MX')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
