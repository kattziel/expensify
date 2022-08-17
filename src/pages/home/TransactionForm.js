import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

import { Input } from '../../components/controls/Input'
import { Button } from '../../components/controls/Button'

export default function TransactionForm({uid}) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid,
      name,
      amount,
    })
  }

  useEffect(() => {
    if (response.success) {
      setName('')
      setAmount('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <Input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <Input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <Button>Add Transaction</Button>
      </form>
    </>
  )
}