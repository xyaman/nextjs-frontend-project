This is a very small project and it uses NextJS. I tried to use as much as I 
could from SSR capabilities. But because this project uses a global state, and 
there aren't many pages, the SSR capabilities are not fully used, because almost 
all the logic is in the client side.

Because of the nature of the project, there is no much you can do with SEO. Only
main page could be indexed by search engines. Edit and Add pages are not intended 
to be indexed for obvious reasons.

The application workd in desktop and mobile devices. The UI is very simple and
it uses MUI for the components. The global state is made using the react context
api. 

It is hosted in [Vercel](https://nextjs-mini-project.vercel.app) so you can try
a live demo.

From the development perspective, I used TypeScript. I also used ESLint and Prettier
to keep the code clean and consistent. 

## This is a nextjs mini project that follows the following guidelines 

- Ensure the application is responsive on both desktop and mobile devices.
- Implement features to add, edit, and delete users. There's no need to call an API or persist
data for these actions, simply update the state/context. Whenever users are edited, the user
list data will also be updated accordingly.
- Perform unit testing with NextJS Testing Library
- Create a README file detailing the application description, instructions on how to run it, and any additional information
- Deployment to any host or cloud for live demo
- Build a user interface using NextJS with MUI or any NextJS CSS/UI library.
- Fetch JSON data from REST API endpoints.
- Centralize state using Redux, NextJS Context or any state management 
- Configure JS/TS config environment including Eslint and Prettier 
- Using TypeScript along with models, type and/or interfaces. 

# Structure

## UI

## Global State

The application has a global state made using react built-in context api.
```bash
src/store
├── actions.ts
├── context.ts
├── reducer.ts
└── types.ts
```
The data types are defines in `types.ts`.
All the actions and its payloads are defined in `actions.ts`.
`reducer.ts` has the reducer functions where all dispatched actions are handled.
`context.ts` provides the context definition.

### How it works
In `/src/app/StateProvider` we define a csr (client-side rendering) component
that wrapps the state provider defined in `src/store`. The `StateProvider` is placed
in the `RootLayout` as:

```ts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
```

To access to the state from a csr component. We just need to use
`useContext` and save the state in the component.

```ts
import { StateContext } from "@/store/context";

// ....

const { state, dispatch } = useContext(StateContext);

useEffect(() => {
    console.log(state.users);
  }, []);
```

This approach has downsides, like making all components that uses the state
to re-render every time the state changes. In this project thats not an issue
because we work with very small amount of data. For bigger projects its better
to use other alternative like [Redux](https://redux.js.org/) or 
[Zustand](https://github.com/pmndrs/zustand)

  
## Developing

```bash
# Run local server
npm install
npm run dev

# Build
npm run build

# Tests
npm tests

# Lint
npx eslint .

# Format (uses prettier)
npx eslint . --fix
```
