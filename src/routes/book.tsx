
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  MapPin,
  MessageCircle,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  makeWhatsAppUrl,
  products,
  categoryLabel,
  unitLabel,
  type Product,
} from "@/lib/products";

type OrderItem = {
  id: string;
  product: Product;
  weight: "half" | "full";
  quantity: number;
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({
    product:
      typeof search.product === "string" ? search.product : "",
  }),

  head: () => ({
    meta: [
      { title: "احجز طلبك | لقمة صح" },
      {
        name: "description",
        content:
          "احجز مخبوزات لقمة صح بسهولة وأرسل تفاصيل طلبك مباشرة عبر واتساب.",
      },
    ],
  }),

  component: BookPage,
});

function BookPage() {
  const { product: defaultProduct } = Route.useSearch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(
    defaultProduct || "",
  );

  const [weight, setWeight] = useState<"half" | "full">("full");
  const [quantity, setQuantity] = useState("1");

  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    [],
  );

  const selected = products.find(
    (item) => item.slug === selectedProduct,
  );

  const isKgProduct = selected?.unit === "kg";

  const selectedUnitPrice =
    selected && isKgProduct && weight === "half"
      ? selected.halfPrice ?? selected.price / 2
      : selected?.price ?? 0;

  const selectedWeightLabel =
    isKgProduct
      ? weight === "half"
        ? "نصف كيلو"
        : "كيلو"
      : selected
        ? unitLabel[selected.unit]
        : "";

  const quantityNumber = Math.max(
    1,
    Number(quantity) || 1,
  );

  const total = orderItems.reduce((sum, item) => {
    const unitPrice =
      item.product.unit === "kg" &&
      item.weight === "half"
        ? item.product.halfPrice ??
          item.product.price / 2
        : item.product.price;

    return sum + unitPrice * item.quantity;
  }, 0);

  function handleProductChange(value: string) {
    setSelectedProduct(value);
    setWeight("full");
    setQuantity("1");
  }

  function handleAddProduct() {
    if (!selected) {
      alert("من فضلك اختاري المنتج أولًا.");
      return;
    }

    const newItem: OrderItem = {
      id: `${selected.slug}-${weight}-${Date.now()}`,
      product: selected,
      weight: selected.unit === "kg" ? weight : "full",
      quantity: quantityNumber,
    };

    setOrderItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.product.slug === selected.slug &&
          item.weight === newItem.weight,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantityNumber,
              }
            : item,
        );
      }

      return [...currentItems, newItem];
    });

    setQuantity("1");
  }

  function increaseQuantity(id: string) {
    setOrderItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(id: string) {
    setOrderItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id: string) {
    setOrderItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  function getItemUnitPrice(item: OrderItem) {
    if (
      item.product.unit === "kg" &&
      item.weight === "half"
    ) {
      return (
        item.product.halfPrice ??
        item.product.price / 2
      );
    }

    return item.product.price;
  }

  function getItemUnitLabel(item: OrderItem) {
    if (item.product.unit === "kg") {
      return item.weight === "half"
        ? "نصف كيلو"
        : "كيلو";
    }

    return unitLabel[item.product.unit];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (orderItems.length === 0) {
      alert("من فضلك أضيفي منتج واحد على الأقل للطلب.");
      return;
    }

    const orderDetails = orderItems
      .map((item, index) => {
        const unitPrice = getItemUnitPrice(item);
        const itemTotal = unitPrice * item.quantity;
        const itemUnit = getItemUnitLabel(item);

        return [
          `${index + 1}. ${item.product.name}`,
          `نوع الدقيق: ${categoryLabel[item.product.category]}`,
          `الاختيار: ${itemUnit}`,
          `الكمية: ${item.quantity}`,
          `سعر الوحدة: ${unitPrice} جنيه`,
          `الإجمالي: ${itemTotal} جنيه`,
        ].join("\n");
      })
      .join("\n\n");

    const message = [
      "مرحبًا لقمة صح 👋",
      "",
      "أرغب في حجز طلب:",
      "",
      `الاسم: ${name}`,
      "",
      `العنوان: ${address}`,
      "",
      "تفاصيل الطلب:",
      "",
      orderDetails,
      "",
      `الإجمالي الكلي: ${total} جنيه`,
      "",
      "شكرًا ❤️",
    ].join("\n");

    window.open(
      makeWhatsAppUrl(message),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main>
      {/* Page Intro */}
      <section className="bg-secondary/40">
        <div className="site-container py-12 text-center sm:py-16">
          <p className="mb-3 text-sm font-bold text-gold">
            طلبك في خطوتين
          </p>

          <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl">
            احجز لقمتك الطازة
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-muted-foreground">
            اختاري المنتجات اللي نفسك فيها، واكتبي بيانات
            التوصيل وإحنا هنوصلك طلبك بكل سهولة.
          </p>
        </div>
      </section>

      {/* Booking */}
      <section className="site-container py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Delivery Notice */}
          <div className="mb-8 flex gap-4 rounded-lg border border-gold/30 bg-accent/30 p-5">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-primary">
              <MapPin className="size-5" />
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-primary">
                التوصيل متاح داخل محافظة الغربية
              </h2>

              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                اكتبي عنوانك بالتفصيل، وسنتواصل معك لتأكيد
                الطلب وموعد التوصيل.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 rounded-lg border border-gold/25 bg-card p-5 shadow-soft sm:p-8"
          >
            {/* Name */}
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="font-bold text-primary"
              >
                الاسم
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="اكتبي اسمك"
                required
                className="h-12 rounded-md border border-input bg-background px-4 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <label
                htmlFor="address"
                className="font-bold text-primary"
              >
                العنوان
              </label>

              <textarea
                id="address"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                placeholder="اكتبي العنوان بالتفصيل"
                required
                rows={4}
                className="resize-none rounded-md border border-input bg-background p-4 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>

            {/* Product */}
            <div className="grid gap-2">
              <label
                htmlFor="product"
                className="flex items-center gap-2 font-bold text-primary"
              >
                <ShoppingBag className="size-4" />
                اختاري المنتج
              </label>

              <select
                id="product"
                value={selectedProduct}
                onChange={(event) =>
                  handleProductChange(event.target.value)
                }
                required
                className="h-12 rounded-md border border-input bg-background px-4 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              >
                <option value="" disabled>
                  اختاري من منتجاتنا
                </option>

                {products.map((item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.name} — {item.price} جنيه
                  </option>
                ))}
              </select>
            </div>

            {/* Weight Options */}
            {selected && selected.unit === "kg" && (
              <div className="grid gap-3">
                <p className="font-bold text-primary">
                  اختاري الحجم
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {/* Half Kilo */}
                  <button
                    type="button"
                    onClick={() => setWeight("half")}
                    className={`rounded-md border px-4 py-4 text-center transition ${
                      weight === "half"
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-primary hover:border-gold hover:bg-accent/40"
                    }`}
                  >
                    <span className="block font-bold">
                      نصف كيلو
                    </span>

                    <span
                      className={`mt-1 block text-sm ${
                        weight === "half"
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {selected.halfPrice ??
                        selected.price / 2}{" "}
                      جنيه
                    </span>
                  </button>

                  {/* Full Kilo */}
                  <button
                    type="button"
                    onClick={() => setWeight("full")}
                    className={`rounded-md border px-4 py-4 text-center transition ${
                      weight === "full"
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-primary hover:border-gold hover:bg-accent/40"
                    }`}
                  >
                    <span className="block font-bold">
                      كيلو
                    </span>

                    <span
                      className={`mt-1 block text-sm ${
                        weight === "full"
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {selected.price} جنيه
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Selected Unit Info */}
            {selected && (
              <div className="rounded-md bg-accent/40 px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    سعر الوحدة
                  </span>

                  <strong className="text-lg text-primary">
                    {selectedUnitPrice} جنيه
                  </strong>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    النوع
                  </span>

                  <span className="font-bold text-primary">
                    {selectedWeightLabel}
                  </span>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="grid gap-2">
              <label
                htmlFor="quantity"
                className="font-bold text-primary"
              >
                الكمية
              </label>

              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
                required
                className="h-12 rounded-md border border-input bg-background px-4 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>

            {/* Add Product */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleAddProduct}
              className="w-full"
            >
              <Plus className="size-5" />
              إضافة المنتج للطلب
            </Button>

            {/* Order Items */}
            {orderItems.length > 0 && (
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-primary">
                    طلبك
                  </h2>

                  <span className="text-sm text-muted-foreground">
                    {orderItems.length} منتج
                  </span>
                </div>

                <div className="grid gap-3">
                  {orderItems.map((item) => {
                    const unitPrice =
                      getItemUnitPrice(item);

                    const itemTotal =
                      unitPrice * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="rounded-lg border border-border bg-background p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-primary">
                              {item.product.name}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {
                                categoryLabel[
                                  item.product.category
                                ]
                              }
                              {" • "}
                              {getItemUnitLabel(item)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                            aria-label="حذف المنتج"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="grid size-9 place-items-center rounded-md border border-border bg-card text-primary transition hover:bg-accent"
                              aria-label="تقليل الكمية"
                            >
                              <Minus className="size-4" />
                            </button>

                            <span className="grid min-w-10 place-items-center font-bold text-primary">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="grid size-9 place-items-center rounded-md border border-border bg-card text-primary transition hover:bg-accent"
                              aria-label="زيادة الكمية"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-left">
                            <p className="text-xs text-muted-foreground">
                              {unitPrice} جنيه ×{" "}
                              {item.quantity}
                            </p>

                            <strong className="text-lg text-primary">
                              {itemTotal} جنيه
                            </strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="rounded-lg border border-gold/30 bg-secondary/40 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold text-primary">
                      الإجمالي الكلي
                    </span>

                    <span className="text-2xl font-bold text-primary">
                      {total} جنيه
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full"
              disabled={orderItems.length === 0}
            >
              <MessageCircle className="size-5" />
              تأكيد الطلب عبر واتساب
            </Button>

            <p className="text-center text-xs leading-6 text-muted-foreground">
              بعد الضغط على الزر سيتم فتح واتساب برسالة تحتوي
              على تفاصيل طلبك بالكامل.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

