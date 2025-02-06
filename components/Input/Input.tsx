interface InputProps {
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({placeholder, onChange}: InputProps) {
    return (
        <input className="
            w-full
            border-2  
          border-black
            rounded-[20px]
            font-normal
            px-5
            py-[8px]
            placeholder:text-black
            bg-transparent
        " placeholder={placeholder} onChange={onChange} type="text" />
    )
}

export default Input