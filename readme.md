# JSON mock to OpenAPI converter

[![NPM Downloads](https://img.shields.io/npm/dm/mock-to-openapi?style=for-the-badge)](https://www.npmjs.com/package/mock-to-openapi)
[![NPM Version](https://img.shields.io/npm/v/mock-to-openapi?style=for-the-badge)](https://www.npmjs.com/package/mock-to-openapi)
[![NPM License](https://img.shields.io/npm/l/mock-to-openapi?style=for-the-badge)](https://github.com/OzzyCzech/mock-to-openapi/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/mock-to-openapi?style=for-the-badge)](https://github.com/OzzyCzech/mock-to-openapi/commits/main)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/OzzyCzech/mock-to-openapi/main.yml?style=for-the-badge)](https://github.com/OzzyCzech/mock-to-openapi/actions)

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