import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  const ramdomNumber = async (startNumber, endNumber) => {
    const random = await random();
    return Math.trunc(random * (endNumber - startNumber));
  };
  const handleSubmit = (values) => {
    let action = null;
    setTimeout(() => {
      if (isAddMode) {
        const newPhoto = {
          ...values,
          id: ramdomNumber(10000, 99999),
        };

        action = addPhoto(newPhoto);
      } else {
        action = updatePhoto(values);
      }

      dispatch(action);
      history.push("/photos");
    }, 2000);
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm initialValues={initialValues} isAddMode={isAddMode} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddEditPage;
