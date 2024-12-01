import { useEffect, useState } from "react";
import { IInvoice } from "../../types/invoice";
import { IProduct } from "../../types/product";
import { ProductService } from "../../services/product.service";

export default function InvoiceUserCard({ id, date, productId }: IInvoice) {
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await ProductService.get(productId);

            setProduct(result);
        };

        fetchProduct();
    }, []);

    return (
        <div className="invoice-user-card">
            <h4>{product?.name}</h4>

            <div className="btn-container end">
                <button>Details</button>
                <button>Delete</button>
            </div>
        </div>
    );
}
