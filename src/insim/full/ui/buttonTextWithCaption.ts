export function buttonTextWithCaption(caption: string, text: string) {
  const zero = String.fromCharCode(0);

  return `${zero}${caption}${zero}${text}`;
}

export function buttonNumberTextWithCaption(
  caption: string,
  number: number,
): string {
  return buttonTextWithCaption(caption, number.toString(10));
}
