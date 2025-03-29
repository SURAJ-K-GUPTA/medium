import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-20 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-600 pt-2">Poste on 30-03-2025</div>
            <div className="text-slate-600 pt-2 text-wrap break-words">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar name={blog.author.name} size="big" />
              </div>
              <div className="">
                  <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                  </div>
                  <div className="pt-2 text-slate-600">
                    Random catch phrase about author's ability to grab the user's
                    attention
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
