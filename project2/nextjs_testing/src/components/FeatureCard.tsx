interface FeatureCardProps {
    title: string;
    description?: string;
    link?: string;
  }
  
  const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, link }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
        {link && (
          <a href={link} className="text-blue-500 hover:underline mt-2 block">了解更多</a>
        )}
      </div>
    );
  };
  
  export default FeatureCard;