import '../../styles/markdown/misc.css';
import '../../styles/markdown/list.css';
import '../../styles/markdown/table.css';
import '../../styles/markdown/inputs.css';
import '../../styles/markdown/tasklist.css';
import '../../styles/markdown/footnotes.css';
import '../../styles/markdown/blockquote.css';

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
