import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import logoImage from "@/assets/Loqma.jpeg";
import {
  ArrowLeft,
  Menu,
  MessageCircle,
  Phone,
  Wheat,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  categoryLabel,
  makeWhatsAppUrl,
  products,
  type FlourType,
  type Product,
} from "@/lib/products";

import whiteFlourImage from "@/assets/white-flour-bakery.jpg";
import wholeWheatImage from "@/assets/whole-wheat-bakery.jpg";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type ProductFilter = FlourType | "all";

/* -------------------------------------------------------------------------- */
/*                                Navigation                                  */
/* -------------------------------------------------------------------------- */

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/products", label: "المنتجات" },
  { to: "/white-flour", label: "دقيق أبيض" },
  { to: "/whole-wheat", label: "دقيق حبة كاملة" },
  { to: "/book", label: "احجز طلبك" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                Brand Mark                                  */
/* -------------------------------------------------------------------------- */

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex shrink-0 items-center gap-2.5"
      aria-label="لقمة صح - الرئيسية"
    >
<span className="grid size-10 place-items-center overflow-hidden rounded-full bg-primary shadow-brand transition-transform group-hover:-rotate-6">
  <img
    src={logoImage}
    alt="لقمة صح"
    className="size-full object-cover"
  />
</span>

      {!compact && (
        <span className="leading-none">
          <strong className="block font-display text-xl text-primary">
            لقمة صح
          </strong>

          <span className="mt-1 block text-[10px] text-muted-foreground">
            طازة كل يوم
          </span>
        </span>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Navbar                                    */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="site-container grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
        <BrandMark />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="التنقل الرئيسي"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.to
                  ? "bg-accent text-primary"
                  : "text-foreground/75 hover:bg-muted hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <nav
          className="site-container grid gap-1 border-t border-border py-3 lg:hidden"
          aria-label="قائمة الهاتف"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-sm font-medium hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Page Intro                                     */
/* -------------------------------------------------------------------------- */

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-muted py-14 sm:py-18">
      <div className="site-container max-w-4xl text-center">
        <span className="text-sm font-bold text-gold">{eyebrow}</span>

        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Section Heading                               */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center reveal">
      <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-gold">
        <Wheat className="size-4" />
        {eyebrow}
      </span>

      <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
        {title}
      </h2>

      {children && (
        <p className="mt-4 leading-8 text-muted-foreground">{children}</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Flour Concept Card                             */
/* -------------------------------------------------------------------------- */

export function FlourConceptCard({ type }: { type: FlourType }) {
  const whole = type === "whole";

  return (
    <article className="group relative min-h-[390px] overflow-hidden rounded-lg border border-gold/30 bg-card shadow-soft reveal">
      <img
        src={whole ? wholeWheatImage : whiteFlourImage}
        alt={
          whole
            ? "مخبوزات دقيق الحبة الكاملة"
            : "مخبوزات الدقيق الأبيض"
        }
        width={1024}
        height={1024}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-image-overlay" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="mb-3 flex items-center justify-between gap-4 text-primary-foreground">
          <h3 className="font-display text-3xl font-bold">
            {categoryLabel[type]}
          </h3>

          <span className="rounded-full bg-background/15 px-3 py-1 text-xs font-bold backdrop-blur">
            {whole ? "غني ومشبع" : "خفيف وطري"}
          </span>
        </div>

        <p className="max-w-xl leading-7 text-primary-foreground/80">
          {whole
            ? "مخبوزات غنية بنكهة القمح والحبوب الكاملة، مناسبة لاختيار متوازن ومشبع."
            : "مخبوزات خفيفة وطرية بطعم كلاسيكي محبوب، مناسبة للفطار والسندوتشات وكل وقت."}
        </p>

        <Button
          asChild
          variant="light"
          size="sm"
          className="mt-5"
        >
          <Link to={whole ? "/whole-wheat" : "/white-flour"}>
            اكتشف الاختيارات
            <ArrowLeft />
          </Link>
        </Button>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Benefit                                   */
/* -------------------------------------------------------------------------- */

export function Benefit({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-6 shadow-card">
      <div className="grid size-12 place-items-center rounded-full bg-accent text-gold">
        <span className="[&>svg]:size-6">{icon}</span>
      </div>

      <h3 className="mt-5 font-display text-xl font-bold text-primary">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        {text}
      </p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Product Card                                  */
/* -------------------------------------------------------------------------- */

export function ProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState<"half" | "full">("full");

  const selectedPrice =
    product.unit === "kg" && weight === "half"
      ? product.halfPrice
      : product.price;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={1024}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
          {categoryLabel[product.category]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
        >
          <h3 className="font-display text-xl font-bold text-primary transition-colors hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {product.description}
        </p>

        {/* اختيار الوزن للمنتجات اللي بتتباع بالكيلو */}
        {product.unit === "kg" && product.halfPrice ? (
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold text-muted-foreground">
              اختاري الحجم:
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={weight === "half" ? "default" : "outline"}
                onClick={() => setWeight("half")}
              >
                نصف كيلو
              </Button>

              <Button
                type="button"
                size="sm"
                variant={weight === "full" ? "default" : "outline"}
                onClick={() => setWeight("full")}
              >
                كيلو
              </Button>
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <span>
            <strong className="text-xl text-primary">
              {selectedPrice}
            </strong>{" "}
            <small className="text-muted-foreground">ج.م</small>

            {product.unit === "kg" ? (
              <small className="mr-1 text-muted-foreground">
                / {weight === "half" ? "نصف كيلو" : "كيلو"}
              </small>
            ) : product.unit === "10_pieces" ? (
              <small className="mr-1 text-muted-foreground">
                / 10 أرغفة
              </small>
            ) : (
              <small className="mr-1 text-muted-foreground">
                / قطعة
              </small>
            )}
          </span>

          <Button asChild size="sm">
            <Link
              to="/book"
              search={{
                product: product.slug,
                weight,
              }}
            >
              احجز الآن
              <ArrowLeft />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Product Grid                                  */
/* -------------------------------------------------------------------------- */

export function ProductGrid({
  initialFilter = "all",
  limit,
}: {
  initialFilter?: ProductFilter;
  limit?: number;
}) {
  const [filter, setFilter] =
    useState<ProductFilter>(initialFilter);

  const visible = products
    .filter(
      (product) =>
        filter === "all" ||
        product.category === filter,
    )
    .slice(0, limit);

  return (
    <div>
      {!limit && (
        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="تصفية المنتجات"
        >
          {(["all", "white", "whole"] as const).map(
            (item) => (
              <Button
                key={item}
                type="button"
                variant={
                  filter === item
                    ? "default"
                    : "outline"
                }
                onClick={() => setFilter(item)}
              >
                {item === "all"
                  ? "الكل"
                  : categoryLabel[item]}

                <span className="text-xs opacity-70">
                  {item === "all"
                    ? 29
                    : item === "white"
                      ? 12
                      : 17}
                </span>
              </Button>
            ),
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Product Details                                */
/* -------------------------------------------------------------------------- */

export function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const [weight, setWeight] = useState<"half" | "full">("full");

  const selectedPrice =
    product.unit === "kg" && weight === "half"
      ? product.halfPrice
      : product.price;

  return (
    <main>
      <section className="site-container py-12 sm:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div>
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
              {categoryLabel[product.category]}
            </span>

            <h1 className="mt-4 font-display text-4xl font-bold text-primary sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 leading-8 text-muted-foreground">
              {product.description}
            </p>

            {product.unit === "kg" && product.halfPrice ? (
              <div className="mt-7">
                <p className="mb-3 text-sm font-bold text-primary">
                  اختاري الحجم:
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={
                      weight === "half"
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setWeight("half")}
                  >
                    نصف كيلو — {product.halfPrice} ج.م
                  </Button>

                  <Button
                    type="button"
                    variant={
                      weight === "full"
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setWeight("full")}
                  >
                    كيلو — {product.price} ج.م
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-7 flex items-center gap-2">
                <strong className="text-3xl text-primary">
                  {product.price}
                </strong>

                <span className="text-muted-foreground">
                  ج.م
                </span>

                <span className="text-sm text-muted-foreground">
                  /{" "}
                  {product.unit === "piece"
                    ? "قطعة"
                    : "10 أرغفة"}
                </span>
              </div>
            )}

            {product.unit === "kg" && (
              <div className="mt-5 flex items-center gap-2">
                <strong className="text-3xl text-primary">
                  {selectedPrice}
                </strong>

                <span className="text-muted-foreground">
                  ج.م
                </span>

                <span className="text-sm text-muted-foreground">
                  / {weight === "half" ? "نصف كيلو" : "كيلو"}
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  to="/book"
                  search={{
                    product: product.slug,
                    weight,
                  }}
                >
                  احجز الآن
                  <MessageCircle />
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link to="/products">
                  كل المنتجات
                  <ArrowLeft />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Booking Form                                  */
/* -------------------------------------------------------------------------- */

export function BookingForm({
  initialProduct = "",
}: {
  initialProduct?: string;
}) {
  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState("1");
  const [flourType, setFlourType] =
    useState<FlourType>("white");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const message = `مرحبًا في لقمة صح 

أرغب في حجز:

المنتج: ${product || "غير محدد"}

الكمية: ${quantity}

نوع الدقيق: ${categoryLabel[flourType]}

الاسم: ${name}

رقم الهاتف: ${phone}

ملاحظات: ${notes || "لا توجد"}`;

    window.open(
      makeWhatsAppUrl(message),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-lg border border-gold/25 bg-card p-5 shadow-soft sm:p-8"
    >
      <div className="grid gap-2">
        <label
          htmlFor="booking-product"
          className="text-sm font-bold text-primary"
        >
          المنتج
        </label>

        <select
          id="booking-product"
          value={product}
          onChange={(event) =>
            setProduct(event.target.value)
          }
          className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring"
          required
        >
          <option value="">اختاري المنتج</option>

          {products.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="الكمية"
          value={quantity}
          onChange={(event) =>
            setQuantity(event.target.value)
          }
          type="number"
          min="1"
          required
        />

        <div className="grid gap-2">
          <label
            htmlFor="booking-flour"
            className="text-sm font-bold text-primary"
          >
            نوع الدقيق
          </label>

          <select
            id="booking-flour"
            value={flourType}
            onChange={(event) =>
              setFlourType(
                event.target.value as FlourType,
              )
            }
            className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-ring"
          >
            <option value="white">دقيق أبيض</option>
            <option value="whole">
              دقيق حبة كاملة
            </option>
          </select>
        </div>
      </div>

      <Input
        label="الاسم"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        placeholder="اكتبي اسمك"
        required
      />

      <Input
        label="رقم الهاتف"
        value={phone}
        onChange={(event) =>
          setPhone(event.target.value)
        }
        type="tel"
        placeholder="01026016100"
        required
      />

      <Textarea
        label="ملاحظات"
        value={notes}
        onChange={(event) =>
          setNotes(event.target.value)
        }
        placeholder="أي ملاحظات أو تفاصيل إضافية..."
        rows={4}
      />

      <Button type="submit" size="lg">
        إرسال الطلب عبر واتساب
        <MessageCircle />
      </Button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                           WhatsApp Floating Button                         */
/* -------------------------------------------------------------------------- */

export function WhatsAppButton() {
  const message =
    "مرحبًا لقمة صح 👋 أريد الاستفسار عن المخبوزات والطلبات.";

  return (
    <a
      href={makeWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 left-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-floating transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Footer                                    */
/* -------------------------------------------------------------------------- */

export function FooterLinks() {
  return (
    <div className="grid gap-3">
      <h3 className="font-display text-lg font-bold text-primary">
        روابط سريعة
      </h3>

      {navItems.slice(0, 5).map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="site-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandMark />

          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            مخبوزات طازة كل يوم، بالدقيق الأبيض ودقيق الحبة
            الكاملة، مع إمكانية الحجز بسهولة عبر واتساب.
          </p>
        </div>

        <FooterLinks />

        <div className="grid gap-3">
          <h3 className="font-display text-lg font-bold text-primary">
            تواصل معنا
          </h3>

          <a
            href={makeWhatsAppUrl("مرحبًا لقمة صح 👋")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="size-4" />
            واتساب
          </a>

          <a
            href="tel:+201026016100"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <Phone className="size-4" />
            اتصل بنا
          </a>
        </div>

        <div className="grid gap-3">
          <h3 className="font-display text-lg font-bold text-primary">
            تابعنا
          </h3>

<a
  href="https://www.facebook.com/profile.php?id=100083066212118&mibextid=ZbWKwL"
  target="_blank"
  rel="noreferrer"
  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
>
  <MessageCircle className="size-4" />
  Facebook
</a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="site-container py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} لقمة صح — جميع الحقوق
          محفوظة
        </div>
      </div>
    </footer>
  );
}
