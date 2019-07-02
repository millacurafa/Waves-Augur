import {Redirect, Route} from 'react-router';
import React from 'react';

import UserRole from 'enums/UserRole';
import IndexPage from './IndexPage';
import NewsPage from './NewsPage';
import CommunityPage from './CommunityPage';
import ProjectsPage from './ProjectsPage';
import ProfileInboxPage from './ProfileInboxPage';
import ProfileDonationPage from './ProfileDonationPage';
import ProfileProjectsPage from './ProfileProjectsPage';
import ProfileVotingPage from './ProfileVotingPage';
import ProfileInvitedPage from './ProfileInvitedPage';
import ProfileLayout from 'shared/ProfileLayout';
import ProjectLayout from 'shared/ProjectLayout';
import ProjectFeedPage from './ProjectFeedPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import ProjectNewsPage from './ProjectNewsPage';

export const ROUTE_ROOT = 'root';
export const ROUTE_FEED = 'feed';
export const ROUTE_COMMUNITY = 'community';
export const ROUTE_PROJECTS = 'projects';
export const ROUTE_PROFILE = 'profile';
export const ROUTE_PROFILE_REDIRECT = 'profile_redirect';
export const ROUTE_PROFILE_INBOX = 'profile_inbox';
export const ROUTE_PROFILE_DONATION = 'profile_donation';
export const ROUTE_PROFILE_PROJECTS = 'profile_projects';
export const ROUTE_PROFILE_VOTING = 'profile_voting';
export const ROUTE_PROFILE_INVITED = 'profile_invited';
export const ROUTE_PROJECT = 'project';
export const ROUTE_PROJECT_REDIRECT = 'project_redirect';
export const ROUTE_PROJECT_FEED = 'project_feed';
export const ROUTE_PROJECT_DETAILS = 'project_details';
export const ROUTE_PROJECT_NEWS = 'project_news';

export default {
    id: ROUTE_ROOT,
    exact: true,
    path: '/',
    component: IndexPage,
    roles: UserRole.getKeys(),
    label: __('Main'),
    items: {
        [ROUTE_PROJECTS]: {
            exact: true,
            path: '/projects',
            component: ProjectsPage,
            label: __('Projects'),
            roles: UserRole.getKeys(),
        },
        [ROUTE_COMMUNITY]: {
            exact: true,
            path: '/community',
            component: CommunityPage,
            label: __('Community'),
            roles: UserRole.getKeys(),
        },
        [ROUTE_FEED]: {
            exact: true,
            path: '/feed',
            component: NewsPage,
            label: __('Feed'),
            roles: UserRole.getKeys(),
        },
        [ROUTE_PROFILE_REDIRECT]: {
            exact: true,
            path: '/profile',
            component: Redirect,
            componentProps: {
                to: '/profile/projects',
            },
            label: __('My profile'),
            isNavVisible: false,
            roles: UserRole.getKeys(),
        },
        [ROUTE_PROFILE]: {
            path: '/profile',
            component: ProfileLayout,
            label: __('My profile'),
            isNavVisible: false,
            roles: UserRole.getAuth(),
            items: {
                [ROUTE_PROFILE_INBOX]: {
                    exact: true,
                    path: '/profile/inbox',
                    component: ProfileInboxPage,
                    label: __('Inbox'),
                    icon: 'Icon__notification',
                    isNavVisible: false,
                    roles: [UserRole.REGISTERED],
                    isShowImageLine: true,
                },
                [ROUTE_PROFILE_DONATION]: {
                    exact: true,
                    path: '/profile/donation',
                    component: ProfileDonationPage,
                    label: __('Donation'),
                    icon: 'Icon__rhombus',
                    roles: [UserRole.REGISTERED],
                    isShowImageLine: true,
                },
                [ROUTE_PROFILE_PROJECTS]: {
                    exact: true,
                    path: '/profile/projects',
                    component: ProfileProjectsPage,
                    label: __('Projects'),
                    icon: 'Icon__rocket',
                    roles: [UserRole.REGISTERED],
                    isShowImageLine: true,
                },
                [ROUTE_PROFILE_VOTING]: {
                    exact: true,
                    path: '/profile/voiting',
                    component: ProfileVotingPage,
                    label: __('Voting'),
                    icon: 'Icon__voting',
                    roles: [UserRole.REGISTERED],
                    isShowImageLine: true,
                },
                [ROUTE_PROFILE_INVITED]: {
                    exact: true,
                    path: '/profile/invited-users',
                    component: ProfileInvitedPage,
                    label: __('Invited Users'),
                    icon: 'Icon__invite',
                    roles: [UserRole.REGISTERED, UserRole.WHALE, UserRole.GENESIS],
                    isShowImageLine: true,
                },
            },
        },
        [ROUTE_PROJECT_REDIRECT]: {
            exact: true,
            path: '/projects/:uid',
            component: Route,
            componentProps: {
                render: ({match}) => (
                    <Redirect to={`/projects/${match.params.uid}/feed`}/>
                )
            },
            label: __('Project'),
            isNavVisible: false,
            roles: UserRole.getKeys(),
        },
        [ROUTE_PROJECT]: {
            path: '/projects/:uid',
            component: ProjectLayout,
            label: __('Project'),
            isNavVisible: false,
            roles: UserRole.getAuth(),
            isShowImageLine: true,
            items: {
                [ROUTE_PROJECT_FEED]: {
                    exact: true,
                    path: '/projects/:uid/feed',
                    component: ProjectFeedPage,
                    label: __('Feed'),
                    icon: 'Icon__feed',
                    isNavVisible: false,
                    roles: [UserRole.REGISTERED, UserRole.WHALE],
                    isShowImageLine: true,
                },
                [ROUTE_PROJECT_DETAILS]: {
                    exact: true,
                    path: '/projects/:uid/details',
                    component: ProjectDetailsPage,
                    label: __('Details'),
                    icon: 'Icon__details',
                    roles: [UserRole.REGISTERED, UserRole.WHALE],
                    isShowImageLine: true,
                },
                [ROUTE_PROJECT_NEWS]: {
                    exact: true,
                    path: '/projects/:uid/news',
                    component: ProjectNewsPage,
                    label: __('News'),
                    icon: 'Icon__news',
                    roles: [UserRole.REGISTERED, UserRole.WHALE],
                    isShowImageLine: true,
                },
            },
        },
    },
};
