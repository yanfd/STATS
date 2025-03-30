import Image from 'next/image';

interface InfoCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ avatarSrc, name, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
        <Image src={avatarSrc} alt={name} layout="fill" objectFit="cover" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{title}</p>
      <p className="text-gray-700">{description}</p>
      {/* 可以添加社交媒体链接等 */}
    </div>
  );
};

export default InfoCard;