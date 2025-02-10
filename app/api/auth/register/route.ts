import { NextResponse } from "next/server"
import usersService from "@/services/users-service"

export async function POST(req: Request) {
    const { nickName, email, password } = await req.json()
    const user = await usersService.registerUser({
        nickName,
        email,
        password,
        avatarURL: 'https://google.com'
    })

    return NextResponse.json(
        { message: "User registered successfully", user },
        { status: 201 }
    )
}