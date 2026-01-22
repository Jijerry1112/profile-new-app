const Wrapper = ({ Children }) => {
    return (
      <div className="section" id="about">
        <div className="container">
            {children}
        </div>
      </div>
    )
}

export default Wrapper;