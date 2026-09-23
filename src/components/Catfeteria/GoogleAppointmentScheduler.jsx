import { useState, useEffect, useRef, useMemo } from "react";
import "./GoogleAppointmentScheduler.css";

export default function GoogleAppointmentScheduler({
    scheduleUrl,
    title = "Reserva tu evento",
    subtitle = "Elige el día y la hora que mejor te funcione. Recibirás la confirmación por correo y el evento quedará agendado automáticamente c:",
    compactGoogleChrome = true,
    extraParams = {},
    loadingLabel = "Cargando disponibilidad…",
    missingUrlLabel = "Falta configurar la URL del horario de citas de Google Calendar.",

    className = "",
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const iframeRef = useRef(null);

    const finalUrl = useMemo(() => {
        if (!scheduleUrl) return null;
        try {
            const url = new URL(scheduleUrl);
            if (compactGoogleChrome) url.searchParams.set("gv", "true");
            Object.entries(extraParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.set(key, String(value));
                }
            });
            return url.toString();
        } catch {
            return null;
        }
    }, [scheduleUrl, compactGoogleChrome, extraParams]);

    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
    }, [finalUrl]);

    const isValidGoogleUrl =
        !!finalUrl && finalUrl.includes("calendar.google.com");

    return (
        <div
            className={`gcal-scheduler-wrapper w-full flex flex-col items-center ${className}`}
            style={{ marginInline: "auto" }}
        >
            {(title || subtitle) && (
                <div className="w-full mb-4 text-left">
                    {title && (
                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <div
                className="gcal-scheduler-frame relative w-full rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
            >
                {!isValidGoogleUrl ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center bg-slate-50">
                        <span className="text-sm font-medium text-slate-700">
                            {missingUrlLabel}
                        </span>
                        <span className="text-xs text-slate-400">
                            Pasa una URL válida de Google Calendar en la prop{" "}
                            <code className="px-1 py-0.5 rounded bg-slate-100">
                                scheduleUrl
                            </code>
                            .
                        </span>
                    </div>
                ) : (
                    <>
                        {!isLoaded && !hasError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-6 w-6 rounded-full border-2 border-slate-200 border-t-slate-500 animate-spin" />
                                    <span className="text-sm text-slate-400">
                                        {loadingLabel}
                                    </span>
                                </div>
                            </div>
                        )}

                        {hasError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-slate-50">
                                <span className="text-sm font-medium text-slate-700">
                                    No se pudo cargar el horario aquí.
                                </span>
                                <a
                                    href={finalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-sky-600 hover:text-sky-700 underline underline-offset-2"
                                >
                                    Abrir la página de reservas en una pestaña nueva
                                </a>
                            </div>
                        )}

                        <iframe
                            ref={iframeRef}
                            key={finalUrl}
                            src={finalUrl}
                            title={title || "Google Calendar - Horario de citas"}
                            className="gcal-scheduler-iframe w-full h-full border-0"
                            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 200ms ease" }}
                            onLoad={() => setIsLoaded(true)}
                            onError={() => setHasError(true)}
                            loading="lazy"
                        />
                    </>
                )}
            </div>

            {isValidGoogleUrl && (
                <a
                    href={finalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2"
                >
                    ¿No se ve bien aquí? Abrir en una pestaña nueva
                </a>
            )}
        </div>
    );
}