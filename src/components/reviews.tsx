import { useState, useEffect } from 'react';
import Styles from './reviews.module.css';
import star from '../Img/star.svg';
import starChecked from '../Img/starSolid.svg';

// regex validador do email
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

// tipagem do objeto da avaliação
type ReviewProps = {
  email: string,
  text: string,
  rating: string,
};

// tipagem do componente
type ReviewsProps = {
  productId: string,
};

export default function Reviews({ productId }: ReviewsProps) {
  const [stars, setStars] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [savedReviews, setSavedReviews] = useState<ReviewProps[]>([]);

  // função responsavel pelo submit das avaliações
  // valida os campos informados, caso ok gera o objeto da avaliação e inclui ela no estado e local storage
  // caso retorne false gera mensagem de erro
  const submitHandleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (stars !== '' && EMAIL_REGEX.test(email)) {
      setErrorMsg(false);
      const reviewObject = {
        email,
        text,
        rating: stars,
      };
      localStorage.setItem(
        `${productId}`,
        JSON.stringify([...savedReviews, reviewObject]),
      );
      setSavedReviews([...savedReviews, reviewObject]);
      setText('');
      setEmail('');
      setStars('');
    } else {
      setErrorMsg(true);
    }
  };

  // na montagem do componente busca as informações de avaliação salvas do produto no local storage e salva no state savedReviews
  useEffect(() => {
    const getReviewsData = () => {
      const data = localStorage.getItem(`${productId}`);
      if (data) {
        const result = JSON.parse(data);
        setSavedReviews(result);
      }
    };

    getReviewsData();
  }, [productId]);

  return (
    <section className={ Styles.container }>
      <h1>Avaliações</h1>
      <div>
        <input
          type="e-mail"
          placeholder="e-mail"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="product-detail-email"
        />
        <label data-testid="1-rating" htmlFor="1-rating">
          <img src={ parseInt(stars, 10) >= 1 ? starChecked : star } alt="" />
          <input
            className={ Styles.checkbox }
            id="1-rating"
            type="checkbox"
            checked={ stars >= '1' }
            onChange={ () => setStars('1') }
          />
        </label>
        <label data-testid="2-rating" htmlFor="2-rating">
          <img src={ parseInt(stars, 10) >= 2 ? starChecked : star } alt="" />
          <input
            className={ Styles.checkbox }
            id="2-rating"
            type="checkbox"
            checked={ stars >= '2' }
            onChange={ () => setStars('2') }
          />
        </label>
        <label data-testid="3-rating" htmlFor="3-rating">
          <img src={ parseInt(stars, 10) >= 3 ? starChecked : star } alt="" />
          <input
            id="3-rating"
            className={ Styles.checkbox }
            type="checkbox"
            checked={ stars >= '3' }
            onChange={ () => setStars('3') }
          />
        </label>
        <label data-testid="4-rating" htmlFor="4-rating">
          <img src={ parseInt(stars, 10) >= 4 ? starChecked : star } alt="" />
          <input
            id="4-rating"
            className={ Styles.checkbox }
            type="checkbox"
            checked={ stars >= '4' }
            onChange={ () => setStars('4') }
          />
        </label>
        <label data-testid="5-rating" htmlFor="5-rating">
          <img src={ parseInt(stars, 10) >= 5 ? starChecked : star } alt="" />
          <input
            id="5-rating"
            className={ Styles.checkbox }
            type="checkbox"
            checked={ stars >= '5' }
            onChange={ () => setStars('5') }
          />
        </label>
      </div>
      <textarea
        cols={ 30 }
        rows={ 10 }
        data-testid="product-detail-evaluation"
        value={ text }
        onChange={ ({ target }) => setText(target.value) }
        placeholder="Mensagem (opcional)"
      />
      <button
        data-testid="submit-review-btn"
        onClick={ (e) => submitHandleClick(e) }
      >
        Avaliar
      </button>
      {errorMsg && <h3 data-testid="error-msg">Campos inválidos</h3>}
      {savedReviews.length > 0 && savedReviews.map((review) => {
        return (
          <>
            <span data-testid="review-card-email">{review.email}</span>
            <div className={ Styles.ratingContainer } data-testid="review-card-rating">
              <img src={ parseInt(review.rating, 10) >= 1 ? starChecked : star } alt="" />
              <img src={ parseInt(review.rating, 10) >= 2 ? starChecked : star } alt="" />
              <img src={ parseInt(review.rating, 10) >= 3 ? starChecked : star } alt="" />
              <img src={ parseInt(review.rating, 10) >= 4 ? starChecked : star } alt="" />
              <img src={ parseInt(review.rating, 10) >= 5 ? starChecked : star } alt="" />
            </div>
            <span data-testid="review-card-evaluation">{review.text}</span>
          </>
        );
      })}
    </section>
  );
}
