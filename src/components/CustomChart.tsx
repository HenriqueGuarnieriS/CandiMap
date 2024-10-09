import FollowersGrowthChart from "../pages/Panel/components/FollowersGrowthChart";
import LikesChart from "../pages/Panel/components/LikesChart";
import CommentsChart from "../pages/Panel/components/CommentsChart";
import EngagementChart from "../pages/Panel/components/EngagementChart";

const CustomChart = ({ data }: { data: any[] }) => {
  return (
    <div className="text-white">
      <FollowersGrowthChart data={data} />
      <LikesChart data={data} />
      <CommentsChart data={data} />
      <EngagementChart data={data} />
    </div>
  );
};

export default CustomChart;
