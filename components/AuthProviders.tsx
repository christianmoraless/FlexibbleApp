"use client"
import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from "react"
import { Button } from './Button';


type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}
type Providers = Record<string, Provider>;

export const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])


  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider, i) => (
          <Button
            key={i}
            title={'Sign in'}

            handleClick={() => signIn(provider?.id)}
          />
        ))}
      </div>
    )
  }
}
