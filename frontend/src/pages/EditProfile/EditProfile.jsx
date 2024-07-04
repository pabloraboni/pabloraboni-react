import styles from "./EditProfile.module.scss";
import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import Loading from "../../components/Loading";

//hooks
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

const EditProfile = () => {
  const inputRef = useRef(null);

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const dispatch = useDispatch();

  const handleButtonClick = () => {  
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setProfileImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };

  useEffect(() => {
    if (profileImage) {
      const form = document.getElementById("image-upload-form");
      const event = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    }
  }, [profileImage]);

  //Edit image
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    const userData = {};
    if(profileImage){
      userData.profileImage = profileImage;
    }  
    //Build form data
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    await dispatch(updateProfile(formData));
    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000)
  };
  
  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch])
  
  //Fill form with user data
  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  },[user])
  

  //Edit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Gether user data from states
    const userData = {
      name
    }
    if(bio){
      userData.bio = bio;
    }
    if(password){
      userData.password = password;
    }

    //Build form data
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 5000)

  };

  return (
    <>
      {error  && (
        <Message key={1} type="--warning" duration={5000}>{error}</Message>
      )}
      {message  && (
        <Message key={1} type="--positive" duration={5000}>{message}</Message>
      )}
      {loading && <Loading />}
      <div className="pr-page__content --f-center">
        <div className={styles["pr-page__profile"]}>
          <h1>Editar perfil</h1>
          <form id="image-upload-form" className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleSubmitImage}>
            <div className={styles["pr-profile__editInput"]}>
              <div className="--wd-100 --frow-center --fgap-20">
                {
                  !previewImage ? (
                    user.profileImage ? (
                      <div className={styles["pr-profile__image"]} style={{ background: `url('${uploads}/users/${user.profileImage}')` }}></div>
                    ) : (
                      <div className={styles["pr-profile__image"]} style={{ background: `url('${previewImage}')` }}><span className="pr-icon-user"></span></div>
                    )
                  ) : (
                    <div className={styles["pr-profile__image"]} style={{ background: `url('${previewImage}')` }}></div>
                  )
                }
                <div className={styles["pr-profile__user"]}>
                  <p>{name}</p>
                  <p>{email}</p>
                </div>
                <a className="pr-button --small" onClick={handleButtonClick}>Alterar foto</a>
                <input ref={inputRef} type="file" style={{display:"none"}} onChange={handleFileChange}></input>
              </div>
            </div>
          </form>
          <form className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleSubmit}>
            <div className="--wd-100 --fcol --fgap-20">
              <div className="--wd-100 --fcol --fgap-10">
                <p>Nome</p>
                <label className="pr-box__input">
                  <input type="text" value={name || ""} onChange={(e) => setName(e.target.value)} placeholder="Seu nome"></input>
                </label>
              </div>
              <div className="--wd-100 --fcol --fgap-10">
                <p>E-mail</p>
                <label className="pr-box__input">
                  <input type="email" value={email || ""} disabled placeholder=""></input>
                </label>
              </div>
              <div className="--wd-100 --fcol --fgap-10">
                <p>Bio</p>
                <label className="pr-box__input">
                  <input type="text" value={bio || ""} onChange={(e) => setBio(e.target.value)} placeholder="Descrição perfil"></input>
                </label>
              </div>
              <div className="--wd-100 --fcol --fgap-10">
                <p>Alterar senha</p>
                <label className="pr-box__input">
                  <input type="password" value={password || ""} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma nova senha"></input>
                </label>
              </div>
            </div>
            { !loading && <button type="submit" className="pr-button --primary">Salvar</button> }
            {loading && (<button type="submit" className="pr-button --primary --loading" disabled>Aguarde...</button>)}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
