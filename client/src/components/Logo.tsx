import logoSvg from '../assets/images/logo.svg';

type Props = {
  alt?: string;
  className?: string;
  src?: string;
};
const Logo: React.FC<Props> = ({
  alt = 'Job Tracking Logo',
  className = '',
  src,
}) => {
  return (
    <img src={src ? src : logoSvg} alt={alt} className={`logo ${className}`} />
  );
};
export default Logo;
