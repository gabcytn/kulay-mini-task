import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { Text } from "./ui";

export function StatusLine() {
  const insets = useSafeAreaInsets();
  const { itemCount, total, voucherCode } = useCart();

  return (
    <View
      className="flex-row items-center bg-surface"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="bg-accent px-3 py-2.5">
        <Text variant="mono" tone="canvas" className="text-xs">
          CART
        </Text>
      </View>
      <Text variant="mono" tone="muted" className="text-xs ml-3 flex-1">
        {itemCount} {itemCount === 1 ? "item" : "items"}
        {voucherCode ? ` · ${voucherCode}` : ""}
      </Text>
      <Text variant="mono" className="text-xs mr-4">
        {formatPrice(total)}
      </Text>
    </View>
  );
}
