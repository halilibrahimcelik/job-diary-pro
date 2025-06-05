import Wrapper from '../assets/wrappers/BigSidebar';
import { useDashboard } from '../hooks/useDashboard';
import Logo from './Logo';
import Navlinks from './Navlinks';

const BigSideBar: React.FC = () => {
  const { showSidebar } = useDashboard();
  return (
    <Wrapper>
      <div
        className={
          !showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <Navlinks isBigSideBar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSideBar;
