import { CustomPagination } from "@/components/custom/CustomPagination"

import { CustomJumbotron } from "../layouts/shop/components/CustomJumbotron"
import { ProductGrid } from "../layouts/shop/components/ProductGrid"
import { useParams } from "react-router"
import { useProduct } from "../hooks/useProduct"

export const GenderPage = () => {

    const { data } = useProduct()
    const { gender } = useParams()
    const genderTitle =
        gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : gender === 'kid' ? 'Niños' : ''

    return (
        <>
            <CustomJumbotron title={`Productos para ${genderTitle}`} />
            <ProductGrid products={data?.products || []} />
            <CustomPagination totalPages={data?.pages || 1} />
        </>

    )
}
