import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let data

  try {
    data = await request.json()
  } catch (error) {
    console.error('Erro ao ler o corpo da requisição:', error)
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 })
  }

  const { error } = await supabase.from('chamados').insert([{
    nome: data.nome,
    motivo: data.motivo,
    descricao: data.descricao,
  }])

  if (error) {
    console.error('Erro ao inserir no Supabase:', error)
    return NextResponse.json({ ok: false, error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
export async function GET() {
  const { data, error } = await supabase.from('chamados').select('*').order('id', { ascending: false })

  if (error) {
    console.error('Erro ao buscar chamados:', error)
    return NextResponse.json([], { status: 500 })
  }

  return NextResponse.json(data)
}

