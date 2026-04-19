import { Seo } from '@/components/seo/Seo';
import { Hero } from '@/components/sections/Hero';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { Distinctions } from '@/components/sections/Distinctions';
import { Services } from '@/components/sections/Services';
import { BariatricProcedures } from '@/components/sections/BariatricProcedures';
import { Transformations } from '@/components/sections/Transformations';
import { Consultation } from '@/components/sections/Consultation';
import { Location } from '@/components/sections/Location';
import { useHashScroll } from '@/hooks/useHashScroll';

export function Home() {
  useHashScroll();
  return (
    <>
      <Seo path="/" schema="home" />
      <Hero />
      <AboutTeaser />
      <Distinctions />
      <Services />
      <BariatricProcedures />
      <Transformations />
      <Consultation />
      <Location />
    </>
  );
}
