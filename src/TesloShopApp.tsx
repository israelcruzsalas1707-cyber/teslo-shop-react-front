import { useAuthStore } from "./auth/store/auth.store"

import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient, useQuery } from "@tanstack/react-query"
import { Toaster } from "sonner"

import { type PropsWithChildren } from "react"
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading"




const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { checkAuthStatus } = useAuthStore()
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5,
        refetchOnWindowFocus: true
    })
    if (isLoading) return <CustomFullScreenLoading />
    return children
}

export const TesloShopApp = () => {



    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {/* Custom Provider */}
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
                <ReactQueryDevtools initialIsOpen={false} />
            </CheckAuthProvider>

        </QueryClientProvider>



    )

}
