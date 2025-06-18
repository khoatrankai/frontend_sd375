import HeroSlideshow from "@/components/hero-slideshow"
import FeaturedNews from "@/components/featured-news"
import FeaturedImages from "@/components/featured-images"
import NewSoftware from "@/components/new-software"
import AudioSection from "@/components/audio-section"
import Banner from "@/components/banner"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroSlideshow />
      <FeaturedNews />
      <FeaturedImages />
      <NewSoftware />
      <Banner />
      <AudioSection />
    </div>
  )
}
