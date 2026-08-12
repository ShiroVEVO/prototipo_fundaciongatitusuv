import React, { useState } from "react";

import emailjs from "@emailjs/browser";

import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, RESPONSE_TYPES } from "../../../data"

import "./FormToMail.css";

/**
 * ============ CONFIGURACIÓN DE ENVÍO DE CORREO (EmailJS) ============
 * Como este formulario no tiene backend propio, usamos EmailJS: un
 * servicio que permite enviar correos reales directamente desde el
 * navegador. (Es gratis hasta cierto volumen mensual y porque la conexión
 * con el google forms no sirvió, ya no existe la opción de prerellenar".
 *
 * 1. Instala el paquete:  npm install @emailjs/browser
 * 2. Crea una cuenta en https://www.emailjs.com/
 * 3. En "Email Services" conecta tu cuenta de correo (Gmail, Outlook, etc.)
 *    y copia el "Service ID".
 * 4. En "Email Templates" crea una plantilla con al menos estas variables
 *    en el asunto y el cuerpo: {{subject}} y {{message}}
 *    (puedes usar {{tipo_respuesta}}, {{titulo}}, {{email}}, {{telefono}}
 *    y {{mensaje}} por separado si prefieres armar el cuerpo desde ahí).
 *    Define el destinatario fijo en el campo "To email" de la plantilla.
 *    Copia el "Template ID".
 * 5. En "Account > General" copia tu "Public Key".
 * 6. Reemplaza las 3 constantes de abajo con esos valores.
 */

/**
 * @param {string} title            Título de la instancia del formulario (se usa también en el asunto del correo)
 * @param {string} responseType     Tipo de respuesta preseleccionado (debe ser uno de RESPONSE_TYPES)
 * @param {boolean} forceType       Si es true, bloquea el select en `responseType` y el usuario no puede cambiarlo
 * @param {function} onSuccess      Callback opcional que se ejecuta al enviar correctamente
 */
export default function FormToMail({
    title = "Escríbenos",
    responseType,
    forceType = false,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        tipoRespuesta: responseType || RESPONSE_TYPES[0],
        email: "",
        telefono: "",
        mensaje: "",
    });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("sending");

        // Asunto: "Tipo de respuesta - Título"
        const subject = `${formData.tipoRespuesta} - ${title}`;

        // Cuerpo: detalle de la solicitud con email y teléfono
        const body =
            `Tipo de respuesta: ${formData.tipoRespuesta}\n` +
            `Formulario: ${title}\n` +
            `Email: ${formData.email}\n` +
            `Teléfono: ${formData.telefono}\n\n` +
            `Mensaje:\n${formData.mensaje}`;

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    subject,
                    message: body,
                    tipo_respuesta: formData.tipoRespuesta,
                    titulo: title,
                    email: formData.email,
                    telefono: formData.telefono,
                    mensaje: formData.mensaje,
                },
                { publicKey: EMAILJS_PUBLIC_KEY }
            );

            setStatus("sent");
            setFormData((prev) => ({
                tipoRespuesta: forceType ? prev.tipoRespuesta : RESPONSE_TYPES[0],
                email: "",
                telefono: "",
                mensaje: "",
            }));
            onSuccess?.();
        } catch (err) {
            setStatus("error");
            console.log(err);

        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            {title && <h3 className="contact-form__title">{title}</h3>}

            <div className="contact-form__field">
                <label htmlFor="tipoRespuesta">Tipo de respuesta</label>
                <select
                    id="tipoRespuesta"
                    name="tipoRespuesta"
                    value={formData.tipoRespuesta}
                    onChange={handleChange}
                    disabled={forceType}
                    required
                >
                    {RESPONSE_TYPES.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="contact-form__field">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="contact-form__field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="300 000 0000"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="contact-form__field">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Cuéntanos en qué te podemos ayudar..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                />
            </div>

            <button
                type="submit"
                className="contact-form__submit"
                disabled={status === "sending"}
            >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>

            {status === "sent" && (
                <p className="contact-form__feedback contact-form__feedback--ok">
                    ¡Gracias! Tu mensaje fue enviado.
                </p>
            )}
            {status === "error" && (
                <p className="contact-form__feedback contact-form__feedback--error">
                    Hubo un problema enviando tu mensaje. Intenta de nuevo.
                </p>
            )}
        </form>
    );
}