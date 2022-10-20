# JSON mock to OpenAPI converter

Cli tool (and library) for converting JSON mock objects to [OpenAPI schemas](https://swagger.io/specification/).

## Install

```shell
npm install --global mock-to-openapi 
```

## Usage

Following command will convert all `*.json` files from directory `./examples` to YAML [OpenAPI](https://swagger.io/specification/) schemas.

```shell
mock-to-openapi ./examples
```

## Example

Let's have, for example, `json` object with:

```json
{
	"title": "This is title",
	"author": "Roman Ožana",
	"content": "This is just an example",
	"date": "2020-05-12T23:50:21.817Z"
}
```

Tool `mock-to-openapi` converts `JSON` to the OpenAPI specification as follows:

```yaml
type: object
properties:
  title:
    type: string
    example: This is title
  author:
    type: string
    example: Roman Ožana
  content:
    type: string
    example: This is just an example
  date:
    type: string
    format: date-time
    example: 2020-05-12T23:50:21.817Z
```