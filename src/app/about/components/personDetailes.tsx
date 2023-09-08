import Image from 'next/image';

export type PersonDetailesProps = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  description: string;
  contributions: string;
};

export default function PersonDetailes({
  name,
  role,
  photoUrl,
  githubUrl,
  description,
  contributions,
}: PersonDetailesProps) {
  return (
    <>
      <div className="my-12 mx-6 text-center">
        <div className="inline-block w-36 h-36 rounded-[50%] p-3 bg-green-50">
          <div className="overflow-hidden w-[100%] h-[100%] rounded-[50%]">
            <Image width={144} height={144} src={photoUrl} alt="photo" />
          </div>
        </div>
        <div className="font-serif bg-green-50 -mt-16 p-[70px_30px_30px] rounded-md">
          <h2 className="uppercase">{name}</h2>
          <span>{role}</span>
          <p>{description}</p>
          <p>{contributions}</p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span>My GitHub</span>
            <a href={githubUrl} target="_blank">
              <Image width={45} height={45} className="inline-block" src="/icons8-github.svg" alt="GitHubLogo" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
