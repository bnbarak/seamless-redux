import React from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../src';

const { selectData, selectErrorData, selectIsError } = selectors;

export const shortInputText = "Input is too short!";
export const perfectMessage = "Input is perfect!";

class MyComponent extends React.PureComponent {
  handleChange = (event) => {
    const { seamless } = this.props;
    const data = event.target.value;
    const entity = seamless.getEntity('Form');
    entity.updateObjectByKey(data, 'input');

    const inputLength = data.length;
    if (inputLength < 4) entity.newError(shortInputText);
    else entity.resetError();
  };

  render() {
    const { formData, isError, errorMessage } = this.props;
    const { input } = formData;
    const renderError = isError ? errorMessage : perfectMessage;

    return (
      <div>
        <div>{renderError}</div>
        <input onChange={this.handleChange} value={input} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formData: selectData(state, 'Form'),
  isError: selectIsError(state, 'Form'),
  errorMessage: selectErrorData(state, 'Form'),
});

export default connect(mapStateToProps)(MyComponent);
