"use client"
import Image from "next/image";
import { ChangeEvent } from "react";
import { SessionInterface } from "@/common.types";
//components
import { FormField } from "./FormField";
import { categoryFilters } from "@/constants";

type Props = {
    type: string;
    session: SessionInterface
}
export const ProjectForm = ({ type, session }: Props) => {

    const handleFormSubmit = (e: React.FormEvent) => {

    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleStateChange = (fieldName: string, value: string) => {

    }

    const form = {
        image: "",
        title: "",
        liveSiteUrl: "",
        description: "",
        githubUrl: "",
        category: "",
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Title"
                state={form.title}
                placeholder="Title of your project"
                setState={(value) => handleStateChange("title", value)}
            />

            <FormField
                title="Description"
                state={form.description}
                placeholder="Showcase and discover remakable developer projects"
                setState={(value) => handleStateChange("description", value)}
            />

            <FormField
                type="url"
                title="Website Url"
                state={form.liveSiteUrl}
                placeholder="Url of your live project"
                setState={(value) => handleStateChange("liveSiteUrl", value)}
            />

            <FormField
                type="url"
                title="Github Url"
                state={form.liveSiteUrl}
                placeholder="Url of your live project"
                setState={(value) => handleStateChange("githubUrl", value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />

            <div className="flexStart w-full">
                <button>Create</button>
            </div>
        </form>
    )
}
