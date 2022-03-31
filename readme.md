# @romain-faust/sign-in-with-email-and-password-firebase

## Installation

_With [NPM](https://www.npmjs.com/)_:

```bash
npm install @romain-faust/sign-in-with-email-and-password-firebase
```

_With [Yarn](https://classic.yarnpkg.com/)_:

```bash
yarn add @romain-faust/sign-in-with-email-and-password-firebase
```

_With [PNPM](https://pnpm.io/)_:

```bash
pnpm add @romain-faust/sign-in-with-email-and-password-firebase
```

## Usage

<!-- prettier-ignore -->
```ts
import { buildSignInWithEmailAndPassword } from '@romain-faust/sign-in-with-email-and-password-firebase'

const signInWithEmailAndPassword = buildSignInWithEmailAndPassword(firebaseAuth)

signInWithEmailAndPassword('email@example.com', '********').subscribe()
```

## License

[MIT](./license.md)
