import Megabutton from "@/components/Megabutton/Megabutton"

function Auth() {
    return (
        <div className="
            flex 
            flex-row
            items-center
            gap-24
            max-w-[1322px]
            mx-auto
            h-full
            px-2">
            <Megabutton href='/login' className="button-bluein opacity-[73%]">Log in</Megabutton>
            <Megabutton href="/signup" className="button-blueout opacity-[88%]">Sign up</Megabutton>
        </div>
    )
}

export default Auth