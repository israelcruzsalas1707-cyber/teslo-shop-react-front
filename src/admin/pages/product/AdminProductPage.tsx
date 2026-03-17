import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { useProduct } from "@/pages/hooks/useProduct"
export const AdminProductPage = () => {


    const handelComaSize = (value: string[]) => {
        return value.join(',');

    }

    const { data, isLoading } = useProduct();
    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    return (
        <>
            <AdminTitle title="Prodcutos" subtitle="Mira y administra tus productos..." />
            <div className=" flex justify-end">
                <Link to='/admin/products/new'>
                    <Button >
                        <PlusIcon />
                        Agregar Nuevo Producto
                    </Button>
                </Link>
            </div>


            <Table className=" bg-white shadow-xs border border-gray-200 my-5">
                <TableHeader>
                    <TableRow>

                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.products.map(product => (
                            <TableRow key={product.id}>

                                <TableCell>
                                    <img src={product.images[0]} alt="producto"
                                        className="w-20 h-20 object-cover rounded-md" />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline">
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{`${product.price},00 MXN`}</TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{handelComaSize(product.sizes)}</TableCell>
                                <TableCell className="text-right ">
                                    <Link to={`/admin/products/${product.id}`} >
                                        <PencilIcon className="w-4 h-4 text-blue-500" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
