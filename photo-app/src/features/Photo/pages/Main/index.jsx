import photoApi from "api/photoApi";
import Banner from "components/Banner";
import Images from "constants/images";
import PhotoList from "features/Photo/components/PhotoList";
import { initPhotos, removePhoto } from "features/Photo/photoSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";

MainPage.propTypes = {};

function MainPage(props) {
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function getPhotos() {
      const photos = await photoApi.getAll();

      const action = initPhotos(photos);
      dispatch(action);
    }

    try {
      getPhotos();
    } catch (error) {
      console.log("Can't fetch photos data!", error);
    }
  }, []);

  const handlePhotoEditClick = (photo) => {
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };

  const handlePhotoRemoveClick = (photo) => {
    const removePhotoId = photo.id;

    try {
      const deletePhoto = async () => {
        const params = { id: removePhotoId };
        console.log(removePhotoId);
        await photoApi.delete(params).then((res) => {
          const action = removePhoto(removePhotoId);
          dispatch(action);
          console.log('res: ',res);
        });
      };

      deletePhoto();
    } catch (error) {
      console.log("Can't delete photo", error);
    }
  };

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <Link to="/photos/add">Add new photo</Link>
        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

export default MainPage;
