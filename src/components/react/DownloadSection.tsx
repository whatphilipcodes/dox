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
        <div className='dark:text-primary-500 font-mono font-bold'>
          {releases[0].name}
        </div>
        <MarkdownWrapperTSX>
          <div className='flex flex-col gap-4 overflow-x-auto text-wrap hyphens-auto'>
            <ReactMarkdown>{releases[0].body}</ReactMarkdown>
          </div>
        </MarkdownWrapperTSX>
        <div className='flex flex-col gap-2'>
          {releases[0].assets.length > 0 ? (
            releases[0].assets.map((asset) => (
              <Button
                key={asset.id}
                href={asset.browser_download_url}
                target='_blank'
              >
                {asset.name}
              </Button>
            ))
          ) : (
            <Button href={releases[0].html_url} target='_blank'>
              view release
            </Button>
          )}
        </div>
      </div>
      {releases.slice(1).length > 0 && (
        <details>
          <summary>archive</summary>
          {releases.slice(1).map((release) => (
            <div
              key={release.id}
              className='mt-4 flex flex-col gap-4 rounded-md border border-neutral-300 p-4 dark:border-neutral-800'
            >
              <div className='flex items-center justify-between'>
                <span className='font-mono text-neutral-500 dark:text-neutral-600'>
                  {release.tag_name}
                </span>
                <div className='flex gap-2'>
                  {release.assets.length > 0 ? (
                    release.assets.map((asset) => (
                      <a
                        key={asset.id}
                        href={asset.browser_download_url}
                        className='decoration-primary-500 dark:text-primary-500 underline'
                        target='_blank'
                      >
                        {asset.name}
                      </a>
                    ))
                  ) : (
                    <a
                      href={release.html_url}
                      className='decoration-primary-500 dark:text-primary-500 underline'
                      target='_blank'
                    >
                      view release
                    </a>
                  )}
                </div>
              </div>
            </div>
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
