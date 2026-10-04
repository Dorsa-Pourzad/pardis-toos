type BotanicalDecorationProps = {
  variant?: "main" | "left" | "about";
  className?: string;
};

export function BotanicalDecoration({
  variant = "about",
  className = "",
}: BotanicalDecorationProps) {
  if (variant === "main") {
    return (
      <svg className={className} viewBox="0 0 220 340" aria-hidden="true" focusable="false">
        <path className="hero-botanical-stem" d="M23 329C13 281 31 235 68 190C105 146 128 104 121 56C119 38 113 22 103 10" />
        <path className="hero-botanical-twig" d="M42 255C29 237 18 219 9 202M57 226C81 209 107 202 135 204M76 184C57 166 39 144 26 124M101 132C126 116 151 107 181 105M118 91C105 69 95 45 87 24M121 64C145 50 166 44 191 43" />
        <path d="M35 274C9 255 0 226 8 198C36 211 48 238 35 274Z" fill="#DCEBE4" />
        <path d="M49 232C75 201 108 192 138 203C120 233 87 246 49 232Z" fill="#E4EFE9" />
        <path d="M78 184C44 173 26 150 25 120C56 127 77 150 78 184Z" fill="#D5E7DE" />
        <path d="M100 132C127 104 159 95 185 105C170 134 137 145 100 132Z" fill="#DCEBE4" />
        <path d="M121 88C94 73 79 49 82 22C108 32 123 55 121 88Z" fill="#E4EFE9" />
        <path d="M119 62C141 39 169 32 194 42C180 68 153 77 119 62Z" fill="#D5E7DE" />
      </svg>
    );
  }

  if (variant === "left") {
    return (
      <svg className={className} viewBox="0 0 180 280" aria-hidden="true" focusable="false">
        <path className="hero-botanical-stem" d="M21 270C15 231 30 193 58 157C84 123 98 87 94 49C92 33 87 19 80 8" />
        <path className="hero-botanical-twig" d="M28 238C17 221 9 204 3 185M41 211C65 195 89 188 114 191M57 165C38 148 21 127 12 104M82 112C105 97 127 89 151 88M94 79C83 58 76 39 72 20" />
        <path d="M29 239C8 222 0 198 4 174C29 183 42 207 29 239Z" fill="#E4EFE9" />
        <path d="M42 212C65 190 92 184 116 192C101 216 73 225 42 212Z" fill="#D5E7DE" />
        <path d="M58 164C31 153 14 132 12 105C39 112 57 134 58 164Z" fill="#DCEBE4" />
        <path d="M82 112C105 88 132 80 155 89C141 115 112 124 82 112Z" fill="#E4EFE9" />
        <path d="M94 79C72 65 61 42 64 17C87 27 99 51 94 79Z" fill="#D5E7DE" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 170 230" aria-hidden="true" focusable="false">
      <path d="M19 221C17 179 42 144 73 112C103 81 118 47 107 11M48 162C31 143 22 126 17 105M75 110C97 96 118 89 143 88M100 60C82 44 72 27 68 9" fill="none" stroke="#C9DED4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 162C23 151 12 128 17 103C43 112 56 133 48 162Z" fill="#DCEBE4" />
      <path d="M74 111C97 86 122 81 146 89C133 115 107 124 74 111Z" fill="#E4EFE9" />
      <path d="M99 61C75 49 62 30 63 7C88 14 102 36 99 61Z" fill="#D5E7DE" />
    </svg>
  );
}
