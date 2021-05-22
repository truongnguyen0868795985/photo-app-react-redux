import photoApi from "api/photoApi";
import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./styles.scss";

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const [photo, setPhoto] = useState({
    title: "hi",
    categoryId: null,
    photo: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;

  // Get photo if Edit mode
  useEffect(() => {
    if (!isAddMode) {
      try {
        const getPhoto = async () => {
          await photoApi.show({ id: photoId }).then((res) => {

            setPhoto({
              id: res.id,
              title: res.title,
              categoryId: res.categoryId,
              photo: res.photo
            })            
          });
        };
        getPhoto();
      } catch (error) {
        console.log("Can't get photo data", error);
      }
    }
  }, []);

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
          initialValues={photo}
          isAddMode={isAddMode}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
