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
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
