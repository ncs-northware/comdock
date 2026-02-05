import type {
  DefaultNodeTypes,
  SerializedHeadingNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  type JSXConverters,
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextConverter,
} from "@payloadcms/richtext-lexical/react";
import type { HTMLAttributes } from "react";
import { Headline } from "@/components/typography";

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
  return `${relationTo}/${value.id}`;
};

const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
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
