import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MAX_SLOTS = 3

export async function GET(req: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') // format: YYYY-MM

  if (!month) return NextResponse.json({ error: 'Month required' }, { status: 400 })

  const startDate = `${month}-01`
  const endDate = `${month}-31`

  const { data, error } = await supabase
    .from('reservations')
    .select('date')
    .gte('date', startDate)
    .lte('date', endDate)
    .neq('status', 'cancelled')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Count per date
  const counts: Record<string, number> = {}
  data?.forEach(({ date }) => {
    counts[date] = (counts[date] || 0) + 1
  })

  // Full dates by slot count
  const fullBySlots = Object.entries(counts)
    .filter(([, count]) => count >= MAX_SLOTS)
    .map(([date]) => date)

  // Also fetch manually blocked dates
  const { data: blocked } = await supabase
    .from('blocked_dates')
    .select('date')
    .gte('date', startDate)
    .lte('date', endDate)

  const blockedDates = blocked?.map(b => b.date) || []

  const fullDates = [...new Set([...fullBySlots, ...blockedDates])]

  return NextResponse.json({ fullDates, counts, blockedDates })
}
