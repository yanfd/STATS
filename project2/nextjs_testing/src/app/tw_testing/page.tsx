
import TwitterPostCard from '@/components/TwitterPostCard';

const AnotherPage = () => {
  return (
    <div
      className="
        flex 
        min-h-screen 
        items-center 
        justify-center 
        p-4
        bg-[radial-gradient(ellipse_farthest-corner_at_50%_130%,_rgba(51,65,85,0.5)_0%,_rgba(17,24,39,0.9)_50%,_rgba(0,0,0,1)_80%)]
      "
    >
      <TwitterPostCard />
    </div>
  );
};

export default AnotherPage;

