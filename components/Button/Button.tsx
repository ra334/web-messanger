interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

function Button({children, onClick}: ButtonProps) {
    return (
        <button className="
            w-full
            text-center
            border-2
          border-black
            rounded-[20px]
            font-normal
            text-xl
            py-2
        " onClick={onClick}>
            {children}
        </button>
    )
}

export default Button