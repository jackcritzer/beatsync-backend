'use client';
import { ctaButtonClass } from "@/lib/classNames"
import type { FormCTAButtonProps } from "@/types/ctaProps";

export default function FormCTAButton( { status, className = "" }: FormCTAButtonProps ) {
    return (
        <button
            type="submit"
            className={`${ctaButtonClass}${className}cursor-pointer`}
            disabled={status === "loading"}
        >
            {status === "loading" ? "Submitting..." : "Join Waitlist"}
        </button>
    )
}