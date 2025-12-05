import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import BestSellers from '../components/BestSellers';
import WhyChooseUs from '../components/WhyChooseUs';
import NewLaunch from '../components/NewLaunch';
import Testimonials, { Testimonial } from '../components/Testimonials';
import OurStory from '../components/OurStory';
import { getSheetData } from '../lib/googlesheets';

interface SectionData {
  visibility: { [key: string]: boolean };
  ourStoryContent: string;
  testimonials: Testimonial[];
}

async function getHomepageData(): Promise<SectionData> {
  const spreadsheetId = '1dXQWUBw02vD5x57m-c6rGEibuN_28qK-x7Qm84Y3034';
  const range = 'Sheet1!A:C'; // Read up to column C

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
      { quote: 'The quality of this flour is unmatched.', name: 'Jane D.'},
      { quote: 'Fast delivery and so fresh!', name: 'John S.'},
    ],
  };

  try {
    const data = await getSheetData(spreadsheetId, range);
    if (!data) {
      return defaultData;
    }

    const visibility: { [key: string]: boolean } = {};
    let ourStoryContent = defaultData.ourStoryContent;
    const testimonials: Testimonial[] = [];

    data.forEach((row) => {
      const sectionName = row[0]?.toLowerCase();
      const colB = row[1];
      const colC = row[2];

      if (sectionName && colB && sectionName !== 'testimonial') {
        // This handles the section visibility toggles
        visibility[sectionName] = colB.toLowerCase() === 'on';
      }

      if (sectionName === 'ourstory' && colC) {
        ourStoryContent = colC;
      }
      
      if (sectionName === 'testimonial' && colB && colC) {
        // A row specifically for a testimonial
        testimonials.push({
          quote: colB,
          name: colC,
        });
      }
    });

    // If no testimonials were fetched from the sheet, use the default ones.
    if (testimonials.length === 0) {
      testimonials.push(...defaultData.testimonials);
    }

    return { visibility, ourStoryContent, testimonials };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return defaultData; // Return default data on error
  }
}

export default async function Home() {
  const { visibility, ourStoryContent, testimonials } = await getHomepageData();

  return (
    <main>
      {visibility.hero && <Hero />}
      {visibility.categorycarousel && <CategoryCarousel />}
      {visibility.bestsellers && <BestSellers />}
      {visibility.whychooseus && <WhyChooseUs />}
      {visibility.newlaunch && <NewLaunch />}
      {visibility.testimonials && <Testimonials testimonials={testimonials} />}
      {visibility.ourstory && <OurStory story={ourStoryContent} />}
    </main>
  );
}
