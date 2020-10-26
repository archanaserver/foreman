import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Paginator } from 'patternfly-react';
import { translate as __ } from '../../common/I18n';
import {
  getURIpage,
  getURIperPage,
  changeQuery,
} from '../../common/urlHelpers';
import {
  useForemanSettings,
  usePaginationOptions,
} from '../../Root/Context/ForemanContext';
import './pagination.scss';

const Pagination = props => {
  const {
    data,
    pagination,
    onPageSet,
    onPerPageSelect,
    dropdownButtonId,
    disableNext,
    disablePrev,
    ...otherProps
  } = props;

  const { perPage } = useForemanSettings();
  const perPageOptions = usePaginationOptions();
  const urlPage = getURIpage();
  const urlPerPage = getURIperPage() || null;
  const className = isEmpty(data.classNames)
    ? 'col-md-12'
    : `col-md-12 ${data.classNames.pagination_classes}`;

  const pageOpts = {
    page: urlPage,
    perPage: urlPerPage || perPage,
    perPageOptions,
    ...pagination,
  };

  const messages = {
    firstPage: __('First Page'),
    previousPage: __('Previous Page'),
    currentPage: __('Current Page'),
    nextPage: __('Next Page'),
    lastPage: __('Last Page'),
    perPage: __('per page'),
    of: __('of'),
  };

  return (
    <Paginator
      pagination={pageOpts}
      viewType={data.viewType}
      itemCount={data.itemCount}
      onPageSet={onPageSet}
      onPerPageSelect={onPerPageSelect}
      disableNext={disableNext}
      disablePrev={disablePrev}
      className={className}
      dropdownButtonId={dropdownButtonId}
      messages={messages}
      {...otherProps}
    />
  );
};

Pagination.propTypes = {
  data: PropTypes.shape({
    viewType: PropTypes.string,
    itemCount: PropTypes.number,
    classNames: PropTypes.shape({
      pagination_classes: PropTypes.string,
    }),
  }).isRequired,
  onPageSet: PropTypes.func,
  onPerPageSelect: PropTypes.func,
  dropdownButtonId: PropTypes.string,
  disableNext: PropTypes.bool,
  disablePrev: PropTypes.bool,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPageOptions: PropTypes.arrayOf(PropTypes.number),
  }),
};

Pagination.defaultProps = {
  onPageSet: page => changeQuery({ page }),
  onPerPageSelect: perPage => changeQuery({ page: 1, per_page: perPage }),
  dropdownButtonId: 'pagination-row-dropdown',
  pagination: null,
  disableNext: false,
  disablePrev: false,
};

export default Pagination;
