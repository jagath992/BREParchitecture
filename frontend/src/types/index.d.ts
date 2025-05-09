declare module '*.jsx' {
  const content: any;
  export default content;
}

declare module '*.tsx' {
  const content: any;
  export default content;
}

declare module 'react/jsx-runtime' {
  export * from 'react';
}

declare module 'react-hot-toast' {
  export const Toaster: React.FC<{ position?: string }>;
}

declare module 'react-router-dom' {
  export const BrowserRouter: React.FC<{ children: React.ReactNode }>;
  export const Routes: React.FC<{ children: React.ReactNode }>;
  export const Route: React.FC<{
    path?: string;
    element: React.ReactNode;
    children?: React.ReactNode;
  }>;
  export const Outlet: React.FC;
  export const useNavigate: () => (path: string) => void;
  export const useLocation: () => { pathname: string };
  export const Link: React.FC<{
    to: string;
    children: React.ReactNode;
    className?: string;
  }>;
} 