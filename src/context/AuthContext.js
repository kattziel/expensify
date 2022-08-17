import { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
// przypisanie do Zmiennej AuthContext wywołanie funkcji createContext
export const AuthContext = createContext()

// Okreslenie akcji jakie mogą być wykonywane na context
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

// tworzymy zmienna AuthContextProvider w która potem owrapowana jest cała aplikacja
export const AuthContextProvider = ({ children }) => {
  // useReducer okresla jakie akcje mogą byc wykonane na stanie aplikacji + zwraca defaultowy state
  // obiekt o parametrach user i authIsReady - to state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    // funkcja wykonująca się tylko raz - po to by sprawdzić czy uzytkownik jest juz dostepny w firebase
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  // zwracamy dostarczyciela stanu aplikacji do swojego dziecka
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}
