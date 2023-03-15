import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {CourseItemData} = props
  const {logoUrl, name, id} = CourseItemData
  return (
    <Link to={`/courses/${id}`}>
      <li className="listItem">
        <img src={logoUrl} alt={name} className="course-Image-style" />
        <p className="course-heading">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
