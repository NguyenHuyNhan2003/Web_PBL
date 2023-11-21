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
export default function Admin() {
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

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const rowsPerPage = 2

  const api = ' http://localhost:5000/Post/'

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
  const [formData, setFormData] = useState({
    congti: '',
    luong: '',
    vitri: '',
    khuvuc: '',
    level: 'entry',
    anh: '',
    timedang: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Xử lý dữ liệu biểu mẫu, ví dụ: gửi dữ liệu đến máy chủ hoặc thực hiện các thao tác khác
    console.log('Submitted data:', formData)
    axios
      .post('http://localhost:5000/post/create', formData)
      .then((response) => {
        console.log('Response:', response.data);
        alert("Thành công thêm");
      })
      .catch((error) => {
        console.error('Error:', error)
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

      <button type='submit'>Đăng Tuyển Dụng</button>
    </form>
  )
}


