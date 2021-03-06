import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import EndpointList from '@/components/EndpointList';
import Home from '@/components/Home';
import Contact from '@/components/Contact';
import yaml from 'js-yaml';

Vue.use(Router);
Vue.use(VueResource);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
        },
    ],
});
const yamlPath = '/static/yaml';

Vue.http.get(`${yamlPath}/base/base_endpoints.yaml`).then((response) => {
    const baseEndpoints = yaml.load(response.body);
    const routes = [];
    baseEndpoints.forEach((base) => {
        const { title, name } = base;
        routes.push({
            path: `/${name}`,
            name: title,
            component: EndpointList,
        });
    });

    router.addRoutes(routes);
});

export default router;
