// -------------------------Imports---------------------------

import "./ProfileImageUpload.scss";

import { placeholderImage, Button, editPen, mediaUrl } from "../../utils/files";

// -------------------------Imports---------------------------

const ProfileImageUpload = ({ provider, image, setImage, editUser }) => {
    return (
        <div className="image_edit_main">
            <form className="image_edit_wrapper">
                <img
                    src={
                        provider
                            ? image
                                ? URL.createObjectURL(image)
                                : `${mediaUrl}${provider?.activeUser?.profileImage}`
                            : image
                            ? URL.createObjectURL(image)
                            : placeholderImage
                    }
                    alt="user profile image"
                />
                <input
                    type="file"
                    name=""
                    accept="image/*"
                    id=""
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </form>
            <div>
                {image ? (
                    <div>
                        <Button
                            btnContent={"⟲"}
                            btnFunction={() => setImage(null)}
                        />
                    </div>
                ) : (
                    <img className="edit_icon" src={editPen} alt="edit icon" />
                )}
                {image && (
                    <div>
                        <Button btnContent={"⇧"} btnFunction={editUser} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileImageUpload;
