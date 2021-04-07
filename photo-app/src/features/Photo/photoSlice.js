import { createSlice } from "@reduxjs/toolkit";


const photos = [
  {
      "photo": "https://picsum.photos/id/237/300/300"
  },
  {
      "photo": "https://picsum.photos/id/530/300/300"
  },
  {
      "photo": "https://picsum.photos/id/552/300/300"
  },
  {
      "photo": "https://picsum.photos/id/76/300/300"
  },
  {
      "photo": "https://picsum.photos/id/648/300/300"
  },
  {
      "photo": "https://picsum.photos/id/316/300/300"
  },
  {
      "photo": "https://picsum.photos/id/973/300/300"
  },
  {
      "photo": "https://picsum.photos/id/918/300/300"
  },
  {
      "photo": "https://picsum.photos/id/919/300/300"
  },
  {
      "photo": "https://picsum.photos/id/545/300/300"
  },
  {
      "photo": "https://picsum.photos/id/507/300/300"
  },
  {
      "photo": "https://picsum.photos/id/183/300/300"
  },
  {
      "photo": "https://picsum.photos/id/121/300/300"
  },
  {
      "photo": "https://picsum.photos/id/545/300/300"
  },
  {
      "photo": "https://picsum.photos/id/411/300/300"
  },
  {
      "photo": "https://picsum.photos/id/166/300/300"
  },
  {
      "photo": "https://picsum.photos/id/432/300/300"
  },
  {
      "photo": "https://picsum.photos/id/449/300/300"
  },
  {
      "photo": "https://picsum.photos/id/879/300/300"
  },
  {
      "photo": "https://picsum.photos/id/1042/300/300"
  },
  {
      "photo": "https://picsum.photos/id/607/300/300"
  },
  {
      "photo": "https://picsum.photos/id/766/300/300"
  },
  {
      "photo": "https://picsum.photos/id/495/300/300"
  },
  {
      "photo": "https://picsum.photos/id/612/300/300"
  },
  {
      "photo": "https://picsum.photos/id/460/300/300"
  },
  {
      "photo": "https://picsum.photos/id/315/300/300"
  },
  {
      "photo": "https://picsum.photos/id/45/300/300"
  },
  {
      "photo": "https://picsum.photos/id/360/300/300"
  },
  {
      "photo": "https://picsum.photos/id/251/300/300"
  },
  {
      "photo": "https://picsum.photos/300/300"
  },
  {
      "photo": "https://picsum.photos/id/294/300/300"
  },
  {
      "photo": "https://picsum.photos/id/693/300/300"
  },
  {
      "photo": "https://picsum.photos/id/782/300/300"
  }
];


let initialPhotos = [];

const photo = createSlice({
  name: "photos",
  initialState: initialPhotos,
  reducers: {
    initPhotos : (state, action) => {
      return state = action.payload;
    },
    addPhoto: (state, action) => {
      state.push(action.payload);
    },
    removePhoto: (state, action) => {
      const removeId = action.payload;
      return (state = state.filter((photo) => photo.id !== removeId));
    },
    updatePhoto: (state, action) => {
      const newPhoto = action.payload;
      const photoIndex = state.findIndex((photo) => photo.id === newPhoto.id);

      if (photoIndex >= 0) {
        state[photoIndex] = newPhoto;
      }
    },
  },
});

const { reducer, actions } = photo;
export const { initPhotos, addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };
