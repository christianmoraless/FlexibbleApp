import { fetchAllProjects } from "@/lib"
import { ProjectInterface } from "@/common.types"
import { Categories, LoadMore, ProjectCard } from "@/components";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;


const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = await fetchAllProjects(category || "", endcursor) as ProjectSearch

  const projectsToRender = data?.projectSearch?.edges || [];

  if (projectsToRender.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No Projects found, go create some first.nm
        </p>
      </section>
    )
  }

  return (
    <section className='flex-start flex-col paddings mb-16'>
      <Categories />
      <section className="projects-grid">
        {projectsToRender.map(({ node }: { node: ProjectInterface }, key) => (
          <ProjectCard
            key={key}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={data?.projectSearch?.pageInfo?.startCursor}
        endCursor={data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
  )
}
export default Home
