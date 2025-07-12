import Card from "../components/Card";
import '../assets/styles/admin/Admin.css';
import H2 from "../components/H2";
import { images } from "../assets/images";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";

const Admin = () => {
    const { t } = useTranslation();

    const cardData = [
        {
            title: t("adminPanel.cards.banners.title"),
            description: t("adminPanel.cards.banners.description"),
            imageSrc: images.logoPNG,
            link: "/admin/banners",
            textButton: t("adminPanel.manage"),
            titleLink: t("adminPanel.cards.banners.titleLink"),
        },
        {
            title: t("adminPanel.cards.languages.title"),
            description: t("adminPanel.cards.languages.description"),
            imageSrc: images.logoPNG,
            link: "/admin/languages",
            textButton: t("adminPanel.manage"),
            titleLink: t("adminPanel.cards.languages.titleLink"),
        },
        {
            title: t("adminPanel.cards.translatedBanners.title"),
            description: t("adminPanel.cards.translatedBanners.description"),
            imageSrc: images.logoPNG,
            link: "/admin/translated-banners",
            textButton: t("adminPanel.manage"),
            titleLink: t("adminPanel.cards.translatedBanners.titleLink"),
        },
        {
            title: t("adminPanel.cards.users.title"),
            description: t("adminPanel.cards.users.description"),
            imageSrc: images.logoPNG,
            link: "/admin/users",
            textButton: t("adminPanel.manage"),
            titleLink: t("adminPanel.cards.users.titleLink"),
        },
    ];

    const {
        currentPage,
        totalPages,
        paginatedData,
        goToPage,
    } = usePagination(cardData, 8);

    return (
        <div className="admin-page">
            <div className="admin-page-main">
                <H2>{t("adminPanel.title")}</H2>
                <div className="card-grid">
                    {paginatedData.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            description={card.description}
                            imageSrc={card.imageSrc}
                            footer={
                                <Link title={card.titleLink} className="admin-card-link" to={card.link}>
                                    {card.textButton}
                                </Link>
                            }
                        />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>
        </div>
    );
};

export default Admin;