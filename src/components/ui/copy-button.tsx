"use client";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  children: React.ReactNode;
}

export function CopyButton({ textToCopy, className = "", children }: CopyButtonProps) {
  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}