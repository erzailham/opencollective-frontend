import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import { FormattedMessage } from 'react-intl';
import ReplyToMemberInvitationCard from './ReplyToMemberInvitationCard';
import MessageBox from './MessageBox';

/**
 * Displays a `ReplyToMemberInvitationCard` list, scrolling to the given selected
 * element on mount.
 */
const MemberInvitationsList = ({ invitations, selectedInvitationId }) => {
  React.useEffect(() => {
    if (selectedInvitationId) {
      const elem = document.getElementById(`invitation-${selectedInvitationId}`);
      if (elem) {
        const elemTop = elem.getBoundingClientRect().top + window.scrollY;
        window.scroll({ top: elemTop - 100, behavior: 'smooth' });
      }
    }
  }, []);

  if (invitations.length === 0) {
    return (
      <MessageBox type="info" withIcon>
        <FormattedMessage id="MemberInvitations.none" defaultMessage="No pending invitations" />
      </MessageBox>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      {invitations.map(invitation => (
        <Box key={invitation.id} mb={5}>
          <ReplyToMemberInvitationCard invitation={invitation} isSelected={invitation.id === selectedInvitationId} />
        </Box>
      ))}
    </Flex>
  );
};

MemberInvitationsList.propTypes = {
  invitations: PropTypes.array,
  selectedInvitationId: PropTypes.number,
};

export default MemberInvitationsList;
