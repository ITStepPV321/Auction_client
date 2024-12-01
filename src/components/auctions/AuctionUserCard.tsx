import { useEffect, useState } from "react";
import { ProductService } from "../../services/product.service";
import { IAuctionUserCardProps } from "../../types/auction";
import { IProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";

export default function AuctionUserCard({ productId }: IAuctionUserCardProps) {
    const [product, setProduct] = useState<IProduct>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await ProductService.get(productId);

            setProduct(result);
        };

        fetchProduct();
    }, []);

    const buyProduct = async () => {
        navigate(`/create-invoice`);
    };

    return (
        <div className="auction-user-card">
            <h4>{product?.name}</h4>

            <div className="btn-container end">
                <button>Buy</button>
            </div>
        </div>
    );
}
