import { NavLink } from 'react-router-dom';
import { links } from '../utils/Links';
import { useDashboard } from '../hooks/useDashboard';

type Props = {
  isBigSideBar?: boolean;
};
const Navlinks: React.FC<Props> = ({ isBigSideBar = false }) => {
  const { toggleSidebar } = useDashboard();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            key={path}
            to={path}
            onClick={isBigSideBar ? () => {} : toggleSidebar}
            end
            className='nav-link'
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default Navlinks;
