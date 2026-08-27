import Image from "next/image";

export function PatrolLogo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/patrol-logo.svg"
      alt=""
      width={size}
      height={size}
      priority
      aria-hidden="true"
      className="rounded-md"
    />
  );
}
