import { ProjectInterface } from "@/common.types"
import { ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib"

type ProjectsSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      start: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    }
  }
}

const Home = async () => {
  const data = await fetchAllProjects() as ProjectsSearch;

  const projectsToRender = data?.projectSearch?.edges || [];

  if (projectsToRender.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">
          No Projects found, go create some first.nm
        </p>
      </section>
    )
  }

  return (
    <section className='flex-start flex-col paddings mb-16'>
      <h1>Categories</h1>
      <section className="projects-grid">
        {projectsToRender.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      {/* <h1>Posts</h1>
      <h1>Load More</h1> */}
    </section>
  )
}
export default Home
