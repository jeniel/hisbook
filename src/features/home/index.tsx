import CreatePost from "./components/create-post";
import HomeFeed from "./components/home-feed";
import Events from "./components/events";
import WeatherForecast from "./components/weather";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4">

      {/* Left Column */}
      <div className="md:col-span-3 space-y-4">
        <CreatePost />
        <HomeFeed />
      </div>

      {/* Right Column */}
      <div className="md:col-span-1 space-y-4">
        <Events />
        <WeatherForecast />
      </div>
    </div>
  );
}
