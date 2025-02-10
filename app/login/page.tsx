'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <div className="h-full flex justify-center items-center">
            <div className="
                max-h-[840px]
                max-w-[643px]
                w-full
                h-full
                bg-white/50
                rounded-[20px]
                flex
                flex-col
                items-center
                justify-center
            ">
                <h1 className='auth-title mb-[120px]'>Log in</h1>
                <div className="max-w-[388px] flex flex-col w-full items-center gap-8">
                    <Input placeholder='Email' type='text' onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <Button className='max-w-[220px]' onClick={() => signIn('credentials', {email, password, redirect: false})} >Submit</Button>
                </div>
                <div className="line my-8"></div>
                <Button className='max-w-[220px]' onClick={() => signIn('google')}>Log in with google</Button>
            </div>
        </div>
    )
}

export default Login