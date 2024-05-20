import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: string;
  className?: string;
}

export default function RichText({ data, className }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6" >
      <ReactMarkdown className={className} remarkPlugins={[remarkGfm]} >{data}</ReactMarkdown>
    </section>
  );
}
