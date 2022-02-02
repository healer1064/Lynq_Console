// libraries
import { useState, useRef, useContext, useEffect } from "react";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import { postProfilePicReq } from "@/utils/requests/public-profile";

// icons
import { FaImage } from "react-icons/fa";

// components
import Loading from "@/components/common/Loading";

const index = ({ image, setImage }) => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [imageLoading, setImageLoading] = useState(false);

  // handle image select
  const handleImageSelect = (e) => {
    setImageLoading(true);
    postProfilePicReq(token, e.target.files[0])
      .then((res) => {
        setImageLoading(false);
        setImage(res.public_image);
        toast.success("Profile picture updated!");
      })
      .catch(() => {
        setImageLoading(false);
        toast.error("Failed to upload profile picture!");
      });
  };

  return (
    <div className={styles.edit_profile_img_container}>
      <label htmlFor="image">
        {imageLoading ? (
          <div className={styles.place_holder}>
            <Loading />
          </div>
        ) : image !== null ? (
          <img src={image} className={styles.edit_profile_img} />
        ) : (
          <div className={styles.place_holder}>
            <FaImage size={26} />
          </div>
        )}
      </label>
      <div className={styles.edit_profile_btn_container}>
        <input
          id="image"
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
          onChange={handleImageSelect}
        />
      </div>
      <button className={styles.update_btn}>Update Picture</button>
      <button className={styles.delete_btn}>Delete</button>
    </div>
  );
};

export default index;
