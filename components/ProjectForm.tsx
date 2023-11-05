"use client"
import { SessionInterface } from "@/common.types";

type Props = {
    type: string;
    session: SessionInterface
}
export const ProjectForm = ({ type, session }: Props) => {

    const handleFormSubmit = (e: React.FormEvent) => {

    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >

        </form>
    )
}
