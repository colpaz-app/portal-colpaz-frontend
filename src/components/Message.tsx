import type { ReactNode } from 'react';
import '../assets/styles/Message.css';

interface Props {
    type: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    children: ReactNode;
}

const Message = ({ type, title, children }: Props) => {
    return (
        <div className={`message-component ${type}`}>
            {title && <strong className="title">{title}</strong>}
            <div className="message-body">{children}</div>
        </div>
    );
};

export default Message;