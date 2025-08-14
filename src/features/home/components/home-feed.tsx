import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sampleFeed = [
  {
    id: "1",
    user: "ACE",
    profile: "./images/ace.png",
    department: "MIS",
    dateCreate: "Just Now",
    images: "./images/acebuilding.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "2",
    user: "ACE",
    profile: "./images/ace.png",
    department: "MIS",
    dateCreate: "2 hours ago",
    images: "./images/acebuilding.png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function HomeFeed() {
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="mt-2 space-y-4">
      {sampleFeed.map((post) => {
        const isExpanded = expandedPosts[post.id];
        return (
          <Card key={post.id} className="shadow-sm border rounded-2xl">
            <CardHeader>
              <CardTitle className="flex flex-row items-center gap-4">
                <img src={post.profile} alt={post.user} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <p className="text-2xl font-semibold">{post.user}</p>
                  <p className="text-sm text-gray-500">{post.department}</p>
                  <p className="text-xs text-gray-400">{post.dateCreate}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p
                className={`text-sm ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                {post.content}
              </p>

              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-blue-600"
                onClick={() => toggleExpand(post.id)}
              >
                {isExpanded ? "See less" : "See more"}
              </Button>

              <div className="w-full h:60 md:h-100 relative rounded-xl overflow-hidden">
                <img
                  src={post.images}
                  alt={`Feed image ${post.id}`}
                  className="object-cover w-full h-full"
                />
              </div>
              
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
