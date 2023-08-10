import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMessage: [],
  isNotification: false,
  status: null
};
const GlobalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    notificationHandler: (state, action) => {
      // console.log(action.payload)
      // console.log(state.isMessage)
      if (state.isMessage.length === 0) {
        console.log("length 0 run")
        state.isMessage = [...state.isMessage, { ...action.payload, time: new Date().getTime() }]
      }
      if (state.isMessage.length > 0) {
        const isMatch = state.isMessage.some(({ message }) => message.en !== action.payload.message.en)
        if (isMatch) state.isMessage = [...state.isMessage, { ...action.payload, time: new Date().getTime() }]
      }
      // if (state.isMessage.length > 0) {
      //   const isMatch = state.isMessage.some(({ message, time }) => {
      //     if (message.en !== action.payload.message.en) {
      //       console.log("if")
      //       state.isMessage = [...state.isMessage, { ...action.payload, time: new Date().getTime() }]
      //     } else {
      //       console.log("else")
      //       const currentTimeMillis = new Date().getTime();
      //       const fiveSecondsLater = time + 4000; // 5000 milliseconds = 5 seconds
      //       if (currentTimeMillis > fiveSecondsLater) {

      //       }
      //     }
      //     // else {
      //     //   console.log("else")
      //     //   const currentTimeMillis = new Date().getTime();
      //     //   const fiveSecondsLater = time + 4000; // 5000 milliseconds = 5 seconds
      //     //   if (currentTimeMillis > fiveSecondsLater) {
      //     //     state.isMessage = state.isMessage.map((data) => { return { ...data, time: new Date().getTime() } });
      //     //   } else {
      //     //     console.log('ffffffffffffffffffff')
      //     //     console.log(state.isMessage)
      //     //     const ids = state.isMessage.map(({ message }) => message.en);
      //     //     const fliteredMessage = state.isMessage.filter(({ message }, index) => !ids.includes(message.en, index + 1));
      //     //     state.isMessage = fliteredMessage
      //     //   }
      //     // }
      //   })
      //   // if (isMatch) state.isMessage = [...state.isMessage, { ...action.payload, time: new Date().getTime() }]
      // }
      state.isNotification = true
    },
    reset: (state) => {
      state.isNotification = false;
    },
    deleteMessage: (state, action) => {
      state.isMessage = state.isMessage.filter(({ message }) => message.en !== action.payload.en);
    },
    setMessageShowed: (state, action) => {
      state.isMessage = state.isMessage?.map((msg) => {
        if (msg?.message?.en === action.payload) {
          return { ...msg, show: true }
        } else {
          return { ...msg }
        }
      })
    },
  },
});

export const { notificationHandler, reset, setMessageShowed, deleteMessage } = GlobalSlice.actions;

export default GlobalSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isMessage: [],
//   isNotification: false,
//   status: null
// };
// const GlobalSlice = createSlice({
//   name: "global",
//   initialState: initialState,
//   reducers: {
//     notificationHandler: (state, action) => {
//       console.log(action.payload)
//       console.log(state.isMessage)
//       if (state.isMessage.length === 0) state.isMessage = [...state.isMessage, { ...action.payload, time: new Date().getTime() }]
//       if (state.isMessage.length > 0) {
//         const isMatch = state.isMessage.some(({ message }) => message.en !== action.payload.message.en)
//         if (isMatch) state.isMessage = [...state.isMessage, { ...action.payload, time: new Date().getTime() }]
//       }
//       state.isNotification = true
//     },
//     reset: (state) => {
//       state.isNotification = false;
//     },
//     deleteMessage: (state, action) => {
//       state.isMessage = state.isMessage.filter(({ message }) => message.en !== action.payload.en);
//     },
//     setMessageShowed: (state, action) => {
//       state.isMessage = state.isMessage?.map((msg) => {
//         if (msg?.message?.en === action.payload) {
//           return { ...msg, show: true }
//         } else {
//           return { ...msg }
//         }
//       })
//     },
//   },
// });

// export const { notificationHandler, reset, setMessageShowed, deleteMessage } = GlobalSlice.actions;

// export default GlobalSlice.reducer;
