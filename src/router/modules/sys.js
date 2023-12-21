import Layout from '@/layout'

const sysRouter = {
  path: '/sys',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Sys',
  meta: {
    title: '系统',
    icon: 'lock',
    roles: ['Authenticated']
  },
  children: [
    {
      path: 'org',
      component: () => import('@/views/sys/org'),
      name: 'Org',
      meta: { title: '科室管理', roles: ['Authenticated'] }
    },
    {
      path: 'user',
      component: () => import('@/views/sys/user'),
      name: 'User',
      meta: { title: '人员管理', roles: ['Authenticated'] }
    }
  ]
}
export default sysRouter
