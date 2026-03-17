import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface"
import { createUpdateProductAction } from "../actions/create-update-product.action"

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductByIdAction(id),
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            //InvalidarCache
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] })

            //Actualizar query Data
            queryClient.setQueryData(['products', { id: product.id }], product)
        }
    })


    return {
        ...query,
        mutation
    }
}
