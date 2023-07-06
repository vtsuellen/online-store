import Styles from './productCard.module.css';

type ProductCardProps = {
  name: string,
  img: string,
  price: number,
};

export default function ProductCard({ name, img, price }: ProductCardProps) {
  return (
    <div data-testid="product" className={ Styles.container }>
      <span>{name}</span>
      <img src={ img } alt={ `${name} thumbnail` } />
      <span>{`R$ ${price}`}</span>
    </div>
  );
}
