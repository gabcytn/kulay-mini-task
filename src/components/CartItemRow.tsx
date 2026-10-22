import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { CartLine, useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { Text } from "./ui";

export function CartItemRow({ line }: { line: CartLine }) {
  const { addToCart, decrement, removeFromCart } = useCart();
  const { product, quantity } = line;

  return (
    <View className="flex-row items-center py-3">
      <View className="flex-1 pr-3">
        <Text variant="strong" numberOfLines={1}>
          {product.productName}
        </Text>
        <Text variant="mono" tone="muted" className="text-xs mt-1">
          {formatPrice(product.price)} each
        </Text>
      </View>

      <View className="flex-row items-center bg-raised rounded-lg mr-3">
        <Pressable
          onPress={() => decrement(product.id)}
          accessibilityLabel={`Decrease ${product.productName}`}
          className="w-8 h-8 items-center justify-center active:opacity-60"
        >
          <Feather name="minus" size={14} color="#e6e9e4" />
        </Pressable>
        <Text variant="mono" className="w-5 text-center text-sm">
          {quantity}
        </Text>
        <Pressable
          onPress={() => addToCart(product)}
          accessibilityLabel={`Increase ${product.productName}`}
          className="w-8 h-8 items-center justify-center active:opacity-60"
        >
          <Feather name="plus" size={14} color="#e6e9e4" />
        </Pressable>
      </View>

      <Text variant="mono" className="w-20 text-right text-sm">
        {formatPrice(product.price * quantity)}
      </Text>

      <Pressable
        onPress={() => removeFromCart(product.id)}
        accessibilityLabel={`Remove ${product.productName} from cart`}
        hitSlop={8}
        className="ml-3 active:opacity-60"
      >
        <Feather name="trash-2" size={16} color="#d08a7e" />
      </Pressable>
    </View>
  );
}
