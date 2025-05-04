import { ctaButtonClass } from "@/lib/classNames"
import type { HeaderCTAButtonProps } from "@/types/ctaProps"

export default function HeaderCTAButton({ className = "" }: HeaderCTAButtonProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`${ctaButtonClass}${className} cursor-pointer`}
        >
            Join Waitlist
        </button>
    )
}