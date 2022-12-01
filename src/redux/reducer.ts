import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

interface ActionRequest {
  type: string;
  payload?: any;
  meta?: {
    arg: any;
    requestId: string;
    requestStatus: string;
  };
}

interface InitialState {
  registrationMessage: string | null;
  users: Array<any>;
}

interface RegistrationMessage {
  message?: string;
  error?: string;
}

interface TokenRequest {
  error: null | string;
  token: string;
}

type User = {
  username: string;
  password: string;
};

const initialState: InitialState = {
  registrationMessage: null,
  users: [],
};

export const getRegisterPage = createAsyncThunk<RegistrationMessage, User>(
  "register",
  async (user: User) => {
    const url = "http://localhost:8080/register";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();
    return result;
  }
);

export const getLoginPage = createAsyncThunk<TokenRequest, User>(
  "login",
  async (user: User) => {
    const url: string = "http://localhost:8080/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();
    const token = await result.token;
    localStorage.setItem("token", token);
    return result;
  }
);

// export const getAboutPage = createAsyncThunk("about", async (user: User) => {
//   const url = "http://localhost:8080/about";
//   const token = localStorage.getItem("token");
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });

//   const result = await res.json();
//   return result;
// });

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    registerNewUser: (state) => {
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLoginPage.fulfilled, (state) => {
        return state;
      })
      .addCase(getRegisterPage.fulfilled, (state, action: ActionRequest) => {
        if (action.payload.error) {
          return {
            ...state,
            registrationMessage: action.payload.error,
          };
        }

        return {
          ...state,
          registrationMessage: action.payload.message,
          users: [...state.users, action.meta.arg],
        };
      });
  },
});

export const { registerNewUser } = storeSlice.actions;

export default storeSlice.reducer;
