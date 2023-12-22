import Slider from 'react-slick';
import anh1 from '../../css/img/Screenshot 2023-12-14 130826.png'
import anh2 from '../../css/img/giaodien2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import congti from '../../css/img/anhcongti.png'
import anhcongti from '../../css/img/telexpert.png'
import eo from '../../css/img/eon.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  return (
    <div>
      <Banner />
      <CompanyTop />
      <JobOutstanding />
      <BlogIt />
      <Reviewer />
      <Footer />
      <UploadPic />
    </div>
  )
}
export default Home

const Banner = () => {
  return (
    <section className='banner'>
    <div>
      <img src={anh1} alt='Banner Image 1' />
    

    </div>
    {/* Add more slides as needed */}
  
      <div className='banner-content'></div>
    </section>
  )
}
const CompanyTop = () => {
  return (
    <div className={styles.container_company}>
      <h1 className={styles.heading_company}>Các Công Ty Hàng Đầu</h1>
      <div className={styles.list_company}>
        <div className={styles.item_company}>
          <div className={styles.company_image}>
            <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={congti}></img>
          </div>
          <div className={congti.company_content}>
            <h2 className={congti.heading_challenge}> CHALLENGE</h2>
          </div>
        </div>

        <div className={styles.item_company}>
          <div className={styles.company_image}>
            <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
          </div>
          <div className={congti.company_content}>
            <h2 className={congti.heading_challenge}> CHALLENGE</h2>
          </div>
        </div>

        <div className={styles.item_company}>
          <div className={styles.company_image}>
            <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={eo}></img>
          </div>
          <div className={congti.company_content}>
            <h2 className={congti.heading_challenge}> CHALLENGE</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

const JobOutstanding = () => {
  return (
    <div className={styles.container_newjob}>
      <div className={styles.listnewjob}>
        <div className={styles.newjob_header}>
          <h1>Viêc làm mới nhất</h1>
          <a>Xem tất cả </a>
        </div>

        <div className={styles.newjob_maincontent}>
          <div className={styles.item_newsjob}>
            <div className={styles.company_image}>
              <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
            </div>
            <div className={styles.newjob_content}>
              <h1 className={styles.newjob_title}> Senior Business Analisic</h1>
              <h3 className={styles.newjob_namecompany}>MB Ageas Life</h3>
              <span className={styles.newjob_namelanguage}>HTML JAVA</span>
            </div>
          </div>

          <div className={styles.item_newsjob}>
            <div className={styles.company_image}>
              <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
            </div>
            <div className={styles.newjob_content}>
              <h1 className={styles.newjob_title}> Senior Business Analisic</h1>
              <h3 className={styles.newjob_namecompany}>MB Ageas Life</h3>
              <span className={styles.newjob_namelanguage}>HTML JAVA</span>
            </div>
          </div>

          <div className={styles.item_newsjob}>
            <div className={styles.company_image}>
              <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
            </div>
            <div className={styles.newjob_content}>
              <h1 className={styles.newjob_title}> Senior Business Analisic</h1>
              <h3 className={styles.newjob_namecompany}>MB Ageas Life</h3>
              <span className={styles.newjob_namelanguage}>HTML JAVA</span>
            </div>
          </div>

          <div className={styles.item_newsjob}>
            <div className={styles.company_image}>
              <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
            </div>
            <div className={styles.newjob_content}>
              <h1 className={styles.newjob_title}> Senior Business Analisic</h1>
              <h3 className={styles.newjob_namecompany}>MB Ageas Life</h3>
              <span className={styles.newjob_namelanguage}>HTML JAVA</span>
            </div>
          </div>

          <div className={styles.item_newsjob}>
            <div className={styles.company_image}>
              <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
            </div>
            <div className={styles.newjob_content}>
              <h1 className={styles.newjob_title}> Senior Business Analisic</h1>
              <h3 className={styles.newjob_namecompany}>MB Ageas Life</h3>
              <span className={styles.newjob_namelanguage}>HTML JAVA</span>
            </div>
          </div>

          <div className={styles.item_newsjob}>
            <div className={styles.company_image}>
              <img style={{ width: '98px', height: '98px', padding: '16px 8px ' }} src={anhcongti}></img>
            </div>
            <div className={styles.newjob_content}>
              <h1 className={styles.newjob_title}> Senior Business Analisic</h1>
              <h3 className={styles.newjob_namecompany}>MB Ageas Life</h3>
              <span className={styles.newjob_namelanguage}>HTML JAVA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// test uploa fiel anh

const UploadPic = () => {
  const [file, setFile] = useState(null)
  const [image, setImageUrl] = useState()
  const [image0, setImage] = useState()
  const handleImage = (e) => {
    console.log(e.target.files[0])
    setImageUrl(e.target.files[0])
  }
  const SubmitImage = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image) // Corrected line
    axios
      .post('http://localhost:5000/post/upload', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    axios
      .get('http://localhost:5000/post/getImage')
      .then((result) => setImage(result.data[10].image))
      .catch((err) => console.log(err))
  },[])
 console.log(image0);
  return (
    <div>
      <form onSubmit={SubmitImage}>
        <input type='file' name='file' onChange={handleImage}></input>
        {image0 && <img src={`http://localhost:5000/Images/`+ image0} alt='Uploaded' style={{ maxWidth: '100%', maxHeight: '300px' }} />}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

const JobHandBook = () => {
  return <div></div>
}
const BlogIt = () => {
  return (
    <div>
      <div>
        <h1>Blog IT</h1>
      </div>
    </div>
  )
}

const Statistics = () => {
  return <section className='statistics'>{/* Hiển thị số liệu thống kê */}</section>
}

const Reviewer = () => {
  return (
    <div>
      <div>
        <h1> Đánh Giá Người Dùng </h1>
      </div>
    </div>
  )
}

const Footer = () => {
  return <footer>Footer</footer>
}
