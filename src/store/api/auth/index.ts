import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Signup API call
    signup: builder.mutation<any, any>({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: newUser,
      }),
    }),
    // sendOtp: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: "/auth/send-otp",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // verifyOtp: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: "/auth/login-otp",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // resetPassword: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: "/auth/reset-password",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // forgetPassword: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: "/auth/forget-password",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // isAuth: builder.query<any, void>({
    //   query: () => "/auth/isAuth",
    // }),
    userData: builder.query<any, void>({
      query: () => "auth/get-user-data",
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useUserDataQuery,
  useLogoutMutation,
} = authApi;
