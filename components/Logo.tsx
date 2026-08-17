import { cn } from "@/lib/cn";
import Image from "next/image";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function SMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/justiso.png"
      alt=""
      width={242}
      height={321}
      className={cn("block h-7 w-auto", className)}
    />
  );
}

export function Logo({
  className,
  markClassName,
  wordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/images/logo.png"
        alt=""
        width={84}
        height={108}
        className={cn("block h-8 w-auto", markClassName)}
        priority
      />
      {wordmark ? (
        <span className="text-[1.35rem] font-medium lowercase leading-none tracking-[0.01em]">
          senda
        </span>
      ) : null}
    </span>
  );
}
