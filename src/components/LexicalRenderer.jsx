import React from 'react';

const TextNode = ({ node }) => {
  let content = node.text;
  
  if (node.format & 1) content = <strong>{content}</strong>;
  if (node.format & 2) content = <em>{content}</em>;
  if (node.format & 4) content = <del>{content}</del>;
  if (node.format & 8) content = <u>{content}</u>;
  if (node.format & 16) content = <code className="bg-white/10 px-1 py-0.5 rounded text-sm font-mono text-purple-300">{content}</code>;
  
  return content;
};

const serialize = (children) => {
  if (!children) return null;
  return children.map((node, i) => {
    switch (node.type) {
      case 'text':
        return <TextNode key={i} node={node} />;
      case 'paragraph':
        return <p key={i} className="mb-6 leading-relaxed text-slate-300 text-lg">{serialize(node.children)}</p>;
      case 'heading':
        const Tag = `h${node.tag}`;
        const styles = {
          h1: "text-4xl md:text-5xl font-bold mb-8 mt-12 text-white",
          h2: "text-3xl font-semibold mb-6 mt-10 text-white",
          h3: "text-2xl font-medium mb-4 mt-8 text-white",
          h4: "text-xl font-medium mb-4 mt-6 text-white",
          h5: "text-lg font-medium mb-2 mt-4 text-white",
          h6: "text-base font-medium mb-2 mt-4 text-white",
        };
        return <Tag key={i} className={styles[node.tag]}>{serialize(node.children)}</Tag>;
      case 'list':
        const ListTag = node.tag === 'ul' ? 'ul' : 'ol';
        const listStyle = node.tag === 'ul' ? 'list-disc' : 'list-decimal';
        return <ListTag key={i} className={`pl-8 mb-6 text-slate-300 text-lg ${listStyle}`}>{serialize(node.children)}</ListTag>;
      case 'listitem':
        return <li key={i} className="mb-2 pl-2">{serialize(node.children)}</li>;
      case 'quote':
        return (
          <blockquote key={i} className="border-l-4 border-purple-500 pl-6 py-2 my-8 italic bg-white/5 rounded-r-lg text-slate-300 text-xl">
            {serialize(node.children)}
          </blockquote>
        );
      case 'link':
        return (
          <a key={i} href={node.fields?.url} target={node.fields?.newTab ? '_blank' : '_self'} className="text-purple-400 hover:text-purple-300 underline decoration-purple-500/30 hover:decoration-purple-500 transition-colors">
            {serialize(node.children)}
          </a>
        );
      case 'upload':
        const imageUrl = node.value?.url?.startsWith('http') 
          ? node.value.url 
          : `${import.meta.env.VITE_CMS_URL.replace('/api', '')}${node.value?.url}`;
        return (
          <figure key={i} className="my-10">
            <img src={imageUrl} alt={node.value?.alt || 'Image'} className="rounded-xl w-full object-cover shadow-2xl border border-white/10" />
            {node.value?.alt && <figcaption className="text-center text-sm text-slate-500 mt-3">{node.value.alt}</figcaption>}
          </figure>
        );
      default:
        // Fallback for custom nodes or unhandled types
        return <span key={i}>{node.children ? serialize(node.children) : null}</span>;
    }
  });
};

export default function LexicalRenderer({ content }) {
  if (!content?.root?.children) return null;
  return (
    <div className="lexical-content">
      {serialize(content.root.children)}
    </div>
  );
}
