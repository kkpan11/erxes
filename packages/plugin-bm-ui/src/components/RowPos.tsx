import CopyToClipboard from 'react-copy-to-clipboard';
import dayjs from 'dayjs';
import React from 'react';
import {
  __,
  ActionButtons,
  Alert,
  Button,
  Icon,
  Tip,
  WithPermission
} from '@erxes/ui/src';
import { Capitalize } from '@erxes/ui-settings/src/permissions/styles';
import { DateWrapper } from '@erxes/ui/src/styles/main';
import { IBmsBranch } from '../types';
import { Link } from 'react-router-dom';
import { RowTitle } from '../styles';

type Props = {
  branch: IBmsBranch;
  isChecked: boolean;
  toggleBulk: (branch: IBmsBranch, checked: boolean) => void;
  remove: (posId: string) => void;
  showCode?: boolean;
  tmsLink: string;
};

const Row = (props: Props) => {
  const { branch, remove, tmsLink } = props;

  const createdUser = branch.user || {
    _id: '',
    details: { fullName: '' }
  };

  const manageAction = branch => {
    return (
      <Link to={`/tms/edit/${branch._id}`}>
        <Button btnStyle='link'>
          <Tip text={__('Manage')} placement='top'>
            <Icon icon='edit-3' />
          </Tip>
        </Button>
      </Link>
    );
  };

  const renderRemoveAction = () => {
    const onClick = () => {
      if (branch._id) remove(branch._id);
    };

    return (
      <Tip text={__('Delete')} placement='top'>
        <Button
          id='integrationDelete'
          btnStyle='link'
          onClick={onClick}
          icon='times-circle'
        />
      </Tip>
    );
  };

  const renderLink = () => {
    const onCopy = () => {
      Alert.success('Copied');
    };

    return (
      <Link to={tmsLink} target='_blank'>
        <Tip text={__('link for the TMS')} placement='top'>
          <Icon icon='link' size={15} />
        </Tip>
      </Link>
    );
  };

  return (
    <tr>
      <td>
        <RowTitle>
          <Link to={`/tms/edit/${branch._id}`}>{branch.name}</Link>
        </RowTitle>
      </td>
      <td>
        <div key={createdUser._id}>
          <Capitalize>
            {createdUser.details && createdUser.details.fullName}
          </Capitalize>
        </div>
      </td>
      <td>
        <Icon icon='calender' />{' '}
        <DateWrapper>{dayjs(branch.createdAt).format('ll')}</DateWrapper>
      </td>

      <td>
        <ActionButtons>
          {manageAction(branch)}
          {tmsLink && renderLink()}
          {renderRemoveAction()}
        </ActionButtons>
      </td>
    </tr>
  );
};

export default Row;
