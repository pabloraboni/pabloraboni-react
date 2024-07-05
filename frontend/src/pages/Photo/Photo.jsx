import styles from "./Photo.module.scss";

//components
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Redux
import { getUserDetails } from "../../slices/userSlice";
import { getPhotoById, like, resetMessage } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message} = useSelector((state) => state.photo);

  //Load photo data
  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id])

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
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
        <div className={styles["pr-page__photo"]}>
          <div className="--fcol --fgap-10">
            <PhotoItem photo={photo} user={user}></PhotoItem>
            <div className="--wd-100 --frow-centerend --fgap-10">
              <LikeContainer photo={photo} user={user} handleLike={handleLike}></LikeContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Photo;
