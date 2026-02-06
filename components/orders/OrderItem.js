import Image from "next/image";
import Link from "next/link";

export default function OrderItem({ item }) {
  return (
    <div className="flex items-center py-4 border-b last:border-0 border-gray-100">
      <div className="shrink-0 w-16 h-16 relative border rounded bg-gray-100">
        <Image
          src={item.img || "/placeholder.png"}
          alt={item.title}
          fill
          className="object-contain p-1"
        />
      </div>
      <div className="ml-4 flex-1">
        <Link
          href={`/product-page/${item.category}/${item.id}`}
          className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-primary transition"
        >
          {item.title}
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          Qty: {item.quantity} × {item.price}LE
        </p>
      </div>
    </div>
  );
}
