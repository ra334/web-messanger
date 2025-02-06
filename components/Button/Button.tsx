interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

function Button({children, onClick, className}: ButtonProps) {
    return (
        <button className={`
            w-full
            text-center
            border-2
          border-black
            rounded-[20px]
            font-normal
            text-xl
            py-2
            ${className}
        `} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button