//Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loading from "../../components/Loading";

//Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);
    console.log(error);

    dispatch(register(user));
  };

  useEffect(() => {
    //reset em todos os estados para se iniciar uma nova requisição com novos estados
    dispatch(reset());
  }, [dispatch]);

  return (
    <>

      {(error || success) && (
        <Message
          key={1}
          type={error ? "--warning" : "--positive"}
          duration={5000}
        >
          {error && <p>{error}</p>}
          {!error && success && <p>{success}</p>}
        </Message>
      )}

      {loading && (
        <Loading/>
      )}

      <div className="pr-page__content">
        <div className="--fcol --fgap-30 --f-center --wd-fix-400">
          <div className="pr-page__title">
            <h1>Cadastre-se</h1>
            <p>Cadastre-se para ver fotos dos seus amigos.</p>
          </div>

          <form className="--wd-100 pr-box__form --fcol --fgap-10" onSubmit={handleSubmit}>
            <label className="pr-box__input">
              <input
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                
              ></input>
            </label>
            <label className="pr-box__input">
              <input
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deigite seu e-mail"
                
              ></input>
            </label>
            <label className="pr-box__input">
              <input
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                
              ></input>
            </label>
            <label className="pr-box__input">
              <input
                type="password"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                
              ></input>
            </label>
            {!loading && <button type="submit" className="pr-button --primary">Cadastrar</button>}
            {loading && <button type="submit" className="pr-button --primary --loading" disabled>Aguarde...</button>}
            
          </form>

          <div className="--frow-center --fgap-10 --font-08">
            <p>Já possui uma conta?</p>
            <Link to="/login">Faça login aqui</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
