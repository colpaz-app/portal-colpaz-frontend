import Card from "../components/Card";
import '../assets/styles/Admin.css';
import H2 from "../components/H2";
import { images } from "../assets/images";
import { Link } from "react-router-dom";

const cardData = [
  {
    title: "Banners",
    description: "Gestión de banners del sitio",
    imageSrc: images.logoPNG,
    link: "/admin/banners",
    textButton: "Administrar",
  },
  {
    title: "Usuarios",
    description: "Gestión de usuarios del sitio",
    imageSrc: images.logoPNG,
    link: "/admin/usuarios",
    textButton: "Administrar",
  },
  {
    title: "Tarjeta 3",
    description: "Descripción de tarjeta 3",
    imageSrc: images.logoPNG,
    link: "/admin/tarjeta-3",
    textButton: "Administrar",
  },
  {
    title: "Tarjeta 4",
    description: "Descripción de tarjeta 4",
    imageSrc: images.logoPNG,
    link: "/admin/tarjeta-4",
    textButton: "Administrar",
  },
  {
    title: "Tarjeta 5",
    description: "Descripción de tarjeta 5",
    imageSrc: images.logoPNG,
    link: "/admin/tarjeta-5",
    textButton: "Administrar",
  },
  {
    title: "Tarjeta 6",
    description: "Descripción de tarjeta 6",
    imageSrc: images.logoPNG,
    link: "/admin/tarjeta-6",
    textButton: "Administrar",
  },
];

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-main">
        <H2>Panel de Administración</H2>
        <div className="card-grid">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageSrc={card.imageSrc}
              footer={<Link className="admin-card-link" to={card.link}>{card.textButton}</Link>}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;