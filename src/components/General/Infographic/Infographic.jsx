import { InfographicItem } from '../../General'

import './Infographic.css'

const Infographic = ({ ITEMS }) => {
    return (
        <div className="infographic">
            {ITEMS.map((item) => (
                <InfographicItem
                    key={item.title}
                    title={item.title}
                    body={item.body}
                    image={item.image}
                    direction={item.direction}
                />
            ))}
        </div>
    )
}

export default Infographic
