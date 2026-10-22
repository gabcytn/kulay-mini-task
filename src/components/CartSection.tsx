import { View } from "react-native";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { CartItemRow } from "./CartItemRow";
import { VoucherInput } from "./VoucherInput";
import { Text } from "./ui";

export function CartSection() {
  const { lines, itemCount, subtotal, discount, total, voucherCode } = useCart();

  return (
    <View className="mt-8">
      <View className="flex-row items-baseline justify-between mb-3">
        <Text variant="display" className="text-2xl">
          Your cart
        </Text>
        <Text variant="mono" tone="muted" className="text-xs">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </Text>
      </View>

      <View className="bg-surface rounded-2xl p-4">
        {lines.length === 0 ? (
          <Text tone="muted" className="text-center py-6">
            Nothing here yet. Add a product to get started.
          </Text>
        ) : (
          <>
            {lines.map((line, i) => (
              <View key={line.product.id}>
                {i > 0 && <View className="h-px bg-raised" />}
                <CartItemRow line={line} />
              </View>
            ))}

            <View className="mt-4">
              <VoucherInput />
            </View>

            <View className="mt-5 pt-4 border-t border-raised">
              <View className="flex-row justify-between mb-2">
                <Text tone="muted">Subtotal</Text>
                <Text variant="mono" className="text-sm">
                  {formatPrice(subtotal)}
                </Text>
              </View>
              {voucherCode && (
                <View className="flex-row justify-between mb-2">
                  <Text tone="accent">Discount ({voucherCode})</Text>
                  <Text variant="mono" tone="accent" className="text-sm">
                    −{formatPrice(discount)}
                  </Text>
                </View>
              )}
              <View className="flex-row justify-between items-baseline mt-2">
                <Text variant="display" className="text-lg">
                  Total
                </Text>
                <Text variant="mono" className="text-2xl">
                  {formatPrice(total)}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
