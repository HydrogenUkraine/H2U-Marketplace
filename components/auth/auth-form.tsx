"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoginWithEmail, useToken } from "@privy-io/react-auth"
import { useAuth } from "@/hooks/auth.hooks"

interface AuthFormProps {
  type: "login" | "register"
}

interface AuthFormState {
    data: {
        email: string;
        name: string;
        code: string;
    };
    error?: string;
}

const initialState: AuthFormState = {
    data: {
        email: '',
        name: '',
        code: '',
    },
};

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [state, setState] = useState(initialState);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { getAccessToken } = useToken();
  const {loginPrivy, registerPrivy} = useAuth();

  const { sendCode, loginWithCode } = useLoginWithEmail({
    onComplete: async () => {
      try {
        const privyAccessToken = await getAccessToken();
        if (privyAccessToken != null) {
          // Attempt to sign in using Privy with the token
          console.log('try to login')
          await loginPrivy({
            privyAccessToken, 
            options: {
              onSuccess: (user) => {
                router.push("/")
              },
              onError: async(err) => {
                if(err.status===401){
                    setError("Please register fisrt.");
                }
                if(type === 'register'){
                    await registerPrivy({
                        privyAccessToken, 
                        name: state.data.name,
                        options: {
                            onSuccess: (user) => {
                                router.push("/")
                            },
                            onError: (err) => {
                            },
                        },
                    });
                }
              },
            },
          });
        } else {
        }
      } catch (err) {
        console.error('Error in onComplete:', err);
      }
    },
    onError: error => {
      console.error('Error during email authentication:', error);
    },
  });

  const validateForm = (): boolean => {
    if (!state.data.email.trim()) {
      setState({ ...state, error: 'Email is required' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.email)) {
      setState({ ...state, error: 'Invalid email format' });
      return false;
    }
    if (isCodeSent && !state.data.code.trim()) {
      setState({ ...state, error: 'Verification code is required' });
      return false;
    }
    if (type === 'register' && !state.data.name.trim()) {
      setState({ ...state, error: 'Name is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    if (!validateForm()) return; // Stop if validation fails

    try {
      await loginWithCode({ code: state.data.code });      
    } catch (error) {
      setError((error as Error).message)
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{type === "login" ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your email to sign in to your account"
            : "Create a new account to access the H2 Marketplace"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required
                  defaultValue={state.data.name}
                  onChange={event =>
                    setState({
                      ...state,
                      data: { ...state.data, name: event.target.value },
                      error: undefined,
                    })
                  }
                />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required 
                defaultValue={state.data.email}
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, email: event.target.value },
                    error: undefined,
                  })
                }
              />
          </div>

          {isCodeSent && (
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input 
                id="code" name="code" type="text" required
                defaultValue={state.data.code}
                placeholder='Verification Code'
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, code: event.target.value },
                    error: undefined,
                  })
                }
              />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

        <Button
            className='w-full'
            onClick={() => {
            sendCode({ email: state.data.email });
            setIsCodeSent(true);
            }}
            >
            Send Code
        </Button>
    
        {isCodeSent && 
            <Button type="submit" className="w-full" disabled={!state.data.email || !state.data.code}>
            {type === "login" ? "Sign In" : "Sign Up"}
            </Button>
        }
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => router.push("/auth/register")}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => router.push("/auth/login")}>
                Sign in
              </Button>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  )
}
