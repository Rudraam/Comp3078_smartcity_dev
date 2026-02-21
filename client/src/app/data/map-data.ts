import type { Alert } from "../types";

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "traffic",
    title: "Heavy Traffic on Highway 401",
    description: "Expect delays of 20-30 minutes eastbound near DVP",
    icon: "\u{1F6A8}",
  },
  {
    id: "2",
    type: "weather",
    title: "Weather Advisory",
    description: "Light snow expected this evening, 5-10cm accumulation",
    icon: "\u{1F324}\uFE0F",
  },
  {
    id: "3",
    type: "construction",
    title: "Construction on Eglinton Ave",
    description: "Lane closures between Yonge and Bayview",
    icon: "\u{1F6A7}",
  },
  {
    id: "4",
    type: "temperature",
    title: "Temperature Drop",
    description: "Temperatures dropping to -15\u00B0C overnight",
    icon: "\u{1F321}\uFE0F",
  },
];
