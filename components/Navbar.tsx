import Image from "next/image"
import Link from "next/link"
import { AuthProviders } from "./AuthProviders";
import { NavLinks } from "@/constants"
import { getCurrentUser } from "@/lib/session";


export const Navbar = async () => {

  const session = await getCurrentUser();
  console.log("current user", session)

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            width={115}
            height={43}
            alt="Flexibble"
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {
            NavLinks.map((link, key) => (
              <Link
                href={link.href}
                key={key}>
                {link.text}
              </Link>
            ))
          }
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {
          session?.user ? (<>
            {
              session?.user.image && (
                <Image
                  src={session.user.image}
                  width={40}
                  height={40}
                  alt={session.user.name}
                  className="rounded-full"
                />
              )
            }
          </>) :
            (
              <>
                <AuthProviders />
              </>
            )
        }
      </div>
    </nav>
  )
}
