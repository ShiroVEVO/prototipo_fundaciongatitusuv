import './VolunteeringCard.css';

/**
 * 
 * Props:
 * - image:      URL de la imagen (reemplaza el SVG embebido)
 * - imageAlt:   texto alternativo de la imagen (opcional, cae en `name`)
 * - bandText:   texto que se ve en la franja negra antes del hover
 * - name:       título mostrado en el hover (antes "Ethereum")
 * - category:   subtítulo mostrado en el hover (antes "Cryptocurrency")
 * - price:      precio mostrado en el hover
 */

export default function VolunteeringCard({ volunteeringType }) {
    return (
        <div className="card">
            <span className="band">{volunteeringType.name}</span>

            <img className="img" src={import.meta.env.BASE_URL + volunteeringType.image} alt={volunteeringType.imageAlt || volunteeringType.name} />

            <div className="textBox">
                <p className="text head">{volunteeringType.name}</p>
                <ul className="list">
                    {volunteeringType.functions.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}