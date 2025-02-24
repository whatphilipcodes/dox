import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownWrapperTSX from './MarkdownWrapperTSX';
import type { GithubRelease } from 'github-data';

import Button from './Button';

interface Props {
  repository: string;
  title: string;
}

const DownloadSection = ({ repository, title }: Props) => {
  const repoURL = new URL(repository);
  const [loading, setLoading] = useState(true);
  const [releases, setReleases] = useState<GithubRelease[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchReleases(repoURL).then((result: GithubRelease[]) => {
        if (!result || !result.length)
          console.log(
            `Your releases could not be fetched from GitHub. Does your repository '${repository}' have public releases?`,
          );
        setReleases(result);
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='text-neutral-500 dark:text-neutral-600'>loading...</div>
    );
  } else if (!releases?.length) {
    return (
      <div className='text-neutral-500 dark:text-neutral-600'>
        No public releases yet.
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-4 rounded-md border border-neutral-300 p-4 dark:border-neutral-800'>
        <div className='dark:text-mint-500 font-mono font-bold'>
          {releases[0].name}
        </div>
        <MarkdownWrapperTSX>
          <div className='flex flex-col gap-4 overflow-x-auto text-wrap hyphens-auto'>
            <ReactMarkdown>{releases[0].body}</ReactMarkdown>
          </div>
        </MarkdownWrapperTSX>
        <Button
          href={
            releases[0].assets[0]?.browser_download_url || releases[0].html_url
          }
          target='_blank'
        >
          {releases[0].assets[0]?.browser_download_url
            ? 'download'
            : 'view release'}
        </Button>
      </div>
      {releases.slice(1).length > 0 && (
        <details>
          <summary>archive</summary>
          {releases.slice(1).map((release) => (
            <li
              key={release.id}
              className='flex items-center justify-between py-2'
            >
              <span className='font-mono text-neutral-500 dark:text-neutral-600'>
                {release.tag_name}
              </span>
              <a
                href={
                  release.assets[0]?.browser_download_url || release.html_url
                }
                className='decoration-mint-500 dark:text-mint-500 underline'
                target='_blank'
              >
                {release.assets[0]?.browser_download_url
                  ? 'download'
                  : 'view release'}
              </a>
            </li>
          ))}
        </details>
      )}
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
