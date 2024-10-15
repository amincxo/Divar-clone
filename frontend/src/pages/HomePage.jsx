import { useQuery } from "@tanstack/react-query"
import Loader from "components/modules/Loader"
import Main from "components/templates/Main"
import Sidebar from "components/templates/Sidebar"
import { getCategory } from "services/admin"
import { getAllPost } from "services/user"


const style={
    display:"flex"
}


function HomePage() {

    const {data:posts , isLoading:postLoading} = useQuery(["post-list"], getAllPost);
    const {data:categories , isLoading:categoriesloading} = useQuery(["get-categories"] , getCategory );

  return (
    <>
    { postLoading || categoriesloading ? (
        <Loader />
    ) : (
        <div style={style} >
        <Sidebar categories={categories}  />
        <Main posts={posts} />
    </div>
    )}
    </>
  )
}

export default HomePage