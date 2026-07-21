import logoAsset from "@/assets/snapcut-logo.png.asset.json";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="SnapCut AI"
      className={`${className} rounded-lg object-contain`}
      width={36}
      height={36}
    />
  );
}
