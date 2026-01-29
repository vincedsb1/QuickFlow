import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAlternative from "../components/NavbarAlternative";
import UserContext from "../contexts/UserContext";
import OrgaContext from "../contexts/OrgaContext";

function NewIdea() {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [displayDateCountdown, setDisplayDateCountdown] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(UserContext);
  const { orgaContext } = useContext(OrgaContext);
  const [organisationName, setOrganisationName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const inputRef = useRef();

  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();

  // je récupère le nom de l'organisation (grâce au contexte), pour l'afficher dans le fil d'ariane
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/orga/${orgaContext}`).then((response) => {
      setOrganisationName(response.data[0].nom_organisation);
    });
  }, [orgaContext]);

  // Algorithme input date : Date minimale (7jours) & date maximale (60jours) par rapport à la date du jour
  useEffect(() => {
    const minDay = new Date();
    minDay.setDate(minDay.getDate() + 7);
    const maxDay = new Date();
    maxDay.setDate(maxDay.getDate() + 60);

    const dayMin = String(minDay.getDate()).padStart(2, "0");
    const monthMin = String(minDay.getMonth() + 1).padStart(2, "0");
    const yearMin = minDay.getFullYear();
    const dayMax = String(maxDay.getDate()).padStart(2, "0");
    const monthMax = String(maxDay.getMonth() + 1).padStart(2, "0");
    const yearMax = maxDay.getFullYear();

    const formattedDateMinimum = `${yearMin}-${monthMin}-${dayMin}`;
    setMinDate(formattedDateMinimum);
    const formattedDateMax = `${yearMax}-${monthMax}-${dayMax}`;
    setMaxDate(formattedDateMax);
  }, []);

  // Algorithme input date : A MODIFIER COMPTE A REBOOURS NON UTILISE Connaitre la date du jour
  const handleDateChange = (event) => {
    const newSelectedDate = new Date(event.target.value);
    setSelectedDate(newSelectedDate);

    const today = new Date();

    const diffTime = Math.abs(newSelectedDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDisplayDateCountdown(diffDays);
  };

  // Algorithme input image : Formats acceptés (jpeg, jpg, png) & taille maximale (5 Mo)
  const handleFileChange = (event) => {
    // conditions de validation de l'input file
    const file = event.target.files[0];

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!validImageTypes.includes(fileType)) {
        setErrorMessage(
          "Veuillez sélectionner une image au format PNG, JPEG, JPG"
        );
      } else if (fileSize > 5) {
        setErrorMessage("La taille de l'image ne doit pas dépasser 5 Mo.");
      } else {
        setErrorMessage(null);

        // créer un objet formData pour envoyer l'image
        const formData = new FormData();
        formData.append("photo", file);

        // upload de l'image
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/idea/upload`, formData, {
            headers,
          })
          .then(() =>
            setSelectedImage(
              `${import.meta.env.VITE_BACKEND_URL}/photo/idee/${file.name}`
            )
          )
          // Mettre à jour l'URL de l'image sélectionnée
          .catch((err) => console.error("Erreur à l'upload de l'image", err));
      }
    }
  };

  // j'envoie les données sur la route POST idea
  const sendForm = (data) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/${
      user.id
    }/orga/${orgaContext}/dashboard/creation`;
    const token = localStorage.getItem("token");

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // je transforme les données au format JSON
  const onSubmit = (data) => {
    const formData = {
      ...data,
      lien: selectedImage,
    };
    sendForm(formData);
  };

  return (
    <div>
      <NavbarAlternative onSubmit={handleSubmit(onSubmit)} />
      <div className="bg-slate-100 min-h-screen px-4 flex justify-center py-10">
        <div id="new-idea-container-content" className="max-w-4xl w-full">
          <p className="text-slate-500">
            {organisationName} / {user && user.prenom} {user && user.nom} /
            Nouvelle idée
          </p>
          <div id="new-idea-form-container" className="mt-10" required>
            <label htmlFor="input-idea-title">
              Titre <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="text"
              id="input-idea-title"
              name="titleIdea"
              className="border-solid border border-slate-300 rounded w-full h-12 px-3 text-slate-900 outline-2 outline-slate-400"
              placeholder="Introduction du travail flexible"
              {...register("titleIdea", { required: true })}
            />
            <div id="new-idea-wrapper-date-input" className="py-4">
              <label htmlFor="date-picker">
                Date limite du vote{" "}
                <span className="text-red-500 text-sm">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  id="date-picker"
                  name="dateIdea"
                  className="input-quickflow"
                  min={minDate}
                  max={maxDate}
                  onChange={handleDateChange}
                  {...register("dateIdea", { required: true })}
                />
                {selectedDate && (
                  <p className="text-slate-400">
                    {displayDateCountdown} jour(s) restant(s) avant la cloture
                    du vote
                  </p>
                )}
              </div>
            </div>
            <div id="new-idea-wrapper-contenu-input" className="py-4">
              <label htmlFor="input-description">
                Description <span className="text-red-500 text-sm">*</span>
              </label>
              <textarea
                name="descriptionIdea"
                id="input-description"
                cols="10"
                rows="8"
                className="border-solid border border-slate-300 rounded w-full p-3 text text-slate-900 outline-2 outline-slate-400"
                placeholder="Je propose que nous introduisions une politique de travail flexible qui permettrait aux employés de choisir leurs heures de travail"
                {...register("descriptionIdea", { required: true })}
              />
            </div>
            <div id="new-idea-wrapper-picture-uploader" className="py-4">
              <label htmlFor="imageUpload">Ajouter une image</label>
              <div
                id="new-idea-wrapper-button-error-info-uploader"
                className="flex flex-row pt-4 items-center "
              >
                <div
                  id="new-idea-wrapper-button-error-uploader"
                  className="w-2/5"
                >
                  <div id="new-idea-wrapper-button-uploader">
                    <Controller
                      control={control}
                      name="lien"
                      render={({ field: { value, onChange, ...field } }) => {
                        return (
                          <>
                            <label
                              htmlFor="lien"
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded inline-block cursor-pointer"
                            >
                              {selectedImage
                                ? "Changer de fichier"
                                : "Choisir un fichier"}
                            </label>
                            <input
                              type="file"
                              name="lien"
                              id="lien"
                              value={value?.fileName}
                              accept=".png, .jpg, .jpeg"
                              className="block pt-4 sr-only"
                              onChange={(event) =>
                                handleFileChange(event, onChange)
                              }
                              {...field}
                              ref={inputRef}
                            />
                          </>
                        );
                      }}
                    />
                  </div>
                  <div id="new-idea-wrapper-error-uploader" className="pt-2">
                    <small>Format PNG, JPG, JPEG. 5 Mo maximum.</small>
                    {errorMessage && (
                      <p className="text-red-500 font-medium mb-2">
                        {errorMessage}
                      </p>
                    )}
                    {selectedImage && (
                      <p className="text-slate-800 font-texts mt-2">
                        Fichier sélectionné : {selectedImage}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  id="new-idea-wrapper-picture-preview"
                  className="flex items-center justify-center w-3/5 "
                >
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-60 rounded-lg max-w-3xl"
                    />
                  )}
                </div>
              </div>
            </div>
            <div id="new-idea-wrapper-utilite-input" className="py-4">
              <label htmlFor="input-utilite">Utilité</label>
              <textarea
                name="utiliteIdea"
                id="input-utilite"
                cols="10"
                rows="3"
                className="border-solid border border-slate-300 rounded w-full p-3 text text-slate-900 outline-2 outline-slate-400"
                placeholder="Cette proposition aiderait les employés qui ont des obligations personnelles, comme prendre soin de leurs enfants ou de leurs parents âgés"
                {...register("utiliteIdea")}
              />
            </div>
            <div id="new-idea-wrapper-contexte-input" className="py-4">
              <label htmlFor="textarea-contexte">Contexte</label>
              <textarea
                name="contextIdea"
                id="textarea-contexte"
                cols="10"
                rows="3"
                className="border-solid border border-slate-300 rounded w-full p-3 text text-slate-900 outline-2 outline-slate-400"
                placeholder="Étant donné l'évolution actuelle vers le télétravail, cela semble être le bon moment pour introduire une politique de travail flexible"
                {...register("contextIdea")}
              />
            </div>
            <div id="new-idea-wrapper-benefices-input" className="py-4">
              <label htmlFor="input-benefits">Bénéfices</label>
              <textarea
                name="beneficesIdea"
                id="input-benefits"
                cols="10"
                rows="3"
                className="border-solid border border-slate-300 rounded w-full p-3 text text-slate-900 outline-2 outline-slate-400"
                placeholder="Augmentation de la satisfaction des employés, amélioration de l'équilibre travail-vie personnelle, attractivité pour de nouveaux talents"
                {...register("beneficesIdea")}
              />
            </div>
            <div id="new-idea-wrapper-inconvenients-input" className="py-4">
              <label htmlFor="input-content">Inconvénients</label>
              <textarea
                name="inconvenientsIdea"
                id="input-content"
                cols="10"
                rows="3"
                className="border-solid border border-slate-300 rounded w-full p-3 text text-slate-900 outline-2 outline-slate-400"
                placeholder="Il peut être plus difficile de coordonner les réunions ou les projets lorsque tout le monde ne travaille pas aux mêmes heures"
                {...register("inconvenientsIdea")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//
export default NewIdea;
