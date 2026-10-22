import { Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";
import { StatusLine } from "../components/StatusLine";
import { Text } from "../components/ui";

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  return (
    <View className="flex-1 bg-canvas">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 32,
        }}
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
          <Pressable
            onPress={() => router.push("/cart")}
            accessibilityRole="button"
            accessibilityLabel={`Open cart, ${itemCount} items`}
            className="bg-surface rounded-full h-10 px-4 flex-row items-center mt-1 active:opacity-70"
          >
            <Feather name="shopping-bag" size={15} color="#8fb996" />
            <Text variant="mono" tone="accent" className="text-sm ml-2">
              {itemCount}
            </Text>
          </Pressable>
        </View>

        <Text variant="display" className="text-2xl mb-3">
          Products
        </Text>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ScrollView>

      <StatusLine />
    </View>
  );
}
