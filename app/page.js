'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [input, setInput] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(input)
    setInput('')
  }
  return (
    <main className={styles.main}>
      <h1>Weather Butler</h1>
      <form onSubmit={handleSubmit}>
        <input name='input' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <input type='submit' />
      </form>
    </main>
  )
}
