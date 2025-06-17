'use client'
import React, { useState, useEffect } from 'react'

type Chamado = {
  id?: number
  nome?: string
  motivo: string
  descricao: string
}

export default function Home() {
  const [form, setForm] = useState<Chamado>({
    nome: '',
    motivo: '',
    descricao: '',
  })
  const [enviado, setEnviado] = useState(false)
  const [chamados, setChamados] = useState<Chamado[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/chamado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setEnviado(true)
      setForm({ nome: '', motivo: '', descricao: '' })
      fetchChamados()
      setTimeout(() => setEnviado(false), 3000)
    }
  }

  const fetchChamados = async () => {
    const res = await fetch('/api/chamado')
    const data = await res.json()
    setChamados(data)
  }

  useEffect(() => {
    fetchChamados()
  }, [])

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>

      {[...Array(15)].map((_, i) => (
        <span
          key={i}
          className="heart"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ❤️
        </span>
      ))}

      <h1 style={styles.titulo}>💌 Solicitações do Amor</h1>

      {enviado && (
        <p style={styles.sucesso}>🌹 Solicitação enviada com sucesso!</p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="nome"
          placeholder="Título da solicitação 💡"
          value={form.nome}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="motivo"
          placeholder="Criticidade (Ex: Alta, Média, Urgente) ❗"
          value={form.motivo}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="descricao"
          placeholder="Descreva o que deseja 💬"
          value={form.descricao}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Enviar Solicitação 💖
        </button>
      </form>

      <h2 style={styles.subtitulo}>📋 Solicitações Recebidas</h2>
      <ul style={styles.lista}>
        {chamados.length === 0 ? (
          <li style={styles.vazio}>Nenhuma solicitação enviada ainda 😢</li>
        ) : (
          chamados.map((chamado, index) => (
            <li key={index} style={styles.item}>
              <p style={styles.itemTitulo}>🎯 {chamado.nome}</p>
              <p><strong>Criticidade:</strong> {chamado.motivo}</p>
              <p style={styles.itemDescricao}>{chamado.descricao}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 600,
    margin: '60px auto',
    padding: '20px',
    position: 'relative',
    fontFamily: '"Comic Sans MS", cursive',
    background: '#fff0f6',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(255, 192, 203, 0.5)',
  },
  titulo: {
    fontSize: '32px',
    textAlign: 'center',
    color: '#d63384',
    marginBottom: '20px',
    animation: 'fadeIn 1s ease-out forwards',
  },
  sucesso: {
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    animation: 'fadeIn 0.5s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    animation: 'fadeIn 1s ease-out forwards',
  },
  input: {
    padding: '10px',
    border: '1px solid #f783ac',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#333',
    backgroundColor: '#fff'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #f783ac',
    borderRadius: '8px',
    fontSize: '16px',
    minHeight: '80px',
    color: '#333',
    backgroundColor: '#fff'
  },
  button: {
    padding: '12px',
    backgroundColor: '#d63384',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  subtitulo: {
    marginTop: '40px',
    fontSize: '24px',
    color: '#a61e4d',
    animation: 'fadeIn 1s ease-out forwards',
  },
  lista: {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
    animation: 'fadeIn 1s ease-out forwards',
  },
  item: {
    background: '#fff',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  itemTitulo: {
    fontWeight: 'bold',
    color: '#d63384',
  },
  itemDescricao: {
    fontSize: '14px',
    color: '#333',
  },
  vazio: {
    color: '#666',
    fontStyle: 'italic',
  },
}

const cssStyles = `
@keyframes float {
  0% { transform: translateY(0); opacity: 1 }
  50% { transform: translateY(-20px); opacity: 0.6 }
  100% { transform: translateY(0); opacity: 1 }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px) }
  to { opacity: 1; transform: translateY(0) }
}

.heart {
  position: absolute;
  font-size: 20px;
  animation: float 6s infinite ease-in-out;
  z-index: 0;
  opacity: 0.3;
}
`
