import { useState } from "react";

type CopyButtonProps = {
  text?: string;
  getText?: () => string;
  label?: string;
  copiedLabel?: string;
  errorLabel?: string;
  resetDelay?: number;
  title?: string;
  className?: string;
};

export default function CopyButton({
  text,
  getText,
  label = "Copy",
  copiedLabel = "Copied!",
  errorLabel = "Failed to copy",
  resetDelay = 1500,
  title = "Copy to clipboard",
  className,
}: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleClick = async () => {
    try {
      const valueToCopy = getText ? getText() : text;

      if (!valueToCopy) {
        throw new Error("No text provided to copy.");
      }

      await navigator.clipboard.writeText(valueToCopy);

      setStatus("copied");

      setTimeout(() => {
        setStatus("idle");
      }, resetDelay);
    } catch (err) {
      console.error("Failed to copy:", err);

      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, resetDelay);
    }
  };

  const buttonText =
    status === "copied" ? copiedLabel : status === "error" ? errorLabel : label;

  return (
    <button title={title} onClick={handleClick} className={className}>
      {buttonText}
    </button>
  );
}