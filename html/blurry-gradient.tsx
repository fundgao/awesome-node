/**
 * 一个漂亮的毛玻璃渐变背景
 *
 * npm install react-blurry-gradient
 */

import { BlurryGradient } from "react-blurry-gradient";
import "react-blurry-gradient/style.css";

const colors = [
  "#bfdbfe",
  "#60a5fa",
  "#2563eb",
  "#c7d2fe",
  "#818cf8",
  "#4f46e5",
];

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BlurryGradient colors={colors} />
    </div>
  );
}
