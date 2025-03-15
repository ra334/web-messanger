"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
import GoogleIcon from "@/app/assets/google.svg"

const formSchema = z.object({
    nickname: z.string().min(1, {
        message: "Nickname must be at least 1 character long",
    }),

    email: z.string().email({
        message: "Invalid email address",
    }),

    password1: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),

    password2: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    })
}).refine(data => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
})

function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password1: "",
            password2: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        console.log("Login")
    }

    return (
        <div className="">
            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Sign up</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                            <FormField
                                    control={form.control}
                                    name="nickname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nickname</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Nickname"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="email@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name="password1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoComplete="new-password"
                                                    type="password"
                                                    placeholder="Password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <FormField
                                    control={form.control}
                                    name="password2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Repeat password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoComplete="new-password"
                                                    type="password"
                                                    placeholder="Repeat password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-6 w-full">
                                    <Button type="submit" className="w-full">
                                        Sign up
                                    </Button>
                                    <div className="">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            <Image
                                                src={GoogleIcon}
                                                width={20}
                                                height={20}
                                                alt="Google icon"
                                            ></Image>
                                            Sign up with google
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full text-center">
                                    <span>
                                        Already have an account?
                                        <Button
                                            variant="link"
                                            className="p-0 pl-1 underline h-auto"
                                        >
                                            Login
                                        </Button>
                                    </span>
                                </div>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default Login
