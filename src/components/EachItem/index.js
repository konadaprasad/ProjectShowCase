import './index.css'

const EachItem = props => {
  const {listItems} = props
  const {name, imageUrl} = listItems

  return (
    <li className="list-cont">
      <img src={imageUrl} alt={name} className="img" />
      <p className="para">{name}</p>
    </li>
  )
}
export default EachItem
