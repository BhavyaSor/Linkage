import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Breadcrumbs, Link } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';
import AddLinkage from './AddLinkage';
import SortLinkage from './SortLinkage';

const LinkageToolBar = (props) => {
  const linkageInfo = useSelector((state) => state.linkage);
  const pathInfo = useSelector((state) => state.path);
  const rootName = pathInfo.owner ? `My Linkage` : `Shared with Me`;

  const [addLinkageOpen, setAddLinkageOpen] = useState(false);

  const handleModal = (nextState) => {
    if (typeof nextState === 'boolean') {
      setAddLinkageOpen(nextState);
    }
  };

  useEffect(() => {
    if (!linkageInfo.loading && linkageInfo.error === null) {
      setAddLinkageOpen(false);
    }
  }, [linkageInfo]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        arial-label="breadcrumb"
      >
        <Link
          component={RouterLink}
          to={`/linkage`}
          key={-1}
          style={{ fontWeight: 'bold' }}
          color="secondary"
        >
          {rootName}
        </Link>
        {pathInfo.path.map((item, idx) => (
          <Link
            component={RouterLink}
            to={`/linkage/${item._id}`}
            key={idx}
            style={{ fontWeight: 'bold' }}
            color="secondary"
          >
            {item.name}
          </Link>
        ))}
      </Breadcrumbs>
      <Box display="flex" justifyItems="flex-end">
        {pathInfo.owner ? (
          <AddLinkage
            parent={props.parent}
            addLinkage={props.addLinkage}
            handleModal={handleModal}
            isModalOpen={addLinkageOpen}
          />
        ) : null}
        <SortLinkage />
      </Box>
    </Box>
  );
};

export default LinkageToolBar;
