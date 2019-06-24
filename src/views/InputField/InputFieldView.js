import React from 'react';
import PropTypes from 'prop-types';

import {html} from 'components';
const bem = html.bem('InputFieldView');
import './InputFieldView.scss';

export default class InputFieldView extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        required: PropTypes.bool,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        type: PropTypes.oneOf(['text', 'email', 'hidden', 'phone', 'password']),
        placeholder: PropTypes.string,
        isInvalid: PropTypes.bool,
        disabled: PropTypes.bool,
        inputProps: PropTypes.object,
        className: PropTypes.string,
    };

    render() {
        return (
            <>
                {this.props.label && (
                    <label className={bem.element('label')}>
                        {this.props.label}
                    </label>
                )}
                <input
                    className={bem(
                        bem.block({
                            size: this.props.size,
                        }),
                        this.props.isInvalid && 'is-invalid',
                        this.props.className,
                    )}
                    {...this.props.inputProps}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    required={this.props.required}
                />
            </>
        );
    }

}
