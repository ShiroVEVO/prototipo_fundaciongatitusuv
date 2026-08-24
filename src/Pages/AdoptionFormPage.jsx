import { Navbar, Footer, DynamicForm } from "../components"
import { ADOPTION_QUESTIONS } from "../data"

const AdoptionFormPage = () => {
    return (
        <>
            <Navbar />
            <DynamicForm
                questions={ADOPTION_QUESTIONS}
                title="Formulario de adopción"
                description="Cuéntanos un poco sobre ti antes de continuar."
                onSubmit={(respuestas) => console.log(respuestas)}
            />
            <Footer />
        </>
    )
}

export default AdoptionFormPage
