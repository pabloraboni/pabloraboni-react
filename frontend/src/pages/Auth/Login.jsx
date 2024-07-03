//Components
import Message from "../../components/Message";
import Loading from "../../components/Loading";

//Hooks
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password,};

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <>

      {error && (<Message key={1} type="--warning" duration={5000}><p>{error}</p></Message>)}
      {loading && (<Loading/>)}

      <div className="pr-page__content">
        <div className="--fcol --fgap-30 --f-center --wd-fix-400">
          <div className="pr-page__title">
            <h1>Entrar</h1>
            <p>Faça login para ver fotos dos seus amigos.</p>
          </div>

          <form className="--wd-100 pr-box__form --fcol --fgap-10" onSubmit={handleSubmit}>
            <label className="pr-box__input">
              <input
                type="email"
                value={email || ''}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Deigite seu e-mail"
              ></input>
            </label>
            <label className="pr-box__input">
              <input
                type="password"
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              ></input>
            </label>
            {!loading && ( <button type="submit" className="pr-button --primary">Entrar</button>)}
            {loading && (<button type="submit" className="pr-button --primary --loading" disabled>Aguarde...</button>)}
          </form>

          <div className="--frow-center --fgap-10 --font-08">
            <p>Não possui uma conta?</p>
            <Link to="/register">Cadastre-se aqui</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
