import { Link, useParams } from 'react-router-dom'
import './ProductDetail.css'
import { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../Router'
import Product from '../interfaces/Product'
import ProductInfo from '../productInfo/ProductInfo'
import { child, get, ref } from 'firebase/database'

export default function ProductDetail(): JSX.Element {
  const { id } = useParams()
  const database = useContext(FirebaseContext)
  const dbRef = ref(database, "productos");
  const [ product, setProduct ] = useState<Product | null>(null);
  const [ username ] = useState<string>(sessionStorage.getItem('username') ?? '');

  useEffect(() => {
    const fetchData = async () => {
      const data = await get(child(dbRef, id!))
      
      if(data) {
        const value = data.val();
        setProduct(value as Product)
      }
    }

    fetchData();
  }, []);

  return <>
    <div className='user-container'> {username != "" ? <p>Bienvenido {username}!</p> : <Link to='/login'>Ingresar</Link> }</div>
    {
      product != null &&
      <div className="product-container">
          <h1>Detalle del Producto</h1>
          <ProductInfo product={product} isLink={false} />
          <br/>
          <Link to='/'>Volver a la home</Link>
      </div>
    }
  </>
}
