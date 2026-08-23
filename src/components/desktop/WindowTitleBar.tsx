"use client";

interface WindowTitleBarProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}

export function WindowTitleBar({
  title,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowTitleBarProps) {
  return (
    <div
      onPointerDown={onFocus}
      className="flex h-9 shrink-0 items-center gap-2 border-b border-white/10 bg-black/25 px-3 backdrop-blur-md"
    >
      <button
        type="button"
        aria-label={`Close ${title}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onClose}
        className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform duration-150 hover:scale-125 hover:shadow-[0_0_6px_#ff5f57] active:scale-95"
      />
      <button
        type="button"
        aria-label={`Minimize ${title}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onMinimize}
        className="h-3 w-3 rounded-full bg-[#febc2e] transition-transform duration-150 hover:scale-125 hover:shadow-[0_0_6px_#febc2e] active:scale-95"
      />
      <button
        type="button"
        aria-label={`Maximize ${title}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onMaximize}
        className="h-3 w-3 rounded-full bg-[#28c840] transition-transform duration-150 hover:scale-125 hover:shadow-[0_0_6px_#28c840] active:scale-95"
      />
      <span className="ml-2 select-none truncate text-xs font-medium text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
        {title}
      </span>
    </div>
  );
}
