import Button from "../components/Button";
import Card from "../components/Card";
import '../assets/styles/Admin.css';
import H2 from "../components/H2";
import { images } from "../assets/images";

const cardData = [
  {
    title: "Banners",
    description: "Gestión de banners del sitio",
    imageSrc: images.logoPNG,
  },
  {
    title: "Tarjeta 2",
    description: "Descripción de tarjeta 2",
    imageSrc: "https://via.placeholder.com/300x150",
  },
  {
    title: "Tarjeta 3",
    description: "Descripción de tarjeta 3",
    imageSrc: "https://via.placeholder.com/300x150",
  },
  {
    title: "Tarjeta 4",
    description: "Descripción de tarjeta 4",
    imageSrc: "https://via.placeholder.com/300x150",
  },
  {
    title: "Tarjeta 5",
    description: "Descripción de tarjeta 5",
    imageSrc: "https://via.placeholder.com/300x150",
  },
  {
    title: "Tarjeta 6",
    description: "Descripción de tarjeta 6",
    imageSrc: "https://via.placeholder.com/300x150",
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
              footer={<Button variant="primary">Acción</Button>}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;