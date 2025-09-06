Great question 🚀 — this is exactly where **assistant-ui** shines: you can wire up **custom agents** (like weather, stock prices, search, etc.) and render their outputs in **custom UI components** inside the chat.

Here’s a step-by-step guide:

---

## 1. Install Assistant-UI

```bash
npm install @assistant-ui/react
```

---

## 2. Create a Tool (Weather / Stock)

Assistant-UI works with **tools** (functions you define that the LLM can call).
For example:

```ts
// tools.ts
export const tools = {
  getWeather: async ({ location }: { location: string }) => {
    // Imagine you call an API here
    return {
      temperature: "28°C",
      condition: "Sunny",
      location,
    };
  },

  getStockPrice: async ({ symbol }: { symbol: string }) => {
    // Mock example; replace with real API
    return {
      symbol,
      price: 241.32,
      change: "+2.1%",
    };
  },
};
```

---

## 3. Define a Generative UI Component

You can **map tool results → UI** so the chat shows structured cards instead of raw JSON.

```tsx
// ui/WeatherCard.tsx
export function WeatherCard({
  location,
  temperature,
  condition,
}: {
  location: string;
  temperature: string;
  condition: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-blue-100 shadow-md">
      <h3 className="font-semibold text-lg">{location} Weather</h3>
      <p>{temperature} – {condition}</p>
    </div>
  );
}

// ui/StockCard.tsx
export function StockCard({
  symbol,
  price,
  change,
}: {
  symbol: string;
  price: number;
  change: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-green-100 shadow-md">
      <h3 className="font-semibold text-lg">{symbol}</h3>
      <p>Price: ${price}</p>
      <p className={change.startsWith("+") ? "text-green-600" : "text-red-600"}>
        {change}
      </p>
    </div>
  );
}
```

---

## 4. Connect Tools to Assistant-UI

```tsx
import { Chat } from "@assistant-ui/react";
import { WeatherCard } from "./ui/WeatherCard";
import { StockCard } from "./ui/StockCard";
import { tools } from "./tools";

export default function App() {
  return (
    <Chat
      assistant={{
        // 👇 register your tools
        tools: {
          getWeather: {
            description: "Get weather info for a location",
            parameters: {
              type: "object",
              properties: {
                location: { type: "string" },
              },
              required: ["location"],
            },
            execute: tools.getWeather,
            render: (result) => <WeatherCard {...result} />,
          },
          getStockPrice: {
            description: "Get stock price info",
            parameters: {
              type: "object",
              properties: {
                symbol: { type: "string" },
              },
              required: ["symbol"],
            },
            execute: tools.getStockPrice,
            render: (result) => <StockCard {...result} />,
          },
        },
      }}
    />
  );
}
```

---

## 5. Usage Example in Chat

* User: *“What’s the weather in New York?”*
* LLM: Decides to call `getWeather({ location: "New York" })`
* Assistant-UI executes your tool, then displays `<WeatherCard location="New York" temperature="28°C" condition="Sunny" />` in the chat.

---

✅ You now have a chat where **LLM calls your tools**, and **Assistant-UI renders the outputs with custom components** (instead of boring JSON).

---

👉 Do you want me to make a **full working Next.js example** (with Assistant-UI + OpenAI + a mock weather/stock API) so you can run it directly?