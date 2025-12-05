import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import BestSellers from '../components/BestSellers';
import WhyChooseUs, { Feature } from '../components/WhyChooseUs';
import NewLaunch from '../components/NewLaunch';
import Testimonials, { Testimonial } from '../components/Testimonials';
import OurStory from '../components/OurStory';
import { getSheetData, getBestSellers } from '../lib/googlesheets';
import { IconName } from '../components/Icon';
import styles from './Page.module.css'; // Import the new CSS module

const SPREADSHEET_ID = '1dXQWUBw02vD5x57m-c6rGEibuN_28qK-x7Qm84Y3034';

interface SectionData {
  visibility: { [key: string]: boolean };
  ourStoryContent: string;
  testimonials: Testimonial[];
  features: Feature[];
}

async function getHomepageData(): Promise<SectionData> {
  const range = 'Sheet1!A:D'; // Read up to column D

  const defaultData: SectionData = {
    visibility: {
      hero: true,
      categorycarousel: true,
      bestsellers: true,
      whychooseus: true,
      newlaunch: true,
      testimonials: true,
      ourstory: true,
    },
    ourStoryContent: 'It all started with a simple idea... (Default content)',
    testimonials: [
      { quote: 'The quality of this flour is unmatched.', name: 'Jane D.' },
      { quote: 'Fast delivery and so fresh!', name: 'John S.' },
    ],
    features: [
      {
        icon: 'FaLeaf',
        title: '100% Organic & Natural',
        description: 'Our flour is sourced from the finest organic farms, ensuring you get the purest product possible.',
      },
      {
        icon: 'FaTruck',
        title: 'Fast & Fresh Delivery',
        description: 'We grind our flour fresh and deliver it to your door, so you can enjoy the best taste and nutrition.',
      },
      {
        icon: 'FaAward',
        title: 'Award-Winning Quality',
        description: 'Our commitment to quality has been recognized by industry experts and loved by bakers everywhere.',
      },
    ],
  };

  try {
    const data = await getSheetData(SPREADSHEET_ID, range);
    if (!data) {
      return defaultData;
    }

    const visibility: { [key: string]: boolean } = {};
    let ourStoryContent = defaultData.ourStoryContent;
    const testimonials: Testimonial[] = [];
    const features: Feature[] = [];

    data.forEach((row) => {
      const sectionName = row[0]?.toLowerCase();
      const colB = row[1];
      const colC = row[2];
      const colD = row[3];

      if (sectionName && colB && sectionName !== 'testimonial' && sectionName !== 'feature') {
        visibility[sectionName] = colB.toLowerCase() === 'on';
      }

      if (sectionName === 'ourstory' && colC) {
        ourStoryContent = colC;
      }

      if (sectionName === 'testimonial' && colB && colC) {
        testimonials.push({ quote: colB, name: colC });
      }

      if (sectionName === 'feature' && colB && colC && colD) {
        features.push({ icon: colB as IconName, title: colC, description: colD });
      }
    });

    if (testimonials.length === 0) {
      testimonials.push(...defaultData.testimonials);
    }

    if (features.length === 0) {
      features.push(...defaultData.features);
    }

    return { visibility, ourStoryContent, testimonials, features };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return defaultData;
  }
}

export default async function Home() {
  const { visibility, ourStoryContent, testimonials, features } = await getHomepageData();
  const bestsellers = await getBestSellers(SPREADSHEET_ID);

  return (
    <main>
      {visibility.hero && <Hero />}
      <div className={styles.mainContent}> {/* Apply the padding to this container */}
        {visibility.categorycarousel && <CategoryCarousel />}
        {visibility.bestsellers && <BestSellers products={bestsellers} />}
        {visibility.whychooseus && <WhyChooseUs features={features} />}
        {visibility.newlaunch && <NewLaunch />}
        {visibility.testimonials && <Testimonials testimonials={testimonials} />}
        {visibility.ourstory && <OurStory story={ourStoryContent} />}
      </div>
    </main>
  );
}
