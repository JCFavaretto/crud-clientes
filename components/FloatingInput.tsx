// components/FloatingInput.tsx
import React, { useState } from "react";

interface FloatingInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  className?: string;
}

export default function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  className = "",
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Determina si el label debe flotar
  const shouldFloat = isFocused || value.trim() !== "";

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } p-2 pt-6 rounded w-full focus:border-blue-500 focus:outline-none`}
      />

      {/* Label/Placeholder Flotante */}
      <label
        className={`absolute left-2 text-sm transition-all duration-200 ${
          shouldFloat
            ? "text-blue-500 -top-2 text-xs z-10 bg-white px-1"
            : "text-gray-500 top-2"
        }`}
      >
        {label}
      </label>

      {/* Mensaje de Error */}
      {error && (
        <p
          className="absolute text-red-500 text-xs bottom-2 right-2 z-10 bg-white px-1 transition-transform duration-300 ease-in-out"
          style={{
            transform: error ? "translate(0%, 20%)" : "translate(100%, -100%)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
