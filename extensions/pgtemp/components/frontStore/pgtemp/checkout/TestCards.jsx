import React from 'react';
import PropTypes from 'prop-types';
import Button from '@components/common/form/Button';

function TestCards({ showTestCard, testSuccess, testFailure }) {
  return (
    <div>
      <div
        style={{
          border: '1px solid #dddddd',
          borderRadius: '3px',
          padding: '5px',
          boxSizing: 'border-box',
          marginBottom: '10px'
        }}
      >
        {showTestCard === 'success' && (
          <div>
            <div>
              <b>Test success:</b>
            </div>
            <div className="text-sm text-gray-600">
              Test card number: 4242 4242 4242 4242
            </div>
            <div className="text-sm text-gray-600">Test card expiry: 04/26</div>
            <div className="text-sm text-gray-600">Test card CVC: 242</div>
          </div>
        )}
        {showTestCard === 'failure' && (
          <div>
            <div>
              <b>Test failure:</b>
            </div>
            <div className="text-sm text-gray-600">
              Test card number: 4000 0000 0000 9995
            </div>
            <div className="text-sm text-gray-600">Test card expiry: 04/26</div>
            <div className="text-sm text-gray-600">Test card CVC: 242</div>
          </div>
        )}
      </div>
      <div className="pg-form-heading flex justify-between">
        <div className="self-center flex space-x-4">
          <Button
            onAction={testSuccess}
            title="Test success"
            outline
            variant="interactive"
          />
          <Button
            onAction={testFailure}
            title="Test failure"
            variant="critical"
            outline
          />
        </div>
      </div>
    </div>
  );
}

TestCards.propTypes = {
  showTestCard: PropTypes.string.isRequired,
  testSuccess: PropTypes.func.isRequired,
  testFailure: PropTypes.func.isRequired
};

export default TestCards;
