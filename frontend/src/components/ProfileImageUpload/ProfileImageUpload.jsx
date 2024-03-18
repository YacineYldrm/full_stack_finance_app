import { useState } from "react";
import "./ProfileImageUpload.scss";
import placeholderImage from "../../../public/PlaceHolderImage.svg";
import editPen from "../../../public/edit_pen.svg";

const ProfileImageUpload = ({ provider }) => {
    const [image, setImage] = useState(null);
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
                        <Button btnContent={"⟲"} btnFunction={setImage} />
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