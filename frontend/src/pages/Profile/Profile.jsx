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
import { profile } from "../../slices/userSlice";
import { getUserDetails } from "../../slices/userSlice";

const Profile = () => {

    const [title, setTitle] = useState("");
    const [previewImagePost, setPreviewImagePost] = useState();

    const {id} = useParams();
    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);


    //New form and edit form ref
    const inputRef = useRef(null);
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    //Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [dispatch, id])


    //Set image preview post
    const handleButtonClick = () => {  
        inputRef.current.click();
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setPreviewImagePost(URL.createObjectURL(selectedImage));
        }
    };

    //Submit
    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <>
        {loading && <Loading />}
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
                                    <NavLink to={`/users/${user._id}`} className="pr-button --small --outline">Editar perfil</NavLink>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={styles["pr-form__shared"]}>
                    <div className="--fcol --fgap-30">
                        <h1>Compartilhe algo</h1>
                        <form className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleSubmit}>
                            <div className="--wd-100 --frow-start --fgap-20">
                                <div className="--wd-auto">
                                    {
                                        previewImagePost ? (
                                            <div className={styles["pr-post__image"]} onClick={handleButtonClick} style={{ background: `url('${previewImagePost}')` }}></div>
                                        ) : (
                                            <div className={styles["pr-post__image"]} onClick={handleButtonClick}>
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
                            <button type="submit" className="pr-button --primary">Postar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Profile;
