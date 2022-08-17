import { useFirestore } from '../../hooks/useFirestore'
import { Button } from '../../components/controls/Button'

// styles
import styles from './Home.module.scss'

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <Button onClick={() => deleteDocument(transaction.id)}>x</Button>
        </li>
      ))}
    </ul>
  )
}