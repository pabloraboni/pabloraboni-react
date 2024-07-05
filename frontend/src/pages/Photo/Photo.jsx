import styles from "./Photo.module.scss";
import { uploads } from "../../utils/config";

//components
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//Redux
import { getUserDetails } from "../../slices/userSlice";
import { getPhotoById, like, comment } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message} = useSelector((state) => state.photo);

  const [commentText, setCommentText] = useState("");

  //Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id])

  //Insert a like
  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  //Insert a comment
  const handleComment = (e) => {
    e.preventDefault();
    const commentData = {
      comment: commentText,
      id:photo._id
    };
    dispatch(comment(commentData));
    setCommentText("");
    resetMessage();
  }

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
        <div className={styles["pr-page__photo"]}>
          <div className="--fcol --fgap-20">
            <PhotoItem photo={photo} user={user}></PhotoItem>
            <div className="--wd-100 --frow-center --fgap-20">
              <LikeContainer photo={photo} user={user} handleLike={handleLike}></LikeContainer>
              <p className="--frow-center --fgap-10"><span className="pr-icon-comment --font-16"></span> Comentários: {photo.comments && (photo.comments.length)}</p>
            </div>
            <div className={styles["pr-comments"]}>
              <form className="--wd-100 pr-box__form --fcol --fgap-30" onSubmit={handleComment}>
                <div className="--wd-100 --frow-center --fgap-20">
                    <div className="--flex-1 --fcol --fgap-10">
                        {/* <p>Título</p> */}
                        <label className="pr-box__input">
                            <input type="text" value={commentText || ""} onChange={(e) => setCommentText(e.target.value)} placeholder="Faça um comentário"></input>
                        </label>
                    </div>
                    <button type="submit" className="pr-icon-conversation-send --font-2 --color-primary"></button>
                </div>
              </form>
              <div className="--fcol --fgap-20">
                {
                  photo.comments && photo.comments.map((comment) => (
                    <>
                      <div key={comment.comment} className={styles["pr-comment__user"]}>
                        <Link to={`/users/${comment.userId}`} className={styles["pr-user"]}>
                          {comment.userImage ? (
                              <div className={styles["pr-user__image"]} style={{ background: `url('${uploads}/users/${comment.userImage}')` }}></div>
                            ) : (
                              <div className={styles["pr-user__image"]}></div>
                            )
                          }
                          <p className="--flex-1">{comment.userName}</p>
                        </Link>
                        <p className={styles["pr-comment"]}>{comment.comment}</p>
                      </div>
                    </>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Photo;
