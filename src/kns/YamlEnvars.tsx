import { P, Link, BlockCode, Img } from "./components";

const funDef = `#!/usr/bin/env bash
# generate a .yml file from one of the *tmplt.yml files
# by replacing the \`\${my_envar}\`s with the respective
# environment variable values
# (so you have to export the environment variables first)
#
# Export all envars, then use with tmplt yml path:
#
#   bash k8s/get_env_yml.sh k8s/stage_values.tmlpt.yaml
#
echo "Generating $1..."
ymlfile="\${1/.tmplt/}"
cp "$1" "$ymlfile"

# globally capture regex groups
# Use: global_rematch mystring myregex
global_rematch() { 
    local s=$1 regex=$2 
    while [[ $s =~ $regex ]]; do 
        echo "\${BASH_REMATCH[1]}"
        s=\${s#*"\${BASH_REMATCH[1]}"}
    done
}

regex='\\$\\{([a-zA-Z0-9_]*)\\}'
ymlfile_content=$(<"$ymlfile")
mapfile -t matches < <( global_rematch "$ymlfile_content" "$regex" )
envars=($(tr ' ' '\\n' <<< "\${matches[@]}" | sort -u | tr '\\n' ' '))
echo "Found environment variables:"
printf "%s " "\${envars[@]}"
echo ""

for envar in "\${envars[@]}"; do
    enval="\${!envar}"
    sed -i.bak 's|\${'"$envar"'}|'"$enval"'|g' "$ymlfile"
done

rm -f "$ymlfile.bak"
`;

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
      <BlockCode code={funDef} lang="bash" />
      <P>
        It's a breadth-first-search that returns the first occurence of that key
        as a list of keys and list indices that lead to this key. Like this:
      </P>
      <BlockCode code={example} lang="python" />
      <P>
        Note, this is for JSON. You might think you can use this for dicts in
        general... don't. Whereas in JSON object keys are strings and list
        indices are integers, a plain python dict can contain non-string keys,
        tuples, and any object basically. Finally, for all the people as
        paranoid as me, here are some tests for this function.
      </P>
      <BlockCode code={tests} lang="python" />
    </>
  );
}
