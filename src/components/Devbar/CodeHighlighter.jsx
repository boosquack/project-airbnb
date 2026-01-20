import { Copy } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui';
import twTheme from '@/lib/theme';

// Renders a code block with syntax highlighting.
const CodeHighlighter = ({
  children,
  highlightedLines = [],
  language = 'jsx',
  title,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='syntax-highlight relative'>
      <div className='flex items-center justify-between'>
        {title && <div className='text-muted-foreground'>{title}</div>}
        <Button
          onClick={handleCopy}
          title='Copy code'
          variant='secondary'
          size='icon'
        >
          <Copy
            size={16}
            className={copied ? 'text-green-500' : 'text-zinc-400'}
          />
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? atomDark : oneLight}
        wrapLines
        showLineNumbers
        lineProps={(lineNumber) => {
          let style = { display: 'block' };
          if (highlightedLines.includes(lineNumber)) {
            style.backgroundColor =
              theme === 'dark'
                ? twTheme.colors.zinc[700]
                : twTheme.colors.zinc[200];
          }
          return { style };
        }}
        lineNumberStyle={{ display: 'none' }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
