import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { Text } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, quantityOf } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = quantityOf(product.id);

  // Brief "Added" confirmation on the button
  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
  };

  return (
    <View className="bg-surface rounded-2xl p-4 mb-3">
      <View className="flex-row">
        <View className="w-14 h-14 rounded-xl bg-raised items-center justify-center mr-4">
          <Feather name={product.icon} size={22} color="#8fb996" />
        </View>
        <View className="flex-1">
          <Text variant="strong" className="text-base">
            {product.productName}
          </Text>
          <Text tone="muted" className="text-sm mt-1 leading-5">
            {product.description}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mt-4">
        <View>
          <Text variant="mono" className="text-base">
            {formatPrice(product.price)}
          </Text>
          {inCart > 0 && (
            <Text variant="mono" tone="muted" className="text-xs mt-0.5">
              {inCart} in cart
            </Text>
          )}
        </View>
        <Pressable
          onPress={handleAdd}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.productName} to cart`}
          className="bg-accent rounded-lg px-4 py-2 flex-row items-center active:opacity-80"
        >
          {justAdded && <Feather name="check" size={14} color="#1b1f1d" />}
          <Text variant="strong" tone="canvas" className="ml-1.5 text-sm">
            {justAdded ? "Added" : "Add to cart"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
