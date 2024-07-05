import styles from "./Home.module.scss";

//components
import Loading from "../../components/Loading";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { Link } from "react-router-dom";

//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load photo data
  useEffect(() => {
    dispatch(getPhotos());
    resetMessage
  }, [dispatch]);

  //Insert a like
  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage
  };

  return (
    <>
      {loading && <Loading />}
      <div className="pr-page__content --f-center">
        <div className={styles["pr-page__home"]}>
          <div className="--wd-100 --grid-1 --ggap-50">
            {photos &&
              photos.map((photo) => (
                <div key={photo._id} className="--wd-100 --fcol --fgap-10">
                  <PhotoItem photo={photo} user={user}></PhotoItem>
                  <div className="--wd-100 --frow-center --fgap-20">
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} ></LikeContainer>
                    <div className="--flex-1"></div>
                    <Link to={`/photos/${photo._id}`} className="pr-icon-expand --font-16 --color-gray"></Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
