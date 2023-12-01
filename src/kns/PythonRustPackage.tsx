import { Heading } from "@chakra-ui/react";
import { A, P, Img, BlockCode, Code } from "../components";

const pyo3 = <A href="https://pyo3.rs/" label="PyO3" />;
const maturin = <A href="https://www.maturin.rs/" label="Maturin" />;
const conda = <A href="https://conda.io/" label="conda" />;
const pyo3module = (
  <A href="https://pyo3.rs/v0.20.0/module" label="PyO3 user guide" />
);
const ghlutz = (
  <A
    href="https://github.com/mRcSchwering/lutz"
    label="github.com/mRcSchwering/lutz"
  />
);
const pypilutz = <A href="https://pypi.org/project/lutz/" label="lutz" />;
const maturintut = (
  <A href="https://www.maturin.rs/distribution.html" label="Maturin tutorial" />
);
const ghaction = (
  <A
    href="https://github.com/PyO3/maturin-action"
    label="github/maturin-action"
  />
);
const pytest = <A href="https://pytest.org/" label="pytest" />;

const tree0 = `├── environment.yml
├── pyproject.toml
├── python
│   ├── lutz
│   │   ├── __init__.py
│   │   └── util.py
│   └── requirements.txt
└── tests
    ├── requirements.txt
    └── test_util.py`;

const pyproject0 = `[project]
name = "lutz"  # package name
version = "0.1.0"  # package version
readme = "README.md"
requires-python = ">=3.9"
dependencies = ["fortune-python"]`;

const librs = `use pyo3::prelude::*;

extern crate pyo3;

#[pyfunction]
fn sum_as_string(a: usize, b: usize) -> PyResult<String> {
    Ok((a + b).to_string())
}

#[pymodule]
fn _lib(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    Ok(())
}`;

const cargo = `[package]
name = "lutz"  # pyproject.toml has precedence
version = "0.0.0"  # pyproject.toml has precedence

[lib]
name = "_lib"  # private module to be nested into Python package
crate-type = ["cdylib"]
path = "rust/lib.rs"

[dependencies]
pyo3 = { version = "0.20.0", features = ["extension-module"] }`;

const pyproject1 = `[build-system]
requires = ["maturin>=1,<2"]
build-backend = "maturin"

...

[tool.maturin]
python-source = "python"  # python source
module-name = "lutz._lib"  # python module name
sdist-include = ["LICENSE", "README.md"]  # source distro files`;

const cligen = `mkdir -p .github/workflows
maturin generate-ci --pytest github > .github/workflows/CI.yml`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://64.media.tumblr.com/ce87cbe1c908217e688ab54a231a31d9/cc5b004998c0d4c3-fe/s1280x1920/d0ac525cfed9fe7624d8a4b812ff7d86d3e7c4b9.png"
        width="400px"
        height="350px"
      />
      <P>
        When creating a python package with Rust, one is bound to stumble over{" "}
        {pyo3} and {maturin}. While PyO3 provides Python bindings and tools for
        creating native Python extensions modules, Maturin is a tool for
        building and publishing Rust-based Python packages. Both tools have
        great documentation and are easy to use. Only when it comes to building
        hybrid Python and Rust packages, Maturin's documentation is a bit short.
        So here is an <b>example setup for a Python package</b>, that is{" "}
        <b>mainly written in Python</b> and that has a{" "}
        <b>few functions written in Rust</b>.
      </P>
      <Heading variant="h4">Development Setup</Heading>
      <P>
        A full example is on {ghlutz}. The PyPI package is named {pypilutz}.
        Here, I will go through some steps that add Rust to an existing Python
        package. We start from a basic python package structure.
      </P>
      <BlockCode lang="bash" code={tree0} />
      <P>
        The actual python package is under <i>python/</i>. I usually use {conda}{" "}
        for environments, so there is a <i>environment.yml</i> with a linked{" "}
        <i>requirements.txt</i>. There could be a test suite with additional
        dependencies under <i>tests/</i>. The <i>pyproject.toml</i> would look
        something like this:
      </P>
      <BlockCode lang="toml" code={pyproject0} label="pyproject.toml" />
      <P>
        We add another directory for the Rust code called <i>rust/</i>. Here, we
        add a <i>lib.rs</i> Rust library and follow the {pyo3module} by building
        a <Code>pymodule</Code>.
      </P>
      <BlockCode lang="rust" code={librs} label="rust/lib.rs" />
      <P>
        This one just adds a simple <Code>sum_as_string</Code> function to the
        module. The name of the resulting Python module here will be{" "}
        <Code>_lib</Code>. For compiling it, we also need a <i>Cargo.toml</i>{" "}
        that points to <i>rust/lib.rs</i>.
      </P>
      <BlockCode lang="toml" code={cargo} label="cargo.toml" />
      <P>
        It is important to use the same <Code>lib.name</Code> and add{" "}
        <Code>dependencies.pyo3</Code>. A <Code>package.name</Code> and{" "}
        <Code>package.version</Code> is required, but for the PyPI package name
        and version from <i>pyproject.toml</i> are used. Additionally{" "}
        <i>pyproject.toml</i> must be edited for Maturin.
      </P>
      <BlockCode lang="toml" code={pyproject1} label="pyproject.toml" />
      <P>
        <Code>python-source</Code> points to the python package itself and{" "}
        <Code>module-name</Code> tells Maturin how the module should be
        importable. In this case, after running <Code>maturin develop</Code> a{" "}
        <Code>_lib.*.so</Code> will be placed under <i>python/lutz/</i>. From
        within the python package it can then be imported as{" "}
        <Code>from . import _lib</Code>. <Code>sdist-include</Code> additionally
        tells maturin which files to include in the source distribution.
      </P>
      <Heading variant="h4">Build and Release</Heading>
      <P>
        With <Code>maturin build</Code> one can build the whole python package
        including binaries into a wheel. <Code>maturin publish</Code> does the
        same (with the <Code>--release</Code> flag for optimizations) and pushes
        it to pypi.org (including the source distribution). But of course this
        will only be a build for one platform and architecture. A very elegant
        alternative is explained in the {maturintut} using{" "}
        <Code>maturin generate-ci</Code>.
      </P>
      <BlockCode lang="bash" code={cligen} />
      <P>
        This command generates CI workflows for different platforms. It uses the{" "}
        {ghaction} for building the project on different platforms for different
        architectures and pushing everything to PyPI. It takes care of all the
        different caveats of building for each platform. Here, I am using it for
        github.com and also include a {pytest} run for every build.
        Additionally, the workflow must be configured with a secret{" "}
        <Code>PYPI_API_TOKEN</Code> for accessing PyPI.
        {ghlutz} is a full example of the final package setup.
      </P>
    </>
  );
}
