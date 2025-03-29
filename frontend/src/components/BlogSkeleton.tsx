const BlogSkeleton = () => {
  return (
    <div className="animate-pulse border-b-2 p-4 border-slate-200 w-screen max-w-screen-md cursor-pointer">
              <div className="flex">
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-6 mb-4" />

                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />

                </div>
                <div className="text-xs flex justify-center flex-col pl-2">
                <div className="h-1 bg-gray-200 rounded-full dark:bg-gray-700 w-1 mb-4" />

                </div>
                <div className="pl-2 font-thin text-slate-600 text-sm">
                <div className="h- bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5" />

                </div>
              </div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[100px] mb-2.5" />
              <div className="text-xl font-semibold pt-2"></div>
              <div className="text-md font-thin pt-4">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />

              </div>
              <div className="w-full text-slate-600 text-sm font-thin">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-15 mb-4" />

              </div>
            </div>
  );
};

export default BlogSkeleton;
