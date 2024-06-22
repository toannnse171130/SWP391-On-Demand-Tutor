import React from "react";
import LeftPostSection from "src/components/Posts/LeftPostSection";
import RightPostSection from "src/components/Posts/RightPostSection";
import Layout from "src/components/layout/Layout";

function ListPostsPage(props) {
  return (
    <Layout>
      <div className="grid items-start gap-3 grid-cols-8020">
        <LeftPostSection />
        <RightPostSection />
      </div>
    </Layout>
  );
}

export default ListPostsPage;
