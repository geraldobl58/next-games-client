import { useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import '../styles/global.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '../context/AuthContext'
import { setToken }  from '../api/token'

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined)

  const login = (token) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }
  
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
      setReloadUser: () => null
    }),
    []
  )

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}