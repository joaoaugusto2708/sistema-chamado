// app/api/chamado/route.ts
import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  console.log('Dados recebidos:', data)
  const { error } = await supabase.from('chamados').insert([{
    nome: data.nome,
    motivo: data.motivo,
    descricao: data.descricao,
  }])

  if (error) {
    console.error(error)
    return NextResponse.json({ ok: false, error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
