import type { ReactNode } from 'react';
import '../assets/styles/H2.css';

interface H2Props {
  children: ReactNode;
  className?: string;
  underlineClassName?: string;
}

const H2 = ({ children, className = '', underlineClassName = '' }: H2Props) => {
  return (
    <>
      <h2 className={`heading-h2 ${className}`}>
        {children}
        <span className={`heading-underline ${underlineClassName}`}></span>
      </h2>
    </>
  );
};

export default H2;