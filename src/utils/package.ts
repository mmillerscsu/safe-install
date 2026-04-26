export function parsePackage(input: string) {
  const atIndex = input.lastIndexOf("@");

  // Handle scoped packages correctly
  if (input.startsWith("@")) {
    const parts = input.split("@");
    if (parts.length === 3) {
      return {
        name: `@${parts[1]}`,
        version: parts[2],
      };
    }
  }

  if (atIndex > 0) {
    return {
      name: input.slice(0, atIndex),
      version: input.slice(atIndex + 1),
    };
  }

  return {
    name: input,
    version: null,
  };
}
