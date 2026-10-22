import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { CartItemRow } from "../components/CartItemRow";
import { VoucherInput } from "../components/VoucherInput";
import { Text } from "../components/ui";

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lines, itemCount, subtotal, discount, total, voucherCode, clearCart } = useCart();
  const [placedTotal, setPlacedTotal] = useState<number | null>(null);

  const checkout = () => {
    setPlacedTotal(total);
    clearCart();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-canvas"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center mb-6">
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Back to products"
            hitSlop={8}
            className="w-10 h-10 rounded-full bg-surface items-center justify-center mr-4 active:opacity-70"
          >
            <Feather name="arrow-left" size={18} color="#e6e9e4" />
          </Pressable>
          <Text variant="display" className="text-3xl flex-1">
            Your cart
          </Text>
          <Text variant="mono" tone="muted" className="text-xs">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
        </View>

        {lines.length === 0 ? (
          <View className="bg-surface rounded-2xl p-8 items-center">
            {placedTotal !== null ? (
              <>
                <View className="w-14 h-14 rounded-full bg-raised items-center justify-center mb-4">
                  <Feather name="check" size={24} color="#8fb996" />
                </View>
                <Text variant="display" className="text-2xl">
                  Order placed
                </Text>
                <Text tone="muted" className="mt-2 text-center">
                  Thanks! You paid{" "}
                  <Text variant="mono" className="text-sm">
                    {formatPrice(placedTotal)}
                  </Text>
                  .
                </Text>
              </>
            ) : (
              <>
                <Feather name="shopping-bag" size={28} color="#8d978f" />
                <Text tone="muted" className="mt-4 text-center">
                  Nothing here yet. Add a product to get started.
                </Text>
              </>
            )}
            <Pressable
              onPress={() => router.replace("/")}
              className="bg-accent rounded-xl px-6 py-3 mt-6 active:opacity-80"
            >
              <Text variant="strong" tone="canvas">
                {placedTotal !== null ? "Continue shopping" : "Browse products"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="bg-surface rounded-2xl p-4">
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

            <Pressable
              onPress={checkout}
              accessibilityRole="button"
              className="bg-accent rounded-xl py-4 mt-5 items-center active:opacity-80"
            >
              <Text variant="strong" tone="canvas" className="text-base">
                Checkout · {formatPrice(total)}
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
