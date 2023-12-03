import './admin.css'
import React, { useEffect, useState } from 'react'
import './JobPostingForm.css'
import axios from 'axios'
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
import { useAuthContext } from '../../hook/useAuthContext'
export default function Admin() {
  const { user } = useAuthContext()

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const rowsPerPage = 2

  const api = ' http://localhost:5000/Post/'
  useEffect(() => {
    if (user) {
      console.log(user.token)
      fetch(api, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Thành công ')
          console.log(data)
          setData(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [user])

  const pages = Math.ceil(data.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data.slice(start, end)
  }, [page, data])

  function handleButtonClick(id) {}
  return (
    <div className='admin-container'>
      <div className='admin'>
        <div className='left-column'>
          <h className='heading-admin'>Danh Sách Bài Post</h>

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
                <TableColumn key='id' style={{ width: '10%' }}>
                  Idpost
                </TableColumn>

                <TableColumn key='text' style={{ width: '25%' }}>
                  Text
                </TableColumn>

                <TableColumn key='time' style={{ width: '10%' }}>
                  Time
                </TableColumn>

                <TableColumn key='actions' style={{ width: '5%' }}>
                  Actions
                </TableColumn>
              </TableHeader>

              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item._id}>{(columnKey) => <TableCell>{item[columnKey]}</TableCell>}</TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className='right-column'>
          <JobPostingForm />
        </div>
      </div>
    </div>
  )
}
// Import file CSS nếu cần

function JobPostingForm() {
  const [error, setError] = useState(null)
  const { user } = useAuthContext()
  const [formData, setFormData] = useState({
    congti: '',
    luong: '',
    vitri: '',
    khuvuc: '',
    level: 'entry',
    anh: '',
    timedang: '',
    language: '',
    id: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    if (!user) {
      setError('You must be logged in')
      return
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    // Xử lý dữ liệu biểu mẫu, ví dụ: gửi dữ liệu đến máy chủ hoặc thực hiện các thao tác khác
    console.log('Submitted data:', formData)

    axios
      .post('http://localhost:5000/post/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((response) => {
        // Kiểm tra xem phản hồi có thành công không (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          console.log('Recruitment saved:', response.data)
          // Trả về phản hồi cho client
          setError('Thêm Thành Công')

          // Đặt lại giá trị mặc định cho các trường sau khi submit
          setFormData({
            congti: '',
            luong: '',
            vitri: '',
            khuvuc: '',
            level: 'entry',
            anh: '',
            timedang: '',
            language: '',
            id: ''
          })
        } else {
          // Xử lý trường hợp không thành công
          console.error('Error:', response.status, response.statusText)
          alert('Không thể thêm bài đăng')
        }
      })
      .catch((error) => {
        // Xử lý lỗi trong quá trình gửi request
        console.error('Error:', error)
        alert('Đã có lỗi xảy ra')
      })
  }

  return (
    <form className='vertical-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='companyName'>Tên Công Ty:</label>
        <input
          className='input-admin'
          type='text'
          id='companyName'
          name='congti'
          value={formData.congti}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='salary'>Lương:</label>
        <input
          className='input-admin'
          type='text'
          id='salary'
          name='luong'
          value={formData.luong}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='position'>Vị Trí Tuyển Dụng:</label>
        <input
          className='input-admin'
          type='text'
          id='position'
          name='vitri'
          value={formData.vitri}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='region'>Khu Vực:</label>
        <input
          className='input-admin'
          type='text'
          id='region'
          name='khuvuc'
          value={formData.khuvuc}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='level'>Level:</label>
        <select id='level' name='level' value={formData.level} onChange={handleChange} required>
          <option value='entry'>Entry Level</option>
          <option value='mid'>Mid Level</option>
          <option value='senior'>Senior Level</option>
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='skills'>Ảnh:</label>
        <input
          className='input-admin'
          type='text'
          id='skills'
          name='anh'
          value={formData.anh}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='skills'>Language</label>
        <input
          className='input-admin'
          type='text'
          id='language'
          name='language'
          value={formData.language}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='skills'>IdPost</label>
        <input
          className='input-admin'
          type='text'
          id='idpost'
          name='id'
          value={formData.id}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='postingTime'>Thời Gian Đăng:</label>
        <input
          className='input-admin'
          type='datetime-local'
          id='postingTime'
          name='timedang'
          value={formData.timedang}
          onChange={handleChange}
          required
        />
      </div>

      <button style={{ background: 'yellow' }} type='submit'>
        Đăng Tuyển Dụng
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
