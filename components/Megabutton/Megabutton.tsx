import Link from "next/link"

interface MegabuttonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
}

function Megabutton({ children, className, href }: MegabuttonProps) {
    return (
        <Link className={`
            max-w-[613px]
            max-h-[613px]
            w-full
            aspect-square
            flex
            items-center
            justify-center
            text-7xl 
            border
            border-black
            rounded-[20px]
            hover:color-red
        ${className}`}
        href={href || "#"}>
            {children}
        </Link>
    );
}

export default Megabutton;
