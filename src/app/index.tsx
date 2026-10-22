import "../global.css"
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";
import { CartSection } from "../components/CartSection";
import { StatusLine } from "../components/StatusLine";
import { Text } from "../components/ui";

export default function Home() {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-canvas"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-start justify-between mb-8">
          <View className="flex-1">
            <Text variant="display" className="text-4xl">
              Desk Goods
            </Text>
            <Text tone="muted" className="mt-1 text-base">
              Small upgrades for a better workspace.
            </Text>
          </View>
          <View className="bg-surface rounded-full min-w-[40px] h-10 px-3 items-center justify-center mt-1">
            <Text variant="mono" tone="accent" className="text-sm">
              {itemCount}
            </Text>
          </View>
        </View>

        <Text variant="display" className="text-2xl mb-3">
          Products
        </Text>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

        <CartSection />
      </ScrollView>

      <StatusLine />
    </KeyboardAvoidingView>
  );
}
