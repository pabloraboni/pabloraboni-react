import { uploads } from "../utils/config";
import styles from './PhotoItem.module.scss';

import { Link } from "react-router-dom";

const PhotoItem = ({ photo, user }) => {

  return (
    <div className={styles["pr-post"]}>
      <Link to={`/users/${photo.userId}`} className={styles["pr-post__user"]}>
        <div className={styles["pr-user__image"]}></div>
        <p className="--flex-1">{photo.userName}</p>
      </Link>
      {photo.image && (<div className={styles["pr-post__image"]} style={{ background: `url('${uploads}/photos/${photo.image}')` }}></div>)}      
    </div>
  );
};

export default PhotoItem;
