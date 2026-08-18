import lotus from '../assets/lotus.png'

type LotusIconProps = {
  size?: number
}

function LotusIcon({ size = 40 }: LotusIconProps) {
  return (
    <img
      src={lotus}
      alt="Lotus"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}

export default LotusIcon