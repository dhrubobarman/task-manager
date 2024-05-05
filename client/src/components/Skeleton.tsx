import { cn } from "../lib";
type SkeletonProps = {
  count?: number;
  childClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Skeleton = ({
  count = 4,
  className,
  childClassName,
  ...rest
}: SkeletonProps) => {
  const arr = Array.from(Array(count).keys());
  return (
    <div className={cn("space-y-2", className)} {...rest}>
      {arr.map((s) => (
        <div className={cn("flex gap-4 items-center", childClassName)} key={s}>
          <div className="skeleton h-32 w-[300px]"></div>
          <div className="w-[calc(100%-300px)] space-y-2">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-[calc(100%-30px)]"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
