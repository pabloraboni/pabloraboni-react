import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Logout an user
const logout = () => {
  localStorage.removeItem("user");
};


// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())//Pega o texto que chega da requisição e transforma em objeto
      .catch((err) => err);//Pega possíveis erros da requisição

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;

  } catch (error) {
    console.log(error);
  }
};


//exportando os metodos para serem utilizados no slice
const authService = {
  register,
  logout,
  login
};

export default authService;
