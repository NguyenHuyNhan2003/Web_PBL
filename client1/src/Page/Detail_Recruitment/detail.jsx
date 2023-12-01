// Detail.js

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Detail.css' // Import file CSS cho component

export default function Detail() {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [applicationStatus, setApplicationStatus] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [recruitment, setRecruitment] = useState([])
  const [Congti, setCongti] = useState([])
  useEffect(() => {
    fetch(`http://localhost:5000/post/by/${id}`)
      .then((result) => result.json())
      .then((data) => {
        setData(data)
      })
  }, [id])
  useEffect(() => {
    fetch(`http://localhost:5000/post/recruitment/by/${id}`)
      .then((result) => result.json())
      .then((data) => {
        setCongti(data)
      })
  }, [id])

  const handleApplyNow = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleApply = (formData) => {
    // Thực hiện các logic xử lý form (ví dụ: gửi yêu cầu đến máy chủ)
    // Ở đây bạn có thể thực hiện việc lưu dữ liệu ứng tuyển vào cơ sở dữ liệu hoặc thực hiện các bước khác
    setApplicationStatus(true)
    setShowModal(false) // Đóng modal sau khi ứng tuyển
  }

  return (
    <div className='detail-container'>
      <h1 className='detail-title'>Detail Tuyển dụng</h1>
      <div className='detail-content'>
        <p>{data.text}</p>
        {applicationStatus ? (
          <p className='application-status'>Bạn đã ứng tuyển thành công!</p>
        ) : (
          <button className='apply-now-btn' onClick={handleApplyNow}>
            Ứng tuyển ngay
          </button>
        )}
      </div>

      {showModal && <ApplicationModal onClose={handleModalClose} onApply={handleApply} Congti ={Congti}/>}
    </div>
  )
}
// ApplicationModal.js
function ApplicationModal({ onClose, onApply,Congti }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    cv: '',
    introduction: '',
    congti : Congti.congti
  })
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSubmit = () => {
    // Thực hiện các logic xử lý form (ví dụ: gửi yêu cầu đến máy chủ)
    console.log('Success:', formData)
    onApply(formData)
    // Gửi yêu cầu POST đến máy chủ
    fetch('http://localhost:5000/post/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log('Success:', data)
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error('Error:', error)
        
      })
    // Đóng modal sau khi gửi yêu cầu
    onClose()
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Ứng tuyển ngay <span style={{ fontSize: '20px', color: 'red' }}>{Congti.congti}</span></h2>
        <label>
          Họ tên:
          <input type='text' name='fullName' value={formData.fullName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type='email' name='email' value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Số điện thoại:
          <input type='tel' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label>
          CV ứng tuyển:
          <input type='file' name='cv' onChange={handleChange} />
        </label>
        <label>
          Đoạn giới thiệu bản thân:
          <textarea name='introduction' value={formData.introduction} onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Ứng tuyển</button>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  )
}
