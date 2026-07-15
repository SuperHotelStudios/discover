import { useEffect, useState } from "react";
import { api } from "../services/api";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedServers from "../components/FeaturedServers";

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      try {
        const communityData = await api("/communities");
        const categoryData = await api("/categories");

        setCommunities(communityData);
        setCategories(categoryData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);

  if (loading) {
    return (
      <section className="container text-center py-5">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <>
      <Hero communities={communities} categories={categories} />

      <Categories categories={categories} />

      <FeaturedServers communities={communities} />
    </>
  );
}
