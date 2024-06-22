import React from "react";
import HomePageContent from "../components/HomePage/HomePageContent";
import Layout from "../components/layout/Layout.jsx";

function NewHomePage() {
  return (
    <Layout isHomePage={true}>
      <HomePageContent />
    </Layout>
  );
}

export default NewHomePage;
