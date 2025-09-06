"use client";

import { useState, useEffect } from "react";
import { fetchProjects } from "@/lib/fetchers";
import ProjectShowcaseVertical from "@/components/project-showcase-vertical";
import { defaultDomains } from "@/lib/data";

interface PostData {
  data: {
    title: string;
    description: string;
    image: string;
    href: string;
  };
  slug: string;
}

const ProjectPosts = () => {
  const [files, setFiles] = useState(defaultDomains);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchProjects();
      if (postsData && postsData.postsData) {
        const formattedPosts = postsData.postsData.map((post: PostData) => ({
          name: post.data.title,
          body: post.data.description,
          slug: post.slug,
          image: post.data.image,
        }));
        setFiles(formattedPosts.slice(0, 10));
      }
    };

    getPosts();
  }, []);

  return <ProjectShowcaseVertical projects={files} />;
};

export default ProjectPosts;
