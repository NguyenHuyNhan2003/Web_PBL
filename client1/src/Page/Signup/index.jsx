import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data.email);
    console.log(data.password);

    reset()
    try {
      // Gửi dữ liệu lên server sử dụng fetch
      const response = await fetch('URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })
      if (response.ok) {
        // Xử lý kết quả từ server (nếu cần)
        const responseData = await response.json()
        console.log(responseData)
        // Sau khi xử lý, reset các ô input
        reset()
        // check role và chuyển hướng trang 

        // useState để luu token
        
        // Chuyển hướng hoặc thực hiện các hành động khác
        navigate('/');
      } else {
        // Xử lý lỗi nếu response không thành công
        console.error('Error:', response.status, response.statusText)
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error sending data to server:', error)
    }
  }



  return (
    <div className='bg-gray-100 min-h-screen'>
      {/* Thêm một div chứa toàn bộ nội dung */}
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='text-2xl'>Đăng Kí</div>
              <input
                {...register('email', { required: 'Email is required' })}
                type='email'
                className='mt-8 p-2 rounded border border-gray-300 w-full'
                placeholder='Email'
              />
              <input
                {...register('password')}
                type='password'
                className='mt-2 p-2 rounded border border-gray-300 w-full'
                placeholder='Password'
                autoComplete='on'
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600 rounded'
                >
                 Đăng Kí
                </button>
              </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
