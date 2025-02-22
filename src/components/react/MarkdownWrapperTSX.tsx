interface Props {
  children: React.ReactNode;
}

const MarkdownWrapperTSX = ({ children }: Props) => {
  return (
    <div data-markdown-content className='flex flex-col gap-4'>
      {children}
    </div>
  );
};
export default MarkdownWrapperTSX;
