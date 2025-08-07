import CreatePost from "./components/create-post";
import HomeFeed from "./components/home-feed";

export default function HomePage() {
    return (
        <div className="px-4 pb-4">
            <CreatePost />
            <HomeFeed />
        </div>
    )
}