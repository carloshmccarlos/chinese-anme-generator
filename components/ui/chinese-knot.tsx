import { cn } from "@/lib/utils"

export function ChineseKnot({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={cn("w-full h-full", className)}
            {...props}
        >
            {/* Central Diamond/Knot Structure */}
            <path
                d="M50 20 L80 50 L50 80 L20 50 Z"
                className="opacity-20"
                strokeWidth="1"
            />

            {/* Interlacing Loops - Stylized Pan Chang Knot feel */}
            <path
                d="M50 10 V30 M50 70 V90 M10 50 H30 M70 50 H90"
                strokeLinecap="round"
            />

            {/* Detailed loops (simplified for elegance) */}
            <path
                d="M35 35 Q50 10 65 35 T35 35"
                className="opacity-60"
            />
            <path
                d="M35 65 Q50 90 65 65 T35 65"
                className="opacity-60"
            />
            <path
                d="M35 35 Q10 50 35 65 T35 35"
                className="opacity-60"
            />
            <path
                d="M65 35 Q90 50 65 65 T65 35"
                className="opacity-60"
            />

            {/* Tassels (optional, maybe just the main knot body for background) */}
        </svg>
    )
}
