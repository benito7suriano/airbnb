const Image = ({ identifier }) => {
  return (
    <div className={identifier === 'main-image' ? 'main-image' : 'image'}>
      <img src='' alt='' />
    </div>
  )
}
