import "./Button.css"
const Button = ({
  text,
  icon,
  iconPosition = "left",
  width,
  height,
  backgroundColor,
  color,
  border,
  borderRadius,
  onClick,
}) => {
  return (
    <button className='custom-button'
      onClick={onClick}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        color: color,
        border: border,
        borderRadius: borderRadius,
      }}>
      {icon && iconPosition === "left" && (
        <span className='button-icon'>{icon}</span>
      )}
      {text && <span>{text}</span>}
      {icon && iconPosition === "right" && (
        <span className="button-icon">{icon}</span>
      )}

    </button>
  )
}

export default Button;
