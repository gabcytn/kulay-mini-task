# Desk Goods

A small shopping cart app built with **React Native (Expo)** and **Tailwind CSS (NativeWind)**. Browse a static product catalogue, add items to a cart, apply a voucher code, and check out.

Built as a take-home assignment. The focus is clean architecture, idiomatic use of React hooks, and a polished, minimal UI.

<p align="center">
  <img src="./assets/images/icon.png" alt="Desk Goods app icon" width="120" />
</p>

---

## Screenshots

| Products | Cart | Voucher applied | Order placed |
| :------: | :--: | :-------------: | :----------: |
| ![Products](./docs/products.png) | ![Cart](./docs/cart.png) | ![Voucher](./docs/voucher.png) | ![Order placed](./docs/order-placed.png) |

---

## Features

- **Static product list:** five products, each with `productName`, `description` and `price`.
- **Add to cart:** add any product from its card. Adding the same product again increases its quantity.
- **Manage the cart:** adjust quantities with a stepper, or remove a product entirely with the trash icon.
- **Real-time cart summary:** item count and total update instantly across the header badge, the cart screen and the footer statusline.
- **Voucher codes:** enter `discount10` to take 10% off. The subtotal, discount line and discounted total are all shown clearly. Codes are case-insensitive and can be removed.
- **Checkout:** empties the cart and shows an order confirmation.
- **Dedicated cart screen:** products and cart live on separate routes using Expo Router.

### Voucher behaviour

| Input | Result |
| ----- | ------ |
| `discount10` (any casing, surrounding spaces ignored) | 10% discount applied to the subtotal |
| Any other code | Inline error: "That voucher code isn't valid." |
| Empty input | Inline error asking for a code |
| Applied to an empty cart | Inline error asking to add an item first |

If the cart is emptied (by removing items or checking out), the applied voucher is cleared automatically.

---

## Tech stack

| Area | Choice |
| ---- | ------ |
| Framework | React Native with [Expo](https://expo.dev) |
| Routing | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Language | TypeScript |
| Styling | [NativeWind v4](https://www.nativewind.dev) (Tailwind CSS 3 for React Native) |
| State | React Context with a custom `useCart` hook |
| Fonts | Fraunces, Source Sans 3, JetBrains Mono via `@expo-google-fonts` |
| Icons | `@expo/vector-icons` (Feather) |

---

## React hooks showcase

| Hook | Where it's used | Purpose |
| ---- | --------------- | ------- |
| `useState` | `CartContext`, `ProductCard`, `VoucherInput`, cart screen | Cart lines, applied voucher, input text, "Added" button feedback, order confirmation |
| `useEffect` | `CartContext`, `ProductCard`, `_layout.tsx` | Clears the voucher when the cart empties, resets the "Added" label after a timeout (with cleanup), hides the splash screen once fonts load |
| `useMemo` | `CartContext` | Derives item count, subtotal, discount and total only when the cart or voucher changes. Also memoises the context value |
| `useCallback` | `CartContext` | Keeps cart actions referentially stable to avoid needless re-renders of consumers |
| `useContext` | `useCart` | Gives any component access to the cart without prop drilling |
| Custom hook | `useCart` | Wraps `useContext` and throws a clear error if used outside `CartProvider` |

---

## Project structure

```
src/
├── app/
│   ├── _layout.tsx        # Root layout: fonts, splash screen, CartProvider, Stack
│   ├── index.tsx          # Products screen
│   └── cart.tsx           # Cart, voucher and checkout screen
├── components/
│   ├── CartItemRow.tsx    # Cart line with quantity stepper and remove button
│   ├── ProductCard.tsx    # Product card with add-to-cart action
│   ├── StatusLine.tsx     # Footer showing live item count and total, links to cart
│   ├── VoucherInput.tsx   # Voucher field, validation and applied state
│   └── ui.tsx             # Themed Text component (font variant + colour tone)
├── context/
│   └── CartContext.tsx    # Cart state, derived totals, voucher logic, useCart hook
├── data/
│   └── products.ts        # Static product catalogue
└── lib/
    └── format.ts          # Price formatting helper
```

---

## Getting started

### Prerequisites

- Node.js 18 or later
- npm
- The [Expo Go](https://expo.dev/go) app on a device, or an iOS Simulator / Android Emulator

### Install and run

```bash
# Install dependencies
npm install

# Start the dev server (-c clears the Metro cache; recommended on first run)
npx expo start -c
```

Then press `i` for the iOS Simulator, `a` for the Android Emulator, or scan the QR code with Expo Go.

### Type checking

```bash
npx tsc --noEmit
```

---

## Design notes

- **Flat, dark palette:** a charcoal background with a muted green accent. No gradients and no coloured borders. Depth comes from layered surface tones.
- **Typography:** Fraunces for headings, Source Sans 3 for body text, and JetBrains Mono for prices and numeric values so figures align cleanly.
- **Statusline footer:** a small terminal-style bar that keeps the item count and total visible on the products screen and doubles as a shortcut to the cart.
- **Theme tokens:** all colours and font families are defined once in `tailwind.config.js`.

---

## Implementation notes and trade-offs

- **Cart model:** the cart stores one line per product with a quantity, rather than repeating products. Item count is the sum of quantities.
- **Money handling:** prices are plain numbers, as specified. The discount and total are rounded to two decimals to avoid floating-point drift. For a production app, I'd store amounts in integer minor units.
- **Voucher codes:** defined in a small lookup map in `CartContext.tsx`, so adding a code is a one-line change. A real app would validate on the server.
- **State management:** Context is enough for an app this size. If the app grew, I'd consider a dedicated store or persisting the cart with `AsyncStorage`.
- **Checkout:** simulated. It clears the cart and shows a confirmation. There is no payment or backend.

---

## Possible improvements

- Persist the cart between sessions
- Product detail screen and product images
- Multiple voucher types (fixed amount, minimum spend, expiry)
- Unit tests for cart logic and voucher validation
- Haptic feedback and animated list transitions
