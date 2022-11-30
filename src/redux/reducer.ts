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

interface InitialState {
  registrationMessage: string | null;
  users: Array<any>;
}

interface RegistrationMessage {
  message?: string;
  error?: string;
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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(user);

    const result = await response.json();
    return result;
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    registerNewUser: (state) => {
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getRegisterPage.fulfilled,
      (state, action: ActionRequest) => {
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
      }
    );
  },
});

export const { registerNewUser } = storeSlice.actions;

export default storeSlice.reducer;
