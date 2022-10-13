import { P, Link, BlockCode, Img } from "./components";

const funDef = `def find_key_in_json(key: str, parsed_json: Union[dict, list]) -> List[Union[str, int]]:
    key_path: List[Union[str, int]] = []

    def recursive_find(obj: Any) -> bool:
        if isinstance(obj, dict):
            if key in obj:
                key_path.append(key)
                return True
            for k, v in obj.items():
                key_path.append(k)
                found = recursive_find(obj=v)
                if found:
                    return True
                del key_path[-1]
            return False
        if isinstance(obj, list):
            for i, d in enumerate(obj):
                key_path.append(i)
                found = recursive_find(obj=d)
                if found:
                    return True
                del key_path[-1]
            return False
        return False

    _ = recursive_find(obj=parsed_json)
    return key_path`;

const example = `>>> d = {"a": {"b": [1, {"c": "asd"}]}}
>>> find_key_in_json("c", d)
['a', 'b', 1, 'c']`;

const tests = `@pytest.mark.parametrize(
  "obj, exp",
  [
      ({"b": 1, "a": {"x": -1}}, ["a", "x"]),
      ({"a": {"b": {"x": -1}}}, ["a", "b", "x"]),
      ({"a": [0, 0, {"x": -1}]}, ["a", 2, "x"]),
      ([0, {"x": -1}], [1, "x"]),
  ],
)
def test_find_key_in_json(obj, exp):
  res = find_key_in_json(key="x", parsed_json=obj)
  assert res == exp
`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/nested_json.png"
        width="500px"
        height="250px"
      />
      <P>
        The amount of time I spend looking through JSON objects is ridiculous.
        Usually it's some API response with different levels of metadata, nodes,
        cursors and so on... and actually you just need one value. First of all,
        there are gists like{" "}
        <Link label="this one" href="https://gist.github.com/iwek/3924925" />.
        But usually I am in python and just need one particular key. Thus, I
        have this snippet:
      </P>
      <BlockCode code={funDef} lang="python" />
      <P>
        It's a breadth-first-search that returns the first occurence of that key
        as a list of keys and list indices that lead to this key. Like this:
      </P>
      <BlockCode code={example} lang="python" />
      <P>
        Note, this is for JSON. You might think you can use this for dicts in
        general... don't. Whereas in JSON object keys are strings and list
        indices are integers, a plain python dict can contain non-string keys,
        tuples, and any object basically.
      </P>
      <P>
        The user will have the options <i>Deny</i>, <i>Only this time</i>,{" "}
        <i>While using the app</i>. The task continues to run even with the app
        in the background and the phone locked.
      </P>
      <P>
        Finally, for all the people as paranoid as me. Here, are some tests for
        this function.
      </P>
      <BlockCode code={tests} lang="python" />
    </>
  );
}
