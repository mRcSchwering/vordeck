import { P, A, Img, BlockCode } from "../components";

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

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://img-9gag-fun.9cache.com/photo/aGdOG6w_460s.jpg"
        width="500px"
        height="280px"
      />
      <P>
        The amount of time I spend looking through JSON objects is ridiculous.
        Usually it's some API response with different levels of metadata, nodes,
        cursors and so on... and actually you just need one value. First of all,
        there are gists like{" "}
        <A label="this one" href="https://gist.github.com/iwek/3924925" />. But
        usually I am in python and just need one particular key. Thus, I have
        this snippet:
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
        tuples, and basically any object.
      </P>
    </>
  );
}
