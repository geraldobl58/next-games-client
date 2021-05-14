import { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import '../styles/global.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '../context/AuthContext'

export default function MyApp({ Component, pageProps }) {
  
  const authData = useMemo(
    () => ({
      auth: { name: 'John Doe', email: 'johndoe@email.com' },
      login: () => null,
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