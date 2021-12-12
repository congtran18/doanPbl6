import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import ProductsRoutes from './views/products/ProductsRoutes'
import OrdersRoutes from './views/orders/OrdersRoutes'
import mapRoutes from './views/map/MapRoutes'


const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

// const updateProductRoute = [
//     {
//         path: '/updateproduct',
//         exact: true,
//         component: () => <Redirect to="/dashboard/default" />,
//     },
// ]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...dragAndDropRoute,
    ...ProductsRoutes,
    ...OrdersRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
    // ...updateProductRoute,
]

export default routes
