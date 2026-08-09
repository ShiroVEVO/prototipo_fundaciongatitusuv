import React from "react";
import "./InfographicItem.css";

/**
 * Franja informativa a ancho completo de pantalla, con el contenido
 * limitado al 70% del ancho, dividida en 2 mitades horizontales.
 *
 * @param {string} title      Título de la franja
 * @param {string} body       Texto descriptivo
 * @param {"left"|"right"} direction  Lado donde va la imagen. El texto
 *                             siempre queda en la mitad contraria y se
 *                             justifica hacia el lado que toca la imagen.
 * @param {string} image      URL de la imagen
 */

export default function InfographicItem({ title, body, direction = "left", image }) {
    return (
        <section className={`infographic-item infographic-item--${direction}`}>
            <div className="infographic-item__inner">
                <div className="infographic-item__image-wrap">
                    <img
                        src={import.meta.env.BASE_URL + image}
                        alt={title}
                        className="infographic-item__image"
                        loading="lazy"
                    />
                </div>

                <div className="infographic-item__text-wrap">
                    <h3 className="infographic-item__title">{title}</h3>
                    <p className="infographic-item__body">{body}</p>
                </div>
            </div>
        </section>
    );
}
