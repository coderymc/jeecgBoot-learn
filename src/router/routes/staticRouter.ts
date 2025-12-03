import { LAYOUT } from '/@/router/constant';
import type { AppRouteRecordRaw } from '/@/router/types';

export const AI_ROUTE: AppRouteRecordRaw = {
  path: '',
  name: 'ai-parent',
  component: LAYOUT,
  meta: {
    title: 'ai',
  },
  children: [
    {
      path: '/ai',
      name: 'ai',
      component: () => import('/@/views/dashboard/ai/index.vue'),
      meta: {
        title: 'AI助手',
      },
    },
  ],
};

// 首页配置表单路由（静态路由，作为隐藏的详情页）
export const HOME_CONFIG_FORM_ROUTE: AppRouteRecordRaw = {
  path: '',
  name: 'home-config-form-parent',
  component: LAYOUT,
  meta: {
    title: '首页配置表单',
  },
  children: [
    {
      path: '/system/homeConfig/form',
      name: 'HomeConfigForm',
      component: () => import('/@/views/system/homeConfig/HomeConfigForm.vue'),
      meta: {
        title: '首页配置表单',
        hideMenu: true,
        hideTab: true, // 不显示在Tab导航中
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/homeConfig',
      },
    },
  ],
};

export const staticRoutesList = [AI_ROUTE, HOME_CONFIG_FORM_ROUTE];
