import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';

import { H1, H3, Span, P } from '../Text';
import StepsProgress from '../StepsProgress';
import { Router } from '../../server/pages';

const StepLabel = styled(Span)`
  text-transform: uppercase;
  text-align: center;
`;

StepLabel.defaultProps = {
  color: 'black.400',
  fontSize: 'Tiny',
  mt: 1,
};

const steps = [{ name: 'Welcome' }, { name: 'Administrators' }, { name: 'Contact' }];

const params = {
  0: {
    routerStep: undefined,
  },
  1: {
    routerStep: 'administrators',
  },
  2: {
    routerStep: 'contact',
  },
};

class OnboardingStepsProgress extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    handleStep: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.setParams = this.setParams.bind(this);

    this.state = {
      focus: steps[this.props.step],
    };
  }

  setParams = (step, param) => {
    return params[step][param];
  };

  render() {
    const { step, slug } = this.props;
    const { focus } = this.state;

    return (
      <Fragment>
        <StepsProgress
          steps={steps}
          focus={steps[this.props.step]}
          onStepSelect={step => {
            const newStep = steps.findIndex(element => element.name === step.name);
            //this.props.handleStep(newStep);
            Router.pushRoute('new-collective-onboarding-modal', {
              slug,
              step: this.setParams(newStep, 'routerStep'),
            });
          }}
        >
          {({ step }) => {
            return (
              <Flex flexDirection="column" alignItems="center">
                <StepLabel>{step.name}</StepLabel>
              </Flex>
            );
          }}
        </StepsProgress>
      </Fragment>
    );
  }
}

export default OnboardingStepsProgress;
