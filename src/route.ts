export type RouteKeys = keyof typeof routes;

const routes = {
    auth: '/(auth)',
    onboarding: '/(onboarding)',
    main: '/(main)'
  };
  
export default routes;