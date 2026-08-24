export const GENERAL_BENEFITS = [
    'Reporte mensual con fotos de tu ahijado',
    'Visitas programadas a la sede',
    'Certificado de donación (25% de descuento en tu declaración de renta)',
];

export const DEFAULT_TIERS = [
    {
        id: 'gatialiado',
        name: 'Gatialiado',
        pawLevel: 1,
        price: '$30.000',
        priceNote: 'Sin vencimiento fijo: tú decides cuándo pausar o cancelar',
        highlightBenefits: [
            '30 min de gatituterapia semanal',
            '16h de coworking al mes',
            '2% dto. en eventos y talleres',
        ],
        fullBenefits: [
            '30 min de gatituterapia semanal, con 1 acompañante',
            '16 horas de coworking al mes',
            '2% de descuento en eventos, talleres y gatituactividades',
            'Descuentos en concentrado, arena y servicios aliados',
            '30 min gratis de alquiler de espacio en gatitueventos',
        ],
        glowColor: 'var(--color-accent-copper)',
        glowIntensity: 'soft',
        featured: false,
    },
    {
        id: 'gatiamigo',
        name: 'Gatiamigo',
        pawLevel: 2,
        price: '$50.000',
        priceNote: 'Sin vencimiento fijo: tú decides cuándo pausar o cancelar',
        highlightBenefits: [
            '1h de gatituterapia semanal',
            '32h de coworking al mes',
            '3% dto. en eventos y talleres',
        ],
        fullBenefits: [
            '1 hora de gatituterapia semanal, hasta con 2 acompañantes',
            '32 horas de coworking al mes',
            '3% de descuento en eventos, talleres y gatituactividades',
            'Más descuentos en productos y servicios aliados',
            '1 hora gratis de alquiler de espacio en gatitueventos',
        ],
        glowColor: 'var(--color-accent-silver)',
        glowIntensity: 'soft',
        featured: false,
    },
    {
        id: 'gatiguardian',
        name: 'Gatiguardián',
        pawLevel: 3,
        price: '$80.000',
        priceNote: 'Sin vencimiento fijo: tú decides cuándo pausar o cancelar',
        highlightBenefits: [
            '2h de gatituterapia semanal',
            '48h de coworking al mes',
            '4% dto. en eventos y talleres',
        ],
        fullBenefits: [
            '2 horas de gatituterapia semanal, hasta con 3 acompañantes',
            '48 horas de coworking al mes',
            '4% de descuento en eventos, talleres y gatituactividades',
            'Beneficios ampliados en productos y servicios aliados',
            '2 horas gratis de alquiler de espacio en gatitueventos',
        ],
        glowColor: 'var(--color-accent-gold)',
        glowIntensity: 'strong',
        featured: true,
    },
];