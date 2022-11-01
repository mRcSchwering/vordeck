import { Heading } from "@chakra-ui/react";
import { P, BlockCode, Img, Code, A } from "../components";

const crudCode = `from enum import Enum
from typing import Any, Optional, TypeVar, Union
import db.model as dbmodel

class _Undef(Enum):
    DUMMY = 0

_undef = _Undef.DUMMY
_Tv = TypeVar("_Tv")
_UndefOr = Union[_Tv, _Undef]

def update_user(
    user: dbmodel.User,
    email: _UndefOr[str] = _undef,
    is_active: _UndefOr[bool] = _undef,
    department: _UndefOr[Optional[str]] = _undef,
    **_: Any,
) -> dbmodel.User:
    if email is not _undef:
        user.email = email
    if is_active is not _undef:
        user.is_active = is_active
    if department is not _undef:
        user.department = department
    # write object to db...`;

const gqlCode = `from ariadne import MutationType
import db.crud as db

_mutation = MutationType()

@_mutation.field("updateUser")
def update_user(*_, **kwargs):
    payload = kwargs["payload"]

    user = db.get_user(by_id=payload["id"])
    if user is None:
        raise ValueError("User not found")

    user = db.update_user(user=user, **payload)
    return user.dict()`;

const restCode = `from fastapi import FastAPI
import db.crud as db

app = FastAPI()

@app.post("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, payload: schemas.UpdateUser):
    
    user = db.get_user(by_id=user_id)
    if user is None:
        raise ValueError("User not found")
    
    return db.update_user(user=user, **payload.dict(exclude_unset=True))`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://pbs.twimg.com/media/DusCOfyXcAA9_F7.jpg:large"
        width="450px"
        height="150px"
      />
      <P>
        When building an API around some resources, there are usually endpoints
        for querying, creating, and updating. Update endpoints are most powerful
        if they can distinguish between <i>undefined</i> and <i>null</i> in the
        payload. Keys for a resource will be updated as defined in the payload.
        If it is defined as <i>null</i> the key of that resource will be updated
        to <i>null</i>. Keys which are not defined in the payload will be left
        untouched. This setup gives the client most flexibility. It covers all
        possible update scenarios, and it doesn't force the client to know all
        keys of a resource, only to update one. Here is one way of achieving
        this in Python.
      </P>
      <Heading variant="h4">Null vs Undefined in Python</Heading>
      <P>
        Languages like JavaScript have properties for <i>null</i> and{" "}
        <i>undefined</i>. In Python however there is just the <Code>None</Code>{" "}
        object which is supposed to represent a missing value. There is no
        build-in distinction between <i>undefined</i> and <i>null</i>. So, we
        need to define an object for that. This usually comes into play in a
        CRUD module, where we define how a database entry is updated. Here, we
        would like to make the distinction between whether a value should be
        updated with a new value, whether it should be updated with an empty
        value, or whether it should not be updated at all.
      </P>
      <BlockCode code={crudCode} lang="python" label="crud.py" />
      <P>
        Here we create singleton <Code>_undef</Code> that represents{" "}
        <i>undefined</i> and for convenience we create a type{" "}
        <Code>_UndefOr</Code> with a type variable. Now we can use this
        singleton and this new type to define the arguments of our CRUD
        functions. The default value of every argument is <Code>_undef</Code>{" "}
        and the type of it is wrapped in <Code>_UndefOr</Code>. <i>E.g.</i> in
        the code above if <Code>department</Code> is not supplied, it will be{" "}
        <Code>_undef</Code>. If it is supplied, it must be either a string or{" "}
        <Code>None</Code>. Thus, in this one argument we can choose to update{" "}
        <Code>department</Code> with a new value, update it but set its value to{" "}
        <Code>None</Code>, or not update it at all.
      </P>
      <P>
        Note, that this singleton is an instance of class <Code>_Undef</Code>{" "}
        which is a subclass of <Code>Enum</Code>. This is important because by
        deriving this class from <Code>Enum</Code> <i>mypy</i> knows that there
        is only one instance of this class. Thus, performing the check{" "}
        <Code>if department is not _undef</Code> is enough to make sure that{" "}
        <Code>department</Code> is defined and must therefore be either a string
        or <Code>None</Code>.
      </P>
      <Heading variant="h4">GraphQL and Ariadne</Heading>
      <P>
        If you build a GraphQL API with something like{" "}
        <A label="Ariadne" href="https://ariadnegraphql.org/" /> you can use
        that CRUD function like below. In the schema all fields except for{" "}
        <Code>id</Code> are optional. Here, all inputs are combined in one
        argument called <i>payload</i>. They can be accessed under the same name
        in python as a dictionary. This dictionary will only contain the keys
        which were defined in the actual POST payload. Calling the CRUD function
        with <Code>**payload</Code> will only unpack existing keys of{" "}
        <i>payload</i>. Thus, all other keys are <i>undefined</i>.
      </P>
      <BlockCode code={gqlCode} lang="python" />
      <Heading variant="h4">REST and Pydantic</Heading>
      <P>
        If you build a REST API with something like{" "}
        <A label="fastAPI" href="https://fastapi.tiangolo.com/" /> you will have
        some additional marshalling in the middle. This is usually done with{" "}
        <A label="Pydantic" href="https://pydantic-docs.helpmanual.io/" />.
        Here, you just need to make sure that you only parse keys which were
        actually in the POST payload. So, you define you Pydantic payload with
        all optional keys. Then, when you convert the Pydantic model to a
        dictionary you need to add <Code>exclude_unset=True</Code>. With that
        all keys which were not in the POST payload will be <i>undefined</i>.
      </P>
      <BlockCode code={restCode} lang="python" />
    </>
  );
}
