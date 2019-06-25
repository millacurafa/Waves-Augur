import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getNavItems, getNavItem, getNavUrl} from 'yii-steroids/reducers/navigation';
import Link from 'yii-steroids/ui/nav/Link';
import Form from 'yii-steroids/ui/form/Form';
import InputField from 'yii-steroids/ui/form/InputField';
import {html} from 'components';
import ProfileBlock from 'shared/ProfileBlock';
import HeaderNav from './views/HeaderNav';
import NavItemSchema from './../../types/NavItemSchema';
import {ROUTE_ROOT, ROUTE_PROFILE, ROUTE_PROFILE_INBOX} from 'routes';
import user from '../../static/data/user';
import InputFieldSearchView from 'ui/form/InputField/InputFieldSearchView';
import InputFieldHamburgerSearchView from 'ui/form/InputField/InputFieldHamburgerSearchView';

import './Header.scss';

const bem = html.bem('Header');
const FORM_ID = 'search';

@connect(
    state => ({
        navItems: getNavItems(state, ROUTE_ROOT),
        inboxPageNavItem: getNavItem(state, ROUTE_PROFILE_INBOX),
        profilePageNavItem: getNavItem(state, ROUTE_PROFILE),
        indexPageUrl: getNavUrl(state, ROUTE_ROOT),
    })
)
export default class Header extends React.PureComponent {

    static propTypes = {
        navItems: PropTypes.arrayOf(NavItemSchema),
        inboxPageNavItem: NavItemSchema,
        profilePageNavItem: NavItemSchema,
        indexPageUrl: PropTypes.string,
    };

    constructor() {
        super(...arguments);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);

        this.state = {
            isMenuOpen: false,
        }
    }

    render() {
        const navItems = this.props.navItems.filter(item => item.isNavVisible !== false);

        return (
            <header className={bem.block()}>
                <div className={bem.element('inner')}>
                    <Link
                        className={bem.element('logo')}
                        to={this.props.indexPageUrl}
                    >
                        <img
                            className={bem.element('logo-image')}
                            src='/icons/logo.svg'
                            alt='ventuary dao'
                        />
                    </Link>
                    <div className={bem.element('nav')}>
                        <HeaderNav navItems={navItems}/>
                    </div>
                    <div className={bem.element('form')}>
                        <Form formId={FORM_ID}>
                            <InputField
                                attribute='search'
                                placeholder={__('Search')}
                                view={InputFieldSearchView}
                            />
                        </Form>
                    </div>
                    <div className={bem.element('profile')}>
                        {user && (
                            <ProfileBlock
                                user={user}
                                menuItems={[].concat(this.props.inboxPageNavItem, this.props.profilePageNavItem)}
                            />
                        ) || (
                            <Link
                                className={bem.element('login-link')}
                                to='/'
                                label={__('Login')}
                            />
                        )}
                    </div>
                    <button
                        className={bem(bem.element('menu-toggle'), 'material-icons')}
                        onClick={this.toggleMenu}
                    >
                        {this.state.isMenuOpen ? 'close' : 'menu'}
                    </button>
                    {this.renderMenu()}
                </div>
            </header>
        );
    }

    toggleMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    }

    renderMenu() {
        const navItems = this.props.navItems.filter(item => item.isNavVisible !== false);

        return (
            <div className={bem.element('menu', {
                hidden: !this.state.isMenuOpen,
            })}>
                <ul className={bem.element('menu-list', 'profile')}>
                    {[].concat(this.props.inboxPageNavItem, this.props.profilePageNavItem).map(menuItem => (
                        <li
                            className={bem.element('menu-item')}
                            key={menuItem.id}
                        >
                            <Link
                                className={bem.element('menu-link', {active: menuItem.isActive})}
                                to={menuItem.url}
                                label={menuItem.title}
                                onClick={() => this.onMenuClick(menuItem.url)}
                            />
                        </li>
                    ))}
                    <li className={bem.element('menu-item')}>
                        <button
                            className={bem.element('menu-link', 'logout')}
                            onClick={() => console.log('logout')}
                        >
                            Log Out
                        </button>
                    </li>
                </ul>
                <ul className={bem.element('menu-list', 'nav')}>
                    {navItems.map(navItem => (
                        <li
                            className={bem.element('menu-item')}
                            key={navItem.id}
                        >
                            <Link
                                className={bem.element('menu-link', {active: navItem.isActive})}
                                to={navItem.url}
                                label={navItem.title}
                                onClick={() => this.onMenuClick(navItem.url)}
                            />
                        </li>
                    ))}
                </ul>
                <div className={bem.element('menu-form')}>
                    <Form formId={FORM_ID}>
                        <InputField
                            attribute='search'
                            placeholder={__('Search')}
                            view={InputFieldHamburgerSearchView}
                        />
                    </Form>
                </div>
            </div>
        )
    }

    onMenuClick(url) {
        this.setState({isMenuOpen: false}, () => this.props.dispatch(push(url)))
    }
}
