import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined, ShoppingOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons'
import { Card, Space, Statistic } from 'antd'
import { getTotalPage, getReacts } from '../../Api'
import ReactPaginate from 'react-paginate'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue
} from '@nextui-org/react'
import { users } from './data'

// function DashboardCard({ title, value, icon }) {
//   return (
//     <div style={{ margin: '20px' }}>
//       <Card
//         style={{
//           width: '200px',
//           height: '200px',
//           borderRadius: '10px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           border: '1px solid #e8e8e8',
//           transition: 'transform 0.3s',
//           ':hover': {
//             transform: 'scale(1.05)'
//           }
//         }}
//       >
//         <Space direction='vertical' align='center'>
//           {icon}
//           <Statistic title={title} value={value} />
//         </Space>
//       </Card>
//     </div>
//   )
// }

function Analisic() {
  const apiUrl = 'http://localhost:5000/data/view/'
  const [total, setTotal] = useState([])
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTotal(data[0])
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])
  console.log(total)
  // getTotalPage().then((res) => {
  //   setTotal(res[0])
  // })
  // Assuming you are working in a browser environment

  return (
    <div>
      <App />
    </div>
  )
}
export default Analisic

function App() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const rowsPerPage = 4

  // Đặt URL của API của bạn ở đây
  const apiUrl = 'http://localhost:5000/data/react'

  useEffect(() => {
    // Hàm fetch dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const pages = Math.ceil(data.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data.slice(start, end)
  }, [page, data])

  return (
    <div>
      <AnalisicPost />
      
    </div>
  )
}

function AnalisicPost() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const rowsPerPage = 2
  const api = ' http://localhost:5000/Post/'

  // const [DaTa, setDaTa] = useState([])

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const pages = Math.ceil(data.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data.slice(start, end)
  }, [page, data])

  return (
    <div>
      <Table
        aria-label='Example table with client-side pagination'
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={data.length - 1}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]'
        }}
        style={{
          tableLayout: 'fixed',
          width: '100%' // Ensure the table takes the full width of its container
        }}
      >
        <TableHeader>
          <TableColumn key='_id' style={{ width: '12.5%' }}>
            Idpost
          </TableColumn>

          <TableColumn key='text' style={{ width: '25.0%' }}>
            Text
          </TableColumn>

          <TableColumn key='time' style={{ width: '12.5%' }}>
            Time
          </TableColumn>

         
        </TableHeader>

        <TableBody items={items}>
          {(item) => <TableRow key={item._id}>{(columnKey) => <TableCell>{item[columnKey]}</TableCell>}</TableRow>}
        </TableBody>
          </Table>
    </div>
  )
}

// <TableHeader>
// <TableColumn key='_id' style={{ width: '12.5%' }}>
// Idpost
// </TableColumn>

// <TableColumn key='text' style={{ width: '12.5%' }}>
// Text
// </TableColumn>

// <TableColumn key='time' style={{ width: '12.5%' }}>
// Time
// </TableColumn>
// </TableHeader>
// <TableBody items={items}>
// {(item) => <TableRow key={item._id}>{(columnKey) => <TableCell>{item[columnKey]}</TableCell>}</TableRow>}
// </TableBody>
// </Table>









// style={{
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '20px'
// }}
// >
// <Space size={1} direction='vertical'>
//   <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Page Overview</h1>
//   <Space direction='horizontal'>
//     <DashboardCard
//       icon={<ShoppingCartOutlined style={{ color: 'green', fontSize: '24px' }} />}
//       title={<span style={{ fontSize: '20px', color: 'blue', fontWeight: 500 }}>{'Group'}</span>}
//       value={total.name}
//     />
//     <DashboardCard
//       icon={<ShoppingOutlined style={{ color: 'blue', fontSize: '24px' }} />}
//       title={<span style={{ fontSize: '20px', color: 'blue', fontWeight: 500 }}>{'Post'}</span>}
//       value={total.like}
//     />
//     <DashboardCard
//       icon={<UserOutlined style={{ color: 'purple', fontSize: '24px' }} />}
//       title={<span style={{ fontSize: '20px', color: 'blue', fontWeight: 500 }}>{'Like'}</span>}
//       value={total.like}
//     />
//     <DashboardCard
//       icon={<DollarCircleOutlined style={{ color: 'red', fontSize: '24px' }} />}
//       title={<span style={{ fontSize: '20px', color: 'blue', fontWeight: 500 }}>{'Member'}</span>}
//       value={total.follow}
//     />
//   </Space>
// </Space>
// <div style={{ marginTop: '20px' }}></div>



// <Table
//         aria-label='Example table with client-side pagination'
//         bottomContent={
//           <div className='flex w-full justify-center'>
//             <Pagination
//               isCompact
//               showControls
//               showShadow
//               color='secondary'
//               page={page}
//               total={5}
//               onChange={(page) => setPage(page)}
//             />
//           </div>
//         }
//         classNames={{
//           wrapper: 'min-h-[222px]'
//         }}
//         style={{
//           tableLayout: 'fixed',
//           width: '100%' // Ensure the table takes the full width of its container
//         }}
//       >
//         <TableHeader>
//           <TableColumn key='text' style={{ width: '12.5%' }}>
//             Text
//           </TableColumn>
//           <TableColumn key='like' style={{ width: '12.5%' }}>
//             Like
//           </TableColumn>
//           <TableColumn key='love' style={{ width: '12.5%' }}>
//             Love
//           </TableColumn>
//           <TableColumn key='care' style={{ width: '12.5%' }}>
//             Care
//           </TableColumn>
//           <TableColumn key='haha' style={{ width: '12.5%' }}>
//             Haha
//           </TableColumn>
//           <TableColumn key='angry' style={{ width: '12.5%' }}>
//             Angry
//           </TableColumn>
//           <TableColumn key='react' style={{ width: '12.5%' }}>
//             React
//           </TableColumn>
//           <TableColumn key='comment' style={{ width: '12.5%' }}>
//             Comment
//           </TableColumn>
//           <TableColumn key='share' style={{ width: '12.5%' }}>
//             Share
//           </TableColumn>
//         </TableHeader>
//         <TableBody items={items}>
//           {(item) => <TableRow key={item._id}>{(columnKey) => <TableCell>{item[columnKey]}</TableCell>}</TableRow>}
//         </TableBody>
//       </Table>