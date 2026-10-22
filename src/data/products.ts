import type { ComponentProps } from "react";
import type { Feather } from "@expo/vector-icons";

export type Product = {
  id: string;
  productName: string;
  description: string;
  price: number;
  icon: ComponentProps<typeof Feather>["name"];
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    productName: "Mechanical Keyboard",
    description: "Hot-swappable 75% layout with tactile switches and PBT keycaps.",
    price: 129,
    icon: "command",
  },
  {
    id: "p2",
    productName: "Wireless Mouse",
    description: "Ergonomic 4000 DPI mouse with silent clicks and a 70-hour battery.",
    price: 49.5,
    icon: "mouse-pointer",
  },
  {
    id: "p3",
    productName: "USB-C Dock",
    description: "7-in-1 hub with HDMI, SD reader and 100W pass-through charging.",
    price: 79,
    icon: "hard-drive",
  },
  {
    id: "p4",
    productName: "Studio Headphones",
    description: "Closed-back over-ear headphones with a detachable cable.",
    price: 159,
    icon: "headphones",
  },
  {
    id: "p5",
    productName: "Monitor Light Bar",
    description: "Glare-free asymmetric desk lighting that clips onto any display.",
    price: 39.99,
    icon: "sun",
  },
];
