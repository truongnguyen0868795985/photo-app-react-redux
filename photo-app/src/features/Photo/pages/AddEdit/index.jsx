import photoApi from "api/photoApi";
import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./styles.scss";

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;

  const editedPhoto = useSelector((state) =>
    state.photos.find((x) => x.id === +photoId)
  );

  const initialValues = isAddMode
    ? {
        title: "",
        categoryId: null,
        photo: "",
      }
    : editedPhoto;

  console.log("initialValues in add edit", initialValues);
  const handleSubmit = (values) => {
    // Add new photo
    if (isAddMode) {
      try {
        const storePhoto = async () => {
          await photoApi.store(values).then(
            (res) => {
              const newPhoto = {
                ...values,
                id: res,
              };
              const action = addPhoto(newPhoto);
              dispatch(action);
              console.log("res: ", res);
            },
            (error) => {
              console.log("Can't store photo: ", error);
            }
          );
        };

        storePhoto();
      } catch (error) {
        console.log("Can't store photo trycatch: ", error);
      }
    } else {
      // Edit photo
      try {
        const editPhoto = async () => {
          await photoApi
            .update(values)
            .then((res) => {
              const action = updatePhoto(values);
              dispatch(action);
              console.log("Update response: ", res);

            })
            .catch(function (error) {
              console.log("Can't store photo: ", error);
            });
        };

        editPhoto();
      } catch (error) {
        console.log("Can't store photo trycatch: ", error);
      }
    }

    history.push("/photos");
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          initialValues={initialValues}
          isAddMode={isAddMode}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
