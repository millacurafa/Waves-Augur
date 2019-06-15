import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getNavItems} from 'reducers/navigation';
import Link from 'ui/nav/Link';

import {html} from 'components';
import NavItemSchema from './../../types/NavItemSchema';
import RoutesEnum from '../../enums/RoutesEnum';

const bem = html.bem('Header');

@connect(
    state => ({
        navItems: getNavItems(state, RoutesEnum.MAIN),
    })
)
export default class Header extends React.PureComponent {

    static propTypes = {
        navItems: PropTypes.arrayOf(NavItemSchema),
    };

    render() {
        console.log(this.props.navItems);
        return (
            <header className={bem.block()}>
                {this.props.navItems.map((navItem, index) => (
                    <Link
                        to={navItem.url}
                        label={navItem.label}
                        key={index}
                    />
                ))}
            </header>
        );
    }
}
