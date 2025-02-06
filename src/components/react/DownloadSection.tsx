import MarkdownWrapperTSX from './MarkdownWrapperTSX';
import { useEffect, useState } from 'react';
import type { GithubRelease } from 'github-data';
import ReactMarkdown from 'react-markdown';

import ReactiveButton from './ReactiveButton';

interface Props {
  repository: string;
  title: string;
}

const DownloadSection = ({ repository, title }: Props) => {
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

  if (!releases?.length) {
    return (
      <div className='text-neutral-500 dark:text-neutral-600'>
        No releases available yet.
      </div>
    );
  }

  return (
    <>
      <div className='font-bold dark:text-mint-500'>{releases[0].name}</div>
      <div className='flex flex-col gap-4 rounded-md border border-neutral-300 p-4 dark:border-neutral-800'>
        <MarkdownWrapperTSX>
          {releases[0].body ? (
            <div className='flex flex-col gap-4 overflow-x-scroll hyphens-auto text-wrap'>
              <ReactMarkdown>{releases[0].body}</ReactMarkdown>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </MarkdownWrapperTSX>
        <ReactiveButton
          variant='border'
          href={releases[0].assets[0].browser_download_url}
          target='_blank'
        >
          download
        </ReactiveButton>
      </div>
      <details>
        <summary>archive</summary>
        {releases?.map((release) => (
          <li
            key={release.id}
            className='flex items-center justify-between py-2'
          >
            <span className='text-neutral-500 dark:text-neutral-600'>
              Version {release.tag_name}
            </span>
            <a
              href={release.assets[0]?.browser_download_url}
              className='underline decoration-mint-500 dark:text-mint-500'
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
