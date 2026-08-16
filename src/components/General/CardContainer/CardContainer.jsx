import React from 'react';
import './CardContainer.css';

export default function CardContainer({ children, isFirstSection }) {
    const items = React.Children.toArray(children);

    return (
        <div className={`card-container ${isFirstSection ? 'first-section' : ''}`}>
            {items.map((child, index) => (
                <div className="card-container-item" key={child.key ?? index}>
                    {child}
                </div>
            ))}
        </div>
    );
}