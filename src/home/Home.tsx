import { useContext, useEffect, useState } from 'react';
import './Home.css';
import Product from '../interfaces/Product.ts';
import { FirebaseContext } from '../Router.tsx';
import { get, ref } from 'firebase/database';
import ProductInfo from '../productInfo/ProductInfo.tsx';
import { Link } from 'react-router-dom';

export default function Home(): JSX.Element {
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ username ] = useState<string>(sessionStorage.getItem('username') ?? '');
  const database = useContext(FirebaseContext);
  const dbRef = ref(database, "productos");
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await get(dbRef)
      
      if (data) {
        const listProducts = Object.values(data.val());
        setProducts(listProducts as Product[])
      }
    }

    fetchData();
  }, []);

  return <>
    <div className='user-container'> {username != "" ? <p>Bienvenido {username}!</p> : <Link to='/login'>Ingresar</Link> }</div>
    <h1>Listado de Productos</h1>
    <div className='container'>
      {
        products.map(product => {
          return (
            <div className="card" key={product.id}>
                <ProductInfo product={product} isLink={true} />
            </div>
          )
          }
        )
      }
    </div>
  </>
}
