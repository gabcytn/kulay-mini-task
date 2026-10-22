import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "../data/products";

export type CartLine = { product: Product; quantity: number };

const VOUCHERS: Record<string, number> = {
  discount10: 0.1,
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  voucherCode: string | null;
  voucherRate: number;
  quantityOf: (productId: string) => number;
  addToCart: (product: Product) => void;
  decrement: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  applyVoucher: (code: string) => string | null; // returns error message or null
  clearVoucher: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  const addToCart = useCallback((product: Product) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const decrement = useCallback((productId: string) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.product.id === productId ? { ...l, quantity: l.quantity - 1 } : l
        )
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const applyVoucher = useCallback(
    (raw: string) => {
      const code = raw.trim().toLowerCase();
      if (!code) return "Enter a voucher code.";
      if (lines.length === 0) return "Add an item before applying a voucher.";
      if (!(code in VOUCHERS)) return "That voucher code isn't valid.";
      setVoucherCode(code);
      return null;
    },
    [lines.length]
  );

  const clearVoucher = useCallback(() => setVoucherCode(null), []);

  // An empty cart shouldn't keep a voucher applied.
  useEffect(() => {
    if (lines.length === 0) setVoucherCode(null);
  }, [lines.length]);

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    }),
    [lines]
  );

  const voucherRate = voucherCode ? VOUCHERS[voucherCode] : 0;

  const { discount, total } = useMemo(() => {
    const d = Math.round(subtotal * voucherRate * 100) / 100;
    return { discount: d, total: Math.round((subtotal - d) * 100) / 100 };
  }, [subtotal, voucherRate]);

  const quantityOf = useCallback(
    (productId: string) =>
      lines.find((l) => l.product.id === productId)?.quantity ?? 0,
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      discount,
      total,
      voucherCode,
      voucherRate,
      quantityOf,
      addToCart,
      decrement,
      removeFromCart,
      applyVoucher,
      clearVoucher,
    }),
    [
      lines, itemCount, subtotal, discount, total, voucherCode, voucherRate,
      quantityOf, addToCart, decrement, removeFromCart, applyVoucher, clearVoucher,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
