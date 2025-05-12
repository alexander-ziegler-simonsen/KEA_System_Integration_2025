# TypeDoc

I'm using typedoc in my DLS/full stack project.
https://typedoc.org/

## setup

```
# Install
npm install --save-dev typedoc

# Build docs using package.json "exports" or "main" fields as entry points
npx typedoc


# since I want documentation for an app, I need to run this one too
# Generate docs for all TypeScript files under src
npx typedoc --entryPointStrategy Expand src


```

## the tool

each code file will get a auto generated page (the design is like what is showed on TypeDocs own website).

if you want to add custom doumentation, you need to write comments in the right syntax:

https://typedoc.org/example/
https://typedoc.org/example/documents/Markdown_Showcase.html 
-> https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-grammars

https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-grammars

list of tags you can use https://typedoc.org/documents/Tags.html

```
\```typescript 

// A fabulous variable
const x: number | string = 12;

/**
 * Calculates the square root of a number.
 *
 * @param x the number to calculate the root of.
 * @returns the square root if `x` is non-negative or `NaN` if `x` is negative.
 */
export function sqrt(x: number): number {
    return Math.sqrt(x);
}

// #region simpleEnum
export enum SimpleEnum {
    /** This order has just been placed and is yet to be processed. */
    Pending,

    /** A courier is en route delivering this order. */
    InProgress,

    /** The order has been delivered. */
    Complete = "COMPLETE",
}
// #endregion simpleEnum

```

