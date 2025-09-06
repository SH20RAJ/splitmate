// fetchFunctions.ts

interface GitHubStarsResponse {
  totalStars?: number;
}

interface ProjectsResponse {
  postsData?: Array<{
    data: {
      title: string;
      description: string;
      image: string;
      href: string;
    };
    slug: string;
  }>;
}

export const fetchStars = async (): Promise<number> => {
  const baseUrl =
    typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/fetch-github-stars`);
  const data: GitHubStarsResponse = await res.json();
  return Number(data?.totalStars) || 0;
};

export const fetchProjects = async (): Promise<ProjectsResponse | null> => {
  const baseUrl =
    typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/fetch-project-posts`);
  const data: ProjectsResponse = await res.json();
  return data;
};
