import "./TextHeader.css"

const TextHeader = ({ eyebrow, title, subtitle, isFirstSection }) => {
    return (
        <section className={`text-header_intro ${isFirstSection ? 'first-section' : ''}`}>
            {eyebrow && (<span className="text-header_eyebrow">{eyebrow}</span>)}
            {title && (<h2 className="text-header_title">{title}</h2>)}
            {subtitle && (<p className="text-header_subtitle">
                {subtitle}
            </p>)}
        </section>
    )
}

export default TextHeader
