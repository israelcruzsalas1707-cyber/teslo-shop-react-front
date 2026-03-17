import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../layouts/shop/components/CustomJumbotron"
import { ProductGrid } from "../layouts/shop/components/ProductGrid"
import { useProduct } from "../hooks/useProduct"

export const HomePage = () => {
    const { data } = useProduct();

    return (
        <div>
            <CustomJumbotron title=" Teslo  Shop" />
            <ProductGrid products={data?.products || []} />
            <CustomPagination totalPages={data?.pages || 0} />
        </div>

    )
}
