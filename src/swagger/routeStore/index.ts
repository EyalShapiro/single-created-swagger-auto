import { SwaggerRouteDefinition } from './type';

/**
 * Efficient in-memory store for Swagger route metadata.
 * Uses Map for O(1) lookups and prevents duplicates.
 */
export const SwaggerRouteStore = (() => {
  const routeMap = new Map<string, SwaggerRouteDefinition>();

  return {
    /**
     * Add a new Swagger route definition.
     */
    addRoute: (route: SwaggerRouteDefinition) => {
      const key = `${route.method.toLowerCase()}:${route.path}`;
      routeMap.set(key, route);
    },
    getData: () => routeMap,
    /**
     * Returns all Swagger routes as an array.
     *
     */
    getRouteList: (): SwaggerRouteDefinition[] => Array.from(routeMap.values()),
  };
})();
/**
 * Shortcut for adding a new route item for swagger documentation.
 */

export const createSwaggerRoute = SwaggerRouteStore.addRoute;

export const createSwaggerRoutes = (routeList: SwaggerRouteDefinition[]) => {
  routeList.map(SwaggerRouteStore.addRoute);
};
