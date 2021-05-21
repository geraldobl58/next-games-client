import { useMemo, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import '../styles/global.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import { setToken, getToken, removeToken }  from '../api/token'
import { 
  getProductsCart, 
  addProductCart, 
  countProductsCart, 
  removeProductCart,
  removeAllProductsCart
} from '../api/cart'

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)
  const [totalProductsCart, setTotalProductsCart] = useState(0)
  const [reloadCart, setReloadCart] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])

  useEffect(() => {
    setTotalProductsCart(countProductsCart())
    setReloadCart(false)
  }, [reloadCart, auth])

  const login = (token) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if (auth) {
      removeToken()
      setAuth(null)
      router.push('/')
    }
  }

  const addProduct = (product) => {
    const token = getToken()

    if (token) {
      addProductCart(product)
      setReloadCart(true)
    } else {
      toast.warning('Você precisa estar logado')
    }
  }

  const removeProduct = (product) => {
    removeProductCart(product)
    setReloadCart(true)
  }
  
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser
    }),
    [auth]
  )

  const cartData = useMemo(
    () => ({
      productCart: totalProductsCart,
      addProductCart: (product) => addProduct(product),
      getProductCart: getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductCart: removeAllProductsCart
    }),
    [totalProductsCart]
  )

  if (auth === undefined) {
    return null
  }

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
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
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}