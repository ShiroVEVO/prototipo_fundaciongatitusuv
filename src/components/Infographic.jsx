import InfographicItem from './InfographicItem.jsx'

import './Infographic.css'

import ITEMS from '../data/AboutUsData.js'

const Infographic = () => {
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
