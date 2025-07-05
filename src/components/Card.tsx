import React from 'react';
import '../assets/styles/Card.css';

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = 'Imagen de tarjeta',
  footer,
  children,
}) => {
  return (
    <div className="custom-card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
      </div>
      {imageSrc && (
        <img className="card-image" src={imageSrc} alt={imageAlt} />
      )}
      <div className="card-body">
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;