import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { Text } from "./ui";

export function VoucherInput() {
  const { voucherCode, voucherRate, applyVoucher, clearVoucher } = useCart();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const err = applyVoucher(input);
    setError(err);
    if (!err) setInput("");
  };

  if (voucherCode) {
    return (
      <View className="flex-row items-center justify-between bg-raised rounded-xl px-4 py-3">
        <View className="flex-row items-center">
          <Feather name="tag" size={14} color="#8fb996" />
          <Text variant="mono" tone="accent" className="ml-2 text-sm">
            {voucherCode} · {Math.round(voucherRate * 100)}% off
          </Text>
        </View>
        <Pressable onPress={clearVoucher} hitSlop={8} className="active:opacity-60">
          <Text variant="strong" tone="muted" className="text-sm">
            Remove
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <View className="flex-row">
        <TextInput
          value={input}
          onChangeText={(t) => {
            setInput(t);
            if (error) setError(null);
          }}
          onSubmitEditing={submit}
          placeholder="Voucher code"
          placeholderTextColor="#8d978f"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          className="flex-1 bg-raised rounded-xl px-4 py-3 text-ink font-mono text-sm mr-2"
        />
        <Pressable
          onPress={submit}
          className="bg-accent rounded-xl px-5 items-center justify-center active:opacity-80"
        >
          <Text variant="strong" tone="canvas" className="text-sm">
            Apply
          </Text>
        </Pressable>
      </View>
      {error && (
        <Text tone="danger" className="text-sm mt-2">
          {error}
        </Text>
      )}
    </View>
  );
}
