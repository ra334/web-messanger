interface InputProps {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    type: string;
}

function Input({placeholder, onChange, className, type}: InputProps) {
    return (
        <input className={`
                w-full
                border-2  
              border-black
                rounded-[20px]
                font-normal
                px-5
                py-[8px]
                placeholder:text-black
                bg-transparent
                ${className}
            `} placeholder={placeholder} onChange={onChange} type={type} />
    )
}

export default Input