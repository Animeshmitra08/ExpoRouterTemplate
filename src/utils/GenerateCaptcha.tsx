export default function GenerateCaptcha(prev: string = ""): {
  raw: string;
  styled: string;
} {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let raw = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    raw += chars[randomIndex];
  }

  if (raw === prev) {
    return GenerateCaptcha(prev);
  }

  const styled = raw
    .split("")
    // .map((c) => c + "\u0336") // Unicode combining strikethrough
    .join("");

  return { raw, styled };
}