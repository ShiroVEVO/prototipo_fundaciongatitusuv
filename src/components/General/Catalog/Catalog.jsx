import { useState } from "react";

import ServiceCard from "../../ProductCard";

import { SERVICE_CATEGORIES } from '../../../data'

import "./Catalog.css";

/* -------------------------- handleReservation --------------------------- */
/* Placeholder provisional, reemplazar con el contenido de esta función por lógica real
   (abrir un modal de reserva, redirigir, llamar a tu API, etc). */

function handleReservation(service) {
    console.log("Reserva solicitada:", {
        id: service.id,
        titulo: service.title,
        subtitulo: service.subtitle,
        precio: service.price,
    });
}

export default function Catalog() {
    return (
        <div className="gatitu-page">
            <header className="gatitu-header">
                <p className="gatitu-header-kicker">Fundación Gatitu</p>
                <h1 className="gatitu-header-title">Nuestros servicios</h1>
                <p className="gatitu-header-sub">
                    Toca cualquier tarjeta para ver qué incluye. Todos los planes apoyan
                    a los gatos residentes de la fundación.
                </p>
            </header>

            {SERVICE_CATEGORIES.map((category) => (
                <section className="gatitu-section" key={category.id}>
                    <div className="gatitu-section-head">
                        <h2 className="gatitu-section-title">{category.label}</h2>
                        <p className="gatitu-section-tagline">{category.tagline}</p>
                    </div>
                    <div className="gatitu-grid">
                        {category.services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                category={category}
                                onReserve={handleReservation}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
