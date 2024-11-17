import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useContext } from 'react'
import { FirebaseContext } from '../Router';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { SHA256 } from 'crypto-js';
import User from '../interfaces/User';

export default function Login(): JSX.Element {
    const navigate = useNavigate()
    const database = useContext(FirebaseContext)
    const dbRef = ref(database, "usuarios")

    async function handledChange(e: any) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')!.toString()
        const password = SHA256(formData.get('password')!.toString()).toString()

        const customQuery = query(dbRef, orderByChild('email'), equalTo(email))
        const data = await get(customQuery)

        if(data) {
            const user = Object.values(data.val())[0] as User
            if (user.email == email && user.password == password) {
                sessionStorage.setItem('username', user.nombre)
                navigate('/')
            }
            else {
                alert('Usuario no existente')
            }
        }

    }

    return <>
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handledChange}>
              <input 
                  type="email" 
                  placeholder="Correo electrónico" 
                  name='email'
                  required
              />
              <input 
                  type="password" 
                  placeholder="Contraseña" 
                  name='password'
                  required
              />
              <button type="submit">Ingresar</button>
          </form>
          <br></br>
          <Link to='/signin'>¿No tienes una cuenta? Regístrate</Link>
          <Link to='/'>Volver a la home</Link>
        </div>
    </>
}
