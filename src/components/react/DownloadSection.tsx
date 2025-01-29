import { useEffect, useState } from 'react';
import type { GithubRelease } from 'github-data';

interface Props {
  repository: string;
}

const DownloadSection = ({ repository }: Props) => {
  const repoURL = new URL(repository);
  const [releases, setReleases] = useState<GithubRelease[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchReleases(repoURL).then((result) => setReleases(result));
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(releases);
  }, [releases]);

  return (
    <>
      <div className='h-5 w-5 bg-pink-500'></div>
    </>
  );
};
export default DownloadSection;

const fetchReleases = async (repoURL: URL) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos${repoURL.pathname}/releases`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch releases: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching releases:', error);
  }
};
