
import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ProductGrid } from "@/components/bakery";
export const Route = createFileRoute("/white-flour")({ head: () => ({ meta: [{ title: "منتجات الدقيق الأبيض | لقمة صح" }, { name: "description", content: "12 منتجًا كلاسيكيًا طازجًا من مخبوزات الدقيق الأبيض." }, { property: "og:title", content: "مخبوزات الدقيق الأبيض | لقمة صح" }, { property: "og:description", content: "اختيارات طرية وخفيفة بطعم بيتي محبوب." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Page });
function Page() {
  return (
    <main>
      <PageIntro
        eyebrow="12 منتج"
        title="مخبوزات الدقيق الأبيض"
        description="الطعم الكلاسيكي اللي بتحبه: مخبوزات خفيفة وطرية تُحضّر طازة كل يوم."
      />

      <section className="site-container py-12 sm:py-18">
        <ProductGrid initialFilter="white" />
      </section>
    </main>
  );
}