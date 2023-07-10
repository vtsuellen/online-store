import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsProps } from './home';

function Checkout() {
  // estados de inputs
  const [itensCart, setItemsCart] = useState<ProductsProps[]>([]);
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cpfInput, setCpfInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [cepInput, setCepInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [master, setMaster] = useState(false);
  const [visa, setVisa] = useState(false);
  const [boleto, setBoleto] = useState(false);
  const [elo, setElo] = useState(false);

  const addCart = () => {
    const result = localStorage.getItem('dataCart');
    if (result) {
      const getItensCart = JSON.parse(result);
      setItemsCart(getItensCart);
    }
  };

  useEffect(() => {
    addCart();
  }, []);

  const navigate = useNavigate();

  const validate = () => {
    // valida campos e controla a propriedade disbled do button
    return !(fullNameInput.length >= 1
         && emailInput.length >= 1
         && cpfInput.length >= 1
         && phoneInput.length >= 1
         && cepInput.length >= 1
         && addressInput.length >= 1
         && (master || visa || boleto || elo));
  };

  return (
    <>
      <div>
        {itensCart.length === 0 ? (
          <h1>nada para finalizar</h1>
        ) : (
          <div>
            {itensCart.map((element) => (
              <div key={ element.id }>
                <span>{element.title}</span>
                <img
                  src={ element.thumbnail }
                  alt={ `${element.title} thumbnail` }
                />
                <span>{element.price}</span>
                <span>{element.qty}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <form>
        <label htmlFor="fullName">
          Nome completo
          <input
            type="text"
            id="fullName"
            data-testid="checkout-fullname"
            onChange={ (event) => {
              setFullNameInput(event.target.value);
            } }
          />
        </label>

        <label htmlFor="E-mail">
          E-mail
          <input
            type="email"
            id="E-mail"
            data-testid="checkout-email"
            onChange={ (event) => {
              setEmailInput(event.target.value);
            } }
          />
        </label>

        <label htmlFor="CPF">
          CPF
          <input
            type="text"
            id="CPF"
            data-testid="checkout-cpf"
            onChange={ (event) => {
              setCpfInput(event.target.value);
            } }
          />
        </label>

        <label htmlFor="Telefone">
          Telefone
          <input
            type="text"
            id="Telefone"
            data-testid="checkout-phone"
            onChange={ (event) => {
              setPhoneInput(event.target.value);
            } }
          />
        </label>

        <label htmlFor="CEP">
          CEP
          <input
            type="text"
            id="CEP"
            data-testid="checkout-cep"
            onChange={ (event) => {
              setCepInput(event.target.value);
            } }
          />
        </label>

        <label htmlFor="Endereço">
          Endereço
          <input
            type="text"
            id="Endereço"
            data-testid="checkout-address"
            onChange={ (event) => {
              setAddressInput(event.target.value);
            } }
          />
        </label>

        <label htmlFor="boleto">
          <input
            type="radio"
            name="payment"
            value="boleto"
            id="boleto"
            data-testid="ticket-payment"
            onChange={ (event) => {
              setBoleto(event.target.checked);
            } }
          />
          Boleto
        </label>
        <label htmlFor="visa">
          <input
            type="radio"
            name="payment"
            value="visa"
            id="visa"
            data-testid="visa-payment"
            onChange={ (event) => {
              setVisa(event.target.checked);
            } }
          />
          Visa
        </label>
        <label htmlFor="masterCard">
          <input
            type="radio"
            name="payment"
            value="masterCard"
            id="masterCard"
            data-testid="master-payment"
            onChange={ (event) => {
              setMaster(event.target.checked);
            } }
          />
          MasterCard
        </label>
        <label htmlFor="elo">
          <input
            type="radio"
            name="payment"
            value="elo"
            id="elo"
            data-testid="elo-payment"
            onChange={ (event) => {
              setElo(event.target.checked);
            } }
          />
          Elo
        </label>
        <button
          data-testid="checkout-btn"
          disabled={ validate() }
          onClick={ () => {
            // limpa localStorage e muda de rota
            localStorage.clear();
            navigate('/carrinho');
          } }
        >
          Pagar
        </button>
      </form>
      {
        validate() && <p data-testid="error-msg">Campos inválidos</p>
          }
    </>
  );
}

export default Checkout;
