'use client'
import React, { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({ nome: '', motivo: '', descricao: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/chamado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) setEnviado(true)
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">📞 Abrir Chamado</h1>
      {enviado ? (
        <p className="text-green-600">✅ Chamado enviado com sucesso!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" placeholder="Seu nome" value={form.nome} onChange={handleChange} required className="border p-2 w-full" />
          <input name="motivo" placeholder="Motivo" value={form.motivo} onChange={handleChange} required className="border p-2 w-full" />
          <textarea name="descricao" placeholder="Descreva o problema" value={form.descricao} onChange={handleChange} required className="border p-2 w-full" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
        </form>
      )}
    </main>
  )
}
