import React, { useRef, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { InvoiceService } from "../../services/invoice.service";
import { IInvoice } from "../../types/invoice";
import { BetHistoryService } from "../../services/betHistory.service";
import { IBetHistory } from "../../types/betHistory";
import { IAuction } from "../../types/auction";
import { AuctionService } from "../../services/auction.service";
import { IUser } from "../../types/user";
import { AuthService } from "../../services/auth.service";

export default function InvoiceCard() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<IInvoice | null>(null);
    const [auction, setAuction] = useState<IAuction>();
    const [user, setUser] = useState<IUser>();
    const [betHistory, setBetHistory] = useState<IBetHistory>();
    const invoiceRef = useRef<HTMLDivElement>(null); // Прив'язуємо ref до компонента

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser: IUser = await AuthService.get();
            setUser(fetchedUser);
        };

        const fetchInvoice = async () => {
            const fetchedInvoice: IInvoice = await InvoiceService.get(Number(id));
            setInvoice(fetchedInvoice);

            if (fetchedInvoice?.betHistoryId) {
                const fetchedBetHistory = await BetHistoryService.getBetHistory(fetchedInvoice.betHistoryId);
                setBetHistory(fetchedBetHistory);
                const fetchedAuction = await AuctionService.getAuction(fetchedBetHistory.auctionId);
                setAuction(fetchedAuction);
            }
        };

        fetchUser();
        fetchInvoice();
    }, [id]);

    const downloadPdf = async () => {
        if (!invoiceRef.current) return;

        const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf");
    };

    return (
        <Box sx={{ padding: 4 }}>
            <div className="invoice-btn-container">
                <Button onClick={downloadPdf} variant="contained">
                    <img
                        className="button-img"
                        src="https://img.icons8.com/?size=100&id=36926&format=png&color=ffffff"
                    />
                    Download Pdf
                </Button>
            </div>
            <Box ref={invoiceRef} className="invoice-container">
                <Box className="invoice-header">
                    <Box className="invoice-header-item flex">
                        <Box className="invoice-ttl-cont">
                            <h1 className="invoice-ttl">Invoice</h1>
                        </Box>
                        <Box className="invoice-id-cont">
                            <div className="invoice-id-info">
                                <p className="invoice-id-lbl">Invoice #</p>
                                <p className="invoice-id">{invoice?.id}</p>
                            </div>
                            <div className="invoice-cube"></div>
                        </Box>
                    </Box>
                    <h5 className="invoice-company-name">Auction Online</h5>
                    <Box className="invoice-divider"></Box>
                </Box>

                <Box className="invoice-billing-info">
                    <p className="invoice-billing-ttl">Billing to:</p>
                    <Box className="invoice-user-info-cont">
                        <p className="invoice-user-info">{user?.userName}</p>
                        <p className="invoice-user-info">{user?.email}</p>
                    </Box>
                </Box>

                <Box className="invoice-divider-full"></Box>

                <Box className="invoice-body">
                    <Typography variant="subtitle1">
                        Date: {invoice ? new Date(invoice.date).toLocaleString() : "Loading..."}
                    </Typography>
                    <Typography variant="subtitle1">
                        Auction Date: {auction ? new Date(auction.date).toLocaleString() : "Loading..."}
                    </Typography>
                    <Typography variant="subtitle1">Bet: ${betHistory?.bet}</Typography>
                    <Typography variant="subtitle1">Name: {auction?.name}</Typography>
                    <Typography variant="subtitle1">Description: {auction?.description}</Typography>
                    <Typography variant="subtitle1">Year: {auction?.year}</Typography>
                </Box>

                <Box className="terms-conditions-cont">
                    <Box className="invoice-cube"></Box>
                    <Box className="terms-conditions-info">
                        <p className="terms-conditions-ttl">Terms and Conditions:</p>
                        <p className="terms-conditions-text">
                            By participating in the auction and making a purchase, the buyer agrees to pay in full,
                            accept all items "as is" without warranty, bear applicable taxes and fees, and understand
                            that all sales are final with no refunds or returns.
                        </p>
                    </Box>
                </Box>

                <Box className="invoice-footer">
                    <Box className="invoice-company-socials">
                        <img
                            className="company-social"
                            src="https://img.icons8.com/?size=100&id=12599&format=png&color=ffffff"
                        />
                        <img
                            className="company-social"
                            src="https://img.icons8.com/?size=100&id=118467&format=png&color=ffffff"
                        />
                        <img
                            className="company-social"
                            src="https://img.icons8.com/?size=100&id=dz63urxyxSdO&format=png&color=ffffff"
                        />
                        <img
                            className="company-social"
                            src="https://img.icons8.com/?size=100&id=lUktdBVdL4Kb&format=png&color=ffffff"
                        />
                    </Box>
                    <p className="invoice-company-tag">@auctions-online-client</p>
                    <p className="invoice-company-email">auctions.online@gmail.com</p>
                </Box>
            </Box>
        </Box>
    );
}
