import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { Loading } from "@/components/ui/loading";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<Loading size="lg" text="Loading featured products..." className="py-20" />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<Loading size="lg" text="Loading categories..." className="py-20" />}>
        <CategoriesSection />
      </Suspense>
    </div>
  );
}
