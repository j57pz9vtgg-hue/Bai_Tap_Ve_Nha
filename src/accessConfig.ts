// Basic browser access gate for the static site; independent of parent review credentials.
export const APP_ACCESS = {
  version: 1,
  salt: "cce4e0f0c2732ecefa6342e7bb253aa4",
  digest: "9068465b2c46a7ed0b061cfe260f195bf97ef6a796727b35133612093cae6264",
} as const;
