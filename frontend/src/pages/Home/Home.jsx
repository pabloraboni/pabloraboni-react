import styles from "./Home.module.scss";

//components
import Loading from "../../components/Loading";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Redux
import { getPhotos } from "../../slices/photoSlice";

const Home = () => {

  const dispatch = useDispatch();

  const { photos, loading, error, message} = useSelector((state) => state.photo);

  //Load photo data
  // useEffect(() => {
  //   dispatch(getPhotos());
  // }, [dispatch])  

  return (
    <>
      {loading && <Loading />}
      <div className="pr-page__content --f-center">
        <div className={styles["pr-page__profile"]}>
          <div className="--fcol --fgap-30">
            {/* <h1>Perfil</h1> */}
            {/* <div className="--fcol --fgap-30">
              {
                photos && photos.map((photo, i) => (
                  <PhotoItem key={i} photo={photo}></PhotoItem>
                ))
              }
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
