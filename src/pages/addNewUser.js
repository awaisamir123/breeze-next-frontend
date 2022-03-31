import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const addNewUser = () => {
    const { addUser } = useAuth({
        middleware: 'auth',
    })

    const [name, setName] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        addUser({
            name,
            firstname,
            lastname,
            email,
            password,
            password_confirmation,
            setErrors,
        })
    }

    return (
        <GuestLayout>
            <AuthCard>
                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />
                <div className="flex  justify-center">
                    <h4 className="font-medium leading-tight text-2xl mt-0 mb-2 text-black-600">
                        New User
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
                        <Button className="ml-4">Add User</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default addNewUser
