import { useEffect, useState } from "react";
import { ProductService } from "../../services/product.service";
import { IAuctionUserCardProps } from "../../types/auction";
import { IProduct } from "../../types/product";

export default function AuctionUserCard({ productId }: IAuctionUserCardProps) {
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await ProductService.get(productId);

            setProduct(result);
        };

        fetchProduct();
    }, []);

    return (
        <div className="auction-user-card">
            <h4>{product?.name}</h4>

            <div className="btn-container end">
                <button>Purchase</button>
            </div>
        </div>
    );
}
