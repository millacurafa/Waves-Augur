import React from 'react';
import PropTypes from 'prop-types';

import {ui} from 'components';
import fieldHoc from '../fieldHoc';

export default
@fieldHoc({
    componentId: 'form.InputField',
})
class InputField extends React.PureComponent {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.string,
        attribute: PropTypes.string,
        formStyle: PropTypes.oneOf(['search', 'short-search']),
        input: PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.any,
            onChange: PropTypes.func,
            onKeyDown: PropTypes.func
        }),
        required: PropTypes.bool,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        type: PropTypes.oneOf(['text', 'email', 'hidden', 'phone', 'password']),
        placeholder: PropTypes.string,
        isInvalid: PropTypes.bool,
        disabled: PropTypes.bool,
        inputProps: PropTypes.object,
        onChange: PropTypes.func,
        className: PropTypes.string,
        view: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        disabled: false,
        required: false,
        className: '',
        placeholder: '',
        errors: [], //for storybook
    };

    render() {
        // No render for hidden input
        if (this.props.type === 'hidden') {
            return null;
        }

        const InputFieldView = this.props.view || ui.getView('form.InputFieldView');
        return (
            <InputFieldView
                {...this.props}
                inputProps={{
                    name: this.props.input.name,
                    value: this.props.input.value || '',
                    onChange: e => this.props.input.onChange(e.target.value),
                    onKeydown: e => this.props.input.onKeydown(e.target.value),
                    type: this.props.type,
                    placeholder: this.props.placeholder,
                    disabled: this.props.disabled,
                    ...this.props.inputProps,
                }}
            />
        );
    }

}
// const TextFieldAdapter = ({ input, meta, ...rest }) => (
//     <TextField
//       {...input}
//       {...rest}
//       onChange={(event, value) => input.onChange(value)}
//       errorText={meta.touched ? meta.error : ''}
//     />
//   )

export const InputFormField = ({ input, meta, ...restProps }) => {
    const inputProps = {
        ...input,
        ...restProps,
        onChange: (event, value) => input.onChange(value),
    }

    return (
        <InputField
            {...inputProps}
            inputProps={inputProps}
            onChange={(event, value) => input.onChange(value)}
        />
    )
};