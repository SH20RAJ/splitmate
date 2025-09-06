// ProjectPosts.tsx

"use client";

import { useState, useEffect } from "react";
import { fetchProjects } from "@/lib/fetchers";
import ProjectShowcaseVertical from "@/components/project-showcase-vertical";
import { defaultDomains } from "@/lib/data";

const ProjectPosts = () => {
  const [files, setFiles] = useState(defaultDomains);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchProjects();
      if (postsData) {
        const formattedPosts = postsData.postsData.map((post: { data: { title: string; description: string; image: string; href: string } }) => ({
          name: post.data.title,
          body: post.data.description,
          slug: post.slug,
          image: post.data.image,
        }));
        setFiles(formattedPosts.slice(0, 10));
      }
      setPosts(postsData);
    };

    getPosts();
  }, []);

  return <ProjectShowcaseVertical projects={files} />;
};

export default ProjectPosts;
