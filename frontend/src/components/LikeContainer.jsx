import styles from './LikeContainer.module.scss';

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className={styles["pr-like"]}>
        {
            photo.likes && user && (
                <>
                    {
                        photo.likes.includes(user._id) ? (
                            <button className="pr-icon-heart2 --font-16"></button>
                        ) : (
                            <button onClick={() => handleLike(photo)} className="pr-icon-heart2-outline --font-16"></button>
                        )
                    }
                    <p>{photo.likes.length} curtida(s)</p>
                </>
            )
        }
    </div>
  )
}

export default LikeContainer