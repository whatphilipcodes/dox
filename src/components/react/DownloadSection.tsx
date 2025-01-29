import { useEffect, useState } from 'react';
import type { GithubRelease } from 'github-data';
import { marked } from 'marked';

interface Props {
  repository: string;
}

const DownloadSection = ({ repository }: Props) => {
  const repoURL = new URL(repository);
  const [releases, setReleases] = useState<GithubRelease[] | undefined>(
    undefined,
  );

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
      <div>{releases?.[0].name}</div>
      <div
        className='overflow-x-scroll hyphens-auto text-wrap rounded-md border border-neutral-300 p-4 dark:border-neutral-800'
        dangerouslySetInnerHTML={
          releases?.[0].body
            ? { __html: marked.parse(releases?.[0].body) }
            : { __html: 'Loading...' }
        }
      />
      <details>
        <summary>archive</summary>
        {releases?.map((release) => (
          <li
            key={release.id}
            className='flex items-center justify-between py-2'
          >
            <span className='text-sm text-gray-600'>
              Version {release.tag_name}
            </span>
            <a
              href={release.html_url}
              className='text-sm text-blue-600 hover:text-blue-800'
              download
            >
              Download
            </a>
          </li>
        ))}
      </details>
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
