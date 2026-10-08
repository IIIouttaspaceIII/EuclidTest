"use client";

import { labelForValue } from "@/lib/quiz/scoring";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function Slider({ value, onChange, label }: SliderProps) {
  const hue = Math.round(((value + 1) / 2) * 140); // red -> green
  const color = `hsl(${hue} 70% 50%)`;
  return (
    <div className="w-full">
      <p
        className="mb-6 text-center text-2xl font-semibold transition-colors"
        style={{ color }}
        aria-live="polite"
      >
        {labelForValue(value)}
      </p>
      <input
        type="range"
        aria-label={label}
        min={-1}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-3 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-red-500 via-zinc-400 to-green-500 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-zinc-900 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-zinc-900 [&::-webkit-slider-thumb]:shadow"
      />
      <div className="mt-2 flex justify-between text-xs text-zinc-500">
        <span>Disagree</span>
        <span>Agree</span>
      </div>
    </div>
  );
}
