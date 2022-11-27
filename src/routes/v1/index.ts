import express, { Router } from 'express';
import docsRoute from './swagger.route';
import ownerRoute from './owner.route';
import roleRoute from './role.route';
import permissionRoute from './permission.route';
import userRoute from './user.route';
import bankRoute from './bank.route';
import config from '../../config/config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/owners',
    route: ownerRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/permissions',
    route: permissionRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/banks',
    route: bankRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
