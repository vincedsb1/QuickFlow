import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import UserContext from "../contexts/UserContext";

function EditPhotoUser({ editMode, photo, setPhoto }) {
  const inputRef = useRef();

  // on récupère les informations utilisateurs
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (user && user.id) {
      const fetchUser = async () => {
        try {
          await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`)
            .then((res) => setUser(res.data[0]));
        } catch {
          console.error("Error getting user");
        }
      };
      fetchUser();
    }
  }, [user]);

  // fonction qui upload le changement d'image
  const handleFileChange = async (event) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();

    formData.append("photo", inputRef.current.files[0]);
    const file = event.target.files[0];

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/upload`,
      formData,
      { headers }
    );
    setPhoto(`${import.meta.env.VITE_BACKEND_URL}/photo/user/${file.name}`);
  };

  return (
    <div
      id="SettingsUserPhotoContainer"
      className="flex flex-col justify-center items-center mr-8 "
    >
      <div id="SettingsUserPhoto" className="rounded-full w-[250px] h-[250px] ">
        <img
          src={photo === "" ? user.photoProfil : photo}
          alt="PP"
          className="w-full h-full rounded-full border border-solid border-slate-300 object-cover"
        />
      </div>
      <div
        id="SettingsEditPhoto"
        className="flex flex-col items-center gap-2 mt-2"
      >
        {editMode && (
          <label
            htmlFor="upload"
            className="font-texts cursor-pointer text-lg text-sky-600 font-bold"
          >
            Modifier
          </label>
        )}

        <input
          id="upload"
          className="hidden"
          type="file"
          name="photo"
          onChange={handleFileChange}
          ref={inputRef}
        />
      </div>
    </div>
  );
}

EditPhotoUser.propTypes = {
  editMode: PropTypes.bool.isRequired,
  photo: PropTypes.string,
  setPhoto: PropTypes.func.isRequired,
};

EditPhotoUser.defaultProps = {
  photo: "",
};

export default EditPhotoUser;
