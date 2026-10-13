import ValueProps from "@/components/home/ValueProps";
import StoryProcess from "@/components/about/StoryProcess";
import StoryJourney from "@/components/about/StoryJourney";
import useDocumentTitle from "@/hooks/useDocumentTitle";


export default function About() {
  useDocumentTitle("Our Story");
  return (
    <>
      <ValueProps showCta={false} asPage />
      <StoryProcess />
      <StoryJourney />
    </>
  );
}
