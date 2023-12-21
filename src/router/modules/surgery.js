import Layout from '@/layout'

const surgeryRouter = {
  path: '/surgery',
  component: Layout,
  redirect: '/surgery/room-overview',
  name: 'surgery',
  meta: {
    title: '手术麻醉',
    icon: 'table'
  },
  children: [
    {
      path: 'room-overview',
      component: () => import('@/views/surgery/room-overview'),
      name: 'SurgeryRoomOverview',
      meta: { title: '手术室概览' }
    },
    {
      path: 'room-detail',
      component: () => import('@/views/surgery/room-detail'),
      name: 'SurgeryRoomDetail',
      meta: { title: '手术详情' },
      hidden: true
    }
  ]
}
export default surgeryRouter
