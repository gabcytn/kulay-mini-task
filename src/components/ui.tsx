import { Text as RNText, TextProps } from "react-native";

const variants = {
  display: "font-display",
  body: "font-sans",
  strong: "font-sans-semibold",
  mono: "font-mono",
};

const tones = {
  ink: "text-ink",
  muted: "text-muted",
  accent: "text-accent",
  danger: "text-danger",
  canvas: "text-canvas",
};

type Props = TextProps & {
  variant?: keyof typeof variants;
  tone?: keyof typeof tones;
  className?: string;
};

export function Text({ variant = "body", tone = "ink", className = "", ...props }: Props) {
  return <RNText className={`${variants[variant]} ${tones[tone]} ${className}`} {...props} />;
}
