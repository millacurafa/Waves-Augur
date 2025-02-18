import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'yii-steroids/ui/nav/Link';
import {getUser, isAuthorized, isInitialized} from 'yii-steroids/reducers/auth';
import {getNavItems} from 'yii-steroids/reducers/navigation';
import enhanceWithClickOutside from 'react-click-outside';
import { setUser } from 'yii-steroids/actions/auth';


import {dal as Dal, html} from 'components';
const dal = Dal();

import UserRole from 'enums/UserRole';
import NavItemSchema from 'types/NavItemSchema';
import userAvatarStub from 'static/images/user-avatar-stub.png';
import whaleAvatarStub from 'static/images/whale-avatar-stub.png';
import anonymousAvatarStub from 'static/images/anonymous-avatar-stub.jpeg';
import UserSchema from 'types/UserSchema';

import {ROUTE_PROFILE, ROUTE_PROFILE_INBOX} from 'routes';
import './HeaderProfile.scss';
import {isPhone} from 'yii-steroids/reducers/screen';

const bem = html.bem('HeaderProfile');

@connect(
    state => ({
        isInitialized: isInitialized(state),
        isAuthorized: isAuthorized(state),
        user: getUser(state),
        profileNavItems: getNavItems(state, ROUTE_PROFILE),
        isPhone: isPhone(state),
    })
)
@enhanceWithClickOutside
export default class HeaderProfile extends React.PureComponent {

    static propTypes = {
        isInitialized: PropTypes.bool,
        isAuthorized: PropTypes.bool,
        user: UserSchema,
        profileNavItems: PropTypes.arrayOf(NavItemSchema)
    };

    constructor() {
        super(...arguments);

        this.state = {
            isMenuOpen: false,
        };
    }

    async onLoginClick () {
        dal
            .getAccount()
            .then(async accountResponse => {
                console.log({ accountResponse });
    
                if (!_.get(accountResponse, 'address')) {
                    this.props.dispatch(openModal(MessageModal, {
                        icon: 'Icon__keeper-no-account',
                        title: __('Create your Waves wallet'),
                        color: 'success',
                        description: __('Click “Add account” in Waves Keeper extension in your browser'),
                        submitLabel: __('Ok, I understand'),
                    }));
                } else {
                    // const userData = await keeper.publicState();
                    // return userData.account;
                    // const store = require('components').store;
                    // const prevAddress = _get(getUser(store.getState()), 'address');

                    // // Get next address
                    // const account = await this.getAccount();
                    // const nextAddress = account.address;

                    // if (prevAddress !== nextAddress) {
                    // const user = await this.auth();
                    // store.dispatch(setUser(user));
                    // }
                    const store = require('components').store;
                    const mappedUser = await dal.mapAuthenticatedUserData(accountResponse);
                    store.dispatch(setUser(mappedUser));
                    // (async () => {  await dal.auth(); })()
                }
            })
            .catch(err => {
                console.log(err);
            });
        
    }

    render() {
        // if (!this.props.isInitialized) {
        //     return null;
        // }

        const items = this.props.user && this.props.profileNavItems.filter(item => item.roles.includes(this.props.user.role)) || [];
        if (!this.props.isAuthorized || items.length === 0) {
            return (
                <>
                    {/* <a
                        target={'_blank'}
                        className={bem.element('login-link')}
                    >
                        {__('Login')}
                    </a> */}
                    <Link
                        className={bem.element('login-link')}
                        label={__('Login')}
                        noStyles 
                        onClick={() => this.onLoginClick.call(this)}
                    />
                    {/*<Link
                    className={bem.element('login-link')}
                    label={__('Login')}
                    noStyles
                    onClick={() => {

                        if (this.props.isPhone) {
                            this.props.dispatch(openModal(MessageModal, {
                                icon: 'Icon__log-in-from-pc',
                                title: __('Log in from PC'),
                                color: 'success',
                                description: __('This functionality is currently only available in the desktop version of Ventuary DAO. Sorry for the inconvenience.'),
                            }));
                        } else {
                            // if (this.props.user && this.props.user.role === UserRole.INVITED) {
                            //     return this.props.dispatch(openModal(ProfileWizardModal, {isCreate: true}));
                            // }
                            //
                            // this.props.dispatch(openModal(MessageModal, {
                            //     icon: 'Icon__get-an-invitation',
                            //     title: __('You Need An Invitation'),
                            //     color: 'success',
                            //     description: __('You must be invited by registered user'),
                            //     submitLabel: __('Check out Community'),
                            //     toRoute: ROUTE_COMMUNITY,
                            // }));
                        }

                    }}
                />*/}
                </>
            );
        }

        const avatarStub = this.props.user.profile.isWhale
            ? whaleAvatarStub
            : this.props.user.role === UserRole.REGISTERED ? userAvatarStub : anonymousAvatarStub;

        return (
            <div className={bem.block()}>
                <img
                    className={bem.element('avatar')}
                    src={this.props.user.profile.avatar || avatarStub}
                    alt={this.props.user.profile.name}
                />
                <div className={bem.element('inner')}>
                    <div className={bem.element('balance')}>
                        {this.props.user.balance}
                    </div>
                    <div className={bem.element('info')}>
                        <div className={bem.element('name')}>
                            {this.props.user.profile.name}
                        </div>
                        <button
                            className={bem(bem.element('menu-toggle'), 'MaterialIcon')}
                            onClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}
                        >
                            {this.state.isMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
                        </button>
                        <ul className={bem.element('menu', {
                            hidden: !this.state.isMenuOpen
                        })}>
                            {items.map(item => (
                                <li
                                    className={bem.element('menu-item')}
                                    key={item.id}
                                >
                                    <Link
                                        className={bem.element('menu-link', {
                                            active: item.isActive,
                                        })}
                                        to={item.url}
                                        label={item.label}
                                        onClick={() => this.setState({isMenuOpen: false})}
                                        noStyles
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {items.find(item => item.id === ROUTE_PROFILE_INBOX) && (
                    <Link
                        className={bem.element('notification')}
                        toRoute={ROUTE_PROFILE_INBOX}
                        noStyles
                    >
                        <span className={bem(bem.element('notification-icon'), 'MaterialIcon')}>
                            notifications
                        </span>
                    </Link>
                )}
            </div>
        );
    }

    handleClickOutside() {
        this.setState({isMenuOpen: false});
    }
}
