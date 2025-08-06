import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {setUser , setLoading, UserDetails} from "@/redux/features/authSlice"



type UpdateProfile ={
    name:string,
    email:string
}
type UpdatePassword ={
    oldPassword:string,
    newPassword:string
}


export const userApi = createApi({
    reducerPath:"userApi",
    tagTypes:["User"],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api', credentials: 'include', }),

    endpoints: (builder)=>({
        userProfile: builder.query<UserDetails, void | null>({
            query:()=> "/user/profile",
            transformResponse: (result:any) =>result.userDetails,
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    const {data}= await queryFulfilled
                    dispatch(setUser(data));
                } catch (error) {
                    dispatch(setLoading(false))
                    console.log(error)
                }
            },
            providesTags:["User"]
        }),
 
    })
})

export const {useUserProfileQuery,} = userApi