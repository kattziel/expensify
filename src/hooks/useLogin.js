import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  // login jest fukcją asynchroniczna ktora przy await - czeka az server zwroci dane do fukcji
  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login;
      // czekamy na odpowiedz z serwera - i albo przejdziemy dalej jesli nie ma bledu - albo trafimy do catch
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      // jesli zapytanie zwroci bląd kod przejdzie do catch w przeciwnym razie wykona 22 do 27
      
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}