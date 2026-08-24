const ADOPTION_QUESTIONS = [
    {
        id: "tratamiento_datos",
        type: "single_choice",
        label: "¿Autorizas el tratamiento de sus datos de acuerdo con la Ley 1581 de 2012?",
        required: true,
        options: [
            { value: "si", label: "Sí" },
            { value: "no", label: "No" },
        ],
    },
    {
        id: "fecha_solicitud",
        type: "date",
        label: "Fecha de la solicitud",
        required: true,
        dependsOn: { questionId: "tratamiento_datos", value: "si" }
    },
    {
        id: "nombre_adoptante",
        type: "short_text",
        label: "Nombre completo del adoptante",
        required: true,
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "nacimiento_adoptante",
        type: "date",
        label: "fecha de nacimiento del adoptante",
        required: true,
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "email",
        type: "email",
        label: "Correo electrónico del adoptante",
        required: true,
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "ciudad_residencia",
        type: "short_text",
        label: "Ciudad de residencia del adoptante",
        required: true,
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
        // helpText: "Opcional, pero nos ayuda a conocerte mejor.",
        // placeholder: "Escribe aquí...",
    },
    {
        id: "barrio",
        type: "short_text",
        label: "Barrio de residencia del adoptante",
        required: true,
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "direccion_residencia",
        type: "short_text",
        label: "Dirección de residencia del adoptante",
        required: true,
        placeholder: "Ej. Calle 45 #12-30...",
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "telefono_principal",
        type: "short_text",
        label: "Teléfono principal de contacto",
        required: true,
        placeholder: "Ej. 3001234567",
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "telefono_adicional",
        type: "short_text",
        label: "Teléfono adicional",
        required: false,
        placeholder: "Ej. 3009876543",
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "nivel_educativo",
        type: "single_choice",
        label: "Último nivel educativo del adoptante",
        required: true,
        options: [
            { value: "primaria", label: "Primaria" },
            { value: "bachillerato", label: "Bachillerato" },
            { value: "tecnico_tecnologo", label: "Técnico / Tecnólogo" },
            { value: "profesional", label: "Profesional" },
            { value: "postgrado", label: "Postgrado" },
        ],
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "ocupacion",
        type: "single_choice",
        label: "Ocupación del adoptante",
        required: true,
        options: [
            { value: "empleado", label: "Empleado" },
            { value: "independiente", label: "Independiente" },
            { value: "estudiante", label: "Estudiante" },
            { value: "desempleado", label: "Desempleado" },
            { value: "pensionado", label: "Pensionado" },
        ],
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "responsable_gastos",
        type: "short_text",
        label: "¿Quién se hará cargo de los gastos del peludito?",
        required: true,
        placeholder: "Nombre de la persona responsable",
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "tipo_vivienda",
        type: "single_choice",
        label: "¿En qué tipo de vivienda vives?",
        required: true,
        options: [
            { value: "propia", label: "Propia" },
            { value: "familiar", label: "Familiar" },
            { value: "arrendada", label: "Arrendada" },
        ],
        dependsOn: { questionId: "tratamiento_datos", value: "si" },
    },
    {
        id: "autorización_arrendatario",
        type: "single_choice",
        label: "¿Tienes autorización del dueño/a del inmueble para tener mascotas? ",
        required: true,
        options: [
            { value: "si", label: "Sí" },
            { value: "no", label: "No" },
            { value: "no_se", label: "No sé" },
        ],
        dependsOn: [
            { questionId: "tratamiento_datos", value: "si" },
            { questionId: "tipo_vivienda", value: "arrendada" }],
    },
    {
        id: "forma_vivienda",
        type: "single_choice",
        label: "¿Cómo es tu vivienda?",
        required: true,
        options: [
            { value: "casa", label: "Casa" },
            { value: "apartamento_de_conjunto_cerrado", label: "Apartamento en conjunto cerrado" },
            { value: "apartamendo_dentro_de_casa", label: "Apartamento dentro de una casa" },
            { value: "finca", label: "Finca" },
        ],
        dependsOn: [
            { questionId: "tratamiento_datos", value: "si" },
        ]
    },
    {
        id: "pisos_casa",
        type: "number",
        label: "¿Cuántos pisos tiene tu casa?",
        required: true,
        dependsOn: [
            { questionId: "tratamiento_datos", value: "si" },
            { questionId: "forma_vivienda", value: "casa" },
        ],
        dependsOnLogic: "and", // deben cumplirse AMBAS condiciones
    },
    {
        id: "piso_apto",
        type: "number",
        label: "¿En qué piso vives?",
        required: true,
        dependsOn: [
            { questionId: "tratamiento_datos", value: "si" },
            { questionId: "forma_vivienda", value: ["apartamento_de_conjunto_cerrado", "apartamendo_dentro_de_casa"] },
        ],
        dependsOnLogic: "and", // deben cumplirse AMBAS condiciones
    },
    {
        id: "espacios_casa",
        type: "multiple_choice",
        label: "¿Con cuál de los siguientes espacios cuenta la casa? ",
        required: true,
        options: [
            { value: "terraza_abierta", label: "Terraza abierta" },
            { value: "terraza_cerrada", label: "Terraza cerrada" },
            { value: "jardin", label: "Jardín" },
            { value: "patio_abierto", label: "Patio abierto" },
            { value: "patio_cerrado", label: "Patio cerrado" },
            { value: "balcon", label: "Balcón" },
            { value: "ninguna", label: "Ninguna de las anteriores" },
        ],
        dependsOn: [
            { questionId: "tratamiento_datos", value: "si" },
            { questionId: "forma_vivienda", value: ["casa", "apartamendo_dentro_de_casa", "apartamento_de_conjunto_cerrado"] },
        ],
        dependsOnLogic: "and", // deben cumplirse AMBAS condiciones
    },
    {
        id: "adultos_en_casa",
        type: "number",
        label: "¿Cuántos adultos viven en tu casa? ",
        required: true,
        dependsOn: [
            { questionId: "tratamiento_datos", value: "si" },
            { questionId: "forma_vivienda", value: "finca" },
        ],
        dependsOnLogic: "and", // deben cumplirse AMBAS condiciones
    },
    // {
    //     id: "niños_en_casa",
    //     type: "number",
    //     label: "¿Cuántos niños viven en tu casa? ",
    //     required: true,
    //     dependsOn: [
    //         { questionId: "tratamiento_datos", value: "si" },
    //         { questionId: "forma_vivienda", value: "finca" },
    //     ],
    //     dependsOnLogic: "and", // deben cumplirse AMBAS condiciones
    // },


];

export default ADOPTION_QUESTIONS;