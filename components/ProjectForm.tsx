"use client"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ProjectInterface, SessionInterface } from "@/common.types";
//components
import { FormField } from "./FormField";
import { categoryFilters } from "@/constants";
import { CustomMenu } from "./CustomMenu";
import { Button } from "./Button";
import { createNewProject, fetchToken, updateProject } from "@/lib";
import { useRouter } from "next/navigation";

type Props = {
    type: string;
    session: SessionInterface;
    project?: ProjectInterface;
}
export const ProjectForm = ({ type, session, project }: Props) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || "",
    })

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { token } = await fetchToken();
        try {
            if (type === "create") {
                await createNewProject(form, session?.user?.id, token)
                router.push("/")
            }
            if (type === "edit") {
                await updateProject(form, project?.id as string, token)
                router.push("/")
            }
        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.includes("image")) return alert("Please upload an image file");
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange("image", result);
        }
    }

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({
            ...prevState,
            [fieldName]: value
        }))
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
                state={form.githubUrl}
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
                <Button
                    title={
                        isSubmitting ?
                            `${type === "create" ? "Creating" : "Editing"}` :
                            `${type === "create" ? "Create" : "Edit"}`
                    }
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    )
}
