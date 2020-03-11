import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

import { get as fetch } from '../../lib/api';
import { invoiceServiceURL, expenseInvoiceUrl } from '../../lib/url_helpers';
import { getErrorFromGraphqlException } from '../../lib/utils';

/**
 * An helper to build components that download expense's invoice. Does not check the permissions.
 */
const ExpenseInvoiceDownloadHelper = ({ children, expense, collective }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const filename = `Expense-${expense.legacyId}-${collective.slug}-invoice.pdf`;

  return children({
    error,
    isLoading,
    filename,
    downloadInvoice: async () => {
      if (isLoading) {
        return false;
      }

      const invoiceUrl = expenseInvoiceUrl(expense.id);
      const fetchParams = { format: 'blob', allowExternal: invoiceServiceURL };
      try {
        setLoading(true);
        const file = await fetch(invoiceUrl, fetchParams);
        return saveAs(file, filename);
      } catch (e) {
        setError(getErrorFromGraphqlException(e));
      } finally {
        setLoading(false);
      }
    },
  });
};

ExpenseInvoiceDownloadHelper.propTypes = {
  /** Link content */
  children: PropTypes.func.isRequired,
  /** Expense */
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    legacyId: PropTypes.number.isRequired,
  }).isRequired,
  /** Collective where the expense was posted */
  collective: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExpenseInvoiceDownloadHelper;
