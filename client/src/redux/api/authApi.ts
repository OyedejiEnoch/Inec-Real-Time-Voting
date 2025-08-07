import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi';

type UserDetails ={
    _id:string,
    firstName:string,
    lastName:string;
    email: string;
    password: string;
    voterId: string;
    phone:string;
    state:string
    hasVoted:boolean
    createdAt:string
}

type User ={
    message:string;
    userDetails:UserDetails
}


type LoginCredentials = {
    email: string;
    password: string;
    voterId: string;
};

type RegisterUser = {
    firstName: string;   
    lastName: string;
    email: string;
    password: string;
    voterId: string;
    phone:string;
    state:string
};


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://inec-real-time-voting.onrender.com/api', credentials: 'include',  }),
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginCredentials>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.userProfile.initiate(null));
                   
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        register: builder.mutation<User, RegisterUser>({
            query: (userData) =>({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.userProfile.initiate(null));                   
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApi;



//  transformResponse: (result:any) =>result.userDetails,
//             async onQueryStarted(_, {dispatch, queryFulfilled}){
//                 try {
//                     await queryFulfilled;
//                     const result = await dispatch(userApi.endpoints.userProfile.initiate(null)).unwrap();
//                     dispatch(setUser(result));
                   
//                 } catch (error) {
//                     console.log(error)
//                 }
//             }