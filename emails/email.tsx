import {
  Html,
  Button,
  Heading,
  Tailwind,
  Text,
  CodeBlock,
  dracula,
  Img,
  Container,
} from "@react-email/components";
export default function EmailTemplate({
  name = "貓貓",
  title = "取公因數",
  language = "java",
  content = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }`,
}: {
  name: string;
  title: string;
  language: string;
  content: string;
}) {
  return (
    <Tailwind>
      <Html lang="zh-tw">
        <Img
          src="https://08-skillify.eliaschen.dev/worldskills-logo.png"
          alt="WorldSkills Logo"
          height="50"
          width="50"
        />
        <Container>
          <Heading>{name}繳交了一份作業</Heading>
          <Text>來自題目：{title}</Text>
          <CodeBlock
            code={content}
            lineNumbers
            theme={dracula}
            language={language as any}
            style={{ fontFamily: "monospace" }}
          />
          <Button
            href="https://08-skillify.eliaschen.dev/tasks/assignment"
            className="px-3 py-2 bg-green-400 rounded-xl text-black font-bold mt-5"
          >
            前往Skillify查看作業
          </Button>
        </Container>
      </Html>
    </Tailwind>
  );
}
