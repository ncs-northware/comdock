import type {
  DefaultNodeTypes,
  SerializedHeadingNode,
  SerializedLinkNode,
  SerializedListNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConverters,
  type JSXConvertersFunction,
  RichText as RichTextConverter,
} from "@payloadcms/richtext-lexical/react";
import type { HTMLAttributes } from "react";
import { Headline, Link } from "@/components/typography";

const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).join("");
    return <Headline level={node.tag}>{text}</Headline>;
  },
};

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  // biome-ignore lint/style/noNonNullAssertion: neccesary to recieve non null
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected Value to be an object");
  }
  return `/${relationTo}/${value.id}`;
};

const linkConverter: JSXConverters<SerializedLinkNode> = {
  link: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).join("");

    // Internal doc link
    if (node.fields.doc?.value) {
      return <Link href={internalDocToHref({ linkNode: node })}>{text}</Link>;
    }

    // External link
    if (node.fields.url) {
      return (
        <Link href={node.fields.url} target="_blank">
          {text}
        </Link>
      );
    }

    return <span>{text}</span>;
  },
};

const listConverter: JSXConverters<SerializedListNode> = {
  list: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children });
    if (node.listType === "bullet") {
      return <ul className="list-inside list-disc">{text}</ul>;
    }
    if (node.listType === "number") {
      return <ol className="list-inside list-decimal">{text}</ol>;
    }
    return <ul>{text}</ul>;
  },
};

const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...headingConverter,
  ...linkConverter,
  ...listConverter,
});

type Props = {
  data: SerializedEditorState;
} & HTMLAttributes<HTMLDivElement>;

export function RichText(props: Props) {
  const { className, ...rest } = props;
  return (
    <RichTextConverter
      {...rest}
      className={className}
      converters={jsxConverter}
    />
  );
}
