import { Link } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from '../../hooks/useLogout'

import { Button } from '../controls/Button'

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Expensify</li>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        {user && (
          <>
            <li>hello, {user.displayName}</li>
            <li>
              <Button className="btn" onClick={logout}>Logout</Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}