import { FC } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';
import css from './Navigation.module.css';

type NavLinkClassNameFn = Extract<NavLinkProps['className'], (arg: any) => any>;
type NavLinkRenderProps = NavLinkClassNameFn extends (...args: any[]) => any
  ? Parameters<NavLinkClassNameFn>[0]
  : { isActive: boolean; isPending?: boolean };

const Navigation: FC = () => {
  const buildLinkClass = (props: NavLinkRenderProps): string => {
  const { isActive } = props;
  return clsx(css.navLink, { [css.activeLink]: isActive });
};;
    
  return <div className={css.wrapper}>
            <nav className={css.nav}>
                <NavLink to="/" className={buildLinkClass}>
                Home
                </NavLink>
                <NavLink to="/catalog" className={buildLinkClass}>
                Catalog
                </NavLink>
            </nav>
        </div>
}

export default Navigation;