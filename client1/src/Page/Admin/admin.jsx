import './admin.css'
import React, { useEffect, useState } from 'react'
import './JobPostingForm.css'
import axios from 'axios'
import { useRef  } from 'react'
import {
  successNotification,
  errorNotification,
  warningNotification,
  infoNotification,
  customNotification
} from '../../component/Toast'
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
  const rowsPerPage = 3

  const api = ' http://wandertour.ddns.net:5000/Post/'
  useEffect(() => {
    if (user) {
      console.log(user.token)
      fetch(api, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Thành công ')
          // if(data.error == null){
          // console.log(data.error)
          // setData([])

          // }else{
          //   setData(data)
          // }
          setData(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [user])
  console.log(data)

  const pages = Math.ceil(data.length / rowsPerPage)
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = (start + rowsPerPage)

    return data.slice(start, end)
  }, [page, data])

  function handleButtonClick(id) {}
  return (
    <div className='admin-container'>
      <div className='admin'>
        <div className='left-column'>
          <h1 className='heading-admin' style={{ marginLeft: '60px', bottom: '20px' }}>
            Danh Sách Bài Post
          </h1>

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
                    total={pages}
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
                <TableColumn key='id' style={{ width: '10%', textAlign: 'center' }}>
                  Idpost
                </TableColumn>

                <TableColumn key='text' style={{ width: '15%', textAlign: 'center' }}>
                  Text
                </TableColumn>

                <TableColumn key='time' style={{ width: '5%', textAlign: 'center' }}>
                  Time
                </TableColumn>

                <TableColumn key='actions' style={{ width: '5%', textAlign: 'center' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2>Thêm Tuyển Dụng</h2>
          </div>
          <JobPostingForm />
        </div>
      </div>
    </div>
  )
}
// Import file CSS nếu cần

function JobPostingForm() {
  const fileImage = useRef(null);
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
    id: '',
    soluong: '',
    kinhnghiem: '',
    bangcap: '',
    mota: '',
    yeucau: ''
  })
  // const handleChange = (event) => {
  //   const { name, value } = event.target

  //   if (!user) {
  //     setError('You must be logged in')
  //     warningNotification('You must be logged in')
  //     return
  //   }
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   })
  // }

  const handleChange = (event) => {
    const { name, value, type } = event.target

    if (!user) {
      setError('You must be logged in')
      warningNotification('You must be logged in')
      return
    }

    // Handle file input separately
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: event.target.files[0] // Assuming single file upload, adjust as needed
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    const formDataToSend = new FormData()

    // Append text fields to FormData
    formDataToSend.append('congti', formData.congti)
    formDataToSend.append('luong', formData.luong)
    formDataToSend.append('vitri', formData.vitri)
    formDataToSend.append('khuvuc', formData.khuvuc)
    formDataToSend.append('level', formData.level)
    formDataToSend.append('timedang', formData.timedang)
    formDataToSend.append('language', formData.language)
    formDataToSend.append('id', formData.id)
    formDataToSend.append('soluong', formData.soluong)
    formDataToSend.append('kinhnghiem', formData.kinhnghiem)
    formDataToSend.append('bangcap', formData.bangcap)
    formDataToSend.append('mota', formData.mota)
    formDataToSend.append('yeucau', formData.yeucau)

    // Append file to FormData
    formDataToSend.append('anh', formData.anh)
    // Xử lý dữ liệu biểu mẫu, ví dụ: gửi dữ liệu đến máy chủ hoặc thực hiện các thao tác khác
    console.log('Submitted data:', formDataToSend)

    axios
      .post('http://wandertour.ddns.net:5000/post/create', formDataToSend, {
        headers: {     
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((response) => {
        // Kiểm tra xem phản hồi có thành công không (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          console.log('Recruitment saved:', response.data)
          // Trả về phản hồi cho client
          successNotification('Thêm Thành Công')

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
            id: '',
            mota :'',
            yeucau:'',
            bangcap:'',
            kinhnghiem:'',
            soluong:'',
            anh : ''

          });
          // reset 
          fileImage.current.value = null;
        } else {
          // Xử lý trường hợp không thành công
          console.error('Error:', response.status, response.statusText)
          errorNotification('Không thể thêm bài đăng')
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
          <option value='midle'>Mid Level</option>
          <option value='senior'>Senior Level</option>
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='skills'>Ảnh:</label>
        <input
        ref = {fileImage}
          className='input-admin'
          type='file' // Change the input type to file
          id='skills'
          name='anh'
          onChange={handleChange} // Update the onChange handler
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
          type='date'
          id='postingTime'
          name='timedang'
          value={formData.timedang}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='skills'>Số lượng</label>
        <input
          className='input-admin'
          type='text'
          id='soluong'
          name='soluong'
          value={formData.soluong}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='skills'>Kinh Nghiệm</label>
        <input
          className='input-admin'
          type='text'
          id='kinhnghiem'
          name='kinhnghiem'
          value={formData.kinhnghiem}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='skills'>Bằng Cấp</label>
        <input
          className='input-admin'
          type='text'
          id='bangcap'
          name='bangcap'
          value={formData.bangcap}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='skills'>Mô Tả </label>
        <textarea
          className='input-admin'
          id='mota'
          name='mota'
          value={formData.mota}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='skills'>Yêu cầu</label>
        <textarea
          className='input-admin'
          id='yeucau'
          name='yeucau'
          value={formData.yeucau}
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

// 'Content-Type': 'application/json',
//'Content-Type': 'multipart/form-data',