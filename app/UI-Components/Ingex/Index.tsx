import About from "./About/page"
import Expertise from "./Expertise/page"
import Hero from "./Hero/page"
import Paralex from "./Paralex/page"
import PricingPlans from "./PricingPlans/page"
import Services from "./Services/page"
import Testimonial from "./Testimonial/page"
import Blogs from "./Blogs/page"
import Faq from "./Faq/page"
import Newsletter from "./Newsletter/page"
import Banner from "./Banner/page"


export default function Index() {
  return (
    <>
      <Hero />
      <About />
      <Paralex />
      <Services />
      <Expertise />
      <PricingPlans />
      <Testimonial />
      <Faq />
      <Blogs />
      <Newsletter />
      <Banner />
    </>
  )
}

