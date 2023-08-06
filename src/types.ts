type SimpleContent = {
  heading: string;
}

type JSXContent = React.ReactElement;

export type TabsProps = {
  items: { label: string; content: SimpleContent | JSXContent }[];
};