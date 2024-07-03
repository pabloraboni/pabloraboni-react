import styles from "./Profile.module.scss";
import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import Loading from "../../components/Loading";

//hooks
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile, resetMessage } from "../../slices/userSlice";

const Profile = () => {
  const inputRef = useRef(null);

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const dispatch = useDispatch();

  //Edit image
  const handleButtonClick = () => {  
    inputRef.current.click();
  };
  const handleSubmitImage = (e) => {
    e.preventDefault();
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setPreviewImage(URL.createObjectURL(selectedImage));
      handleSubmitImage(e);
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {error  && (
        <Message key={1} type={error ? "--warning" : "--positive"} duration={5000}>{error}</Message>
      )}
      {/* {loading && <Loading />} */}
      <div className="pr-page__content --f-center">
        <div className={styles["pr-page__profile"]}>
          <h1>Editar perfil</h1>
          <form className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleSubmitImage}>
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
                <button className="pr-button --small" onClick={handleButtonClick}>Alterar foto</button>
                <input ref={inputRef} type="file" style={{display:"none"}} onChange={handleFileChange}></input>
              </div>
            </div>
          </form>
          <form className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleSubmit}>
            <div className="--wd-100 --fcol --fgap-20">
              <div className="--wd-100 --fcol --fgap-10">
                <p>Nome</p>
                <label className="pr-box__input">
                  <input type="email" value={name || ""} onChange={(e) => setName(e.target.value)} placeholder="Deigite seu e-mail"></input>
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
                  <input type="email" value={bio || ""} onChange={(e) => setBio(e.target.value)} placeholder="Descrição perfil"></input>
                </label>
              </div>
              <div className="--wd-100 --fcol --fgap-10">
                <p>Alterar senha</p>
                <label className="pr-box__input">
                  <input type="password" value={password || ""} onChange={(e) => setPassword(e.target.value)} placeholder="Digite uma nova senha"></input>
                </label>
              </div>
            </div>
            <button type="submit" className="pr-button --primary"> Salvar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
