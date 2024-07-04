import styles from "./Profile.module.scss";
import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import Loading from "../../components/Loading";

//hooks
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

//Redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto, getUserPhotos, resetMessage } from "../../slices/photoSlice";
import Notification from "../../components/Notification";

const Profile = () => {

    
    const {id} = useParams();
    const dispatch = useDispatch();
    
    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);
    
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");


    //New form and edit form ref
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();
    
    //Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id])
    
    
    //Set image preview post
    const inputRef = useRef(null);
    const handleButtonClick = () => {  
        inputRef.current.click();
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage));
        }
    };

    //Submit
    const handleSubmit = async (e) => {

        e.preventDefault();
        const photoData = {
            title,
            image,
        };

        // build form data
        const formData = new FormData();
        const photoFormData = Object.keys(photoData).forEach((key) =>formData.append(key, photoData[key]));
        formData.append("photo", photoFormData);
        dispatch(publishPhoto(formData));

        setPreviewImage("");
        setTitle("");

        setTimeout(() => {
            dispatch(resetMessage());
        }, 5000)

    }

  return (
    <>
        {errorPhoto  && (
        <Message key={1} type="--warning" duration={5000}>{errorPhoto}</Message>
        )}
        {messagePhoto  && (
            <Message key={1} type="--positive" duration={5000}>{messagePhoto}</Message>
        )}
        {loadingPhoto && <Loading />}
        <div className="pr-page__content --f-center">
            <div className={styles["pr-page__profile"]}>
                <div className="--fcol --fgap-30">
                    <h1>Perfil</h1>
                    <div className={styles["pr-profile__editInput"]}>
                        <div className="--wd-100 --frow-center --fgap-20">
                            {
                                user.profileImage ? (
                                    <div className={styles["pr-profile__image"]} style={{ background: `url('${uploads}/users/${user.profileImage}')` }}></div>
                                ) : (
                                    <div className={styles["pr-profile__image"]}><span className="pr-icon-user"></span></div>
                                )
                            }
                            <div className={styles["pr-profile__user"]}>
                                <p>{user.name}</p>
                                <p>{user.bio}</p>
                            </div>
                            {
                                id === userAuth._id && (
                                    <NavLink to={`/profile`} className="pr-button --small --outline">Editar perfil</NavLink>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    id === userAuth._id && (
                        <>
                            <div className={styles["pr-form__shared"]}>
                                <div className="--fcol --fgap-30">
                                    <h1>Compartilhe algo</h1>
                                    <form className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleSubmit}>
                                        <div className="--wd-100 --frow-start --fgap-20">
                                            <div className="--wd-auto">
                                                {
                                                    previewImage ? (
                                                        <div className={styles["pr-shared__image"]} onClick={handleButtonClick} style={{ background: `url('${previewImage}')` }}></div>
                                                    ) : (
                                                        <div className={styles["pr-shared__image"]} onClick={handleButtonClick}>
                                                            <span className="pr-icon-camera-3"></span>
                                                            <p>Alterar Foto</p>
                                                        </div>
                                                    ) 
                                                }
                                                <input ref={inputRef} type="file" style={{display:"none"}} onChange={handleFileChange}></input>
                                            </div>
                                            <div className="--flex-1 --fcol --fgap-10">
                                                <p>Título</p>
                                                <label className="pr-box__input">
                                                    <input type="text" value={title || ""} onChange={(e) => setTitle(e.target.value)} placeholder="Informe um título para a foto"></input>
                                                </label>
                                            </div>
                                        </div>
                                        { !loadingPhoto && <button type="submit" className="pr-button --primary">Postar</button> }
                                        {loadingPhoto && (<button type="submit" className="pr-button --primary --loading" disabled>Aguarde...</button>)}
                                    </form>
                                </div>
                            </div>
                        </>
                    )
                }

                <div className={styles["pr-photos__posteds"]}>
                    <h1>Fotos</h1>

                    

                    <div className="--fcol --fgap-50">
                        {
                            photos && photos.map((photo, i) => (
                                <div key={i} className={styles["pr-post"]}>
                                    {photo.image && <div className={styles["pr-post__image"]} onClick={handleButtonClick} style={{ background: `url('${uploads}/photos/${photo.image}')` }}></div>}
                                    <div className="--wd-100 --frow-start --fgap-10">
                                        <div className="--flex-1 --fcol --fgap-5">
                                            <h2>{photo.title}</h2>
                                            <p>Por: {photo.userName}</p>
                                        </div>
                                        <div className="--wd-auto --frow-center --fgap-10">
                                            {
                                                id === userAuth._id ? (
                                                    <>
                                                        <button className="pr-icon-heart-outline --font-16"></button>
                                                        <NavLink to={`/photos/${photo._id}`} className="pr-icon-view-2 --font-16"></NavLink>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="pr-icon-heart-outline --font-16"></button>
                                                        <NavLink to={`/photos/${photo._id}`} className="pr-icon-view-2 --font-16"></NavLink>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            photos.length === 0 && 
                                <Notification type={"--warning"}>
                                    <p>Nenhuma foto publicada!</p>
                                </Notification>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Profile;
