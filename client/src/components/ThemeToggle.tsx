import Wrapper from '../assets/wrappers/ThemeToggle';
import { BsSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { useDashboard } from '../hooks/useDashboard';
const ThemeToggle = () => {
  const { toggleDarkMode, isDarkMode } = useDashboard();
  return (
    <Wrapper onClick={toggleDarkMode}>
      {isDarkMode ? (
        <BsSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonStarsFill className='toggle-icon' />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
