import Image from "next/image";

type AdminBrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function AdminBrandLogo({ className = "", priority = false }: AdminBrandLogoProps) {
  return (
    <span className={`admin-logo-crop ${className}`.trim()}>
      <Image
        className="admin-logo-crop-image"
        src="/images/pardis-toos-logo.png"
        alt="لوگوی پردیس توس"
        width={150}
        height={150}
        priority={priority}
      />
    </span>
  );
}
