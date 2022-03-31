import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
// import axios from '@/lib/axios'
import { useEffect } from 'react'

const updateUser = props => {
    const { updateUser, getUserData } = useAuth({
        middleware: 'auth',
        userId: props?.data,
    })
    const [name, setName] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    useEffect(() => {
        if (getUserData?.data) {
            setName(getUserData?.data?.name)
            setFirstname(getUserData?.data?.firstname)
            setLastname(getUserData?.data?.lastname)
            setEmail(getUserData?.data?.email)
        }
    }, [getUserData])

    const submitForm = event => {
        event.preventDefault()
        if (getUserData?.data?.id) {
            updateUser({
                name,
                firstname,
                lastname,
                email,
                password,
                password_confirmation,
                setErrors,
                id: getUserData.data.id,
            })
        }
    }

    return (
        <GuestLayout>
            <AuthCard>
                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />
                <div className="flex  justify-center">
                    <h4 className="font-medium leading-tight text-2xl mt-0 mb-2 text-black-600">
                        Update User
                    </h4>
                </div>

                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">User Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    {/* first name*/}
                    <div>
                        <Label htmlFor="name">First Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={firstname}
                            className="block mt-1 w-full"
                            onChange={event => setFirstname(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    {/* last name*/}
                    <div>
                        <Label htmlFor="name">Last Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={lastname}
                            className="block mt-1 w-full"
                            onChange={event => setLastname(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    {/* Email Address */}
                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* <Link href="/login">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Already registered?
                            </a>
                        </Link> */}

                        <Button className="ml-4">Update User</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}
export async function getServerSideProps(context) {
    const { userId } = await context.query
    return {
        props: {
            data: userId || null,
        },
    }
}

export default updateUser
