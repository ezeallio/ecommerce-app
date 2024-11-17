import { Link, useNavigate } from 'react-router-dom'
import './Signin.css'
import { useContext } from 'react'
import { FirebaseContext } from '../Router'
import { equalTo, get, orderByChild, push, query, ref } from 'firebase/database'
import { SHA256 } from 'crypto-js'
import User from '../interfaces/User'

export default function Signin(): JSX.Element {
    const navigate = useNavigate()
    const database = useContext(FirebaseContext)
    const dbRef = ref(database, "usuarios")

    async function handledChange(e: any) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newUser = {
            nombre: formData.get('nombre')!.toString(),
            apellido: formData.get('apellido')!.toString(),
            email: formData.get('email')!.toString(),
            password: SHA256(formData.get('password')!.toString()).toString()
        } as User

        const customQuery = query(dbRef, orderByChild('email'), equalTo(newUser.email))
        const data = await get(customQuery)

        if(data) {
            if (data.val() == null) {
                await push(dbRef, newUser)
                sessionStorage.setItem('username', newUser.nombre)
                navigate('/')
            }
            else {
                alert('Usuario existente')
            }
        }

    }

    return <>
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handledChange}
            >
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    name='nombre'
                    required
                />
                <input 
                    type="text" 
                    placeholder="Apellido" 
                    name='apellido'
                    required
                />
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
                <button type="submit">Registrarse</button>
            </form>
            <br></br>
            <Link to='/login'>¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link to='/'>Volver a la home</Link>
        </div>
    </>
}
