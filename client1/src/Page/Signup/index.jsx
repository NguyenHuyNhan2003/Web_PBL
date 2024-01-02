import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSignup } from '../../hook/useSignup'
import giaodienlogin from '../../css/img/backgroundep.jpg'
export default function LoginPage() {
  const { signup, error, isLoading } = useSignup()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data.email)
    console.log(data.password)
    await signup(data.email, data.password)
    reset()
  }

  return (
    <div
      className='bg-gray-100 min-h-screen'
      style={{
        backgroundImage: `url(${giaodienlogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
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
                {error && <div className='error'> {error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
