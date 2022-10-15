import { P, BlockCode, Img, Code } from "./components";

const funDef = `#!/usr/bin/env bash
# generate a .yml file from one of the *tmplt.yml files
# by replacing the \`\${my_envar}\`s with the respective
# environment variable values
# (so you have to export the environment variables first)
#
# Export all envars, then use with tmplt yml path:
#
#   bash k8s/get_env_yml.sh k8s/stage_values.tmplt.yaml
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

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://s34378.pcdn.co/wp-content/uploads/2021/01/meme_template_yaml.jpg"
        width="500px"
        height="500px"
      />
      <P>
        It has become quite common to declare app configurations in YAML files.
        Sooner or later I usually end up having several versions of the same
        YAML file which each describe a slightly different environment,{" "}
        <i>e.g.</i> develop and production. This can be nicely solved by using
        environment variables. However, there is no standard for defining
        environment variables in YAML. Some technologies like docker, gitlab-ci,
        k8s already have mechanisms for handling environment variables in place.
        But if you are not using any of these, you need to come up with your own
        mechanism. Here, is mine:
      </P>
      <BlockCode code={funDef} lang="bash" label="get_env_yml.sh" />
      <P>
        You write a YAML template (say <Code>config.tmplt.yaml</Code>) as usual
        using the bash syntax for resolving environment variables (
        <Code>{`\${my_envar}`}</Code>). Then you export your environment
        variables and use the above script to generate the proper YAML file (
        <Code>bash get_env_yml.sh config.tmplt.yaml</Code>). In the resulting{" "}
        <Code>config.tmplt.yaml</Code> the environment variables were resolved.
        This way you can use the same YAML file for different configurations.
      </P>
    </>
  );
}
