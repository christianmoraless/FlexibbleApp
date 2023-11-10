import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib";

type Props = {
    userId: string;
    projectId: string;
}
export const RelatedProjects = async ({ userId,
    projectId }: Props) => {
    const result = await getUserProjects(userId) as { user: UserProfile };
    const filteredProjects = result?.user?.projects?.edges?.
        filter((node) => node?.node?.id !== projectId)

    console.log({ filteredProjects })
    return (
        <div>RelatedProjects</div>
    )
}
