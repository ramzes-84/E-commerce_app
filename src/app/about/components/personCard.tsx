import Border from '@/app/account/components/border/border';
import Image from 'next/image';

export type PersonCardProps = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  onClick: () => void;
};

export default function PersonCard({ name, role, photoUrl, githubUrl, onClick }: PersonCardProps) {
  return (
    <div className=" hover:-translate-y-1">
      <Border title={name}>
        <div className="flex items-center gap-x-3.5 m-5 cursor-pointer font-serif" onClick={onClick}>
          <div className="overflow-hidden w-24 sm:h-24 rounded-[50%] min-[320px]:h-20">
            <Image width={100} height={100} className="inline-block" src={photoUrl} alt="photo" />
          </div>
          <div>
            <span className=" text-lg text-emerald-800 font-bold">{role}</span>
            <div className="flex flex-wrap items-center gap-1">
              <span>Welcome to my GitHub</span>
              <a href={githubUrl} target="_blank">
                <Image width={45} height={45} className="inline-block" src="/icons8-github.svg" alt="GitHubLogo" />
              </a>
            </div>
          </div>
        </div>
      </Border>
    </div>
  );
}
