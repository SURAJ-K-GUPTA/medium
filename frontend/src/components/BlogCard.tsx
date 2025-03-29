import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
        <div className="border-b-2 p-4 border-slate-200 w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
            <Avatar name={authorName} />
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
              {authorName}
            </div>
            <div className="text-xs flex justify-center flex-col pl-2">
              <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-600 text-sm">
              {publishedDate}
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">{title}</div>
          <div className="text-md font-thin pt-4">
            {content.substring(0, 100) + "..."}
          </div>
          <div className="w-full text-slate-600 text-sm font-thin">
            {Math.ceil(content.length / 100)} minutes
          </div>
        </div>
    </Link>
  );
};

export default BlogCard;

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-600"></div>;
}


export function Avatar({ name, size="small" }: { name: string; size?: "small" | "big" }) {
  return (
    <div className= {`relative inline-flex items-center justify-center ${size === "big" ? "h-10 w-10" : "h-6 w-6"} overflow-hidden bg-gray-600 rounded-full`}>
      <span className={`${size === "big" ? "text-md" : "text-xs"} text-gray-300`}>{name[0]}</span>
    </div>
  );
}
