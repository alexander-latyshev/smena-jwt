import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ActionRequest {
  type: string;
  payload?: any;
  meta?: {
    arg: any;
    requestId: string;
    requestStatus: string;
  };
}

export interface RegistrationMessage {
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

export type UserProfile = {
  [key: string]: string | number;
};

interface InitialState {
  registrationMessage: RegistrationMessage;
  users: Array<any>;
  userProfile: UserProfile | {};
}

const initialState: InitialState = {
  registrationMessage: null,
  users: [],
  userProfile: {},
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

export const getAboutPage = createAsyncThunk("about", async () => {
  const url = "http://localhost:8080/about";
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const result = await res.json();
  return result;
});

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
      .addCase(getRegisterPage.fulfilled, (state, action: ActionRequest) => {
        if (action.payload.error) {
          return {
            ...state,
            registrationMessage: action.payload,
          };
        }

        return {
          ...state,
          registrationMessage: action.payload,
          users: [...state.users, action.meta.arg],
        };
      })
      .addCase(getLoginPage.fulfilled, (state) => {
        return state;
      })
      .addCase(getAboutPage.fulfilled, (state, action: ActionRequest) => {
        console.log(action);

        return {
          ...state,
          userProfile: { ...action.payload.data },
        };
      });
  },
});

export const { registerNewUser } = storeSlice.actions;

export default storeSlice.reducer;
