import React from 'react';
import PropTypes from 'prop-types';
import _times from 'lodash-es/times';
import LinesEllipsis from 'react-lines-ellipsis';

import UserSchema from 'types/UserSchema';
import ProjectVoteEnum from 'enums/ProjectVoteEnum';
import FeedTypeEnum from 'enums/FeedTypeEnum';
import SocialLinks from 'shared/SocialLinks';
import userAvatarStub from 'static/images/user-avatar-stub.png';
import whaleAvatarStub from 'static/images/whale-avatar-stub.png';
import UserRole from 'enums/UserRole';

import {dal, html} from 'components';
import './CardReview.scss';
import Link from 'yii-steroids/ui/nav/Link';
import {ROUTE_PROJECT_REVIEW, ROUTE_USER_DONATION, ROUTE_USER_GRANTS} from 'routes';

const bem = html.bem('CardReview');

export default class CardReview extends React.PureComponent {

    static propTypes = {
        type: PropTypes.string,
        user: UserSchema,
        review: PropTypes.shape({
            comment: PropTypes.string,
            createTime: PropTypes.string,
        }),
        reviewNumber: PropTypes.number,

        // VOTE
        vote: PropTypes.oneOf(ProjectVoteEnum.getKeys()),

        // DONATE
        amount: PropTypes.number,
        isReviewPage: PropTypes.bool,
    };

    render() {
        const avatarStub = this.props.user.profile.isWhale
            ? whaleAvatarStub
            : userAvatarStub;

        return (
            <div className={bem.block({
                'is-review-page': this.props.isReviewPage,
            })}>
                <div className={bem.element('column-left')}>
                    <Link
                        className={bem.element('avatar-link')}
                        toRoute={this.props.user.role === UserRole.WHALE ? ROUTE_USER_GRANTS : ROUTE_USER_DONATION}
                        toRouteParams={{
                            address: this.props.user.address,
                        }}
                        noStyles
                    >
                        <img
                            className={bem.element('avatar')}
                            src={this.props.user.profile.avatar || avatarStub}
                            alt={this.props.user.profile.name}
                        />
                    </Link>
                    {this.props.isReviewPage && (
                        <>
                            {this.props.user.profile.name && (
                                <Link
                                    toRoute={this.props.user.role === UserRole.WHALE
                                        ? ROUTE_USER_GRANTS
                                        : ROUTE_USER_DONATION
                                    }
                                    toRouteParams={{
                                        address: this.props.user.profile.address,
                                    }}
                                    className={bem.element('name')}
                                    noStyles
                                >
                                    {this.props.user.profile.name}
                                </Link>
                            )}
                            {this.props.user.profile.title && (
                                <p className={bem.element('title')}>
                                    {this.props.user.profile.title}
                                </p>
                            )}

                        </>
                    )}
                </div>

                <div className={bem.element('column-right')}>
                    <div className={bem.element('info-container')}>
                        <div className={bem.element('info')}>
                            {this.props.type === FeedTypeEnum.VOTE && (
                                <div className={bem.element('vote-type')}>
                                    {this.props.vote === ProjectVoteEnum.FEATURED && (
                                        <div className={bem.element('featured-vote-icon')}>
                                            <span className={'MaterialIcon'}>
                                                done
                                            </span>
                                        </div>
                                    ) || (
                                        <div className={bem.element('delisted-vote-icon')}>
                                            <span className={'MaterialIcon'}>
                                                block
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                            {this.props.type === FeedTypeEnum.DONATE && (
                                <div className={bem.element('donate-amount')}>
                                    {_times(dal.contract.TIERS.indexOf(Math.abs(this.props.amount)) + 1).map((item, index) => (
                                        <div
                                            key={index}
                                            className={bem.element('wave-icon')}
                                        >
                                            {this.props.amount > 0
                                                ? <span className={'Icon Icon__wave_green'}/>
                                                : <span className={'Icon Icon__wave_red'}/>
                                            }
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={bem.element('amount')}>
                                {Math.abs(this.props.amount || 0)} {__('Waves')}
                            </div>
                        </div>
                        {this.props.review.comment && (
                            <div className={bem.element('text')}>
                                <LinesEllipsis
                                    text={this.props.review.comment}
                                    maxLine='2'
                                    ellipsis='...'
                                    trimRight
                                    basedOn='letters'
                                />
                            </div>
                        )}
                    </div>
                    <div className={bem.element('actions')}>
                        {!this.props.isReviewPage && (
                            <Link
                                className={bem(bem.element('link'), 'read-more-link')}
                                toRoute={ROUTE_PROJECT_REVIEW}
                                toRouteParams={{
                                    address: this.props.user.address,
                                    uid: this.props.uid || this.props.project.uid,
                                    type: this.props.type,
                                    number: this.props.type === FeedTypeEnum.DONATE
                                        ? this.props.reviewNumber
                                        : null,
                                }}
                                label={__('Read More')}
                                noStyles
                            />
                        )}
                        <div className={bem.element('socials')}>
                            <SocialLinks
                                urls={this.props.user.profile.socials}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
