import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';

import Container from '../../components/Container';
import { H1, P } from '../../components/Text';
import StyledInput from '../../components/StyledInput';
import StyledInputField from '../../components/StyledInputField';
import StyledInputGroup from '../../components/StyledInputGroup';

class OnboardingContentBox extends React.Component {
  static propTypes = {
    step: PropTypes.number,
    collective: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleValue = this.handleValue.bind(this);
  }

  handleValue = (name, value, values) => {
    values[name] = value;
    return values;
  };

  render() {
    const { step, collective } = this.props;

    const values = {
      website: '',
      github: '',
      twitter: '',
    };

    return (
      <Container>
        {step === 0 && (
          <Fragment>
            <H1
              fontSize={['H5', 'H3']}
              lineHeight={['H5', 'H3']}
              fontWeight="bold"
              color="black.900"
              textAlign="center"
            >
              The {collective.name} Collective has been created!
            </H1>
            <P fontSize={['H5', 'H3']} lineHeight={['H5', 'H3']} textAlign="center">
              🎉
            </P>
          </Fragment>
        )}
        {step === 1 && (
          <H1 fontSize={['H5', 'H3']} lineHeight={['H5', 'H3']} fontWeight="bold" color="black.900" textAlign="center">
            Add administrators
          </H1>
        )}
        {step === 2 && (
          <Fragment>
            <H1
              fontSize={['H5', 'H3']}
              lineHeight={['H5', 'H3']}
              fontWeight="bold"
              color="black.900"
              textAlign="center"
            >
              Links and contact info
            </H1>

            <Flex flexDirection="column">
              <StyledInputField label="Do you have a website?" htmlFor="website">
                {inputProps => (
                  <StyledInput
                    type="text"
                    onBlur={({ target }) => this.handleValue(target.name, target.value, values)}
                    placeholder="https://guineapi.gs"
                    {...inputProps}
                  />
                )}
              </StyledInputField>
              <StyledInputField label="Connect your social platforms" htmlFor="twitter">
                {inputProps => (
                  <StyledInputGroup
                    type="text"
                    onBlur={({ target }) => this.handleValue(target.name, target.value, values)}
                    placeholder="sbinlondon"
                    prepend="@"
                    {...inputProps}
                  />
                )}
              </StyledInputField>
              <StyledInputField htmlFor="github">
                {inputProps => (
                  <StyledInputGroup
                    type="text"
                    onBlur={({ target }) => this.handleValue(target.name, target.value, values)}
                    placeholder="sbinlondon"
                    prepend="github.com/"
                    {...inputProps}
                  />
                )}
              </StyledInputField>
            </Flex>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default OnboardingContentBox;
