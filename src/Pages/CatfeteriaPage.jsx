import { Navbar, Footer, Catalog, ParallaxSection, ScreenSlider, InfiniteCarousel } from "../components/General"

import MealCard from "../components/MealCard";

import { PRODUCTS } from "../data";

import "./CatfeteriaPage.css";

const CatfeteriaPage = () => {
    return (
        <>
            <Navbar />
            <ScreenSlider />
            <section id="catfeteria_content">
                <div className="section__header">
                    <p className="eyebrow">Nuestros</p>
                    <h2 className="section__title">Productos</h2>
                </div>
            </section>
            <InfiniteCarousel
                items={PRODUCTS}
                getKey={(cat) => cat.title}
                ariaLabel=""
                speed={25}
                renderItem={(cat) => <MealCard meal={cat} />}
            />
            <Catalog />
            <Footer />
        </>
    )
}

export default CatfeteriaPage
