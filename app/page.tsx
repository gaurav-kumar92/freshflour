import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import BestSellers from '../components/BestSellers';
import WhyChooseUs from '../components/WhyChooseUs';
import NewLaunch from '../components/NewLaunch';
import Testimonials from '../components/Testimonials';
import OurStory from '../components/OurStory';

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryCarousel />
      <BestSellers />
      <WhyChooseUs />
      <NewLaunch />
      <Testimonials />
      <OurStory />
    </main>
  );
}
