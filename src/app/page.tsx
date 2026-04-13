import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import WorkExperience from '@/components/sections/WorkExperience';
import Projects from '@/components/sections/Projects';
import CaseStudies from '@/components/sections/CaseStudies';
import Blog from '@/components/sections/Blog';
import Library from '@/components/sections/Library';
import Quotes from '@/components/sections/Quotes';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import { getAllBlogPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Hero />
      <About />
      <WorkExperience />
      <Projects />
      <CaseStudies />
      <Blog posts={posts} />
      <Library />
      <Quotes />
      <Contact />
      <Footer />
    </>
  );
}
