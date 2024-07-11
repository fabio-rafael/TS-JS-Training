import Counter from "./components/Counter";
import Heading from "./components/Heading";
import Section from "./components/Section";
import List from "./components/List";
function App() {
  return (
    <>
      <Heading title={"Hello!"}></Heading>
      <Section>Os meus children</Section>
      <Counter></Counter>
      <List
        items={["item1", "item2", "item3"]}
        render={(item: string) => <p>{item}</p>}
      />
    </>
  );
}

export default App;
