import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import StyledRoundButton from '../../components/StyledRoundButton';
import StyledButton from '../../components/StyledButton';
import { Router } from '../../server/pages';

const params = {
  0: {
    disabled: true,
    routerStep: 'administrators',
  },
  1: {
    disabled: false,
    routerStep: 'contact',
  },
};

class OnboardingNavButtons extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    slug: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.setParams = this.setParams.bind(this);
  }

  setParams = (step, param) => {
    return params[step][param];
  };

  render() {
    const { step, slug } = this.props;

    console.log(step);
    console.log('yo');

    return (
      <Flex>
        {step === 2 ? (
          <StyledButton buttonStyle="primary">Finish</StyledButton>
        ) : (
          <React.Fragment>
            <StyledRoundButton
              mr={3}
              disabled={this.setParams(step, 'disabled')}
              onClick={() => window && window.history.back()}
            >
              ←
            </StyledRoundButton>
            <StyledRoundButton
              onClick={() => {
                Router.pushRoute('new-collective-onboarding-modal', {
                  slug,
                  step: this.setParams(step, 'routerStep'),
                });
              }}
            >
              ->
            </StyledRoundButton>
          </React.Fragment>
        )}
      </Flex>
    );
  }
}

export default OnboardingNavButtons;
