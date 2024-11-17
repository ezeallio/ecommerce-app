import { Link } from "react-router-dom";

export default function ProductInfo(props: any): JSX.Element {
  return <>
    <div className="card-content">
      <div className="img-name">
        <img src={props.product.imagen}/>
        <div className="name-price">
          <p className="name">{props.product.nombre}</p>
          <p className="price">${props.product.precio}</p>
        </div>
      </div>
      <p className="description">{props.isLink ? props.product.descripcionBreve : props.product.descripcion}</p>
      <p className="sku">SKU: {props.product.sku}</p>
      { props.isLink && <Link to={`productDetail/${props.product.id}`}>Ver</Link> } 
    </div>
  </>
}
