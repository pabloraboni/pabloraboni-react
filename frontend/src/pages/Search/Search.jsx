import styles from "./Search.module.scss";

//Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

//Components
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { Link } from "react-router-dom";

//Redux
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load photo data
  useEffect(() => {
    dispatch(searchPhotos(search));
    resetMessage;
  }, [dispatch, search]);

  //Insert a like
  const handleLike = (photo) => {
    dispatch(like(photo._id));
    resetMessage;
  };

  return (
    <>
      <div className="pr-page__content --f-center">
        <div className={styles["pr-page__search"]}>
          <div className="--fcol --fgap-30">
            <h1>Sua busca</h1>
            <div className="--wd-100 --grid-1 --ggap-50">
              {photos &&
                photos.map((photo) => (
                  <div key={photo._id} className="--wd-100 --fcol --fgap-10">
                    <PhotoItem photo={photo} user={user}></PhotoItem>
                    <div className="--wd-100 --frow-center --fgap-20">
                      <LikeContainer photo={photo} user={user} handleLike={handleLike} ></LikeContainer>
                      <div className="--flex-1"></div>
                      <Link to={`/photos/${photo._id}`} className="pr-icon-expand --font-16 --color-gray" ></Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
